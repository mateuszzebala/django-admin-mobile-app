import { Nested } from "@/components/atoms/Nested";
import { ReactElement } from "react";
import { ContextLayer } from "./ContextLayer";
import { AuthLayer } from "./AuthLayer";
import { FontLayer } from "./FontLayer";
import { FloatingButtonLayer } from "./FloatingButtonLayer";

const layers: any[] = [ContextLayer, AuthLayer, FontLayer, FloatingButtonLayer];

export type LayerProps = {
	next: any;
};

type LayersProps = {
	children: ReactElement;
};

export const Layers = ({ children }: LayersProps) => {
	return <Nested layers={layers}>{children}</Nested>;
};
