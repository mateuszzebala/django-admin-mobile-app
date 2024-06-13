import { CustomButton } from "@/components/atoms/CustomButton";
import { CustomInput } from "@/components/atoms/CustomInput";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConnectScreen() {
	const [form, setForm] = React.useState({
		username: "mateuszzebala",
		host: "imac:7777",
		password: "admin123",
	});
	const [connecting, setConnecting] = React.useState(false);

	const handleConnect = () => {
		setConnecting(true);
		fetch(
			`http://${form.host}/adminapi?username=${form.username}&password=${form.password}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setConnecting(false);
			})
			.catch((data) => {
				setConnecting(false);
			});
	};

	return (
		<ScrollView style={styles.scroll}>
			<View style={styles.wrapper}>
				<Image
					source={require("@/assets/images/djangoLogo.png")}
					style={styles.djangoImage}
				/>
				<View style={styles.form}>
					<Text>Connect to api of django admin.</Text>
					<CustomInput
						value={form.host}
						onChange={({ nativeEvent }) =>
							setForm((prev) => ({ ...prev, host: nativeEvent.target.value }))
						}
						placeHolder="Host"
					/>
					<Text>
						It can be domain.com or https://domain.com or even ip address. You
						can choose from your last hosts.
					</Text>
					<CustomInput
						value={form.username}
						onChange={({ nativeEvent }) =>
							setForm((prev) => ({
								...prev,
								username: nativeEvent.target.value,
							}))
						}
						placeHolder="Username"
					/>
					<Text>Username for superuser account.</Text>
					<CustomInput
						password
						value={form.password}
						onChange={({ nativeEvent }) =>
							setForm((prev) => ({
								...prev,
								password: nativeEvent.target.value,
							}))
						}
						placeHolder="Password"
					/>
					<Text>Password for user account.</Text>
					<CustomButton isLoading={connecting} onPress={handleConnect}>
						Connect
					</CustomButton>
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
});
