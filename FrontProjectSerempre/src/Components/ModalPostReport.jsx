import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useContext, useState, useEffect } from "react";
import { ReportsContext} from "../Context/ReportContext";
import {Toaster, toast} from 'sonner';
import { FaPlus } from "react-icons/fa";
import { TokenContext } from '../Context/TokenContext';

export const ModalPostReport = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { token } = useContext(TokenContext);
    const { sendReportsData} = useContext(ReportsContext);
    const url = `${import.meta.env.VITE_BACK_URL}auth/me`;
    const [user, setUser] = useState(null);
    
    const [formData, setFormData] = useState({
        "title": "",
        "edit": null,
        "id_user": user ? user.id : null // Cambia userId a id_user
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, edit: e.target.files[0] });
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData();
      data.append('title', formData.title);
      data.append('edit', formData.edit);
      data.append('id_user', formData.id_user); // Cambia userId a id_user al enviar los datos del formulario
      await sendReportsData(data);
    };

    useEffect(() => {
      fetch(url, {  
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
        toast.success('Bienvenido a tu perfil!')
        setUser(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, [token]);

    useEffect(() => {
        setFormData(prevState => ({ ...prevState, id_user: user ? user.id : null })); // Actualiza id_user en formData cuando user cambie
    }, [user]);

    if (!user) {
      return <div>Cargando...</div>;
    }

    console.log(user.name);

    return (
        <>
          <Toaster position="top-center" expand={false}  richColors />
          <Button color="" onPress={onOpen}>
          <FaPlus />
          </Button>
        
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Agregar perfil</ModalHeader>
                  <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    
                    <form onSubmit={handleFormSubmit}>
                      <Input
                        isRequired
                        type="text"
                        label="Titulo"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="max-w-xs"
                      />
                                                    
                      <input
                        type="file"
                        label="Archivo"
                        name="edit"
                        onChange={handleFileChange}
                        className="max-w-xs"
                      />
                                                    
                    
                      <Button color="primary" type="submit">
                        Action
                      </Button>
                    </form>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
};