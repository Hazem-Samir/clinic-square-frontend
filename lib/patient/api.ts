  import { cookies } from 'next/headers'

export const getAllDoctors = async (limit:number,page: number) => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        state: "true"
      }).toString();
      const response = await fetch(`http://localhost:3000/api/patient/doctors?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache:"reload",
      });
    
      if (!response.ok) {
            throw new Error ('Failed to fetch Doctors');
      }
    
      const res = await response.json();
      return res;
    }

    export const getOneDoctor = async (id:string) => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const queryParams = new URLSearchParams({
        id,
        state: "true"
      }).toString();
      const response = await fetch(`http://localhost:3000/api/patient/doctors/oneDoctor?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache:"reload",
      });
    
      if (!response.ok) {
            throw new Error ('Failed to fetch Doctors');
      }
    
      const res = await response.json();
      return res;
    }


    export const getOneLab = async (id:string) => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const queryParams = new URLSearchParams({
        id,
        state: "true"
      }).toString();
      const response = await fetch(`http://localhost:3000/api/patient/labs/oneLab?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache:"reload",
      });
    
      if (!response.ok) {
            throw new Error ('Failed to fetch Doctors');
      }
    
      const res = await response.json();
      return res;
    }

export const getAllLabs = async (limit:number,page: number) => {
  const cookieStore = cookies()
  const token = JSON.parse (cookieStore.get('token').value)
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    state: "true"
  }).toString();
  const response = await fetch(`http://localhost:3000/api/patient/labs?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    cache:"reload",
  });

  if (!response.ok) {
        throw new Error ('Failed to fetch Doctors');
  }

  const res = await response.json();
  return res;
}
    
export const GetLabTests = async (id:string) => {
  const cookieStore = cookies()
  const token = JSON.parse (cookieStore.get('token').value)
  const queryParams = new URLSearchParams({
    id
  }).toString();
  const response = await fetch(`http://localhost:3000/api/patient/labs/oneLab/test?${queryParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    cache:"reload",
  });

  if (!response.ok) {
        throw new Error ('Failed to fetch Doctors');
  }

  const res = await response.json();
  return res;
}
  export const getReservations = async (limit:number,page: number, startOfDay: string,endOfDay:string,state:string) => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        startOfDay,
        endOfDay,
        state,
      }).toString();
      const response = await fetch(`http://localhost:3000/api/lab/reservations?${queryParams}`, {
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
      console.log(res)
      return res;
    } 

    export const getSchedule = async () => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const response = await fetch(`http://localhost:3000/api/lab/schedule`, {
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
      return res;
    } 


    export const getAvaliableTests = async () => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const response = await fetch(`http://localhost:3000/api/lab/tests/available`, {
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
      return res;
    } 

    



    export const getMyTests = async (limit:number,page: number) => {
      const cookieStore = cookies()
      const token = JSON.parse (cookieStore.get('token').value)
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      }).toString();
      const response = await fetch(`http://localhost:3000/api/lab/tests?${queryParams}`, {
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
      return res;
    } 