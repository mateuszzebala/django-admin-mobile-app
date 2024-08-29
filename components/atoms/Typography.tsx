import { Colors } from "@/constants/Colors";
import { ReactElement } from "react";
import { Text } from "react-native";

type TypographyProps = {
  children?: any;
  fontSize?: number;
  fontWeight?: any;
  color?: string;
  fontFamily?: string;
  style?: object;
  underline?: boolean;
};

export const Typography = ({
  children,
  fontSize,
  fontWeight,
  fontFamily,
  color = Colors.primary,
  style = {},
  underline = false,
}: TypographyProps) => {
  return (
    <Text
      style={[
        {
          fontFamily,
          fontSize,
          fontWeight,
          color,
          textDecorationColor: color,
          textDecorationLine: underline ? "underline" : "none",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
