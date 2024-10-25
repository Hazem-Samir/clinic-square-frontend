import { SERVER_URL } from '@/schema/Essentials';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();

    // console.log('Attempting to connect to:', SERVER_URL);

    // Make the request to your authentication server
    const apiResponse = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.log(errorData)
      return NextResponse.json({ success: false, message: errorData.message, error: errorData.errors }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json({ success: true, message: 'Login successful', data });

  } catch (error: any) {
    console.error('Error:', error.message);

    // Fallback error handling
    return NextResponse.json({
      success: false,
      message: error.message || 'An unexpected error occurred',
    }, { status: 500 });
  }
}
