import { Flex, Loading, CustomButton } from "@/components/atoms";
import { Colors } from "@/constants/Colors";
import useConnection from "@/hooks/useConnection";
import useCounter from "@/hooks/useCounter";
import useLoading from "@/hooks/useLoading";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { ROUTES } from "../routes";
import { actions } from "@/api/actions";
import useApi from "@/hooks/useAPI";
import { RefreshControl } from "react-native-gesture-handler";

export default function ConnectionScreen() {
  const connection = useConnection();
  const counter = useCounter();
  const [data, setData] = React.useState({
    user: {
      username: "",
      last_name: "",
      first_name: "",
      email: "",
    },
  });
  const dataLoading = useLoading(true);
  const api = useApi();

  React.useEffect(() => {
    dataLoading.enable();

    api({
      action: actions.getInfo,
      callback: (data) => {
        setData(data);
        dataLoading.disable();
      },
      error: () => {
        dataLoading.disable();
      },
    });
  }, [counter.value]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ flex: 1, height: "100%" }}
      refreshControl={
        <RefreshControl
          colors={[Colors.background]}
          progressBackgroundColor={Colors.django.primary}
          refreshing={dataLoading.is}
          onRefresh={() => counter.add()}
        />
      }
    >
      <View style={styles.container}>
        <Flex
          column
          style={{ height: "100%", padding: 10, width: 400 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Image
            source={require("@/assets/images/djangoIcon.png")}
            style={styles.django}
          />
          <Flex column alignItems="center">
            {dataLoading.is ? (
              <Loading size={2} />
            ) : (
              <>
                <Text style={styles.name}>
                  {connection.connectionContext.current.name}
                </Text>
                <Text style={styles.host}>
                  {connection.connectionContext.current.host}
                </Text>

                <Text style={styles.username}>{data.user.username}</Text>
                <Text style={styles.names}>
                  {data.user.first_name} {data.user.last_name}
                </Text>
                <Text style={styles.email}>{data?.user.email}</Text>
              </>
            )}
          </Flex>
          <CustomButton
            backgroundColor={Colors.django.primary}
            onPress={() => {
              connection.disconnectFromCurrent();
              router.navigate(ROUTES.CONNECTIONS());
            }}
            style={{ width: 300 }}
            icon={<Feather name="log-out" size={20} />}
          >
            Disconnect
          </CustomButton>
        </Flex>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    padding: 50,
    flex: 1,
  },
  username: {
    fontSize: 40,
    fontWeight: "bold",
  },
  names: {
    fontSize: 20,
    fontWeight: "normal",
  },
  django: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  host: {
    fontSize: 15,
    fontWeight: "bold",
  },
  email: {
    fontSize: 15,
    fontWeight: "bold",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
