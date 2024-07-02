import React from "react";
import { LayerProps } from "./Layers";
import useConnnection from "@/hooks/useConnnection";
import { router } from "expo-router";

export const AuthLayer = ({ next }: LayerProps) => {
	const connection = useConnnection();

	React.useEffect(() => {
		if (!connection.isConnected()) router.navigate("/");
	}, [connection]);

	return <>{connection.connectionContext && next}</>;
};
