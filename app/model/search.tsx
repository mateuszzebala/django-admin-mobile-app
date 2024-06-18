import { SearchInput } from "@/components/atoms/SearchInput";
import { Flex } from "@/components/atoms/styles/Flex";

export default function ModelSearchScreen() {
	return (
		<Flex column padding={10}>
			<SearchInput placeHolder="Search..." />
		</Flex>
	);
}
