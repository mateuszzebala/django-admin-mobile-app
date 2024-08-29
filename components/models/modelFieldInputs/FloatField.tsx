import { FloatInput } from "@/components/atoms";
import { FieldProps } from "./Field";

export const FloatField = ({ value, setValue }: FieldProps) => {
  return <FloatInput value={value} setValue={setValue} />;
};
