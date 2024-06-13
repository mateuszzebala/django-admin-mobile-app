import { CustomButton } from "@/components/atoms/CustomButton";
import { Flex } from "@/components/atoms/styles/Flex";
import { ConnectionContext } from "@/context/ConnectionContext";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function ProfileScreen() {
	const [connectionContext] = React.useContext(ConnectionContext);
	return (
		<View style={styles.container}>
			<Flex
				column
				style={{ height: "100%", padding: 20, width: 400 }}
				justifyContent="space-between"
				alignItems="center"
			>
				<Image
					source={require("@/assets/images/djangoLogo.png")}
					style={styles.django}
				/>
				<Flex column alignItems="center">
					<Text style={styles.host}>{connectionContext.current.host}</Text>
					<Text style={styles.username}>
						{connectionContext.current.username}
					</Text>
					<Text style={styles.names}>
						{connectionContext.current.firstName}{" "}
						{connectionContext.current.lastName}
					</Text>
					<Text style={styles.email}>{connectionContext.current.email}</Text>
				</Flex>
				<CustomButton style={{ width: 300 }}>DISCONNECT</CustomButton>
			</Flex>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		padding: 50,
	},
	username: {
		fontSize: 40,
		fontWeight: "bold",
	},
	names: {
		fontSize: 20,
		fontWeight: "bold",
	},
	django: {
		height: 100,
		width: 100,
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
});
