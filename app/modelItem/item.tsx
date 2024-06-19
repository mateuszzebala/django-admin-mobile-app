import { Flex } from "@/components/atoms/styles/Flex";
import { Typography } from "@/components/atoms/Typography";
import { useGlobalSearchParams } from "expo-router";

export default function ModelItemScreen() {
	const { app, modelName, pk } = useGlobalSearchParams();

	return (
		<Flex column padding={10} gap={10}>
			<Flex row padding={10} justifyContent="space-between" alignItems="center">
				<Typography fontWeight={"bold"} fontSize={20}>
					{app} &gt; {modelName} &gt; {pk}
				</Typography>
			</Flex>
		</Flex>
	);
}
