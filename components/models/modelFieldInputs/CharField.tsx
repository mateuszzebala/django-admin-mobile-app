import { CustomInput, Select } from "@/components/atoms";
import { FieldProps } from "./Field";

export const CharField = ({ fieldData, value, setValue }: FieldProps) => {
  if (fieldData?.choices) {
    return (
      <Select
        value={value}
        onChange={(val) => setValue(val)}
        multiple={false}
        items={Object.keys(fieldData.choices).reduce(
          (acc: any[], curr: any) => {
            acc.push({
              text: fieldData.choices ? fieldData.choices[curr] : curr,
              value: curr,
            });
            return acc;
          },
          []
        )}
      />
    );
  }

  return (
    <CustomInput
      value={value}
      onChange={(e) => {
        setValue(e.nativeEvent.text);
      }}
    />
  );
};
