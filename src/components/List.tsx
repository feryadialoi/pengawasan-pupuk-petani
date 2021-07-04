import { ReactChild } from "react";

interface ListProps<T> {
    data: T[];
    render: (item: T, index: number) => ReactChild;
}

export const List = <T,>(props: ListProps<T>) => {
    return <>{props.data.map(props.render)}</>;
};
