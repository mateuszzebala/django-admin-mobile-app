import { DropdownButton, DropdownModalForm } from "@/components/atoms";
import { FilterTableInput } from "@/components/models/FilterTableInput";
import { ItemsTable } from "@/components/models/ItemsTable";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import useCounter from "@/hooks/useCounter";
import useListState from "@/hooks/useListState";
import useLoading from "@/hooks/useLoading";
import useToggle from "@/hooks/useToggle";
import { stringEllipsis, toString } from "@/utils/stringUtils";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ROUTES } from "../routes";
import { ConfirmModalForm } from "@/components/modalForms/ConfirmModalForm";
import useApi from "@/hooks/useAPI";
import { actions } from "@/api/actions";
import { CustomButton, Flex, Typography } from "@/components/atoms";
import { DjangoModel, ItemsResponse, ModelResponse } from "@/types";

const convertQuery = (filters: string[]) => {
  const query: any = {};

  filters.forEach((filter: string) => {
    try {
      const [key, value] = filter.split("=");

      if (!key || !value) throw new Error("Search Error");

      if (value.startsWith('"') && value.endsWith('"')) {
        query[key] = value.slice(1, value.length - 1).toString();
      } else if (!isNaN(parseFloat(value))) {
        query[key] = parseFloat(value);
      } else if (value.toLocaleLowerCase() == "true") {
        query[key] = true;
      } else if (value.toLocaleLowerCase() == "false") {
        query[key] = false;
      } else if (value.toLocaleLowerCase() == "null") {
        query[key] = null;
      } else {
        query[key] = value;
      }
    } catch {}
  });

  return JSON.stringify(query);
};

export default function ModelSearchScreen() {
  const asc = useToggle(true);
  const [orderBy, setOrderBy] = React.useState("pk");
  const { app, modelName }: Partial<{ app: string; modelName: string }> =
    useGlobalSearchParams();
  const selected = useListState([]);
  const allSelected = useToggle(false);
  const modal = useModal();
  const items = useListState([]);
  const [itemsData, setItemsData] = React.useState({ allLength: 0 });
  const [data, setData] = React.useState<DjangoModel>();
  const dataLoading = useLoading(true);
  const itemsLoading = useLoading(true);
  const reload = useCounter();
  const [limit, setLimit] = React.useState(30);
  const reloading = useLoading();
  const navigation = useNavigation();
  const router = useRouter();
  const [queryError, setQueryError] = React.useState(false);
  const [filter, setFilter] = React.useState([]);
  const [availableActions, setAvailableActions] = React.useState<any>([]);
  const api = useApi();

  React.useEffect(() => {
    reloading.enable();

    api({
      action: actions.getItems,
      args: [
        app,
        modelName,
        {
          limit: limit.toString(),
          sort: orderBy,
          asc: asc.value ? "true" : "false",
          query: convertQuery(filter),
        },
      ],
      callback: (data: ItemsResponse) => {
        items.setItems(data.items);
        setQueryError(data.queryError);
        setItemsData({ allLength: data.length });
        itemsLoading.disable();
        reloading.disable();
      },
    });
  }, [orderBy, asc.value, reload.value, limit, filter]);

  React.useEffect(() => {
    selected.setItems((prev) =>
      prev.filter((selectedItem) =>
        items.items.some((item) => item.pk == selectedItem)
      )
    );
  }, [items.items]);

  React.useEffect(() => {
    dataLoading.enable();
    navigation.setOptions({
      title: stringEllipsis(toString(modelName), 20),
    });

    api({
      action: actions.getModel,
      args: [app, modelName],
      callback: (data: ModelResponse) => {
        setData(data.model);
        setAvailableActions(data.model.actions);
        dataLoading.disable();
      },
    });
  }, [app, modelName]);

  React.useEffect(() => {
    allSelected.setValue(selected.items.length === itemsData.allLength);
  }, [selected.items]);

  const handleSelect = () => {
    if (selected.items.length > 0) {
      selected.clear();
    } else {
      allSelected.setValue(true);
      selected.setItems(items.items.map((item) => item.pk));
    }
  };

  const handleDelete = () => {
    api({
      action: actions.deleteItems,
      args: [app, modelName, selected.items.join(",")],
      callback: () => {
        reload.add();
      },
      error: () => {
        reload.add();
      },
    });
  };

  const makeAnAction = (action: [string, string]) => {
    const [action_code, _] = action;

    api({
      action: actions.makeAnAction,
      args: [app, modelName, action_code, selected.items.join(",")],
      callback: () => {
        reload.add();
      },
      error: () => {
        reload.add();
      },
    });
  };

  return (
    <Flex column padding={10} gap={10} style={{ height: "100%" }}>
      <Flex row padding={1} justifyContent="space-between" alignItems="center">
        <Typography fontWeight={"bold"} fontSize={20}>
          {data?.model_name}
        </Typography>
        <Flex row gap={10} style={{ flex: 1 }} justifyContent="flex-end">
          {!dataLoading.is && data?.permissions.add && (
            <CustomButton
              style={styles.btn}
              onPress={() => {
                router.push(ROUTES.CREATE(app + "", modelName + ""));
              }}
              icon={<Feather name="plus" color={Colors.primary} size={27} />}
            />
          )}
          <CustomButton
            style={styles.btn}
            onPress={handleSelect}
            icon={<Feather name="check" color={Colors.primary} size={27} />}
          />
          <DropdownButton
            style={styles.btn}
            backgroundColor={Colors.grey}
            menuStyle={{
              right: 0,
            }}
            icon={
              <Feather name="more-vertical" color={Colors.primary} size={27} />
            }
            elements={[
              {
                text: "Delete",
                icon: <Feather name={"trash"} size={20} />,
                onPress: handleDelete,
                disabled:
                  selected.items.length <= 0 || !data?.permissions.delete,
              },
              {
                text: `Sort by '${orderBy}'`,
                icon: <FontAwesome5 name={"sort"} size={20} />,
                onPress: () => {
                  modal.create({
                    component: DropdownModalForm,
                    props: {
                      elements: data?.fields
                        .filter((field) => !field.relation.is_relation)
                        .map((field) => ({
                          text: field.name,
                          onPress: () => setOrderBy(field.name),
                        })),
                    },
                  });
                },
              },
              {
                text: asc.value ? "A to Z" : "Z to A",
                icon: (
                  <FontAwesome
                    name={asc.value ? "sort-alpha-asc" : "sort-alpha-desc"}
                    size={20}
                  />
                ),
                onPress: asc.toggle,
              },
              {
                text: "Actions",
                icon: <Feather name={"play"} size={20} />,
                onPress: () => {
                  modal.create({
                    component: DropdownModalForm,
                    props: {
                      elements: availableActions
                        .filter((action: any) => action[0])
                        .map((action: any) => ({
                          text: action[1],
                          onPress: () => {
                            modal.create({
                              component: ConfirmModalForm,
                              text: "Are you sure?",
                              todo: () => {
                                makeAnAction(action);
                              },
                            });
                          },
                        })),
                    },
                  });
                },
                disabled: selected.items.length <= 0,
              },
            ]}
          />
        </Flex>
      </Flex>
      <FilterTableInput
        modelData={data}
        filter={filter}
        setFilter={setFilter}
        queryError={queryError}
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <ItemsTable
          selected={selected}
          app={data?.app}
          modelData={data}
          asc={asc}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          listDisplay={data?.list_display || []}
          items={items.items}
          isLoading={itemsLoading.is}
          reload={reload}
          reloading={reloading.is}
          setLimit={setLimit}
        />
      </View>
    </Flex>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 55,
    width: 55,
    padding: 0,
    backgroundColor: Colors.grey,
  },
});
