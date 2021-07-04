import { FC, ReactChild } from "react";

interface HeaderProps {
    title?: string;
    left?: ReactChild;
    right?: ReactChild;
}

export const Header: FC<HeaderProps> = (props) => {
    return (
        <div className={`flex px-2 shadow-md bg-green-500 h-14`}>
            <div className="flex flex-1 items-center">
                <div>{props.left}</div>
                <div className="flex flex-1 px-2 items-center text-white font-medium text-lg">
                    <div className="">{props.title ?? "Title"}</div>
                </div>
                <div>{props.right}</div>
            </div>
        </div>
    );
};

// TODO set header to fixed position
