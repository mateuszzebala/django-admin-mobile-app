import { ErrorsInfoModalForm } from "@/components/modalForms/ErrorsInfoModalForm";
import { ModelForm } from "@/components/models/ModelForm";
import { TopBarButton } from "@/components/navigation/TopBarButton";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import { convertIntoFormData } from "@/utils/apiUtils";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ROUTES } from "../routes";
import { noneFunction } from "@/utils/valueFunctions";
import useApi from "@/hooks/useAPI";
import { actions } from "@/api/actions";
import { Flex, Loading } from "@/components/atoms";
import {
  CreateEditItemResponse,
  DjangoModel,
  DjangoModelField,
  ModelResponse,
} from "@/types";

export default function ModelCreateScreen() {
  const { app, modelName } = useGlobalSearchParams();
  const navigation = useNavigation();
  const [modelData, setModelData] = React.useState<DjangoModel>();
  const [values, setValues] = React.useState<any>(null);
  const [functions, setFunctions] = React.useState<any>(null);
  const router = useRouter();
  const modal = useModal();
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
        action: actions.createItem,
        args: [
          app,
          modelName,
          convertIntoFormData(values, modelData, functions),
        ],
        callback: (data: CreateEditItemResponse) => {
          if (data.item && !data.errors.length) {
            router.push(ROUTES.ITEM(app + "", modelName + "", data.item.pk));
          } else if (data.errors.length) {
            modal.create({
              component: ErrorsInfoModalForm,
              props: { errors: data.errors },
            });
            navigation.setOptions({
              headerRight: () => (
                <TopBarButton icon="save" onPress={handleSave} />
              ),
            });
          } else {
            navigation.setOptions({ headerRight: () => <></> });
          }
        },
        error: () => {
          navigation.setOptions({
            headerRight: () => (
              <TopBarButton icon="save" onPress={handleSave} />
            ),
          });
        },
      });
    }
  };

  const checkIfCorrect = (): boolean => {
    if (!modelData) return false;
    return modelData.fields.every((field) => {
      if (field.auto_created) return true;
      if (values[field.name] == null && !field.null) return false;
      return true;
    });
  };

  const enableSave = (enable: boolean) => {
    navigation.setOptions({
      headerRight: () =>
        enable ? <TopBarButton icon="save" onPress={handleSave} /> : <></>,
    });
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: `New ${modelName}`,
    });
  }, [app, modelName]);

  React.useEffect(() => {
    enableSave(checkIfCorrect());
  }, [values ? Object.values(values) : null]);

  React.useEffect(() => {
    api({
      action: actions.getModel,
      args: [app, modelName],
      callback: (data: ModelResponse) => {
        setModelData(data.model);
        setValues(
          data.model?.fields.reduce((acc: any, curr: DjangoModelField) => {
            acc[curr.name] = null;
            if (curr.default) acc[curr.name] = curr.default;
            if (curr.relation.is_relation) {
              if (curr.type == "ManyToManyField")
                acc[curr.name] = { items: [], ...curr.relation.model };
              else acc[curr.name] = { pk: null, ...curr.relation.model };
            }
            if (["ImageField", "FileField"].includes(curr.type)) {
              acc[curr.name] = { value: false };
            }
            if (curr.type == "BooleanField" && !curr.null)
              acc[curr.name] = false;
            return acc;
          }, {})
        );
        setFunctions(
          data.model?.fields.reduce((acc: any, curr: DjangoModelField) => {
            acc[curr.name] = noneFunction;
            return acc;
          }, {})
        );
      },
    });
  }, [app, modelName]);

  return (
    <ScrollView>
      <Flex column padding={20} gap={10} style={{ flex: 1 }}>
        {modelData && values && functions && (
          <ModelForm
            values={values}
            modelData={modelData}
            itemData={{ pk: null, __str__: "", fields: {} }}
            functions={functions}
            setFieldFunction={(name: string, fnc: any) => {
              setFunctions((prev: any) => ({
                ...prev,
                [name]: fnc,
              }));
            }}
            setFieldValue={(name: string, value: any) => {
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
