import {
	defaultConnectionContext,
	ConnectionContext,
} from "@/context/ConnectionContext";
import React from "react";
import { LayerProps } from "./Layers";

export const ContextLayer = ({ next }: LayerProps) => {
	const [connectionContext, setConnectionContext] = React.useState(
		defaultConnectionContext
	);

	return (
		<ConnectionContext.Provider
			value={[connectionContext, setConnectionContext]}
		>
			{next}
		</ConnectionContext.Provider>
	);
};
