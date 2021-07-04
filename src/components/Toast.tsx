import { Check } from "heroicons-react";
import { FC, useState } from "react";

interface ToastProps {
    message?: string;
    visible?: boolean;
}
export const Toast: FC<ToastProps> = (props) => {
    return props.visible ? (
        <div
            className="absolute
                inset-x-8
                bottom-12
                p-4 z-50
                flex flex-col
                rounded-md shadow 
                bg-green-400
                items-center
                "
        >
            <Check color="white" />
            <div className="text-white">{props.message || "Notifikasi"}</div>
        </div>
    ) : (
        <></>
    );
};

export const useToast = () => {
    const [toastVisible, isToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const showToast = (message?: string) => {
        isToastVisible(false);
        isToastVisible(true);
        setToastMessage(message || "Berhasil");
        setTimeout(() => {
            isToastVisible(false);
            setToastMessage("");
        }, 700);
    };
    const toast: [boolean, string, (message?: string) => void, FC<ToastProps>] = [
        toastVisible,
        toastMessage,
        showToast,
        Toast,
    ];

    return toast;
};
