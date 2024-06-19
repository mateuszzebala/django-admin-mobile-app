import React from "react";

export const defaultFloatingButtonContext = {
    show: false,
    children: '',
    props: {}
}

export const FloatingButtonContext = React.createContext<any>(defaultFloatingButtonContext)


