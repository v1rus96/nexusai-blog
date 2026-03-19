import { NextRequest, NextResponse } from "next/server";
import { BUTTONDOWN_USERNAME } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("tag", "website");

    const response = await fetch(
      `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok || response.status === 201) {
      return NextResponse.json({ success: true });
    }

    // Try to extract error details
    let errorMessage = "Subscription failed. Please try again.";
    try {
      const data = await response.json();
      if (data?.detail) errorMessage = data.detail;
      if (data?.email?.[0]) errorMessage = data.email[0];
    } catch {
      // response may not be JSON
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: response.status }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
