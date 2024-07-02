import { getCsrfToken } from "@/api/functions";
import { CustomButton } from "@/components/atoms/CustomButton";
import { CustomInput } from "@/components/atoms/CustomInput";
import { Typography } from "@/components/atoms/Typography";
import { Colors } from "@/constants/Colors";
import { ConnectionContext } from "@/context/ConnectionContext";
import useConnnection from "@/hooks/useConnnection";
import useLoading from "@/hooks/useLoading";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConnectScreen() {
	const connection = useConnnection();

	const [form, setForm] = React.useState({
		host: "http://192.168.100.37:4444",
		username: "mateuszzebala",
		password: "haslo123",
		name: "App",
	});

	const [connectionError, setConnectionError] = React.useState("");

	const connecting = useLoading(false);

	const handleConnect = () => {
		connecting.enable();

		const host = form.host.startsWith("http")
			? form.host
			: `https://${form.host}`;

		const url = new URL(host);

		console.log();

		if (
			connection.connectionContext.connections.some(
				(connection: any) => new URL(connection.host).toJSON() === url.toJSON()
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

		getCsrfToken(host)
			.then((token) => {
				const data = JSON.stringify(form);
				const headers = {
					"Content-Type": "application/json",
					"X-CSRFToken": token,
				};
				axios
					.post(`${host}/api_admin/login/`, data, {
						withCredentials: true,
						headers,
					})
					.then((data) => {
						setConnectionError("");
						const conn = {
							...form,
							...data.data,
						};

						connection.addConnection(conn);
						connection.setCurrent(conn);

						router.navigate("/models");

						connecting.disable();
					})
					.catch((err) => {
						console.log(err.response.data);
						if (err.response.data.username) {
							setConnectionError(err.response.data.username[0]);
						} else if (err.response.data.password) {
							setConnectionError(err.response.data.password[0]);
						} else if (err.response.data.non_field_errors) {
							setConnectionError(err.response.data.non_field_errors);
						} else {
							setConnectionError("");
						}
						connecting.disable();
					});
			})
			.catch(() => {
				setConnectionError("Server not found!");
				connecting.disable();
			});
	};

	return (
		<ScrollView style={styles.scroll}>
			<View style={styles.wrapper}>
				<View style={styles.form}>
					<Typography>Connect to api of django admin.</Typography>
					<CustomInput
						value={form.name}
						onChange={({ nativeEvent }) =>
							setForm((prev) => ({ ...prev, host: nativeEvent.text }))
						}
						placeHolder="Name"
					/>
					<Typography>Name of connection.</Typography>
					<CustomInput
						autoCapitalize={"none"}
						value={form.host}
						onChange={({ nativeEvent }) =>
							setForm((prev) => ({ ...prev, host: nativeEvent.text }))
						}
						placeHolder="Host"
					/>
					<Typography>
						Host. It can be domain.com or https://domain.com or even ip address.
						You can choose from your last hosts.
					</Typography>
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
					<Typography>Username for superuser account.</Typography>
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
					<Typography>Password for user account.</Typography>
					<CustomButton isLoading={connecting.is} onPress={handleConnect}>
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
