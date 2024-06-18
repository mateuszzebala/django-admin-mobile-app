import { CustomButton } from "@/components/atoms/CustomButton";
import { Flex } from "@/components/atoms/styles/Flex";
import { Colors } from "@/constants/Colors";
import { ConnectionContext } from "@/context/ConnectionContext";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
	const [connectionContext] = React.useContext(ConnectionContext);

	return (
		<Flex
			column
			justifyContent="space-between"
			alignItems="center"
			style={styles.wrapper}
		>
			<Image
				source={require("@/assets/images/djangoWhite.png")}
				style={styles.djangoWhiteImage}
			/>
			<Flex column gap={10} alignItems="center">
				<Image source={require("@/assets/images/djangoIcon.png")} />
				<Text style={styles.welcomeText}>
					Welcome in django administration app!
				</Text>
				<Text style={styles.descriptionText}>
					Just connect and manage your app!
				</Text>
				<Link href={"/help"} style={styles.link}>
					Click here if you don't know how to start.
				</Link>
			</Flex>
			{connectionContext?.isConnected ? (
				<Flex column gap={20} alignItems="center">
					<CustomButton
						style={styles.connectButton}
						icon={<FontAwesome name="arrow-right" size={20} />}
						iconPosition="right"
						backgroundColor={Colors.background}
						onPress={() => router.navigate("/models")}
					>
						Go To The Server!
					</CustomButton>
					<Link style={styles.link} href={"/connect"}>
						Connect to other server!
					</Link>
				</Flex>
			) : (
				<>
					<CustomButton
						style={styles.connectButton}
						icon={<FontAwesome name="arrow-right" size={20} />}
						iconPosition="right"
						backgroundColor={Colors.background}
						onPress={() => router.navigate("/connect")}
					>
						Connect To The Server!
					</CustomButton>
				</>
			)}
		</Flex>
	);
}

const styles = StyleSheet.create({
	djangoWhiteImage: {
		width: 200,
		height: 50,
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
		height: 300,
		resizeMode: "contain",
	},
	welcomeText: {
		fontSize: 35,
		color: Colors.background,
		fontFamily: "Rubik",
	},
	descriptionText: {
		fontSize: 21,
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
});
