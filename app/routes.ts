export const ROUTES = {
  CONNECT: () => `/connect`,
  CONNECTIONS: () => `/connections`,
  CONNECTION: () => `/connection`,
  MODELS: () => `/models`,
  HISTORY: () => `/history`,
  CREATE: (app: string, modelName: string) =>
    `/model/create?app=${app}&modelName=${modelName}`,
  SEARCH: (app: string, modelName: string) =>
    `/model/search?app=${app}&modelName=${modelName}`,
  SEARCH_HELP: () => `/model/searchHelp`,
  ITEM: (app: string, modelName: string, pk: any) =>
    `/modelItem/item?app=${app}&modelName=${modelName}&pk=${pk}`,
  HELP: () => `/help`,
  INDEX: () => `/`,
  DONATE: () => `/donate`,
};
