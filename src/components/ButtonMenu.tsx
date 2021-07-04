import { FC } from "react";
import { Menu } from "heroicons-react";

interface ButtonMenuProps {
    onClick?: () => void;
    color?: string;
}

export const ButtonMenu: FC<ButtonMenuProps> = (props) => {
    return (
        <div className="flex hover:bg-green-600 h-10 w-10 items-center justify-center" onClick={props.onClick}>
            <Menu color={props.color ?? "white"} />
        </div>
    );
};
