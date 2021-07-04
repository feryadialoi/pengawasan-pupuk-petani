import { X } from "heroicons-react";
import { FC } from "react";

interface ButtonXProps {
    onClick?: () => void;
}

export const ButtonX: FC<ButtonXProps> = (props) => {
    return (
        <div onClick={props.onClick} className="p-2 hover:bg-gray-200">
            <X color="rgba(107, 114, 128)" />
        </div>
    );
};
