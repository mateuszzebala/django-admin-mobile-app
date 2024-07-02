import { Nested } from "@/components/atoms/Nested";
import { ReactElement } from "react";
import { ContextLayer } from "./ContextLayer";
import { AuthLayer } from "./AuthLayer";
import { FontLayer } from "./FontLayer";
import { ModalLayer } from "./ModalLayer";

const layers: any[] = [AuthLayer, ContextLayer, FontLayer, ModalLayer];

export type LayerProps = {
	next: any;
};

type LayersProps = {
	children: ReactElement;
};

export const Layers = ({ children }: LayersProps) => {
	return <Nested layers={layers}>{children}</Nested>;
};
