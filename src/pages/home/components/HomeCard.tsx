import { FC } from "react";

interface HomeCardProps {
    title?: string;
    onClick?: () => void;
}

export const HomeCard: FC<HomeCardProps> = (props) => {
    return (
        <div
            //
            onClick={props.onClick}
            className={`shadow-md mb-4 h-28 p-4 hover:bg-gray-50`}
        >
            <div className="text-gray-600 font-medium bg">{props.title}</div>
        </div>
    );
};
