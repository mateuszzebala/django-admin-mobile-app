import { Nested } from "@/components/atoms/Nested";
import { ReactElement } from "react";
import { ContextLayer } from "./ContextLayer";
import { AuthLayer } from "./AuthLayer";
import { FontLayer } from "./FontLayer";

const layers: any[] = [ContextLayer, AuthLayer, FontLayer];

export type LayerProps = {
	next: any;
};

type LayersProps = {
	children: ReactElement;
};

export const Layers = ({ children }: LayersProps) => {
	return <Nested layers={layers}>{children}</Nested>;
};
