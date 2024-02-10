import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from  '../Context/TokenContext' ; // Importa el TokenContext


const useFetchUsers = (url) => {
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



 const useUsersById = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchUserById = async (userId) => {
      setLoading(true);
  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
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
  




const useSendDataUsers = () => {
    const [sent, setSent] = useState(false);
    const { token } = useContext(TokenContext); // Usa el TokenContext para obtener el token
  
    const handleSubmit = async (data) => {
      setSent(true);
  
      try {
        await axios.post("http://127.0.0.1:8000/users/", data, {
          headers: { Authorization: `Bearer ${token}` } // Agrega el token al header de la solicitud
        });
        
        setSent(false);
      
      } catch (error) {
        setSent(false);
        console.error('Hubo un problema al enviar los datos a la API:', error);
      }
      
    };
    return {
      sent,
      handleSubmit,
    };
};

  
const usePutUsers = () => {
  const [updated, setUpdated] = useState(false);
  const { token } = useContext(TokenContext); // Usa el TokenContext para obtener el token

  const handleUpdate = async (userId, updatedData) => {
    // Verifica que userId y updatedData sean válidos
    if (!userId || !updatedData || typeof updatedData !== 'object') {
      console.error('userId o updatedData no son válidos');
      return;
    }

    setUpdated(true);



    try {
      await axios.put(`http://127.0.0.1:8000/users/${userId}/`, updatedData, {
        headers: { Authorization: `Bearer ${token}` } // Agrega el token al header de la solicitud
      });

      setUpdated(false);
    } catch (error) {
      setUpdated(false);
      console.error('Hubo un problema al actualizar los datos del video:', error);
    }
  };

  return {
    updated,
    handleUpdate,
  };
};
  
  


const useDeleteUsers = () => {
  const [deleted, setDeleted] = useState(false);
  const { token } = useContext(TokenContext); // Usa el TokenContext para obtener el token
  
  const handleDelete = async (userId) => {
    setDeleted(true);
    
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeleted(false);
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

export { useFetchUsers, useUsersById , useSendDataUsers, usePutUsers, useDeleteUsers };
