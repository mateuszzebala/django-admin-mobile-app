import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { AppModelsGroup } from "@/components/models/AppModelsGroup";
import { Colors } from "@/constants/Colors";
import useConnnection from "@/hooks/useConnnection";
import { ScrollView, Text } from "react-native";

export default function ModelsScreen() {
	const connection = useConnnection();
	return (
		<ScrollView>
			<Flex column padding={20} gap={20}>
				<Typography
					fontSize={20}
					fontWeight={"bold"}
					color={Colors.primary + "ff"}
				>
					Site administration - {connection.current.name}
				</Typography>
				<Typography
					fontSize={15}
					fontWeight={"bold"}
					color={Colors.primary + "88"}
				>
					{connection.current.host}
				</Typography>
				<AppModelsGroup
					app={{
						models: [
							{ name: "User", icon: "user" },
							{ name: "Group", icon: "users" },
						],
						name: "Auth",
					}}
				/>
				<AppModelsGroup
					app={{
						models: [{ name: "Session", icon: "key" }],
						name: "Sessions",
					}}
				/>
			</Flex>
		</ScrollView>
	);
}
