import { Colors } from "@/constants/Colors";
import useConnection from "@/hooks/useConnection";
import { Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ROUTES } from "./routes";
import { CustomButton, Flex } from "@/components/atoms";

export default function HomeScreen() {
  const connection = useConnection();

  return (
    <Flex
      column
      justifyContent="space-between"
      alignItems="center"
      style={styles.wrapper}
    >
      <View style={{ height: 40 }}>
        <Image
          height={40}
          source={require("@/assets/images/djangoWhite.png")}
          style={styles.djangoWhiteImage}
        />
      </View>
      <Flex column gap={10} alignItems="center">
        <View style={{ height: 250 }}>
          <Image
            height={250}
            source={require("@/assets/images/djangoIcon.png")}
          />
        </View>
        <Text style={styles.welcomeText}>
          Welcome in django administration app!
        </Text>
        <Text style={styles.descriptionText}>
          Just connect and manage your app!
        </Text>
        <Link href={ROUTES.HELP()} style={styles.link}>
          Click here if you don't know how to start.
        </Link>
        <Link href={ROUTES.DONATE()} style={styles.link}>
          <Feather name={"coffee"} /> Buy me a coffee :)
        </Link>
      </Flex>
      {connection.isConnected() ? (
        <Flex column gap={5} alignItems="center">
          <Flex row>
            <CustomButton
              onPress={() => router.navigate(ROUTES.CONNECTIONS())}
              backgroundColor={Colors.django.primary}
              icon={<Feather name="link" size={20} />}
              style={{ width: 172 }}
            >
              Connections ({connection.connectionContext.connections.length})
            </CustomButton>
            <CustomButton
              onPress={() => router.navigate(ROUTES.CONNECT())}
              backgroundColor={Colors.django.primary}
              icon={<Feather name="plus" size={20} />}
              style={{ width: 172 }}
              iconPosition="right"
            >
              Connect
            </CustomButton>
          </Flex>

          <CustomButton
            style={styles.connectButton}
            icon={<Feather name="arrow-right" size={20} />}
            iconPosition="right"
            backgroundColor={Colors.background}
            onPress={() => router.navigate(ROUTES.MODELS())}
          >
            {connection?.current?.name}
          </CustomButton>
        </Flex>
      ) : (
        <>
          <CustomButton
            style={styles.connectButton}
            icon={<Feather name="arrow-right" size={20} />}
            iconPosition="right"
            backgroundColor={Colors.background}
            onPress={() => router.navigate(ROUTES.CONNECT())}
          >
            Connect
          </CustomButton>
        </>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  djangoWhiteImage: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
  wrapper: {
    padding: 30,
    gap: 50,
    flex: 1,
    backgroundColor: Colors.django.primary,
  },
  djangoLogo: {
    width: 400,
    height: 250,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 30,
    color: Colors.background,
    fontFamily: "Rubik",
  },
  descriptionText: {
    fontSize: 17,
    fontFamily: "RubikLight",
    color: Colors.background,
  },
  connectButton: {
    width: 350,
  },
  link: {
    fontWeight: "bold",
    fontSize: 15,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  button: {
    width: 350,
    height: 50,
  },
});
