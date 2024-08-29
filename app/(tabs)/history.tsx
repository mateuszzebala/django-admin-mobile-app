import { actions } from "@/api/actions";
import { Typography, Flex } from "@/components/atoms";
import { RecentAction } from "@/components/molecules/RecentAction";
import { Colors } from "@/constants/Colors";
import useApi from "@/hooks/useAPI";
import useCounter from "@/hooks/useCounter";
import useLoading from "@/hooks/useLoading";
import { LogsResponse } from "@/types";
import React from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

export default function HistoryScreen() {
  const loading = useLoading(true);
  const [logs, setLogs] = React.useState<any>([]);
  const counter = useCounter();
  const api = useApi();

  React.useEffect(() => {
    loading.enable();

    api({
      action: actions.getLogs,
      callback: (data: LogsResponse) => {
        setLogs(data.logs);
        loading.disable();
      },
      error: () => {
        loading.disable();
      },
    });
  }, [counter.value]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[Colors.background]}
          progressBackgroundColor={Colors.django.primary}
          refreshing={loading.is}
          onRefresh={() => counter.add()}
        />
      }
    >
      <Flex column padding={10} gap={10}>
        {logs.map((log: any) => (
          <RecentAction
            key={log.action_time}
            when={new Date(log.action_time)}
            objectRepresentation={log.model.name}
            action={log.action}
          />
        ))}
        {logs.length === 0 && !loading.is && (
          <Typography style={{ textAlign: "center" }}>Empty history</Typography>
        )}
      </Flex>
    </ScrollView>
  );
}
