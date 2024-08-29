import {
  defaultConnectionContext,
  ConnectionContext,
} from "@/context/ConnectionContext";
import React from "react";
import { LayerProps } from "./Layers";

export const ContextLayer = ({ next }: LayerProps) => {
  const [connectionContext, setConnectionContext] = React.useState<any>(null);

  React.useEffect(() => {
    defaultConnectionContext().then((data) => {
      setConnectionContext(data);
    });
  }, []);

  if (!connectionContext) return <></>;

  return (
    <ConnectionContext.Provider
      value={[connectionContext, setConnectionContext]}
    >
      {next}
    </ConnectionContext.Provider>
  );
};
