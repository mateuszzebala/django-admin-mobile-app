import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {KeyboardAvoidingView, Platform, StyleSheet} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AuthLayout() {
  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
            <Stack
              screenOptions={{
                statusBarColor: Colors.django.primary,
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen
                name="connect"
                options={{
                  headerStyle: {
                    backgroundColor: Colors.django.primary,
                  },
                  headerTintColor: Colors.background,
                  headerTitle: "Connect",
                headerBackTitle: "Home",
                  headerShown: true,
                  animationDuration: 2000,
                  headerTitleStyle: {
                    fontWeight: "bold",
                    color: Colors.background,
                  },
                }}
              />
              <Stack.Screen
                name="connections"
                options={{
                  headerStyle: {
                    backgroundColor: Colors.django.primary,
                  },
                  headerTintColor: Colors.background,
                  headerBackTitle: "Home",
                  headerTitle: "Connections",
                  headerShown: true,
                  animationDuration: 2000,
                  headerTitleStyle: {
                    fontWeight: "bold",
                    color: Colors.background,
                  },
                }}
              />
            </Stack>
        </GestureHandlerRootView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
