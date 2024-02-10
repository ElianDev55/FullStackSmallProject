import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useContext, useState } from "react";
import { UsersContext } from "../Context/UserContext";

export const ModalPostPerfil = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { sendUsersData } = useContext(UsersContext);
    
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      jobtitle: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      await sendUsersData(formData);
    };

    return (
        <>
          <Button 
            onPress={onOpen} 
            className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <FaRegSquarePlus />
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
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="max-w-xs"
                      />
                                                    
                      <Input
                        isRequired
                        type="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="max-w-xs"
                      />
                                                    
                      <Input
                        isRequired
                        type="text"
                        label="Contraseña"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="max-w-xs"
                      />
                                                    
                      <Input
                        isRequired
                        type="text"
                        label="Cargo"
                        name="jobtitle"
                        value={formData.jobtitle}
                        onChange={handleChange}
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