import { createContext } from "react";
import { useFetchUsers, useUsersById , useSendDataUsers, usePutUsers, useDeleteUsers } from "../Hooks/CrudUser";
import {useDisclosure} from "@nextui-org/react";


export const UsersContext = createContext();


export const UsersProvider = ({children}) => {
    

    //Get information from api/hook
    const [users] = useFetchUsers(`${import.meta.env.VITE_BACK_URL}users/`);
    
    
    //Post info api
    const { sent, handleSubmit } = useSendDataUsers(); 

    const sendUsersData = async (data) => {
       console.log(data);
        await handleSubmit(data);
       
    };


    // Put info api
    const { updated, handleUpdate } = usePutUsers();
    
    const updateUsersData = async (updatedData,usersId) => {
        await handleUpdate(usersId, updatedData);
    }


    //Delete info api
    const { deleted, handleDelete } = useDeleteUsers();
    
    const deleteUsersData = async (userId) => {
        await handleDelete(userId);
    }


    // Seach info api by id

    const { user,loading,error,fetchVideoById,} = useUsersById ()

    const fetchUserData = async (userId) => {
        
        await fetchVideoById(userId);
        

    }


    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const handleOpen = () => {
        console.log("hola");
        onOpen();
      }


    return (
        <UsersContext.Provider value={{ 
            //GET
            users, 
            //-----
            //Post
            sendUsersData, 
            sent, 
            //-----
            //Put
            updateUsersData,
            updated, 
            //-----
            //Delete
            deleteUsersData,
            deleted,
            //-----
            //-----
            //Modal
            isOpen,
            onClose,
            handleOpen,
            //-----
            //Get by id
            user,
            loading,
            error,
            fetchUserData,
            //-----
            }}>
                {children}
        </UsersContext.Provider>
        );
    };
    