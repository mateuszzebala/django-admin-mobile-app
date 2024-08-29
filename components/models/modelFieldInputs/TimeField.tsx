import { DateTimeInput } from "@/components/atoms";
import { FieldProps } from "./Field";

export const TimeField = ({ fieldData, value, setValue }: FieldProps) => {
  return <DateTimeInput time value={value} setValue={setValue} />;
};
