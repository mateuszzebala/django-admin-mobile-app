import { DateTimeInput } from "@/components/atoms";
import { FieldProps } from "./Field";

export const DateTimeField = ({ fieldData, value, setValue }: FieldProps) => {
  return <DateTimeInput time date value={value} setValue={setValue} />;
};
