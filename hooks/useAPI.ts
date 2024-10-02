import useConnnection from "./useConnection";
import {Axios, AxiosError} from "axios";

type ActionProps = {
  action: (...args: any[]) => Promise<any>;
  args?: any;
  callback: (data: any) => void;
  error?: () => void;
};

export default () => {
  const connection = useConnnection();

  return ({ action, args = [], callback, error }: ActionProps) => {
    try {
      action(connection, ...args).then((data) => {
        callback(data);
      }).catch((err: AxiosError) => {
        error && error()
      });
    } catch {
      alert("API ERROR");
      error && error();
    }
  };
};
