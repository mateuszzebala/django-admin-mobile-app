import { SearchInput } from "@/components/atoms/SearchInput";
import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { ItemsTable } from "@/components/models/ItemsTable";
import { Colors } from "@/constants/Colors";
import useToggle from "@/hooks/useToggle";
import { Feather } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ModelSearchScreen() {
	const asc = useToggle(true);
	const [orderBy, setOrderBy] = React.useState("pk");
	const { app, modelName } = useGlobalSearchParams();

	return (
		<Flex column padding={10} gap={10}>
			<Flex row padding={10} justifyContent="space-between" alignItems="center">
				<Typography fontWeight={"bold"} fontSize={20}>
					{app} &gt; {modelName}
				</Typography>
				<Flex row>
					<Typography>Some btns</Typography>
				</Flex>
			</Flex>
			<SearchInput placeHolder="Search..." />
			<View style={{ width: "100%", height: "100%" }}>
				<ItemsTable
					app={app}
					modelName={modelName}
					asc={asc}
					orderBy={orderBy}
					setOrderBy={setOrderBy}
					title={"Users"}
					headers={["pk", "username", "first_name", "last_name"]}
					items={[
						{
							pk: 1,
							username: "mateuszzebala",
							first_name: "Mateusz",
							last_name: "Zębala",
							email: "mateusz.zebala.pl@gmail.com",
							password: "admin",
						},
						{
							pk: 1,
							username: "mateuszzebala",
							first_name: "Mateusz",
							last_name: "Zębala",
							email: "mateusz.zebala.pl@gmail.com",
							password: "admin",
						},
					]}
				/>
			</View>
		</Flex>
	);
}
