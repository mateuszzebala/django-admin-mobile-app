import { CustomButton, Flex, Typography } from "@/components/atoms";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export default function DonateScreen() {
  return (
    <Flex column gap={10} padding={10}>
      <Typography
        fontSize={20}
        fontWeight={"bold"}
        style={{ textAlign: "center", padding: 10 }}
      >
        <Feather name="heart" size={50} />
        {"\n"}
        {"\n"}
        You can donate me, than I will be creating more tools like this. Also it
        will help me to upload app to Apple App Store. {"\n"}
        {"\n"}
        Thanks :)
        {"\n"}
        Mateusz Zębala
      </Typography>
      <CustomButton
        onPress={() => {
          router.navigate(
            "https://www.paypal.com/donate/?hosted_button_id=4B8MJ9DJF3B8Y"
          );
        }}
        backgroundColor={Colors.grey}
        style={styles.button}
        icon={<Feather name="link" size={20} />}
        textStyle={styles.buttonText}
      >
        paypal.com
      </CustomButton>
      <CustomButton
        onPress={() => {
          router.navigate("https://revolut.me/mateuszzebala");
        }}
        icon={<Feather name="link" size={20} />}
        backgroundColor={Colors.grey}
        style={styles.button}
        textStyle={styles.buttonText}
      >
        revolut.me
      </CustomButton>
      <CustomButton
        onPress={() => {
          router.navigate("https://buymeacoffee.com/mateuszzebd");
        }}
        style={styles.button}
        icon={<Feather name="link" size={20} />}
        backgroundColor={Colors.grey}
        textStyle={styles.buttonText}
      >
        buymeacoffee.com
      </CustomButton>
    </Flex>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "flex-start",
  },
  buttonText: { fontSize: 20, fontWeight: "normal" },
});
