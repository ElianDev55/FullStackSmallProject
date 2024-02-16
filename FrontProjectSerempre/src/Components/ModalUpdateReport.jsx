import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { ReportsContext } from "../Context/ReportContext";
import {Toaster, toast} from 'sonner';
import { FaPlus } from "react-icons/fa";


export const ModalUpdateReport = (idreport) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { updateReportsData } = useContext(ReportsContext);
    
    const [formData, setFormData] = useState({
        "title": "",
        "edit": null
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
      console.log(data);
      await updateReportsData(data, idreport.id);
    };
 

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
                  <ModalHeader className="flex flex-col gap-1">Actualizar perfil</ModalHeader>
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