import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    // Validate inputs
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Numele și telefonul sunt obligatorii." },
        { status:400 }
      );
    }

    // Prepare for email/SMS/Database (Placeholder for now)
    // In a real scenario, you would use Resend, SendGrid, or Twilio here.
    console.log("Contact Request Received:", { name, phone, message });

    // Simulate database delay or email sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: "Mesajul a fost trimis cu succes!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare la procesarea cererii." },
      { status: 500 }
    );
  }
}
