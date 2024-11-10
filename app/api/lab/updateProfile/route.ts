import { NextRequest, NextResponse } from 'next/server';
import { SERVER_URL } from '@/schema/Essentials';
export async function PATCH(request: NextRequest) {
      const authHeader = request.headers.get('Authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
      }
      
      const token = authHeader.split(' ')[1];    
      if (!token) {
        return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
      }
          
      const formData = await request.formData();
    
        try {
        const apiResponse = await fetch(`${SERVER_URL}/lab/updateMe`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
    
        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          console.log(errorData)
          return NextResponse.json({ success: false, message: errorData.message, error: errorData.errors }, { status: apiResponse.status });
        }
    
        const data = await apiResponse.json();

        return NextResponse.json({ success: true, message: 'Profile Updated Successfully', data });
        
      } catch (error) {
        console.error('Error:', error.message);

        return NextResponse.json({
          success: false,
          message: error.message || 'An unexpected error occurred',
        }, { status: 500 });
      }
}
export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
  }
  
  const token = authHeader.split(' ')[1];    
  if (!token) {
    return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
  }
      
  const body = await request.json();

    try {
    const apiResponse = await fetch(`${SERVER_URL}/lab/changeMyPassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.log(errorData)
      return NextResponse.json({ success: false, message: errorData.message, error: errorData.errors }, { status: apiResponse.status });
    }

    const data = await apiResponse.json()
    return NextResponse.json({ success: true, message: 'Password Updated Successfully', data });
    
  } catch (error) {
    console.error('Error:', error.message)
    return NextResponse.json({
      success: false,
      message: error.message || 'An unexpected error occurred',
    }, { status: 500 });
  }
}