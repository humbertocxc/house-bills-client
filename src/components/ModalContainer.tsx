import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

type Variant = 'white' | 'bgModal'

interface IModalContainer {
  children: ReactNode,
  hide: () => void,
  isOpen: boolean,
  modalTitle?: string,
  variant?: Variant,
}

export default function ModalContainer({ children, hide, isOpen, modalTitle, variant = 'bgModal' }: IModalContainer) {
  return (
    <Transition appear show={isOpen}>
      <Dialog onClose={hide} className="relative z-10">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-x-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-lg transform overflow-hidden rounded-2xl p-6
              text-left align-middle shadow-xl transition-all bg-${variant}`}>
                <div className="flex justify-between items-center">
                  <Dialog.Title className="font-semibold">{modalTitle}</Dialog.Title>
                  <button type="button" className="float-right outline-none" onClick={hide}>
                    <XMarkIcon className="w-4 h-4 m-2" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
