import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const OverlayLoading = ({ open }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        open={open}
        onClose={() => {}}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <a href=""></a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                className="animate-spin"
                style={{
                  marginRight: "-2px",
                  display: "block",
                  backgroundRepeat: "initial",
                }}
              >
                <path
                  d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                  fill="#3351FF"
                  stroke="none"
                  transform="matrix(1,0,0,1,0,0)"
                  style={{
                    transform: "matrix(1, 0, 0, 1, 0, 0)",
                  }}
                />
              </svg>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OverlayLoading;
