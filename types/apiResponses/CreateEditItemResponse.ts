import { DjangoItem } from "../DjangoItem";

export type CreateEditItemResponse = {
  item: DjangoItem;
  errors: any[];
};
