import { buildValidHost, tryToConnect } from "@/api/functions";
import { Colors } from "@/constants/Colors";
import useConnection from "@/hooks/useConnection";
import useLoading from "@/hooks/useLoading";
import { Octicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ROUTES } from "../routes";
import { CustomButton, CustomInput, Typography } from "@/components/atoms";

export default function ConnectScreen() {
  const connection = useConnection();

  const [form, setForm] = React.useState({
    host: "",
    username: "",
    password: "",
    name: "",
  });

  const [connectionError, setConnectionError] = React.useState("");

  const connecting = useLoading(false);

  const handleConnect = () => {
    connecting.enable();
    try {
      const host = buildValidHost(form.host);

      const url = new URL(host);

      if (
        connection.connectionContext.connections.some(
          (connection: any) =>
            new URL(connection.host).toJSON() === url.toJSON() &&
            connection.username === form.username
        )
      ) {
        setConnectionError("Server already connected!");
        connecting.disable();
        return;
      }

      if (!form.password || !form.username) {
        setConnectionError("Provide username and password!");
        connecting.disable();
        return;
      }

      if (
        connection.connectionContext.connections.some(
          (connection: any) => connection.name == form.name
        )
      ) {
        setConnectionError("Connection with this name already exists!");
        connecting.disable();
        return;
      }

      tryToConnect(host, form.username, form.password)
        .then((data) => {
          setConnectionError("");

          if (data.data.message == "Authentication Successfull!") {
            const conn = {
              ...form,
              host,
              ...data.data,
            };
            connection.addConnection(conn);
            connection.setCurrent(conn);
            router.navigate(ROUTES.INDEX());
          } else {
            setConnectionError(data.data.message);
          }
          connecting.disable();
        })

        .catch(() => {
          setConnectionError("Cannot connect server!");
          connecting.disable();
        });
    } catch {
      setConnectionError("Connection error!");
      connecting.disable();
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.wrapper}>
        <View style={styles.form}>
          <Typography fontSize={22} fontWeight={"bold"}>
            Connect to api of django admin.
          </Typography>
          <Typography>
            Before ensure you have done this:{" "}
            <Link
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
              href={ROUTES.HELP()}
            >
              Installation
            </Link>
          </Typography>
          <Typography fontSize={15}>
            Your data is safe, it is sent only to the host you provide. The
            application does not connect to any other server.
          </Typography>
          <Typography fontWeight={"bold"}>Name of connection</Typography>
          <CustomInput
            value={form.name}
            onChange={({ nativeEvent }) =>
              setForm((prev) => ({ ...prev, name: nativeEvent.text }))
            }
            placeHolder="Name"
          />
          <Typography fontWeight={"bold"}>Host</Typography>
          <CustomInput
            autoCapitalize={"none"}
            value={form.host}
            onChange={({ nativeEvent }) =>
              setForm((prev) => ({ ...prev, host: nativeEvent.text }))
            }
            placeHolder="Host"
          />
          <Typography>
            It can be domain.com or https://domain.com or even ip address.
          </Typography>
          <Typography fontWeight={"bold"}>Username</Typography>
          <CustomInput
            autoCapitalize={"none"}
            value={form.username}
            onChange={({ nativeEvent }) =>
              setForm((prev) => ({
                ...prev,
                username: nativeEvent.text,
              }))
            }
            placeHolder="Username"
          />
          <Typography fontWeight={"bold"}>Password</Typography>
          <CustomInput
            autoCapitalize={"none"}
            password
            value={form.password}
            onChange={({ nativeEvent }) =>
              setForm((prev) => ({
                ...prev,
                password: nativeEvent.text,
              }))
            }
            placeHolder="Password"
          />
          <CustomButton
            isLoading={connecting.is}
            onPress={handleConnect}
            icon={<Octicons name="plug" size={20} />}
            iconPosition="right"
          >
            Connect
          </CustomButton>
          {connectionError && (
            <Typography style={styles.errorMessage}>
              {connectionError}
            </Typography>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "100%",
    flex: 1,
    backgroundColor: Colors.background,
    flexGrow: 1,
  },
  wrapper: {
    padding: 30,
    display: "flex",
    gap: 20,
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  djangoImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  form: {
    width: "100%",
    display: "flex",
    gap: 20,
  },
  errorMessage: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: "bold",
  },
});
