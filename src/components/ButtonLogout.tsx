import { FC } from "react";
import { Logout } from "heroicons-react";

interface ButtonLogoutProps {
    onClick?: () => void;
    color?: string;
}

export const ButtonLogout: FC<ButtonLogoutProps> = (props) => {
    return (
        <div className="flex hover:bg-green-600 h-10 w-10 items-center justify-center" onClick={props.onClick}>
            <Logout color={props.color ?? "white"} />
        </div>
    );
};
