import { CustomButton } from "@/components/atoms/CustomButton";
import {
	DropdownButton,
	DropdownModalForm,
} from "@/components/atoms/DropdownButton";
import { SearchInput } from "@/components/atoms/SearchInput";
import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { ItemsTable } from "@/components/models/ItemsTable";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import useListState from "@/hooks/useListState";
import useToggle from "@/hooks/useToggle";
import { range } from "@/utils/utils";
import {
	AntDesign,
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome5,
} from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function ModelSearchScreen() {
	const asc = useToggle(true);
	const [orderBy, setOrderBy] = React.useState("pk");
	const { app, modelName } = useGlobalSearchParams();
	const selected = useListState([]);
	const allSelected = useToggle(false);
	const modal = useModal();
	const [headers, setHeaders] = React.useState([
		"pk",
		"username",
		"first_name",
		"last_name",
	]);

	const items = useListState([
		...range(15).map((i) => ({
			pk: i,
			username: "mateuszzebala",
			first_name: "Mateusz",
			last_name: "Zębala",
			email: "mateusz.zebala.pl@gmail.com",
			password: "admin",
		})),
	]);
	const [itemsData] = React.useState({ allLength: items.items.length });

	React.useEffect(() => {
		allSelected.setValue(selected.items.length === itemsData.allLength);
	}, [selected.items]);

	const handleSelect = () => {
		if (selected.items.length > 0) {
			selected.clear();
		} else {
			allSelected.setValue(true);
			selected.setItems(items.items.map((item) => item.pk));
		}
	};

	return (
		<Flex column padding={10} gap={10} style={{ height: "100%" }}>
			<Flex row padding={1} justifyContent="space-between" alignItems="center">
				<Typography fontWeight={"bold"} fontSize={20}>
					{modelName}
				</Typography>
				<Flex row gap={10} style={{ flex: 1 }} justifyContent="flex-end">
					<CustomButton
						style={styles.btn}
						onPress={() => {}}
						icon={<Feather name="plus" color={Colors.primary} size={25} />}
					/>
					<CustomButton
						style={styles.btn}
						onPress={handleSelect}
						icon={<Feather name="check" color={Colors.primary} size={25} />}
					/>
					<DropdownButton
						style={styles.btn}
						backgroundColor={Colors.grey}
						menuStyle={{
							right: 0,
						}}
						icon={
							<Entypo
								name="dots-three-vertical"
								color={Colors.primary}
								size={25}
							/>
						}
						elements={[
							{
								text: "Delete",
								icon: <Feather name={"trash"} size={18} />,
								onPress: () => {},
								disabled: selected.items.length <= 0,
							},
							{
								text: `Order by '${orderBy}'`,
								icon: <FontAwesome5 name={"sort"} size={18} />,
								onPress: () => {
									modal.create({
										component: DropdownModalForm,
										props: {
											elements: headers.map((header) => ({
												text: header,
												onPress: () => setOrderBy(header),
											})),
										},
									});
								},
							},
							{
								text: asc.value ? "ASC > DESC" : "DESC > ASC",
								icon: (
									<FontAwesome
										name={asc.value ? "sort-alpha-asc" : "sort-alpha-desc"}
										size={18}
									/>
								),
								onPress: asc.toggle,
							},
							{
								text: "Export",
								icon: <AntDesign name={"export2"} size={18} />,
								onPress: () => {},
								disabled: selected.items.length <= 0,
							},
						]}
					/>
				</Flex>
			</Flex>
			<SearchInput placeHolder="Search..." />
			<View
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					flex: 1,
				}}
			>
				<ItemsTable
					selected={selected}
					app={app}
					modelName={modelName}
					asc={asc}
					orderBy={orderBy}
					setOrderBy={setOrderBy}
					headers={headers}
					items={items.items}
				/>
			</View>
		</Flex>
	);
}

const styles = StyleSheet.create({
	btn: {
		height: 55,
		width: 55,
		padding: 0,
		backgroundColor: Colors.grey,
	},
});
