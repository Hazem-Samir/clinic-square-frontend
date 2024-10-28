import { getToken } from "./auth";
import { cookies } from 'next/headers'
export const getReservationsHistory = async (limit:number,page: number) => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      console.log("token", token);
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        date: new Date().toISOString(),
      }).toString();
      const response = await fetch(`http://localhost:3000/api/doctor/reservationsHistory?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache:"reload",
      });
    
      if (!response.ok) {
            throw new Error ('Failed to fetch reservations');
      }
    
      const res = await response.json();
      console.log(res);
      return res;
    }

  export const getReservations = async (limit:number,page: number, date: string) => {

      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      console.log("Da",date)
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        date: date,
      }).toString();
      const response = await fetch(`http://localhost:3000/api/doctor/reservations?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
          cache:"reload"
          
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
    
      const res = await response.json();
      console.log(res);
      return res;
    } 

    export const getSchedule = async () => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const response = await fetch(`http://localhost:3000/api/doctor/schedule`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache:"reload",
      });
    
      if (!response.ok) {
            throw new Error ('Failed to fetch reservations');
      }
    
      const res = await response.json();
      console.log(res);
      return res;
    } 

