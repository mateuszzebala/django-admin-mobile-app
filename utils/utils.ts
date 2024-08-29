import { DjangoItem, DjangoModel, DjangoModelField } from "@/types";
import { humanDateString } from "./dateUtils";

export const range = (
  arg1: number | null = null,
  arg2: number | null = null,
  arg3: number | null = null
): number[] => {
  const list: number[] = [];

  if (arg1 != null && arg2 != null && arg3 != null) {
    for (let i = arg1; i < arg2; i += arg3) list.push(i);
  } else if (arg1 != null && arg2 != null) {
    for (let i = arg1; i < arg2; i += 1) list.push(i);
  } else if (arg1 != null) {
    for (let i = 0; i < arg1; i += 1) list.push(i);
  }

  return list;
};

export const randInt = (min: number = 0, max: number = 100): number => {
  return Math.round(Math.random() * max + min);
};

export const randChoice = (items: any[]): any => {
  const max = items.length;
  if (max == 0) throw new Error("Length of array should be more than 0!");
  const index = randInt(0, max);
  return items[index];
};

export const generateRandomId = (length: number = 20): string => {
  const chars = "ABCDEFGHIJKLMNPQRSTUWXYZabcdefghijklmnopqrstuwxyz1234567890";
  let str: string = "";
  range(0, length).forEach(() => {
    str += randChoice([...chars]);
  });
  return str;
};

export const getItemProp = (item: any, prop: string) => {
  return item[prop];
};

export const itemPropToString = (value: any, type: string): string => {
  return type;
};

export const stringRepresentationOfValue = (
  value: any,
  type: string
): string => {
  if (value === null) return "null";

  if (type == "BigAutoField") return value.toString();
  if (type == "AutoField") return value.toString();
  if (type == "CharField") return value.toString();
  if (type == "IntegerField") return value.toString();
  if (type == "FloatField") return value.toString();
  if (type == "DecimalField") return value.toString();
  if (type == "BooleanField")
    return value === null ? "null" : value ? "True" : "False";
  if (type == "DateTimeField")
    return value ? humanDateString.datetime(value) : value;
  if (type == "DateField") return value ? humanDateString.date(value) : value;
  if (type == "TimeField") return value ? humanDateString.time(value) : value;
  if (type == "ManyToManyField")
    return value.items.length ? value.items.join(", ") : "Empty";

  return "";
};

export const tableFieldView = (
  model: DjangoModel,
  rowData: DjangoItem,
  header: string
): string | undefined => {
  if (header == "__str__") return rowData.__str__.toString();

  const field = model.fields.find(
    (field: DjangoModelField) => field.name == header
  );

  if (field) {
    return stringRepresentationOfValue(rowData.fields[header], field.type);
  } else {
    return "# Error";
  }
};
