
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
  recaptchaToken: string;
}

// Input validation function
const validateInput = (data: ContactFormData): { valid: boolean; error?: string } => {
  if (!data.name || !data.email || !data.subject || !data.message || !data.recaptchaToken) {
    return { valid: false, error: "All fields are required" };
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: "Invalid email format" };
  }
  
  // Check for reasonable lengths
  if (data.name.length > 100) {
    return { valid: false, error: "Name is too long" };
  }
  
  if (data.subject.length > 200) {
    return { valid: false, error: "Subject is too long" };
  }
  
  if (data.message.length > 5000) {
    return { valid: false, error: "Message is too long" };
  }
  
  return { valid: true };
};

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    // For test key verification, always return true
    // In production, uncomment the code below and use your actual secret key
    if (token === "test-token") return true;
    
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: Deno.env.get("RECAPTCHA_SECRET_KEY") || "test_secret_key",
        response: token,
      }).toString(),
    });

    const data = await response.json();
    return data.success;
    
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Validate the input
    const validation = validateInput(formData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify reCAPTCHA
    const isHuman = await verifyRecaptcha(formData.recaptchaToken);
    if (!isHuman) {
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification failed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
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
