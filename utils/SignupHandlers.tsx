import { ISignUpData } from "@/schema/Essentials";

const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
export const ImageHandler = (file:File) => {
      console.log(file)
      if (!file) return false;
      // Check file type
      if (!acceptedImageTypes.includes(file.type)) {
        return false;
      }
      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return false;
      }
      return true;
    };

 export const onSignupSubmit = async ({data,role}:ISignUpData) => {
      const formData = new FormData()
  
      // Add user type
      formData.append("role", role);
  
      // Add signup form data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      console.log(data);
  
      // Add profile photo if it exists
      if (data.profilePic) {
        formData.append("profilePic", profilePic)
      }
  
      // Log the FormData (for demonstration purposes)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
      }
  
      // Here you would typically send the formData to your API
      // For example:
      // try {
      //   const response = await fetch('/api/signup', {
      //     method: 'POST',
      //     body: formData,
      //   })
      //   const result = await response.json()
      //   console.log(result)
      // } catch (error) {
      //   console.error('Error:', error)
      // }
    }
     