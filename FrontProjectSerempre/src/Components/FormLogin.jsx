import { useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import { Card, CardHeader, CardBody, Divider, Image, Button } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { TokenContext } from '../Context/TokenContext'  ;
import { useSession } from '../Hooks/session';

export const FormLogin = () => {
    const history = useNavigate();
    const { setToken } = useContext(TokenContext);
    const { email, setEmail, password, setPassword, handleSubmit } = useSession(setToken, history);

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Card className="  w-[500px] h-[500px]  border-2">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">Inicio de sesion</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className="flex flex-col  gap-4 justify-center items-center mt-8 mb-16">
                    <Image
                        className='mb-10'
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="https://www.drupal.org/files/serempre-logomark-color%20%282%29.png"
                        width={40}
                    />
                    <form onSubmit={handleSubmit}>
                        <Input
                            isClearable
                            type="email"
                            label="Email"
                            variant="bordered"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            onClear={() => console.log("input cleared")}
                            className="w-96  mb-5"
                        />
                        <Input
                            color='default'
                            className='w-96'
                            label="Password"
                            value={password}
                            variant="bordered"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                        />
                        <Button type="submit" color="primary" className='mt-3'>
                            Login
                        </Button>
                    </form>
                </div>
            </CardBody>
            <Divider/>
        </Card>
    )
}