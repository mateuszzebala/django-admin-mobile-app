import {
  DjangoItem,
  DjangoModel,
  DjangoModelField,
  DjangoModelFieldType,
} from "@/types";

export type FieldProps = {
  type?: DjangoModelFieldType;
  description?: string;
  modelData?: DjangoModel;
  itemData?: DjangoItem;
  fieldData: DjangoModelField;
  func?: any;
  setFunction?: (fnc: any) => void;
  setValue: (value: any) => void;
  value?: any;
  name?: string;
};
