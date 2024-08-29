import { DjangoItem } from "../DjangoItem";
import { ItemResponse } from "./ItemResponse";

export type ItemsResponse = {
  length: number;
  limit: number;
  offset: number;
  queryError: boolean;
  items: DjangoItem[];
};
