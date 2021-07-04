import { FC, ReactChild, useState } from "react";
import { Button } from "./Button";

interface ConfirmationBoxProps {
    title?: string;
    buttonYesTitle?: string;
    buttonNoTitle?: string;
    visible?: boolean;
    content?: ReactChild;
    onYesClick?: () => void;
    onNoClick?: () => void;
}

export const ConfirmationBox: FC<ConfirmationBoxProps> = (props) => {
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
                    <div className="font-medium text-gray-600">{props.title || "Alert Box"}</div>
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
                <div className="flex border-t-2 p-3">
                    <div className="flex flex-1 flex-col mr-2">
                        <Button onClick={props.onYesClick}>{props.buttonYesTitle}</Button>
                    </div>
                    <div className="flex flex-1 flex-col ml-2">
                        <Button light onClick={props.onNoClick}>
                            {props.buttonNoTitle}
                        </Button>
                    </div>
                </div>
                {/* footer end */}
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export const useConfirmationBox = () => {
    const [visible, isVisible] = useState(false);

    const confirmationBox: [boolean, React.Dispatch<React.SetStateAction<boolean>>, React.FC<ConfirmationBoxProps>] = [
        visible,
        isVisible,
        ConfirmationBox,
    ];

    return confirmationBox;
};
