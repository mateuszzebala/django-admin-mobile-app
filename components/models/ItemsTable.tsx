import { Colors } from "@/constants/Colors";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Flex } from "../atoms/styles/Flex";
import React, { ReactElement } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { FontAwesome } from "@expo/vector-icons";
import useToggle from "@/hooks/useToggle";
import { router } from "expo-router";

type ItemsTableProps = {
	title: string;
	items: any[];
	headers: string[];
	modelName?: any;
	app?: any;
	asc: {
		value: boolean;
		setValue: (value: boolean) => void;
		toggle: () => void;
	};
	orderBy: string;
	setOrderBy: (prev: any) => void;
};

export const ItemsTable = ({
	headers,
	title,
	items,
	asc,
	orderBy,
	modelName,
	app,
	setOrderBy,
}: ItemsTableProps) => {
	const [widthArr, setWidthArr] = React.useState(headers.map(() => 130));

	const handleScrollLayout = (event: any) => {
		const minWidth = event.nativeEvent.layout.width;
		if (minWidth > 130 * headers.length) {
			setWidthArr(headers.map(() => minWidth / headers.length));
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView
				onLayout={handleScrollLayout}
				horizontal={true}
				style={{ minWidth: "100%" }}
			>
				<View>
					<Table>
						<TableWrapper style={styles.header}>
							{headers.map((header, index) => (
								<Cell
									width={widthArr[index]}
									textStyle={styles.headerText}
									key={index}
									data={
										<TouchableOpacity
											onPress={() =>
												setOrderBy((prev: any) => {
													if (prev === header) asc.toggle();
													else asc.setValue(true);
													return header;
												})
											}
										>
											<Text
												style={{
													textAlign: "center",
													fontWeight: orderBy === header ? "bold" : "normal",
												}}
											>
												{header}{" "}
												<FontAwesome
													name={
														asc.value ? "sort-alpha-asc" : "sort-alpha-desc"
													}
													color={
														orderBy === header
															? Colors.primary
															: Colors.django.primary
													}
												/>
											</Text>
										</TouchableOpacity>
									}
								/>
							))}
						</TableWrapper>
					</Table>
					<ScrollView style={styles.dataWrapper}>
						<Table>
							{/* {items.map((rowData, index) => (
								<Row
									widthArr={widthArr}
									key={index}
									data={[...headers.map((header) => rowData[header])]}
									style={[
										
									]}
									textStyle={styles.text}
								/>
							))} */}
							{items.map((rowData, index) => (
								<TableWrapper
									style={{
										...styles.row,
										backgroundColor:
											index % 2 == 1 ? Colors.grey : Colors.background,
									}}
								>
									<TouchableOpacity
										onPress={() =>
											router.navigate(
												`/modelItem/item?modelName=${modelName}&app=${app}&pk=${rowData.pk}`
											)
										}
										style={{ display: "flex", flexDirection: "row" }}
									>
										{headers.map((header, index) => (
											<Cell
												width={widthArr[index]}
												textStyle={styles.text}
												key={index}
												data={
													<Text style={{ textAlign: "center" }}>
														{rowData[header]}
													</Text>
												}
											/>
										))}
									</TouchableOpacity>
								</TableWrapper>
							))}
						</Table>
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		height: 60,
		backgroundColor: Colors.django.primary,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		display: "flex",
		flexDirection: "row",
	},
	headerText: { textAlign: "center", fontWeight: "bold" },
	text: { textAlign: "center", fontWeight: "100" },
	dataWrapper: { marginTop: -1 },
	row: {
		display: "flex",
		flexDirection: "row",
		minHeight: 55,
		paddingVertical: 5,
	},
});
