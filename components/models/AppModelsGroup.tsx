import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Rotateable, Flex } from "../atoms";
import React from "react";
import Collapsible from "react-native-collapsible";
import { Easing } from "react-native-reanimated";
import { router } from "expo-router";
import { ROUTES } from "@/app/routes";
import { DjangoApp, DjangoModel } from "@/types";

type AppModelsGroupProps = {
  app: DjangoApp;
  models: DjangoModel[];
};

export const AppModelsGroup = ({ app, models }: AppModelsGroupProps) => {
  const [open, setOpen] = React.useState(true);

  if (!models.some((model) => model.permissions.view)) return <></>;

  return (
    <Flex column>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.appName}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={styles.appNameText}>{app.verbose_name}</Text>
        <Rotateable rotate={open ? 180 : 0} duration={100}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={30}
            color={Colors.background}
          />
        </Rotateable>
      </TouchableOpacity>
      <Collapsible duration={200} easing={Easing.sin} collapsed={!open}>
        <Flex column style={styles.modelsWrapper}>
          {models
            .filter((model: DjangoModel) => model.permissions.view)
            .map((model: DjangoModel) => (
              <TouchableOpacity
                onPress={() =>
                  router.navigate(ROUTES.SEARCH(app.label, model.model_name))
                }
                key={model.model_name}
                style={styles.model}
              >
                <Text style={styles.modelLink}>{model.model_name}</Text>
              </TouchableOpacity>
            ))}
        </Flex>
      </Collapsible>
    </Flex>
  );
};

const styles = StyleSheet.create({
  appName: {
    backgroundColor: Colors.django.primary,
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
  },
  appNameText: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.background,
  },
  modelsWrapper: {
    padding: 5,
    gap: 10,
  },
  modelLink: {
    fontWeight: "bold",
    fontSize: 15,
  },
  model: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colors.primary + "11",
  },
});
