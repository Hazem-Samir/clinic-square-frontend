import { NextRequest, NextResponse } from 'next/server';
import { SERVER_URL } from '@/schema/Essentials';



export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
  }
  
  const token = authHeader.split(' ')[1];    
  if (!token) {
    return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id=searchParams.get('id')||'';


  try {
    const apiResponse = await fetch(`${SERVER_URL}/pharmacy/pharmacy-medicine/${id}?populate=medicine`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })

    if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        console.log(errorData)
        return NextResponse.json({ success: false, message: errorData.message }, { status: apiResponse.status });
      }
  
      const data = await apiResponse.json();
      return NextResponse.json({ success: true, message: 'Pharmacy Medicines Data', data });
  
    } catch (error) {
      console.error('Erroraaa:', error);
  
      return NextResponse.json({
        success: false,
        message: error.message || 'An unexpected error occurred',
      }, { status: 500 });
    }
  }