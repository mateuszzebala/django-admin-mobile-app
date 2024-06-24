import { TouchableOpacity } from "react-native-gesture-handler";
import { Flex } from "../atoms/styles/Flex";
import { StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Rotateable } from "../atoms/Rotateable";
import React from "react";
import Collapsible from "react-native-collapsible";
import { Easing } from "react-native-reanimated";
import { router } from "expo-router";

type Model = {
	name: string;
	icon: any;
};

type App = {
	models: Model[];
	name: string;
};

type AppModelsGroupProps = {
	app: App;
};

export const AppModelsGroup = ({
	app = { models: [], name: "" },
}: AppModelsGroupProps) => {
	const [open, setOpen] = React.useState(true);
	return (
		<Flex column>
			<TouchableOpacity
				activeOpacity={0.5}
				style={styles.appName}
				onPress={() => setOpen((prev) => !prev)}
			>
				<Text style={styles.appNameText}>{app.name}</Text>
				<Rotateable rotate={open ? 180 : 0} duration={100}>
					<MaterialIcons
						name="keyboard-arrow-down"
						size={30}
						color={Colors.background}
					/>
				</Rotateable>
			</TouchableOpacity>
			<Collapsible duration={100} easing={Easing.ease} collapsed={!open}>
				<Flex column style={styles.modelsWrapper}>
					{app.models.map((model) => (
						<TouchableOpacity
							onPress={() =>
								router.navigate(
									`/model/search?app=${app.name}&modelName=${model.name}`
								)
							}
							key={model.name}
							style={styles.model}
						>
							<FontAwesome style={{ width: 30 }} size={16} name={model.icon} />
							<Text style={styles.modelLink}>{model.name}</Text>
						</TouchableOpacity>
					))}
				</Flex>
			</Collapsible>
		</Flex>
	);
};

const styles = StyleSheet.create({
	appName: {
		backgroundColor: Colors.django.primary,
		padding: 15,
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	appNameText: {
		fontWeight: "bold",
		fontSize: 15,
		color: Colors.background,
	},
	modelsWrapper: {
		padding: 10,
		gap: 10,
	},
	modelLink: {
		fontWeight: "bold",
		fontSize: 15,
	},
	model: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		borderRadius: 10,
		padding: 17,
		backgroundColor: Colors.primary + "11",
	},
});
