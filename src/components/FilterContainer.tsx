import { ChevronDown, ChevronUp } from "heroicons-react";
import { FC, ReactNode, useState } from "react";
import { ConditionalComponent } from "./CondionalComponent";

interface FilterContainerProps {
    reverseVisible?: boolean;
}

export const FilterContainer: FC<FilterContainerProps> = (props) => {
    const [filterVisible, isFilterVisible] = useState(props.reverseVisible);
    return (
        <div className="shadow-md mb-4">
            <div
                className="p-4 bg-green-400 flex justify-between"
                onClick={() => {
                    isFilterVisible(!filterVisible);
                    console.log("toggle filter");
                }}
            >
                <div className="text-white font-medium">Filter</div>
                <ConditionalComponent
                    condition={filterVisible}
                    false={<ChevronDown color="white" />}
                    true={<ChevronUp color="white" />}
                />
            </div>
            {filterVisible && props.children}
        </div>
    );
};
