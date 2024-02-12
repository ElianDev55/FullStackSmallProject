
import {LayoutFormLogin} from '../Layouts/LayoutFormLogin';
import { FormLogin } from '../components/FormLogin';
import { Toaster, toast } from 'sonner';

export const Login = () => {
    return (
        <LayoutFormLogin>
            <Toaster position="top-center" expand={false}  richColors />
            <FormLogin />
        </LayoutFormLogin>
    );
};