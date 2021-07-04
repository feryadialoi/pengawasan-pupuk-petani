import { FC, ReactChild, useState } from "react";
import { Button } from "./Button";

interface AlertBoxProps {
    textColor?: "text-gray-600" | "text-red-600";
    title?: string;
    buttonTitle?: string;
    visible?: boolean;
    content?: ReactChild;
    onClose?: () => void;
}

export const AlertBox: FC<AlertBoxProps> = (props) => {
    return props.visible ? (
        <div
            className="
                bg-opacity-80
                absolute
                w-screen
                h-screen
                px-4
                py-8
                bg-gray-900
                flex
                flex-col
                justify-center
                items-center
            "
        >
            <div
                className="
                    max-w-xs
                    bg-white
                    flex
                    flex-col
                    rounded
                    w-full
                "
            >
                {/* header start */}
                <div
                    className="
                        flex
                        flex-col
                        h-12
                        items-center
                        justify-center
                        border-b-2
                    "
                >
                    <div className={`font-medium ${props.textColor ?? "text-gray-600"}`}>
                        {props.title || "Alert Box"}
                    </div>
                </div>
                {/* header end */}

                {/* content start */}
                <div
                    className="                        
                        flex flex-col flex-1 overflow-y-auto p-4
                    "
                >
                    {props.content}
                </div>
                {/* content end */}

                {/* footer start */}
                <div className="flex flex-col border-t-2 p-3">
                    <Button onClick={props.onClose}>{props.buttonTitle}</Button>
                </div>
                {/* footer end */}
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export const useAlertBox = () => {
    const [visible, isVisible] = useState(false);

    const alertBoxHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.FC<AlertBoxProps>] = [
        visible,
        isVisible,
        AlertBox,
    ];

    return alertBoxHook;
};
