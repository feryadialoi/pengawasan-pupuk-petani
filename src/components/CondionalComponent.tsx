import { FC, ReactChild } from "react";

interface ConditionalComponentProps {
    condition?: boolean;
    true: ReactChild;
    false: ReactChild;
}

export const ConditionalComponent: FC<ConditionalComponentProps> = (props) => {
    return props.condition ? <>{props.true}</> : <>{props.false}</>;
};
