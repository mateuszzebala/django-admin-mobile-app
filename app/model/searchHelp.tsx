import { Flex, Typography } from "@/components/atoms";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ScrollView } from "react-native";

export default function SearchHelpScreen() {
  return (
    <ScrollView>
      <Flex column padding={20}>
        <Typography fontSize={28} fontWeight={"bold"}>
          This is how searching works:
        </Typography>
        <Typography></Typography>
        <Typography>Example search:</Typography>
        <Typography fontSize={20} fontWeight={"bold"}>
          username__startswith="a"
        </Typography>
        <Typography></Typography>
        <Typography>Construction:</Typography>
        <Typography fontSize={20} fontWeight={"bold"}>
          fieldname__option=value
        </Typography>
        <Typography></Typography>
        <Typography>
          Just type field name and there is couple of options to each field. You
          can read more here:
        </Typography>
        <Typography
          fontWeight={"bold"}
          underline
          style={{ color: Colors.django.primary }}
        >
          <Link href="https://docs.djangoproject.com/en/5.0/topics/db/queries/">
            https://docs.djangoproject.com/en/5.0/topics/db/queries/
          </Link>
        </Typography>
        <Typography></Typography>
        <Typography fontWeight={"bold"}>
          Remember that letters are case sensitive!
        </Typography>
        <Typography></Typography>
        <Typography fontWeight={"bold"}>Possible options:</Typography>
        {[
          { text: "Grater than", value: "__gt", valueType: "field" },
          { text: "Lower than", value: "__lt", valueType: "field" },
          { text: "Lower or equal than", value: "__lte", valueType: "field" },
          {
            text: "Grater or equal than",
            value: "__gte",
            valueType: "field",
          },
          { text: "Contains", value: "__contains", valueType: "string" },
          { text: "Starts With", value: "__startswith", valueType: "string" },
          { text: "Ends With", value: "__endswith", valueType: "string" },
          { text: "Is null", value: "__isnull", valueType: "boolean" },
          { text: "Year", value: "__year", valueType: "number" },
          { text: "Month", value: "__month", valueType: "number" },
          { text: "Day", value: "__day", valueType: "number" },
          { text: "Hours", value: "__hours", valueType: "number" },
          { text: "Minutes", value: "__minutes", valueType: "number" },
          { text: "Seconds", value: "__seconds", valueType: "number" },
        ].map((item) => (
          <Typography key={item.value} fontSize={18}>
            {item.value} - {item.text}
          </Typography>
        ))}
        <Typography></Typography>
        <Typography fontWeight={"bold"}>Possible values:</Typography>
        <Typography fontSize={18}>"string" - String Value</Typography>
        <Typography fontSize={18}>true / false - Boolean Value</Typography>
        <Typography fontSize={18}>null - Null Value</Typography>
        <Typography fontSize={18}>0 - Number Value</Typography>
      </Flex>
    </ScrollView>
  );
}
