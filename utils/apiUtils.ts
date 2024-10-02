import { DjangoModel, DjangoModelFieldType } from "@/types";
import {
  convertStringToDate,
  getDateIsoString,
  getTimeIsoString,
} from "./dateUtils";

const getFormDataValue = (type: DjangoModelFieldType, value: any) => {
  if (type == "CharField") return value + "";
  else if (type == "TextField") return value + "";
  else if (type == "BooleanField") return value === null ? null : value + "";
  else if (type == "JSONField") return value + "";
  else if (type == "FloatField") return value;
  else if (type == "IntegerField") return value;
  else if (type == "ManyToManyField")
    return value ? (value.items ? value.items.join(",") : "") : "";
  else if (type == "OneToOneField") return value.pk || "";
  else if (type == "ForeignKey") return value.pk || "";
  else if (type == "FileField" || type == "ImageField") {
    return value.changed ? value : "";
  } else if (type == "DateField")
    return getDateIsoString(convertStringToDate(value));
  else if (type == "TimeField")
    return getTimeIsoString(convertStringToDate(value));
  else if (type == "DateTimeField") return value;
  else if (type == "DecimalField") return value;
  else if (type.includes("AutoField")) return "";
  return value;
};

export const convertIntoFormData = (
  data: { [key: string]: any },
  modelData: DjangoModel,
  functions: { [index: string]: any }
) => {
  return modelData.fields
    .filter((field) => !field.auto_created)
    .reduce((acc: FormData, field) => {
      const currentFunction = functions[field.name];
      acc.append(
        field.name,
        getFormDataValue(
          field.type,
          currentFunction.fnc(data[field.name], field)
        )
      );
      return acc;
    }, new FormData());
};
