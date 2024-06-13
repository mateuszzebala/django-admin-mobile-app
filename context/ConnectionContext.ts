import { createContext } from "react";

export const defaultConnectionContext = {
    isConnected: true,
    current: {
        username: 'mateuszzebala',
        firstName: 'Mateusz',
        lastName: 'Zębala',
        email: 'mateusz.zebala.pl@gmail.com',
        host: 'https://192.168.100.55:5456'
    }
}

export const ConnectionContext = createContext<any[]>([null, () => {}])

