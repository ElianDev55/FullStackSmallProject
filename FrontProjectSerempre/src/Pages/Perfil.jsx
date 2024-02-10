import { useEffect, useState, useContext } from 'react';
import { TokenContext } from '../Context/TokenContext';
import { useDeleteUsers } from '../Hooks/CrudUser';
import { ModalUpdateUser } from '../Components/ModalUpdateUser';
import { ModalPostPerfil } from '../Components/ModalPostPerfil';



export const Perfil = () => {
   
const {handleDelete} = useDeleteUsers();


  const [user, setUser] = useState(null);
 
  const { token } = useContext(TokenContext);  // Accede al token desde el contexto
  console.log(token);

  useEffect(() => {
    fetch('http://localhost:8000/users/me', {  // Reemplaza esto con la URL de tu API
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }
      return response.json();
    })
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [token]);  // Agrega el token como dependencia del useEffect

  if (!user) {
    return <div>Cargando...</div>;
  }


 

  return (
    <div className="flex items-center justify-center h-screen bg-white">
    <div className="rounded-lg border text-card-foreground shadow-sm w-full max-w-lg bg-white dark:bg-gray-950">
      <div className="flex flex-col space-y-1.5 p-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-500 dark:text-blue-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h2 className="text-lg font-bold">Perfil</h2>
          </div>
          <ModalPostPerfil/>
        </div>
      </div>
      <div className="p-4">
        <div className="grid gap-1.5 text-sm">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div className="font-medium">Nombre: {user.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <div className="font-medium">Email: {user.email}   </div>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500 dark:text-gray-400">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <div className="font-medium">Puesto de trabajo: {user.jobtitle}  </div>
          </div>
        </div>
      </div>
      <div className="items-center flex justify-end p-4">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-700 h-10 px-4 py-2 mr-2" onClick={() => handleDelete(user.id)}>
          Eliminar
        </button>
        <ModalUpdateUser/>
      </div>
    </div>
  </div>
  );
};