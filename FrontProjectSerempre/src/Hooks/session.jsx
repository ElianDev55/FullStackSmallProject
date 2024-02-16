import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from 'sonner';

export const useSession = (setToken) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = `${import.meta.env.VITE_BACK_URL}login/`;

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(url, { email, password })
            .then(response => {
                if (response.data.access) { // Si el token de acceso está presente
                    setToken(response.data.access);
                    navigate('/Home');
                } 
                console.log(response.status);
            })
            .catch(response => {
                if (response.response.status == 401) {
                    toast.error('Credenciales incorrectas')
                }
                else {
                    toast.error('Error')
                }
            });
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit
    };
};