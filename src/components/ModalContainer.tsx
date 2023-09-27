import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface IModalContainer {
  children: ReactNode,
  hide: () => void,
  isOpen: boolean,
  modalTitle?: string,
}

export default function ModalContainer({ children, hide, isOpen, modalTitle }: IModalContainer) {
  return (
    <Dialog open={isOpen} onClose={hide}>
      <div className="fixed inset-0 flex w-screen h-screen bg-black/60 items-center justify-center">
        <Dialog.Panel className="w-full max-w-md p-6 rounded-xl bg-bgModal">
          <div className="flex justify-between">
            <Dialog.Title>{modalTitle}</Dialog.Title>
            <button type="button" className="float-right outline-none" onClick={hide}>
              <XMarkIcon className="w-4 h-4 m-2" />
            </button>
          </div>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
