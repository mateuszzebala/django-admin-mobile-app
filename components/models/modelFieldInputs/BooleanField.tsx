import { Switch } from "@/components/atoms/Switch";
import { FieldProps } from "./Field";
import { SwitchWithNull } from "@/components/atoms/SwitchWithNull";
import React from "react";

export const BooleanField = ({ fieldData }: FieldProps) => {
	const [val, setVal] = React.useState(false);

	if (fieldData.nullable) {
		return <SwitchWithNull on={val} setOn={setVal} />;
	}
	return <Switch on={val} setOn={setVal} />;
};
