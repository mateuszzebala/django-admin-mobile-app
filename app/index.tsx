import { CustomButton } from "@/components/atoms/CustomButton";
import { Flex } from "@/components/atoms/styles/Flex";
import { Colors } from "@/constants/Colors";
import { ConnectionContext } from "@/context/ConnectionContext";
import useConnnection from "@/hooks/useConnnection";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
	const connection = useConnnection();

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
				<Link href={"/donate"} style={styles.link}>
					<Feather name={"coffee"} /> Buy me a coffee :)
				</Link>
			</Flex>
			{connection.isConnected() ? (
				<Flex column gap={10} alignItems="center">
					<CustomButton
						style={styles.connectButton}
						icon={<FontAwesome name="arrow-right" size={20} />}
						iconPosition="right"
						backgroundColor={Colors.background}
						onPress={() => router.navigate("/models")}
					>
						Go To The {connection?.current?.name}!
					</CustomButton>
					<CustomButton
						style={styles.button}
						backgroundColor={Colors.django.primaryAccent}
						onPress={() => router.navigate("/connections")}
					>
						My connections
					</CustomButton>

					<CustomButton
						style={styles.button}
						backgroundColor={Colors.django.primaryAccent}
						onPress={() => router.navigate("/connect")}
					>
						Create new connection
					</CustomButton>
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
						Create new connection!
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
		height: 55,
	},
});
