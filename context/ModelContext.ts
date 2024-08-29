import { generateRandomId } from "@/utils/utils";
import { useUnstableGlobalHref } from "expo-router";
import React, { createContext } from "react";

export type ModalType = {
  title?: string;
  component?: any;
  todo?: (val?: any) => void;
  id?: string;
  withTopBar?: boolean;
  startUrl?: string;
  props?: any;
  text?: string;
};

export const defaultModalContext = [];

export const ModalContext = createContext<any[]>([null, () => {}]);

export const useModal = () => {
  const [modalData, setModalData] = React.useContext(ModalContext);
  const startUrl = useUnstableGlobalHref();
  return {
    create: (modal: ModalType): string => {
      const id = generateRandomId(30);
      setModalData((prev: any) => [...prev, { ...modal, id, startUrl }]);
      return id;
    },
    close: (id: any) => {
      setModalData((prev: any) =>
        prev.filter((modal: ModalType) => modal.id != id)
      );
    },
    modals: modalData,
  };
};
