import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from  '../Context/TokenContext' ; // Importa el TokenContext
import {Toaster, toast} from 'sonner';

const url = `${import.meta.env.VITE_BACK_URL}reports`;

const useFetchReports = (url) => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      let list = []
      axios.get(url).then((response) => {
        setUsers(response.data);
        list.push(response.data);
        setUsers(list);
      });
    }, [url]);
   
    
   
  
    return users;
  };



 const useReportsById = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchUserById = async (userId) => {
      setLoading(true);
  
      try {
        const response = await axios.get(`${url}${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    return {
      user,
      loading,
      error,
      fetchUserById,
    };
  };
  




const useSendDataReports = () => {
    const [sent, setSent] = useState(false);
    const { token } = useContext(TokenContext); // Usa el TokenContext para obtener el token
  
    const handleSubmit = async (data) => {
      setSent(true);
  
      try {
        await axios.post(`${url}/`, data, {
          headers: { Authorization: `Bearer ${token}` } // Agrega el token al header de la solicitud
        });
        
        setSent(false);
        toast.success('Usuario creado con éxito')

      
      } catch (error) {
        setSent(false);
        toast.error('Error al crear el usuario')
      }
      
    };
    return {
      sent,
      handleSubmit,
    };
};
  
const usePutReports = () => {
  const [updated, setUpdated] = useState(false);
  const { token } = useContext(TokenContext); // Usa el TokenContext para obtener el token

  const handleUpdate = async (userId, updatedData) => {

    console.log(userId, updatedData);
    // Verifica que userId y updatedData sean válidos
    if (!userId || !updatedData || typeof updatedData !== 'object') {
      console.error('userId o updatedData no son válidos');
      return;
    }

    setUpdated(true);

    try {
      await axios.put(`${url}/${userId}/`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } // Agrega el token al header de la solicitud
      });


      setUpdated(false);
      toast.success('Usuario actualizado con éxito')

    } catch (error) {
      setUpdated(false);
      toast.error('Error al actualizar el usuario')
    }
  };

  return {
    updated,
    handleUpdate,
  };
};
  
  


const useDeleteReports = () => {
  const [deleted, setDeleted] = useState(false);
  const { token } = useContext(TokenContext); // Usa el TokenContext para obtener el token
  
  const handleDelete = async (userId) => {
    setDeleted(true);
    
    try {
      await axios.delete(`${url}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeleted(false);
      toast.success('Usuario eliminado con éxito')
      window.location.reload();
    } catch (error) {
      setDeleted(false);
      console.error('Hubo un problema al eliminar el usurip:', error);
    }
  };

  return {
    deleted,
    handleDelete,
  };
};

export { useFetchReports, useReportsById, useSendDataReports, usePutReports, useDeleteReports };
