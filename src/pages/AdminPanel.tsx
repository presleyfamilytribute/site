import { useState, useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, UserCog, RefreshCw, UserCheck, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define user type for admin panel
interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed_at: string | null;
  email_confirmed_at: string | null;
  banned_until: string | null;
}

const AdminPanel = () => {
  const { user, isLoading } = useRequireAuth('/auth');
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [actionInProgress, setActionInProgress] = useState('');

  // Check if current user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;

      try {
        // Provide both the return type and the input parameter type
        const { data, error } = await supabase.rpc<boolean, { user_id: string }>('is_admin_user', { user_id: user.id });

        if (error) {
          console.error('Error checking admin status:', error);
          return;
        }

        setIsAdmin(!!data);

        if (data) {
          // Load users data if admin
          fetchUsers();
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Fetch all users using Supabase Edge Function
  const fetchUsers = async () => {
    if (!user) return;

    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.functions.invoke<{ users: AdminUser[] }>('admin-get-users');

      if (error) {
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  // Handle user actions (ban/unban)
  const handleUserAction = async (userId: string, action: 'ban' | 'unban'): Promise<void> => {
    setActionInProgress(userId);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { userId, action },
      });

      if (error) {
        toast({
          title: "Action failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`,
      });

      // Refresh user list
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} user`,
        variant: "destructive",
      });
    } finally {
      setActionInProgress('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 text-elvis-gold animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-elvis-navy/90 to-black text-elvis-cream p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-elvis-gold text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-elvis-navy/90 to-black text-elvis-cream p-4">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <UserCog size={32} className="text-elvis-gold" />
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-elvis-gold">Admin Panel</h1>
          </div>
          <Button 
            onClick={fetchUsers} 
            variant="outline" 
            disabled={loadingUsers} 
            className="border-elvis-gold text-elvis-gold hover:bg-elvis-gold/10"
          >
            {loadingUsers ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>

        <Card className="border border-elvis-gold/20 bg-elvis-navy/30">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Users Management</CardTitle>
            <CardDescription>Manage registered users for the Presley Family Tribute website.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingUsers ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 text-elvis-gold animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {user.banned_until ? (
                              <Badge variant="destructive">Banned</Badge>
                            ) : user.email_confirmed_at ? (
                              <Badge variant="default" className="bg-green-600">Confirmed</Badge>
                            ) : (
                              <Badge variant="outline">Unconfirmed</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.last_sign_in_at 
                              ? new Date(user.last_sign_in_at).toLocaleDateString() 
                              : 'Never'}
                          </TableCell>
                          <TableCell className="text-right">
                            {user.banned_until ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'unban')}
                                disabled={actionInProgress === user.id}
                                className="text-green-500 border-green-500 hover:bg-green-500/10"
                              >
                                {actionInProgress === user.id ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <UserCheck className="h-4 w-4 mr-2" />
                                )}
                                Unban
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUserAction(user.id, 'ban')}
                                disabled={actionInProgress === user.id}
                                className="text-red-500 border-red-500 hover:bg-red-500/10"
                              >
                                {actionInProgress === user.id ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <UserX className="h-4 w-4 mr-2" />
                                )}
                                Ban
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
