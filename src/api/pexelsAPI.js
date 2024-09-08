import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);

export const searchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: API_KEY,      
        q: query,          
        image_type: 'photo',
        per_page: 15,      
        pretty: true,  
        page: page,    // Pass the page number
      },
    });
    return response.data.hits; 
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    throw error;
  }
};
