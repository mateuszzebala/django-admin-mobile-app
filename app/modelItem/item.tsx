import { CustomInput } from "@/components/atoms/CustomInput";
import { Select } from "@/components/atoms/Select";
import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { ModelField } from "@/components/models/ModelField";
import { range } from "@/utils/utils";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

export default function ModelItemScreen() {
	const { modelName, pk } = useGlobalSearchParams();
	const [selectedItems, setSelectedItems] = React.useState([]);

	return (
		<ScrollView>
			<Flex column padding={10} gap={10} style={{ flex: 1 }}>
				<Flex
					row
					padding={10}
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography fontWeight={"bold"} fontSize={20}>
						{modelName} &gt; {pk}
					</Typography>
				</Flex>
				<Flex column gap={25}>
					<ModelField
						description={"Descrption for that field"}
						type="CharField"
						name="username"
					/>
				</Flex>
			</Flex>
		</ScrollView>
	);
}
