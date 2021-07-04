import { FC } from "react";

interface OnboardingCardProps {
    title?: string;
    onClick?: () => void;
    image?: string;
}
export const OnboardingCard: FC<OnboardingCardProps> = (props) => {
    return (
        <div
            className="flex shadow flex-1 flex-col h-40 items-center justify-center m-2 rounded-md hover:bg-gray-50"
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            {props.image ? (
                <img alt={props.title} src={props.image} className="w-16 h-16 mb-4" />
            ) : (
                <div className="bg-green-500 w-16 h-16 mb-4"></div>
            )}
            <div className="text-green-600 font-bold">{props.title}</div>
        </div>
    );
};
