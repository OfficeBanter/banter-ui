// create basic functional react component
// export component

import React from "react";
// LoadingContext.js
import { createContext, useContext, useState } from "react";
import { Toast as ToastFlowbite, Alert } from "flowbite-react";

// create a typscrpt interface for a object that has string keys and boolean values

interface ToastContext {
  toasts: ToastType[];
  addToast: (toast: ToastType) => void;
  setBanner: (banner: BannerType) => void;
  banner: BannerType;
}
const ToastContext = createContext<ToastContext | null>(null);

interface ToastType {
  type: "success" | "error" | "warning";
  message: string;
}

interface BannerType {
  type: "success" | "failure" | "warning";
  message: string;
}

export function ToastProvider({ children }) {
  const [banner, setBannerInternal] = useState<BannerType | null>(null);
  const [toasts, setToastInternal] = useState<ToastType[]>([]);

  const addToast = ({ type, message }: ToastType) => {
    setToastInternal((toasts) => [...toasts, { type, message }]);
    setTimeout(() => {
      setToastInternal((toasts) => toasts.slice(1));
    }, 5000);
  };

  const setBanner = (newBanner: BannerType | null) => {
    setBannerInternal(newBanner);
  };

  const value = {
    addToast,
    setBanner,
    toasts,
    banner,
  };
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast(): ToastContext {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}

export default () => {
  const context = useContext(ToastContext);

  return (
    <>
      {context?.banner?.message && (
        <Alert
          color={context.banner.type}
          onDismiss={() => {
            context.setBanner(null);
          }}
        >
          <span>
            <span className="font-medium">Info alert!</span> Change a few things
            up and try submitting again.
          </span>
        </Alert>
      )}
      {context?.toasts?.map(({ message, type }) => {
        let Icon = Success;
        if (type === "success") Icon = Success;
        if (type === "error") Icon = Error;
        if (type === "warning") Icon = Warning;

        return (
          <ToastFlowbite className="fixed bottom-10 right-6">
            <Icon />
            <div className="ml-3 text-sm font-normal">{message}</div>
            <ToastFlowbite.Toggle />
          </ToastFlowbite>
        );
      })}
    </>
  );
};

const Success = () => (
  <div
    className={`
inline-flex flex-shrink-0 justify-center items-center w-8 h-8
text-green-500 bg-green-100 rounded-lg
dark:bg-green-800 dark:text-green-200
`}
  >
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Check icon</span>
  </div>
);

const Error = () => (
  <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Error icon</span>
  </div>
);

const Warning = () => (
  <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Warning icon</span>
  </div>
);
