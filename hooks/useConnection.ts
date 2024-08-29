import { ConnectionContext } from "@/context/ConnectionContext";
import axios from "axios";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Connection = {
  host?: string;
  username?: string;
  password?: string;
  user?: any;
};

export default () => {
  const [connectionContext, setConnectionContext] =
    React.useContext(ConnectionContext);

  React.useEffect(() => {
    AsyncStorage.setItem(
      "connectionContext",
      JSON.stringify(connectionContext)
    ).then(() => {});
  }, [connectionContext]);

  return {
    disconnectFromCurrent: () => {
      setConnectionContext((prev: any) => ({
        ...prev,
        connections: prev.connections.filter(
          (connection: any) =>
            !(
              connectionContext.current.host === connection.host &&
              connection.username === connectionContext.current.username
            )
        ),
      }));
    },
    current: connectionContext?.current,
    isConnected: () =>
      connectionContext &&
      connectionContext.connections &&
      connectionContext.connections.length > 0,
    connectionContext: connectionContext || null,
    setConnectionContext: setConnectionContext || (() => {}),
    addConnection: (connection: Connection) =>
      setConnectionContext((prev: any) => ({
        ...prev,
        connections: [...prev.connections, connection],
      })),
    setCurrent: (connection: Connection) =>
      setConnectionContext((prev: any) => ({ ...prev, current: connection })),
    removeConnection: (indexToRemove: number) =>
      setConnectionContext((prev: any) => ({
        ...prev,
        connections: prev.connections.filter(
          (connection: any, index: number) => index != indexToRemove
        ),
      })),
    fetch: (
      path: string[] | any[] = [],
      method: string = "GET",
      data: any = {},
      options: any = {},
      searchParams: { [index: string]: string } = {},
      headers: { [index: string]: string } = {}
    ) => {
      const pth = path.join("/");
      const url: URL = new URL(
        `${connectionContext?.current.host}/admin-api/${pth}${
          method == "GET" ? "" : "/"
        }`
      );

      Object.keys(searchParams).map((param) => {
        url.searchParams.set(param, searchParams[param]);
      });

      return axios({
        url: url.href,
        method: method.toUpperCase(),
        data: data,
        withCredentials: true,
        headers: {
          Cookie: `sessionid=${connectionContext?.current.sessionid}`,
          ...headers,
        },
        ...options,
      });
    },
  };
};
