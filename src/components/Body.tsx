import { FC } from "react";

interface BodyProps {
    padding?: "sm" | "md" | "lg";
}

export const Body: FC<BodyProps> = (props) => {
    const padding = () => {
        switch (props.padding) {
            case "sm":
                return "p-2";
            case "md":
                return "p-4";
            case "lg":
                return "p-5";
            default:
                return "p-4";
        }
    };

    return (
        <div
            className={`
                flex flex-1 flex-col
                overflow-y-auto
                ${padding()}
            `}
        >
            {props.children}
        </div>
    );
};
