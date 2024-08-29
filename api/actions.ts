import {
  AutoCompleteResponse,
  CreateEditItemResponse,
  ItemResponse,
  ItemsResponse,
  LogsResponse,
  ModelResponse,
  ModelsResponse,
} from "@/types";
import { createFormData } from "./functions";

const getModels = async (connection: any) => {
  const data: ModelsResponse = (await connection.fetch([], "GET")).data;

  return data;
};

const getModel = async (connection: any, app: string, modelName: string) => {
  const data: ModelResponse = (await connection.fetch([app, modelName], "GET"))
    .data;

  return data;
};

const getItems = async (
  connection: any,
  app: string,
  modelName: string,
  searchParams: any = {}
) => {
  const data: ItemsResponse = (
    await connection.fetch(
      [app, modelName, "items"],
      "GET",
      {},
      {},
      searchParams
    )
  ).data;

  return data;
};

const getItem = async (
  connection: any,
  app: string,
  modelName: string,
  pk: any
) => {
  const data: ItemResponse = (
    await connection.fetch([app, modelName, pk], "GET")
  ).data;

  return data;
};

const getAutoComplete = async (
  connection: any,
  app: string,
  modelName: string,
  pk: any,
  fieldName: string,
  searchParams: any = {}
) => {
  const data: AutoCompleteResponse = (
    await connection.fetch(
      [app, modelName, ...(pk ? [pk] : []), fieldName, "autocomplete"],
      "GET",
      {},
      {},
      searchParams
    )
  ).data;

  return data;
};

const getLogs = async (connection: any) => {
  const data: LogsResponse = (await connection.fetch(["logs"], "GET")).data;

  return data;
};

const createItem = async (
  connection: any,
  app: string,
  modelName: string,
  itemData: FormData
) => {
  const data: CreateEditItemResponse = (
    await connection.fetch(
      [app, modelName],
      "POST",
      itemData,
      {},
      {},
      { "Content-Type": "multipart/form-data" }
    )
  ).data;
  return data;
};

const putItem = async (
  connection: any,
  app: string,
  modelName: string,
  pk: any,
  itemData: FormData
) => {
  const data: CreateEditItemResponse = (
    await connection.fetch(
      [app, modelName, pk],
      "PUT",
      itemData,
      {},
      {},
      { "Content-Type": "multipart/form-data" }
    )
  ).data;
  return data;
};

const deleteItems = async (
  connection: any,
  app: string,
  modelName: string,
  keys: string
) => {
  const data = (
    await connection.fetch(
      [app, modelName, "items"],
      "DELETE",
      {},
      {},
      {
        keys,
      }
    )
  ).data;
  return data;
};

const makeAnAction = async (
  connection: any,
  app: string,
  modelName: string,
  actionName: string,
  keys: string
) => {
  const data = (
    await connection.fetch(
      [app, modelName, "action", actionName],
      "POST",
      createFormData({
        keys: keys,
      }),
      {},
      {},
      { "Content-Type": "multipart/form-data" }
    )
  ).data;
  return data;
};

const getInfo = async (connection: any) => {
  const data = (await connection.fetch(["info"], "GET")).data;
  return data;
};

export const actions = {
  getAutoComplete,
  getModel,
  getModels,
  getLogs,
  getItems,
  getItem,
  putItem,
  createItem,
  makeAnAction,
  deleteItems,
  getInfo,
};
