import { CustomButton } from "@/components/atoms/CustomButton";
import { Flex } from "@/components/atoms/styles/Flex";
import { PromptModalForm } from "@/components/modalForms/PromptModalForm";
import { useModal } from "@/context/ModelContext";
import React from "react";

export default function HistoryScreen() {
	const modal = useModal();
	const [text, setText] = React.useState("");
	return (
		<Flex column padding={10}>
			<CustomButton
				onPress={() =>
					modal.create({
						text: "Select Username",
						component: PromptModalForm,
						props: {
							placeHolder: "Username",
							initValue: text,
						},
						todo: (value: string) => {
							setText(value);
						},
					})
				}
			>
				{text ? <>Your username is {text}!</> : <>Select your username!</>}
			</CustomButton>
		</Flex>
	);
}
