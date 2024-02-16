import { createContext } from "react";
import { useFetchReports, useReportsById, useSendDataReports, usePutReports, useDeleteReports } from "../Hooks/CrudReport";
import {useDisclosure} from "@nextui-org/react";


export const ReportsContext = createContext();


export const ReportsProvider = ({children}) => {
    

    //Get information from api/hook
    const [reports] = useFetchReports(`${import.meta.env.VITE_BACK_URL}reports/`);
    
    
    //Post info api
    const { sent, handleSubmit } =  useSendDataReports(); 

    const sendReportsData = async (data) => {
       console.log(data);
        await handleSubmit(data);
       
    };


    // Put info api
    const { updated, handleUpdate } = usePutReports();
    
    const updateReportsData = async (updatedData,usersId) => {
        await handleUpdate(usersId, updatedData);
        
        console.log("Actualizando reporte...");
    }


    //Delete info api
    const { deleted, handleDelete } = useDeleteReports ();
    
    const deleteUsersData = async (userId) => {
        await handleDelete(userId);
    }


    // Seach info api by id

    const { user,loading,error,fetchVideoById,} = useReportsById ()

    const fetchUserData = async (userId) => {
        
        await fetchVideoById(userId);
        

    }


    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const handleOpen = () => {
        console.log("hola");
        onOpen();
      }


    return (
        <ReportsContext.Provider value={{ 
            //GET
            reports, 
            //-----
            //Post
            sendReportsData , 
            sent, 
            //-----
            //Put
            updateReportsData,
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
        </ReportsContext.Provider>
        );
    };
    