import { DjangoModelFieldType } from "./DjangoModelFieldType";
import { DjangoRelation } from "./DjangoRelation";

export type DjangoModelField = {
  name: string;
  type: DjangoModelFieldType;
  relation: DjangoRelation;
  max_length?: number;
  choices?: { [index: string]: string }[];
  null: boolean;
  blank: boolean;
  auto_created: boolean;
  in_list_display: boolean;
  decimal_places?: number;
  max_digits?: number;
  unique: boolean;
  help_text: string;
  default: any;
  auto_now_add: boolean;
};
