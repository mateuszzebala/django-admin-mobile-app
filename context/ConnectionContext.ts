import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";

export const defaultConnectionContext = async () => {
  const connectionContext = await AsyncStorage.getItem("connectionContext");

  if (!connectionContext)
    return {
      current: null,
      connections: [],
    };
  else {
    return JSON.parse(connectionContext);
  }
};

export const ConnectionContext = createContext<any[]>([null, () => {}]);
