import  {useContext,useState,useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { TokenContext } from '../Context/TokenContext';
import { UsersContext } from '../Context/UserContext';
import {Toaster} from 'sonner';

export  const ModalUpdateUser = () => {
    
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [user, setUser] = useState(null);
  const { token } = useContext(TokenContext);  // Accede al token desde el contexto
  const { updateUsersData  } = useContext(UsersContext);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobtitle, setJobtitle] = useState("");


  const [formData, setFormData] = useState({
    name: name,
    email: email,
    password: password,
    jobtitle: jobtitle,
  });



const handleFormSubmit = async (event) => {
  event.preventDefault();
  await updateUsersData ({
    name: name,
    email: email,
    password: password,
    jobtitle: jobtitle,
    is_active: true,  // Agregado
    is_staff: false,  // Agregado
  }, user.id);
};
  


const url = `${import.meta.env.VITE_BACK_URL}auth/me`;


  useEffect(() => {
    fetch(url, {  // Reemplaza esto con la URL de tu API
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
      setName(data.name);
      setEmail(data.email);
      setPassword("");
      setJobtitle(data.jobtitle);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [token]);  // Agrega el token como dependencia del useEffect

  if (!user) {
    return <div>Cargando...</div>;
  }

     




    return (

        <>
        <Toaster position="top-center" expand={false}  richColors />
          <Button color="primary" onPress={onOpen}>Actualizar</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Actualizar perfil</ModalHeader>
                  
                <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      
                    <form onSubmit={handleFormSubmit} >
                    <Input
                        isRequired
                        type="text"
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="max-w-xs"
                    />
                                                    
                    <Input
                        isRequired
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="max-w-xs"
                    />
                                                    
                    <Input
                        isRequired
                        type="text"
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="max-w-xs"
                    />
                                                    
                    <Input
                        isRequired
                        type="text"
                        label="Cargo"
                        value={jobtitle}
                        onChange={(e) => setJobtitle(e.target.value)}
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
    
}

