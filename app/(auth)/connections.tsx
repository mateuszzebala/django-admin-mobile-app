import { tryToConnect } from "@/api/functions";
import { Colors } from "@/constants/Colors";
import useConnection from "@/hooks/useConnection";
import useLoading from "@/hooks/useLoading";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ROUTES } from "../routes";
import { CustomButton, Flex, Typography } from "@/components/atoms";

export default function ConnectionsScreen() {
  const connection = useConnection();
  const connecting = useLoading(false);
  const [connectionTo, setConnectionTo] = React.useState(null);

  React.useEffect(() => {
    if (!connection.isConnected()) router.navigate(ROUTES.INDEX());
  }, []);

  const handleConnect = (conn: any) => {
    connecting.enable();
    setConnectionTo(conn);

    tryToConnect(conn.host, conn.username, conn.password)
      .then((data) => {
        if (data.data.message == "Authentication Successfull!") {
          connection.setCurrent(conn);
          router.navigate(ROUTES.INDEX());
        }
        connecting.disable();
      })
      .catch(() => {
        connecting.disable();
      });
  };

  const isCurrent = (conn: any): boolean => {
    return (
      conn.host == connection.current.host &&
      conn.username == connection.current.username
    );
  };

  return (
    <Flex column gap={10} padding={10}>
      {connection.connectionContext.connections.map(
        (conn: any, index: number) => (
          <CustomButton
            activeOpacity={0.8}
            onPress={() => handleConnect(conn)}
            key={index}
            isLoading={connectionTo == conn && connecting.is}
            style={{
              backgroundColor: (
                connectionTo ? connectionTo == conn : isCurrent(conn)
              )
                ? Colors.django.primary
                : Colors.grey,
              height: 130,
              justifyContent:
                connectionTo == conn && connecting.is ? "center" : "flex-start",
            }}
          >
            <Typography fontSize={25} fontWeight={"bold"}>
              {conn.name}
            </Typography>
            {"\n"}
            {"\n"}
            {conn.host}
            {"\n"}
            {conn.username}
          </CustomButton>
        )
      )}
      <CustomButton
        backgroundColor={Colors.grey}
        icon={<Feather name="plus" size={20} />}
        iconPosition="right"
        onPress={() => router.push(ROUTES.CONNECT())}
      >
        New connection
      </CustomButton>
    </Flex>
  );
}
