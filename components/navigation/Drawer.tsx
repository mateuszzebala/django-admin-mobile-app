import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { CustomButton, Flex } from "../atoms";

export const Drawer = () => {
  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <Flex
        style={styles.flexWrapper}
        column
        alignItems="stretch"
        justifyContent="flex-start"
      >
        <CustomButton backgroundColor={Colors.background}>Test</CustomButton>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  flexWrapper: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: Colors.django.primary,
  },
});
