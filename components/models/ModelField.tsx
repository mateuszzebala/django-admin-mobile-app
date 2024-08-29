import { CharField } from "./modelFieldInputs/CharField";
import { IntegerField } from "./modelFieldInputs/IntegerField";
import { FloatField } from "./modelFieldInputs/FloatField";
import { BooleanField } from "./modelFieldInputs/BooleanField";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DateTimeField } from "./modelFieldInputs/DateTimeField";
import { DateField } from "./modelFieldInputs/DateField";
import { TimeField } from "./modelFieldInputs/TimeField";
import { TextField } from "./modelFieldInputs/TextField";
import { ColorField } from "./modelFieldInputs/ColorField";
import { JSONField } from "./modelFieldInputs/JSONField";
import React from "react";
import { FileField } from "./modelFieldInputs/FileField";
import { ImageField } from "./modelFieldInputs/ImageField";
import { FieldProps } from "./modelFieldInputs/Field";
import { ManyToManyField } from "./modelFieldInputs/ManyToManyField";
import { OneToOneField } from "./modelFieldInputs/OneToOneField";
import { ForeignKey } from "./modelFieldInputs/ForeignKey";
import { Text } from "react-native";
import { useModal } from "@/context/ModelContext";
import { FieldPropertiesModalForm } from "../modalForms/FieldPropertiesModalForm";
import { Flex, Typography } from "../atoms";

const fields = {
  CharField,
  IntegerField,
  FloatField,
  BooleanField,
  DateTimeField,
  DateField,
  TimeField,
  TextField,
  ColorField,
  JSONField,
  FileField,
  ImageField,
  ManyToManyField,
  OneToOneField,
  ForeignKey,
  DecimalField: FloatField,
  AutoField: (_: any) => <></>,
  BigAutoField: (_: any) => <></>,
};

export const ModelField = ({
  type,
  name = "",
  description = "",
  fieldData,
  modelData,
  itemData,
  func,
  value: initValue,
  setFunction,
  setValue: setFieldValue,
}: FieldProps) => {
  if (!type) return <></>;

  const [config, setConfig] = React.useState({
    fnc: func,
    nulled: false,
  });

  const [value, setValue] = React.useState<any>(initValue);

  React.useEffect(() => {
    if (initValue != value) setValue(initValue);
  }, [initValue]);

  React.useEffect(() => {
    setConfig((prev) => ({ ...prev, fnc: func }));
  }, [func.name]);

  React.useEffect(() => {
    setFunction && setFunction(config.fnc);
  }, [config.fnc.name]);

  const modal = useModal();

  React.useEffect(() => {
    if (fieldData?.relation.is_relation) {
      if (fieldData.type == "ManyToManyField") {
        if (initValue.items != value.items) setFieldValue(value);
      } else {
        if (initValue.pk != value.pk) setFieldValue(value);
      }
    } else {
      if (initValue != value) setFieldValue(value);
    }
  }, [value]);

  const FieldInput = fields[type] || CharField;

  return (
    <Flex column>
      <TouchableOpacity
        onPress={() =>
          modal.create({
            component: FieldPropertiesModalForm,
            props: {
              fieldData,
              modelData,
              config,
              setConfig,
            },
          })
        }
      >
        <Typography fontWeight={"bold"} fontSize={17}>
          {name}
        </Typography>
      </TouchableOpacity>
      <Typography fontSize={12}>{type}</Typography>
      {config.fnc.name != "none" && !config.nulled && (
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {config.fnc.name}()
        </Text>
      )}
      {config.nulled ? (
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Null</Text>
      ) : (
        config.fnc.displayInput && (
          <FieldInput
            fieldData={fieldData}
            value={value}
            setValue={setValue}
            itemData={itemData}
            modelData={modelData}
          />
        )
      )}
      {description && <Typography fontSize={12}>{description}</Typography>}
    </Flex>
  );
};
