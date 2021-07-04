import { FC } from "react";
import { ChevronLeft } from "heroicons-react";

interface ButtonBackProps {
    onClick?: () => void;
    color?: string;
}

export const ButtonBack: FC<ButtonBackProps> = (props) => {
    return (
        <div className="flex hover:bg-green-600 h-10 w-10 items-center justify-center" onClick={props.onClick}>
            <ChevronLeft color={props.color ?? "white"} />
        </div>
    );
};
