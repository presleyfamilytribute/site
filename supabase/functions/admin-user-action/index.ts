
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Set up CORS headers for the response
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Create Supabase client with service role
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: { persistSession: false }
    }
  );

  // Get the authorization header from the request
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Verify the JWT and get the user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Unauthorized access");
    }

    // Check if the user is an admin
    const { data: adminData, error: adminError } = await supabaseClient
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    if (adminError || !adminData) {
      throw new Error("Access denied: Admin privileges required");
    }

    // Get and validate the request body
    const { userId, action } = await req.json();
    
    if (!userId || !action || !['ban', 'unban'].includes(action)) {
      return new Response(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let result;
    
    if (action === 'ban') {
      // Ban the user - set ban until 100 years from now (effectively permanent)
      const banUntil = new Date();
      banUntil.setFullYear(banUntil.getFullYear() + 100);
      
      result = await supabaseClient.auth.admin.updateUserById(
        userId,
        { banned_until: banUntil.toISOString() }
      );
    } else {
      // Unban the user
      result = await supabaseClient.auth.admin.updateUserById(
        userId,
        { banned_until: null }
      );
    }

    if (result.error) {
      throw new Error(`Failed to ${action} user: ${result.error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully` 
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
