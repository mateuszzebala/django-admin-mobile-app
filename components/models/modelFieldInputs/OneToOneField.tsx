import { SelectItemModalForm } from "@/components/modalForms/SelectItemModelForm";
import { FieldProps } from "./Field";
import { CustomButton } from "@/components/atoms";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";

export const OneToOneField = ({
  value,
  setValue,
  fieldData,
  itemData,
  modelData,
}: FieldProps) => {
  const modal = useModal();

  const handlePress = () => {
    modal.create({
      component: SelectItemModalForm,
      title: "Select",
      props: {
        value,
        fieldData,
        itemData,
        single: false,
        modelData,
      },
      todo: (val) => {
        setValue((prev: any) => ({ ...prev, pk: val }));
      },
    });
  };

  return (
    <CustomButton onPress={handlePress} backgroundColor={Colors.grey}>
      {value ? `${value.model_name} ( ${value.pk} ) ` : "SELECT"}
    </CustomButton>
  );
};
