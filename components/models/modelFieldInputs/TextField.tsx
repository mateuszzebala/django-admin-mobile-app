import { Textarea } from "@/components/atoms";
import { FieldProps } from "./Field";

export const TextField = ({ fieldData, value, setValue }: FieldProps) => {
  return (
    <Textarea value={value} onChange={(e) => setValue(e.nativeEvent.text)} />
  );
};
