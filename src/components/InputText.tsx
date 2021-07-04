import { FC } from "react";

interface InputTextProps {
    className?: string;
    noLabel?: boolean;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "number";
    value?: string;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    maxLength?: number;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputText: FC<InputTextProps> = (props) => {
    return (
        <div className="flex flex-col mb-4">
            {props.noLabel ? <></> : <label className="text-gray-600 font-medium">{props.label ?? "Label"}</label>}
            <div>
                <input
                    onKeyPress={props.onKeyPress}
                    maxLength={props.maxLength}
                    onKeyUp={props.onKeyUp}
                    value={props.value}
                    type={props.type ?? "text"}
                    className={`
                    focus:ring-green-300
                    focus:ring
                    outline-none
                    px-2 w-full
                    border-2
                    border-green-500 
                    rounded-md h-10
                    ${props.className || ""}
                    `}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};
