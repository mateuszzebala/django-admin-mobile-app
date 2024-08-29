import { ModelFieldNotEditable } from "./ModelFieldNotEditable";
import { ModelField } from "./ModelField";
import React from "react";
import { Flex } from "../atoms";
import { DjangoItem, DjangoModel } from "@/types";

type ModelFormProps = {
  enableEdit?: boolean;
  values: { [index: string]: any };
  itemData?: DjangoItem;
  modelData: DjangoModel;
  setFieldValue: (field: string, value: any) => void;
  functions: { [index: string]: any };
  setFieldFunction: (field: string, fnc: any) => void;
};

export const ModelForm = ({
  values,
  modelData,
  itemData,
  functions,
  enableEdit = true,
  setFieldValue = () => {},
  setFieldFunction = () => {},
}: ModelFormProps) => {
  return (
    <Flex column gap={25}>
      {modelData.fields.map((field) => {
        const Field =
          field.auto_created || !enableEdit
            ? ModelFieldNotEditable
            : ModelField;

        return (
          <Field
            key={field.name}
            description={field.help_text}
            type={field.type}
            name={field.name}
            itemData={itemData}
            fieldData={field}
            modelData={modelData}
            value={values[field.name]}
            setValue={(value) => {
              setFieldValue(field.name, value);
            }}
            func={functions[field.name]}
            setFunction={(fnc: any) => {
              setFieldFunction(field.name, fnc);
            }}
          />
        );
      })}
    </Flex>
  );
};
