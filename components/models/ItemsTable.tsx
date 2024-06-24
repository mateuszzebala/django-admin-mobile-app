import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Flex } from "../atoms/styles/Flex";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Loading } from "../atoms/Loading";
import useListState from "@/hooks/useListState";

type ItemsTableProps = {
	items: any[];
	headers: string[];
	modelName?: any;
	app?: any;
	selected?: any;
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
	items,
	asc,
	orderBy,
	modelName,
	app,
	selected,
	setOrderBy,
}: ItemsTableProps) => {
	const [widthArr, setWidthArr] = React.useState(headers.map(() => 130));

	const handleScrollLayout = (event: any) => {
		const minWidth = event.nativeEvent.layout.width;
		if (minWidth > 130 * headers.length) {
			setWidthArr(headers.map(() => minWidth / headers.length));
		}
	};

	const handleScroll = ({
		nativeEvent: { contentOffset, layoutMeasurement },
	}: any) => {
		if (contentOffset.y > layoutMeasurement.height) {
			// alert("END");
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView
				onLayout={handleScrollLayout}
				horizontal={true}
				style={{ minWidth: "100%", flex: 1 }}
			>
				<Flex column gap={0} padding={0} style={{ flex: 1 }}>
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
					<ScrollView
						style={styles.dataWrapper}
						onMomentumScrollEnd={handleScroll}
					>
						<Table>
							{items.map((rowData, index) => (
								<TableWrapper
									key={index}
									style={{
										...styles.row,
										backgroundColor: selected.includes(rowData.pk)
											? Colors.django.primaryAccent
											: index % 2 == 1
											? Colors.grey
											: Colors.background,
									}}
								>
									<TouchableOpacity
										activeOpacity={0.8}
										onLongPress={() => {
											if (!selected.includes(rowData.pk)) {
												selected.push(rowData.pk);
											} else {
												selected.remove(rowData.pk);
											}
											console.log(selected.items);
										}}
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
													<Text
														style={{
															textAlign: "center",
															fontWeight: selected.includes(rowData.pk)
																? "bold"
																: "light",
														}}
													>
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
				</Flex>
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
		flex: 1,
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
	dataWrapper: {
		flex: 1,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		minHeight: 55,
		paddingVertical: 5,
		margin: 0,
	},
});
