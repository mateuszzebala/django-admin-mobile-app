import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { stringRepresentationOfValue } from "@/utils/utils";
import { Flex, Typography } from "../atoms";
import { DjangoModelField, DjangoModelFieldType } from "@/types";

type ModelFieldProps = {
  type: DjangoModelFieldType;
  name?: string;
  description?: string;
  fieldData: DjangoModelField;
  value: any;
};

export const ModelFieldNotEditable = ({
  type,
  name = "",
  description = "",
  fieldData,
  value,
}: ModelFieldProps) => {
  if (!value) return <></>;
  return (
    <Flex column>
      <TouchableOpacity onPress={() => alert(name)}>
        <Typography fontWeight={"bold"} fontSize={17}>
          {name}
        </Typography>
      </TouchableOpacity>
      <Typography fontSize={12}>{type}</Typography>
      <Typography fontSize={20}>
        {stringRepresentationOfValue(value, fieldData?.type)}
      </Typography>
      {description && <Typography fontSize={12}>{description}</Typography>}
    </Flex>
  );
};
