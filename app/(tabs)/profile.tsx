import { CustomButton } from "@/components/atoms/CustomButton";
import { Loading } from "@/components/atoms/Loading";
import { Flex } from "@/components/atoms/styles/Flex";
import { Colors } from "@/constants/Colors";
import useConnnection from "@/hooks/useConnnection";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function ProfileScreen() {
	const connection = useConnnection();
	const data = useFetch(
		{ user: {} },
		`${connection.current.host}/api_admin/user_info/`,
		[connection.current.host]
	);

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
					<Text style={styles.host}>
						{connection.connectionContext.current.host}
					</Text>
					{data.loading ? (
						<Loading size={2} />
					) : (
						<>
							<Text style={styles.username}>{data.data.user.username}</Text>
							<Text style={styles.names}>
								{data.data.user.first_name} {data.data.user.last_name}
							</Text>
							<Text style={styles.email}>{data.data?.user.email}</Text>
						</>
					)}
				</Flex>
				<CustomButton
					backgroundColor={Colors.django.primary}
					onPress={() => {
						connection.disconnectFromCurrent();
						router.navigate("/connections");
					}}
					secondary
					style={{ width: 300 }}
				>
					Disconnect!
				</CustomButton>
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
});
