import { ReactElement } from "react";

type NestedProps = {
	layers: any[];
	children: ReactElement;
};

export const Nested = ({ layers, children }: NestedProps) => {
	let lastElement = children;
	layers.reverse().forEach((Element) => {
		lastElement = <Element next={lastElement} />;
	});
	return lastElement;
};
