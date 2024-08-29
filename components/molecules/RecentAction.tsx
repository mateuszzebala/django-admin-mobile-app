import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { Flex, Typography } from "../atoms";

type RecentActionProps = {
  action?: "Delete" | "Change" | "Add" | string;
  objectRepresentation: string;
  when: Date;
};

export const RecentAction = ({
  action = "Add",
  objectRepresentation = "",
  when,
}: RecentActionProps) => {
  return (
    <TouchableOpacity disabled={action == "Delete"} style={styles.wrapper}>
      <View>
        {action == "Add" && (
          <Feather color={Colors.django.primary} name="plus" size={23} />
        )}
        {action == "Change" && (
          <Feather color={Colors.primary} name="edit-2" size={23} />
        )}
        {action == "Delete" && (
          <Feather color={Colors.error} name="x" size={23} />
        )}
      </View>
      <Flex column>
        <Typography fontSize={18}>{objectRepresentation}</Typography>
        <Typography fontSize={12}>{moment(when).fromNow()}</Typography>
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.grey,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    borderRadius: 5,
  },
});
