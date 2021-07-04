import { FC } from "react";

interface InputQuantityProps {
    error?: boolean;
    noLabel?: boolean;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "number";
    value?: string;
    min?: number;
    max?: number;
}

export const InputQuantity: FC<InputQuantityProps> = (props) => {
    return (
        <div className="flex flex-col">
            {/* {props.noLabel ? <></> : <label className="text-gray-600 font-medium">{props.label ?? "Label"}</label>} */}
            <div>
                <input
                    min={props.min}
                    max={props.max}
                    value={props.value}
                    type={props.type ?? "text"}
                    className={`
                    text-right
                    focus:ring-green-300
                    focus:ring
                    outline-none
                    px-2
                    border-2 
                    ${props.error ? "border-red-600" : "border-green-500"}
                    w-20                   
                    rounded-md h-10`}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};
