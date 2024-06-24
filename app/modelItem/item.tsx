import { CustomInput } from "@/components/atoms/CustomInput";
import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { ModelField } from "@/components/models/ModelField";
import { useGlobalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function ModelItemScreen() {
	const { app, modelName, pk } = useGlobalSearchParams();

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
						type="DateTimeField"
						name="date_added"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="DateField"
						name="birth_date"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="TimeField"
						name="notification_time"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="CharField"
						name="username"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="IntegerField"
						name="age"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="FloatField"
						name="price"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="BooleanField"
						name="is_superuser"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="CharField"
						name="username"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="IntegerField"
						name="age"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="FloatField"
						name="price"
					/>
					<ModelField
						description={"Descrption for that field"}
						type="BooleanField"
						name="is_superuser"
						fieldData={{ nullable: true }}
					/>
				</Flex>
			</Flex>
		</ScrollView>
	);
}
