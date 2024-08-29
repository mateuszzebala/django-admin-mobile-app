import React from "react";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { AppModelsGroup } from "@/components/models/AppModelsGroup";
import { Colors } from "@/constants/Colors";
import useConnection from "@/hooks/useConnection";
import useCounter from "@/hooks/useCounter";
import useLoading from "@/hooks/useLoading";
import { actions } from "@/api/actions";
import useApi from "@/hooks/useAPI";
import { Flex, Typography } from "@/components/atoms";
import { DjangoApp, DjangoModel, ModelsResponse } from "@/types";

export default function ModelsScreen() {
  const connection = useConnection();
  const loading = useLoading(true);
  const refresh = useCounter();
  const api = useApi();

  const [modelsData, setModelsData] = React.useState({
    models: [] as DjangoModel[],
    appModels: [] as [DjangoApp, DjangoModel[]][],
    error: null as string | null,
  });

  const { models, appModels, error } = modelsData;

  React.useEffect(() => {
    const fetchData = () => {
      loading.enable();
      api({
        action: actions.getModels,
        callback: (data: ModelsResponse) => {
          setModelsData((prev) => ({
            ...prev,
            models: data.models,
          }));
          loading.disable();
        },
        error: () => {
          setModelsData((prev) => ({
            ...prev,
            error: "Failed to fetch models",
          }));
          loading.disable();
        },
      });
    };

    fetchData();
  }, [refresh.value]);

  React.useEffect(() => {
    const groupedModels = models.reduce(
      (acc: Map<string, [DjangoApp, DjangoModel[]]>, model: DjangoModel) => {
        const appName = model.app.name;
        if (!acc.has(appName)) {
          acc.set(appName, [model.app, [model]]);
        } else {
          acc.get(appName)?.[1].push(model);
        }
        return acc;
      },
      new Map()
    );

    setModelsData((prev) => ({
      ...prev,
      appModels: Array.from(groupedModels.values()),
    }));
  }, [models]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[Colors.background]}
          progressBackgroundColor={Colors.django.primary}
          refreshing={loading.is}
          onRefresh={() => refresh.add()}
        />
      }
    >
      <Flex column padding={20} gap={20}>
        <Typography
          fontSize={20}
          fontWeight="bold"
          color={Colors.primary + "ff"}
        >
          Site administration - {connection.current?.name ?? "N/A"}
        </Typography>
        <Typography
          fontSize={15}
          fontWeight="bold"
          color={Colors.primary + "88"}
        >
          {connection.current?.host ?? "N/A"}
        </Typography>
        {!loading.is && !error && appModels.length > 0 ? (
          appModels
            .sort((a, b) => a[0].label.localeCompare(b[0].label))
            .map(([app, models], index) => (
              <AppModelsGroup key={index} app={app} models={models} />
            ))
        ) : (
          <Typography>
            {loading.is ? "Loading..." : error ?? "There is no model!"}
          </Typography>
        )}
      </Flex>
    </ScrollView>
  );
}
