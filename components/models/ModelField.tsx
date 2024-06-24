import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { CharField } from "./modelFieldInputs/CharField";
import { IntegerField } from "./modelFieldInputs/IntegerField";
import { FloatField } from "./modelFieldInputs/FloatField";
import { BooleanField } from "./modelFieldInputs/BooleanField";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DateTimeField } from "./modelFieldInputs/DateTimeField";
import { DateField } from "./modelFieldInputs/DateField";
import { TimeField } from "./modelFieldInputs/TimeField";

type ModelFieldProps = {
	type:
		| "CharField"
		| "IntegerField"
		| "FloatField"
		| "BooleanField"
		| "DateTimeField"
		| "DateField"
		| "TimeField";
	name?: string;
	description?: string;
	fieldData?: object;
};

const fields = {
	CharField,
	IntegerField,
	FloatField,
	BooleanField,
	DateTimeField,
	DateField,
	TimeField,
};

export const ModelField = ({
	type,
	name = "",
	description = "",
	fieldData = {},
}: ModelFieldProps) => {
	const FieldInput = fields[type] || CharField;
	return (
		<Flex column>
			<TouchableOpacity onPress={() => alert(name)}>
				<Typography fontWeight={"bold"} fontSize={17}>
					{name}
				</Typography>
			</TouchableOpacity>
			<Typography fontSize={12}>{type}</Typography>
			<FieldInput fieldData={fieldData} />
			{description ? (
				<Typography fontSize={12}>{description}</Typography>
			) : (
				<></>
			)}
		</Flex>
	);
};
