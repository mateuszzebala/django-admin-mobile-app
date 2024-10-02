import axios from "axios";

export const getCsrfToken = async (host: string) => {
  const response = await axios.get(`${host}/admin-api/csrf_token/`);
  return response.data.csrftoken;
};

export const createFormData = (obj: any): FormData => {
  const formData = new FormData();

  Object.keys(obj).map((key) => {
    formData.append(key, obj[key]);
  });

  return formData;
};

export const tryToConnect = async (
  host: string,
  username: string,
  password: string
) => {
  // const token = await getCsrfToken(host)
  return axios.post(
    `${host}/admin-api/signin`,
    createFormData({ username, password }),
    {
      withCredentials: true,
      headers: {
        // "X-CSRFToken": await getCsrfToken(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const buildValidHost = (host: string): string => {
  let validHost = host;
  if (!host.startsWith("http")) {
    validHost = `https://${host}`;
  }
  while (validHost.endsWith("/")) {
    validHost = validHost.slice(0, validHost.length - 1);
  }
  return validHost;
};
