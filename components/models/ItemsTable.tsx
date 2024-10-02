import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { tableFieldView } from "@/utils/utils";
import { ROUTES } from "@/app/routes";
import { Flex, LoadingView } from "../atoms";
import { DjangoApp, DjangoItem, DjangoModel } from "@/types";

type ItemsTableProps = {
  items: DjangoItem[];
  listDisplay: string[];
  modelData?: DjangoModel;
  app?: DjangoApp;
  selected?: any;
  asc: {
    value: boolean;
    setValue: (value: boolean) => void;
    toggle: () => void;
  };
  orderBy: string;
  setOrderBy: (prev: any) => void;
  isLoading?: boolean;
  reload: any;
  setLimit: (prev: any) => void;
  reloading: boolean;
};

export const ItemsTable = ({
  listDisplay,
  items,
  asc,
  orderBy,
  modelData,
  app,
  selected,
  setOrderBy,
  isLoading,
  reload,
  setLimit,
  reloading,
}: ItemsTableProps) => {
  const [minWidth, setMinWidth] = React.useState(null);
  const [widthArr, setWidthArr] = React.useState(listDisplay.map(() => 0));

  React.useEffect(() => {
    if (minWidth === null) return;
    if (minWidth > 130 * listDisplay.length) {
      setWidthArr(listDisplay.map(() => minWidth / listDisplay.length));
    } else {
      setWidthArr(listDisplay.map(() => 130));
    }
  }, [listDisplay, items, app?.label, modelData?.model_name, minWidth]);

  const handleScrollLayout = (event: any) => {
    setMinWidth(event.nativeEvent.layout.width);
  };

  const handleScroll = ({ nativeEvent }: any) => {
    let mHeight = nativeEvent.layoutMeasurement.height;
    let cSize = nativeEvent.contentSize.height;
    let Y = nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) setLimit((prev: number) => prev + 30);
  };

  return (
    <View style={styles.container}>
      <View
        onLayout={handleScrollLayout}
        style={{ backgroundColor: "red", width: "100%" }}
      />
      {isLoading ||
      minWidth === null ||
      widthArr.reduce((acc: number, val: number) => acc + val, 0) < minWidth ? (
        <LoadingView size={2} />
      ) : (
        <>
          <ScrollView
            horizontal={true}
            style={{ width: "100%", flex: 1 }}
            refreshControl={
              <RefreshControl
                colors={[Colors.background]}
                refreshing={reloading}
                onRefresh={() => reload.add()}
                progressBackgroundColor={Colors.django.primary}
                progressViewOffset={80}
              />
            }
          >
            <Flex column gap={0} padding={0} style={{ flex: 1 }}>
              <Table>
                <TableWrapper style={styles.header}>
                  {listDisplay.map((header, index) => (
                    <Cell
                      width={widthArr[index]}
                      textStyle={styles.headerText}
                      key={index}
                      data={
                        <TouchableOpacity
                          onPress={() =>
                            setOrderBy((prev: any) => {
                              if (header == "__str__") return prev;
                              if (prev === header) asc.toggle();
                              else asc.setValue(true);
                              return header;
                            })
                          }
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontWeight:
                                orderBy === header ? "bold" : "normal",
                            }}
                          >
                            {header}{" "}
                            <FontAwesome
                              name={
                                asc.value ? "sort-alpha-asc" : "sort-alpha-desc"
                              }
                              color={
                                orderBy === header
                                  ? Colors.primary
                                  : Colors.django.primary
                              }
                            />
                          </Text>
                        </TouchableOpacity>
                      }
                    />
                  ))}
                </TableWrapper>
              </Table>
              <ScrollView style={styles.dataWrapper} onScroll={handleScroll}>
                <Table>
                  {items.map((rowData: DjangoItem, index: number) => (
                    <TableWrapper
                      key={index}
                      style={{
                        ...styles.row,
                        backgroundColor: selected.includes(rowData.pk)
                          ? Colors.django.primaryAccent
                          : index % 2 == 1
                          ? Colors.grey
                          : Colors.background,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onLongPress={() => {
                          if (!selected.includes(rowData.pk)) {
                            selected.push(rowData.pk);
                          } else {
                            selected.remove(rowData.pk);
                          }
                        }}
                        onPress={() =>
                          router.navigate(
                            ROUTES.ITEM(
                              app?.label + "",
                              modelData?.model_name + "",
                              rowData.pk
                            )
                          )
                        }
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        {listDisplay.map((header, index) => (
                          <Cell
                            width={widthArr[index]}
                            textStyle={styles.text}
                            key={index}
                            style={{ padding: 5 }}
                            data={
                              <Text
                                numberOfLines={1}
                                style={{
                                  textAlign: "center",
                                  fontWeight: selected.includes(rowData.pk)
                                    ? "bold"
                                    : "light",
                                }}
                              >
                                {modelData &&
                                  tableFieldView(modelData, rowData, header)}
                              </Text>
                            }
                          />
                        ))}
                      </TouchableOpacity>
                    </TableWrapper>
                  ))}
                </Table>
              </ScrollView>
            </Flex>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  header: {
    height: 60,
    backgroundColor: Colors.django.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "row",
  },
  headerText: { textAlign: "center", fontWeight: "bold" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: {
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    minHeight: 55,
    paddingVertical: 5,
    margin: 0,
  },
});
