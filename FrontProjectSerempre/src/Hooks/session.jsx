import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useSession = (setToken) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/login', { email, password })
            .then(response => {
                setToken(response.data.token);
                navigate('/another-view');
            })
            .catch(error => {
                console.error(error);
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