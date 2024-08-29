import { FieldProps } from "./Field";
import { CustomButton } from "@/components/atoms";
import { SelectItemsModalForm } from "@/components/modalForms/SelectItemsModalForm";
import { Colors } from "@/constants/Colors";
import { useModal } from "@/context/ModelContext";
import { multipleWord } from "@/utils/stringUtils";

export const ManyToManyField = ({
  value,
  setValue,
  fieldData,
  modelData,
  itemData,
}: FieldProps) => {
  const modal = useModal();

  const handlePress = () => {
    modal.create({
      component: SelectItemsModalForm,
      title: "Select",
      props: {
        value,
        fieldData,
        itemData,
        single: false,
        modelData,
      },
      todo: (val) => {
        setValue((prev: any) => ({ ...prev, items: val }));
      },
    });
  };

  return (
    <CustomButton onPress={handlePress} backgroundColor={Colors.grey}>
      {value ? multipleWord(value.items.length, "item") : "SELECT"}
    </CustomButton>
  );
};
