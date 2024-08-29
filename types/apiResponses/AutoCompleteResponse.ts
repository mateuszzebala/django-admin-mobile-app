import { DjangoModelField } from "../DjangoModelField";

export type AutoCompleteResponse = {
  field: DjangoModelField;
  possible_values: { pk: any; __str__: string }[];
  queryError: boolean;
};
