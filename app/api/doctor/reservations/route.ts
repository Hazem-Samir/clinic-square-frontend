import { NextRequest, NextResponse } from 'next/server';
import { format, addDays } from "date-fns"
import { SERVER_URL } from '@/schema/Essentials';
import { revalidatePath } from 'next/cache';





export async function GET(request: NextRequest) {
      // Get the Authorization header
      const authHeader = request.headers.get('Authorization')
      console.log(authHeader);
      const searchParams = request.nextUrl.searchParams
      const page = parseInt(searchParams.get('page') || '1',10)
      const limit=parseInt(searchParams.get('limit')||'5',10);
      const startOfDay = new Date(searchParams.get('date')|| new Date()).toISOString();
      const endOfDate = new Date(searchParams.get('date')|| new Date()).setHours(23, 59, 59, 999);
      const endOfDate1=new Date(endOfDate).toISOString()
      console.log(startOfDay);
      console.log(endOfDate1);
      // Check if the Authorization header exists and starts with 'Bearer '
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
      }
    
      // Extract the token
      const token = authHeader.split(' ')[1]
    
      // If the token is empty, return an error
      if (!token) {
        return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
      }
    
      try {
        // Send a request to another server using the bearer token
        const apiResponse = await fetch(`${SERVER_URL}/doctor/My-Reservations?page=${page}&date[gte]=${startOfDay}&date[lte]=${endOfDate1}&limit=${limit}&state=pending&populate=patient`, {
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
          return NextResponse.json({ success: true, message: 'Rservations Data', data });
      
        } catch (error: any) {
          console.error('Erroraaa:', error);
      
          // Fallback error handling
          return NextResponse.json({
            success: false,
            message: error.message || 'An unexpected error occurred',
          }, { status: 500 });
        }
      }
      
      export async function PATCH(request: NextRequest) {
        try {
          // Parse the incoming request body
      const authHeader = request.headers.get('Authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ success: false, message: 'Missing or invalid Authorization header' }, { status: 401 })
      }
    
      // Extract the token
      const token = authHeader.split(' ')[1]
    
      // If the token is empty, return an error
      if (!token) {
        return NextResponse.json({  success: false, message: 'Invalid token' }, { status: 401 })
      }
          const searchParams = request.nextUrl.searchParams
          // console.log(searchParams)
          const body = await request.json();
          console.log(searchParams.get('path'))
          const id=searchParams.get('ID');
          // console.log(id)
          // console.log('Attempting to connect to:', SERVER_URL);
      
          // Make the request to your authentication server
          const apiResponse = await fetch(`${SERVER_URL}/doctor-Reservation/${id}`, {
            method: 'PATCH',
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
      
          const data = await apiResponse.json();
          // revalidatePath("/[locale]/doctor","page");
          return NextResponse.json({ success: true, message: 'Update successful', data });
          
        } catch (error: any) {
          console.error('Error:', error.message);
      
          // Fallback error handling
          return NextResponse.json({
            success: false,
            message: error.message || 'An unexpected error occurred',
          }, { status: 500 });
        }
      }