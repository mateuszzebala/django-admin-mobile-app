import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Link } from "expo-router";
import { ROUTES } from "@/app/routes";
import { CustomButton, CustomInput, Flex, Typography } from "../atoms";
import { DjangoModel } from "@/types";

const FilterInput = ({ value, setFilter, index }: any) => {
  const [val, setVal] = React.useState(value);

  React.useEffect(() => {
    setFilter((prev: string[]) => {
      prev[index] = val;
      return prev;
    });
  }, [val]);

  return (
    <Flex row justifyContent="center">
      <CustomInput
        wrapperStyle={{
          height: 60,
          flex: 1,
        }}
        placeHolder=""
        value={val}
        onChange={({ nativeEvent }) => {
          setVal(nativeEvent.text);
        }}
      />
      <CustomButton
        onPress={() =>
          setFilter((prev: any) =>
            prev.filter((filter: any, i: number) => index != i)
          )
        }
        backgroundColor={Colors.grey}
        style={{ height: 60, width: 60 }}
      >
        <Feather name="x" size={25} />
      </CustomButton>
    </Flex>
  );
};

export const FilterTableModal = ({ close, filter, setFilter }: any) => {
  const [fltr, setFltr] = React.useState<string[]>(filter);

  return (
    <Flex row alignItems="center" justifyContent="center">
      <View style={styles.modelWrapper}>
        <Flex row padding={5} justifyContent="space-between">
          <Typography fontWeight={"bold"} fontSize={17}>
            Filter
          </Typography>
          <Typography
            style={{ textDecorationLine: "underline" }}
            fontWeight={"bold"}
            fontSize={17}
          >
            <Link href={ROUTES.SEARCH_HELP()}>How it works?</Link>
          </Typography>
        </Flex>
        <ScrollView style={styles.modalScroll}>
          <Flex column padding={0} gap={10}>
            {fltr.map((fl: string, index: number) => (
              <FilterInput
                key={index}
                index={index}
                setFilter={setFltr}
                value={fl}
              />
            ))}
            <CustomButton
              icon={<Feather name="plus" size={20} />}
              backgroundColor={Colors.grey}
              style={{ height: 50 }}
              iconPosition="right"
              onPress={() => setFltr((prev: any) => [...prev, ""])}
            >
              Create new filter
            </CustomButton>
          </Flex>
        </ScrollView>
        <Flex row>
          <CustomButton
            style={styles.modalButton}
            backgroundColor={Colors.grey}
            onPress={close}
          >
            Cancel
          </CustomButton>
          <CustomButton
            icon={<Feather name="search" size={20} />}
            style={styles.modalButton}
            iconPosition="right"
            onPress={() => {
              setFilter(fltr);
              close();
            }}
          >
            Search
          </CustomButton>
        </Flex>
      </View>
    </Flex>
  );
};

type FilterTableInputProps = {
  modelData?: DjangoModel;
  filter: string[];
  setFilter: any;
  queryError: boolean;
};

export const FilterTableInput = ({
  modelData,
  queryError,
  setFilter,
  filter,
}: FilterTableInputProps) => {
  const modal = useModal();

  const handlePress = () => {
    modal.create({
      component: FilterTableModal,
      props: {
        modelData,
        filter,
        setFilter,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handlePress}>
      <Flex row gap={10} alignItems="center">
        {queryError ? <MaterialIcons name="error-outline" size={24} /> : <></>}
        <Text style={{ fontSize: 17 }}>Filters ({filter.length})</Text>
      </Flex>
      <Feather name="filter" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.grey,
    padding: 15,
    borderRadius: 10,
  },
  modelWrapper: {
    padding: 15,
    minWidth: 350,
    minHeight: 450,
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
  },
  modalButton: {
    paddingVertical: 5,
    height: 50,
    width: 155,
  },
  modalScroll: {
    flex: 1,
  },
  filterField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.grey,
    height: 50,
    borderRadius: 10,
    width: 320,
  },
  filterFieldButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.grey,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 85,
  },
  filterFieldButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
