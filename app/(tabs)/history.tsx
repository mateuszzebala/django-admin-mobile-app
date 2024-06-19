import { Loading } from "@/components/atoms/Loading";
import { Flex } from "@/components/atoms/styles/Flex";
import useLoading from "@/hooks/useLoading";
import React from "react";
import { StyleSheet } from "react-native";

export default function HistoryScreen() {
	return (
		<Flex column padding={10}>
			<Loading size={1} duration={1000} />
		</Flex>
	);
}

const styles = StyleSheet.create({});
