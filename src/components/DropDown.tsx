import { ChevronDown } from "heroicons-react";
import { FC, ReactChild } from "react";
import { List } from "./List";

interface DropDownProps<T> {
    disabled?: boolean;
    label?: string;
    data: T[];
    option: (item: T, index: number) => ReactChild;
    defaultOption?: ReactChild;
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
    onChangeCapture?: (event: React.FormEvent<HTMLSelectElement>) => void;
}

export const DropDown = <T,>(props: DropDownProps<T>) => {
    return (
        <div className="flex flex-col">
            <label className="text-gray-600 font-medium">{props.label ?? "Label"}</label>
            <select
                onBlur={props.onBlur}
                onClick={props.onClick}
                onChange={props.onChange}
                onChangeCapture={props.onChangeCapture}
                value={props.value}
                defaultValue={props.defaultValue}
                className={`appearance-none
                focus:ring-green-300
                focus:ring
                outline-none
                bg-white px-2 w-full border-2 
                text-gray-600
                border-green-500 rounded-md h-10`}
            >
                {props.defaultOption}
                <List data={props.data} render={props.option} />
            </select>
            <div className="flex justify-end mr-2 -mt-8 pointer-events-none">
                <ChevronDown color="rgba(16, 185, 129)" />
            </div>
        </div>
    );
};

interface DropDownItemProps {
    value: any;
    disabled?: boolean;
}
export const DropDownItem: FC<DropDownItemProps> = (props) => {
    return (
        <option disabled={props.disabled} value={props.value}>
            {props.children}
        </option>
    );
};
