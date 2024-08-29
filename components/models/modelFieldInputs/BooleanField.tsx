import { Switch } from "@/components/atoms";
import { FieldProps } from "./Field";
import React from "react";

export const BooleanField = ({ value, setValue }: FieldProps) => {
  return <Switch on={value} setOn={setValue} />;
};
