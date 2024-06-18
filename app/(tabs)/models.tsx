import { Flex } from "@/components/atoms/styles/Flex";
import { AppModelsGroup } from "@/components/models/AppModelsGroup";
import { ScrollView } from "react-native";

export default function ModelsScreen() {
	return (
		<ScrollView>
			<Flex column padding={20} gap={20}>
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
