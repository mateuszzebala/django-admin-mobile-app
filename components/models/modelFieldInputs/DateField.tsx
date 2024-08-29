import { DateTimeInput } from "@/components/atoms";
import { FieldProps } from "./Field";

export const DateField = ({ value, setValue }: FieldProps) => {
  return <DateTimeInput date value={value} setValue={setValue} />;
};
