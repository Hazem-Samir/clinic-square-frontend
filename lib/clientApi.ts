import { DayValue } from "@/schema/Essentials";
import { getToken, setUser } from "./auth";
import { ProfileValue } from "@/schema/Profile";

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

    export const UpdateProfile = async (formData:FormData)=>{
      const token = getToken();
      if (token){
        try {
          const response = await fetch(`/api/doctor/updateProfile`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
          })
    
          if (response.ok) {
          }
          
          const res = await response.json();
          console.log(res.data)
          setUser(res.data.data,token);
      console.log(res);
      return res;
        } catch (error) {
          console.error('Error Add Schedule:', error)
        }
      }
      else {
        console.error('No Token');
      }
    }

    export const UpdatePassword = async (data:ProfileValue)=>{
      const token = getToken();
      if (token){
        try {
          const response = await fetch(`/api/doctor/updateProfile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
    
         
          
          const res = await response.json();
     console.log(res)
      return res;
        } catch (error) {
          console.error('Error Add Schedule:', error)
        }
      }
      else {
        console.error('No Token');
      }
    }