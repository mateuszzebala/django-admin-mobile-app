export type LogsResponse = {
  logs: {
    action: string;
    action_time: string;
    change_message: any;
    model: {
      name: string;
      app_label: string;
    };
    user: any;
  }[];
};
