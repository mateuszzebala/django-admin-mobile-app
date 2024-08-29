import { FieldProps } from "./Field";
import { FileInput } from "@/components/atoms";

export const FileField = ({ value, setValue }: FieldProps) => {
  return (
    <FileInput
      value={value}
      setValue={(val: any) => setValue({ ...val, value: true, changed: true })}
    />
  );
};
