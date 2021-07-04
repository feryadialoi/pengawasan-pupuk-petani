import { FC } from "react";

interface ButtonProps {
    onClick?: () => void;
    light?: boolean;
    className?: string;
    disabled?: boolean;
}
export const Button: FC<ButtonProps> = (props) => {
    const buttonBackgroundTheme = () => {
        if (props.light) {
            if (props.disabled) {
                return "bg-gray-400";
            } else {
                return "bg-white";
            }
        } else {
            if (props.disabled) {
                return "bg-gray-400";
            } else {
                return "bg-green-500";
            }
        }
    };

    const buttonTextTheme = () => {
        if (props.light) {
            if (props.disabled) {
                return "text-white";
            } else {
                return "text-green-600";
            }
        } else {
            if (props.disabled) {
                return "text-white";
            } else {
                return "text-white";
            }
        }
    };

    return (
        <button
            disabled={props.disabled}
            className={`
            ${buttonBackgroundTheme()}
            h-10 rounded-md
            ${buttonTextTheme()}
            ${props.light ? "border-green-500 border-2" : ""}
            font-medium 
            px-4
            focus:ring-green-300
            focus:ring
            focus:outline-none
            outline-none
            ${props.className ?? ""}`}
            onClick={() => {
                if (!props.disabled) {
                    if (props.onClick) {
                        props.onClick();
                    }
                }
            }}
        >
            {props.children}
        </button>
    );
};
