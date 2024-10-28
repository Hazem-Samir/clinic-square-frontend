import { DayValue } from "@/schema/Essentials";
import { getToken } from "./auth";

export const addDay = async (data)=>{
      const token = getToken();
      try {
        const response = await fetch(`/api/doctor/schedule/day`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
  
      
  
    const res = await response.json();
    console.log(res);
    return res;
      } catch (error) {
        console.error('Error Add Schedule:', error)
      }
    }

    export const UpdateCost = async (formData:FormData)=>{
      const token = getToken();
      try {
        const response = await fetch(`/api/doctor/schedule/cost`, {
          method: 'PATCH',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
          body: formData,
        })
  
        if (!response.ok) {
          // return response.message;
          throw new Error ('Failed to Add Schedule');
    }
  
    const res = await response.json();
    console.log(res);
    return res;
      } catch (error) {
        console.error('Error Add Schedule:', error)
      }
    }

    export const UpdateDay = async (day:DayValue)=>{
      // console.log(JSON.stringify(day))
      const token = getToken();
      try {
        const response = await fetch(`/api/doctor/schedule/day`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(day),
        })
  
      
  
    const res = await response.json();
    console.log(res);
    return res;
      } catch (error) {
        console.error('Error Add Schedule:', error)
      }
    } 

    export const DeleteDay = async (day:DayValue)=>{
      // console.log(JSON.stringify(day))
      const token = getToken();
      try {
        const response = await fetch(`/api/doctor/schedule/day`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(day),
        })
  
      
  
    const res = await response.json();
    console.log(res);
    return res;
      } catch (error) {
        console.error('Error Add Schedule:', error)
      }
    } 