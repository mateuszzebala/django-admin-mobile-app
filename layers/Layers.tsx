import { Nested } from "@/components/atoms";
import { ReactElement } from "react";
import { ContextLayer } from "./ContextLayer";
import { FontLayer } from "./FontLayer";
import { ModalLayer } from "./ModalLayer";

const layers: any[] = [ContextLayer, FontLayer, ModalLayer];

export type LayerProps = {
  next: any;
};

type LayersProps = {
  children: any;
};

export const Layers = ({ children }: LayersProps) => {
  return <Nested layers={layers}>{children}</Nested>;
};
