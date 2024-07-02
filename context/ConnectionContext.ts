import { createContext } from "react";

export const defaultConnectionContext = {
    current: null,
    connections: []
}

export const ConnectionContext = createContext<any[]>([null, () => {}])

