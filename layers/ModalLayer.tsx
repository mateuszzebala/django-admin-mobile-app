import React from "react";
import { LayerProps } from "./Layers";
import {
  defaultModalContext,
  ModalContext,
  ModalType,
  useModal,
} from "@/context/ModelContext";
import { View } from "react-native";
import { Modal } from "@/components/atoms";

const Modals = () => {
  const [modalData] = React.useContext(ModalContext);
  const modalHook = useModal();
  return (
    <View>
      {modalData.map((modal: ModalType) => (
        <Modal
          key={modal.id}
          title={modal.title}
          close={() => modalHook.close(modal.id)}
          withTopBar={modal.withTopBar}
          startUrl={modal.startUrl}
        >
          <modal.component
            {...modal.props}
            modal={modal}
            close={() => modalHook.close(modal.id)}
            todo={modal.todo}
          />
        </Modal>
      ))}
    </View>
  );
};

export const ModalLayer = ({ next }: LayerProps) => {
  const [modalData, setModalData] = React.useState(defaultModalContext);
  return (
    <ModalContext.Provider value={[modalData, setModalData]}>
      {next}
      <Modals />
    </ModalContext.Provider>
  );
};
