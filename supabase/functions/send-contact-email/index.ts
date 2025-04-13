
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, subject, message } = formData;

    // Send email to the target address
    const emailResponse = await resend.emails.send({
      from: "Elvis Presley Tribute <onboarding@resend.dev>",
      to: ["presleyfamilytribute@gmail.com"],
      subject: `Website Contact Form: ${subject}`,
      html: `
        <h1>New contact form submission</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2>Message:</h2>
        <p>${message}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to the submitter
    await resend.emails.send({
      from: "Elvis Presley Tribute <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting the Presley Family Tribute",
      html: `
        <h1>Thank you for your message, ${name}!</h1>
        <p>We have received your inquiry with the subject "${subject}" and will get back to you as soon as possible.</p>
        <p>Best regards,<br>The Presley Family Tribute Team</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
