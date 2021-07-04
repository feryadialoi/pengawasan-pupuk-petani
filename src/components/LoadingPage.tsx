import { FC } from "react";

interface LoadingPageProps {
    //
}
export const LoadingPage: FC<LoadingPageProps> = (props) => {
    return (
        <div
            className="                
                flex flex-1 flex-col
                justify-center items-center
                "
        >
            {props.children}
        </div>
    );
};
