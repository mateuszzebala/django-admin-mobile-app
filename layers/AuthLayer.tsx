import { ConnectionContext } from "@/context/ConnectionContext";
import React from "react";
import { LayerProps } from "./Layers";
import { router } from "expo-router";

export const AuthLayer = ({ next }: LayerProps) => {
	const [connectionContext] = React.useContext(ConnectionContext);

	React.useEffect(() => {
		if (!connectionContext.isConnected) router.navigate("/connect");
	}, []);

	return <>{next}</>;
};
