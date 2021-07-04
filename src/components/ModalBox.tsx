import { FC, ReactChild, useState } from "react";
import { Button } from "./Button";

interface ModalBoxProps {
    title?: string;
    visible?: boolean;
    content?: ReactChild;
    onClose?: () => void;
    className?: string;
}

export const ModalBox: FC<ModalBoxProps> = (props) => {
    return props.visible ? (
        <div
            className={`
                transition-transform
                bg-opacity-80 absolute 
                w-screen h-screen px-4 
                py-8 bg-gray-900 flex 
                flex-col justify-center
                ${props.className}
                `}
        >
            <div className="bg-white flex flex-col h-full rounded">
                {/* header start */}
                <div className="flex items-center border-b-2">
                    <div className="flex-1 px-4 font-medium text-gray-600">{props.title}</div>
                    <div className="p-3">
                        <Button onClick={props.onClose}>TUTUP</Button>
                    </div>
                </div>
                {/* header end */}
                {/* content start */}
                <div className="flex flex-col flex-1 overflow-y-auto p-4">{props.content}</div>
                {/* content end */}
                {/* footer start */}
                {/* <div className="h-12 bg-green-500"><div>footer</div></div> */}
                {/* footer end */}
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export const useModalBox = () => {
    const [visible, isVisible] = useState(false);

    const modalBoxHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.FC<ModalBoxProps>] = [
        visible,
        isVisible,
        ModalBox,
    ];

    return modalBoxHook;
};
