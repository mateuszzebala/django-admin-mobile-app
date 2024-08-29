import { DjangoApp } from "./DjangoApp";
import { DjangoModelField } from "./DjangoModelField";
import { DjangoPermissionModel } from "./DjangoPermissionModel";

export type DjangoModel = {
  model_name: string;
  app: DjangoApp;
  is_registered: boolean;
  list_display: string[];
  fields: DjangoModelField[];
  permissions: DjangoPermissionModel;
  actions: string[][];
};
