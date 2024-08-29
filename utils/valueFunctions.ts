import hashmd5 from "md5";
import hashsha256 from "sha256";
import { getDateIsoString, getTimeIsoString } from "./dateUtils";
import { DjangoModelField } from "@/types";

export const md5 = (value: any, field: DjangoModelField): string => {
  return hashmd5(value + "");
};
export const sha256 = (value: any, field: DjangoModelField): string => {
  return hashsha256(value + "");
};

export const now = (value: any, field: DjangoModelField): string => {
  const now = new Date();

  if (field.type == "DateField") return getDateIsoString(now);
  if (field.type == "TimeField") return getTimeIsoString(now);
  return now.toJSON();
};

export const pbkdf2_sha256 = (value: any, field: DjangoModelField) => {
  return "To Implement";
};

export const noneFunction = {
  name: "none",
  fnc: (value: any, field: DjangoModelField): any => {
    return value;
  },
  forFields: [],
  displayInput: true,
};

export const functions = [
  {
    name: "pbkdf2_sha256",
    fnc: pbkdf2_sha256,
    forFields: ["TextField", "CharField", "EmailField"],
    displayInput: true,
  },
  {
    name: "md5",
    fnc: md5,
    forFields: ["TextField", "CharField", "EmailField"],
    displayInput: true,
  },
  {
    name: "sha256",
    fnc: sha256,
    forFields: ["TextField", "CharField", "EmailField"],
    displayInput: true,
  },
  {
    name: "now",
    fnc: now,
    forFields: ["DateTimeField", "TimeField", "DateField"],
    displayInput: false,
  },
];
