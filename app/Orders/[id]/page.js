// app/Orders/[id]/page.js
'use client';
import { useEffect, useState } from 'react'; 
import UpdateFormComponent from "./components/UpdateFormComponent";
import NotFound from './components/NotFound';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './loading';
export default function Page({ params }) {
  const { id } = params; 
  const [FormData, SetFormData] = useState(null);
  
  useEffect(() => {
    if (id) {
      console.log('Current ID:', id);
      
      const fetchFormData = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/Coffee/id/${id}`); 
          console.log(response.data)
            SetFormData(response.data)
        } catch (error) {
          console.error('Error fetching form data:', error);
        }
      };

      fetchFormData();
    }
  }, [id]);

  return (
    <><ToastContainer/>
    {FormData ? <UpdateFormComponent id={id} FormData={FormData} /> : <Loading />}</>
  );
}
