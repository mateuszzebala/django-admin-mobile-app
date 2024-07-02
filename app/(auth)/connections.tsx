import { CustomButton } from "@/components/atoms/CustomButton";
import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { Colors } from "@/constants/Colors";
import useConnnection from "@/hooks/useConnnection";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function ConnectionsScreen() {
	const connection = useConnnection();

	const handleConnect = (conn: any) => {
		connection.setCurrent(conn);
		router.navigate("/models");
	};

	const isCurrent = (conn: any): boolean => {
		return (
			conn.host == connection.current.host &&
			conn.username == connection.current.username
		);
	};

	return (
		<Flex column gap={10} padding={10}>
			{connection.connectionContext.connections.map(
				(conn: any, index: number) => (
					<CustomButton
						onPress={() => handleConnect(conn)}
						style={{ height: 120, justifyContent: "flex-start" }}
						key={index}
						backgroundColor={
							isCurrent(conn) ? Colors.django.primaryAccent : Colors.grey
						}
					>
						<Typography fontSize={20}>{conn.name}</Typography>
						{"\n"}
						{"\n"}
						Host: {conn.host}
						{"\n"}
						User: {conn.username}
					</CustomButton>
				)
			)}
		</Flex>
	);
}
