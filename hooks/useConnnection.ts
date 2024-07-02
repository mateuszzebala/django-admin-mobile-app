import { ConnectionContext } from "@/context/ConnectionContext"
import React from "react"


type Connection = {
    host?: string,
    username?: string,
    password?: string,
    user?: any
}

export default () => {
    const [connectionContext, setConnectionContext] = React.useContext(ConnectionContext)

    return {
        disconnectFromCurrent: () => {
            setConnectionContext((prev: any) => ({...prev, connections: prev.connections.filter((connection: any) => !(connectionContext.current.host === connection.host && connection.username === connectionContext.current.username))}))
        },
        current: connectionContext?.current,
        isConnected: () => connectionContext.connections.length > 0,
        connectionContext,
        setConnectionContext,
        addConnection: (connection: Connection) => setConnectionContext((prev: any) => ({...prev, connections: [...prev.connections, connection]})),
        setCurrent: (connection: Connection) => setConnectionContext((prev: any) => ({...prev, current: connection})),
        removeConnection: (indexToRemove: number) => setConnectionContext((prev: any) => ({...prev, connections: prev.connections.filter((connection: any, index: number) => index != indexToRemove)}))
    }
}

