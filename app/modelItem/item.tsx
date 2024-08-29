import useLoading from "@/hooks/useLoading";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import { RefreshControl } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import useCounter from "@/hooks/useCounter";
import { useModal } from "@/context/ModelContext";
import { ConfirmModalForm } from "@/components/modalForms/ConfirmModalForm";
import { stringEllipsis, toString } from "@/utils/stringUtils";
import { convertIntoFormData } from "@/utils/apiUtils";
import { ModelForm } from "@/components/models/ModelForm";
import { ErrorsInfoModalForm } from "@/components/modalForms/ErrorsInfoModalForm";
import { noneFunction } from "@/utils/valueFunctions";
import useApi from "@/hooks/useAPI";
import { actions } from "@/api/actions";
import { Flex, Loading, LoadingView } from "@/components/atoms";
import {
  CreateEditItemResponse,
  DjangoItem,
  DjangoModel,
  DjangoModelField,
  ItemResponse,
  ModelResponse,
} from "@/types";

export default function ModelItemScreen() {
  const { app, modelName, pk } = useGlobalSearchParams();
  const dataLoading = useLoading(true);
  const counter = useCounter();
  const [data, setData] = React.useState<DjangoItem>();
  const [modelData, setModelData] = React.useState<DjangoModel>();
  const [somethingChanged, setSomethingChanged] = React.useState(false);
  const [functions, setFunctions] = React.useState<any>(null);
  const [values, setValues] = React.useState<any>({});

  const modal = useModal();
  const navigation = useNavigation();
  const api = useApi();

  const handleSave = () => {
    if (values && modelData) {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            <Loading size={1} color={Colors.background} />
          </View>
        ),
      });

      api({
        action: actions.putItem,
        args: [
          app,
          modelName,
          pk,
          convertIntoFormData(values, modelData, functions),
        ],
        callback: (data: CreateEditItemResponse) => {
          if (data.errors.length) {
            modal.create({
              component: ErrorsInfoModalForm,
              props: { errors: data.errors },
            });
          } else {
            setData(data.item);
            setValues(data.item.fields);
            counter.add(1);
            setSomethingChanged(false);
            navigation.setOptions({ headerRight: () => <></> });
          }
        },
        error: () => {
          navigation.setOptions({ headerRight: () => <></> });
        },
      });
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: stringEllipsis(toString(data?.__str__ || "-"), 20),
    });
  }, [data?.__str__]);

  React.useEffect(() => {
    api({
      action: actions.getModel,
      args: [app, modelName],
      callback: (data: ModelResponse) => {
        setModelData(data.model);
        setFunctions(
          data.model?.fields.reduce((acc: any, curr: DjangoModelField) => {
            acc[curr.name] = noneFunction;
            return acc;
          }, {})
        );
        api({
          action: actions.getItem,
          args: [app, modelName, pk],
          callback: (data: ItemResponse) => {
            setData(data.item);
            setValues(data.item.fields);
            setSomethingChanged(false);
            dataLoading.disable();
          },
        });
      },
    });

    navigation.setOptions({ headerRight: () => <></> });
  }, [counter.value]);

  React.useEffect(() => {
    if (somethingChanged)
      navigation.setOptions({
        headerRight: () => <TopBarButton icon="save" onPress={handleSave} />,
      });
    else navigation.setOptions({ headerRight: () => <></> });
  }, [somethingChanged, values ? Object.values(values) : null]);

  if (dataLoading.is) return <LoadingView size={3} />;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[Colors.background]}
          progressBackgroundColor={Colors.django.primary}
          refreshing={dataLoading.is}
          onRefresh={
            somethingChanged
              ? () =>
                  modal.create({
                    component: ConfirmModalForm,
                    text: "Are you sure you want to refresh? There is some unsaved changes!",
                    props: { yesButtonText: "YES" },
                    todo: counter.add,
                  })
              : counter.add
          }
        />
      }
    >
      <Flex column padding={20} gap={10} style={{ flex: 1 }}>
        {data && modelData && functions && (
          <ModelForm
            values={values}
            enableEdit={modelData.permissions.change}
            modelData={modelData}
            itemData={data}
            functions={functions}
            setFieldFunction={(name: string, fnc: any) => {
              setSomethingChanged(functions[name].name != fnc.name);
              setFunctions((prev: any) => ({
                ...prev,
                [name]: fnc,
              }));
            }}
            setFieldValue={(name: string, value: any) => {
              setSomethingChanged(values[name] != value);
              setValues((prev: any) => ({
                ...prev,
                [name]: value,
              }));
            }}
          />
        )}
      </Flex>
    </ScrollView>
  );
}
