import { IntegerInput } from "@/components/atoms";
import { FieldProps } from "./Field";

export const IntegerField = ({ value, setValue }: FieldProps) => {
  return <IntegerInput value={value} setValue={setValue} />;
};
