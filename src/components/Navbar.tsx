import { FC, useState } from "react";
import { ConditionalComponent } from "./CondionalComponent";
import { List } from "./List";

interface NavbarMenuItem {
    name: string;
    route: string;
}
const listOfNavbarMenuItem: NavbarMenuItem[] = [
    { name: "Jual Pupuk Subsidi", route: "/" },
    { name: "Cek Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
    { name: "Riwayat Jual Pupuk Subsidi", route: "/" },
];

interface NavbarProps {
    visible?: boolean;
    onClickBackground?: () => void;
    menus?: NavbarMenuItem[];
    title?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
    return props.visible ? (
        <div
            onClick={props.onClickBackground}
            className="
                bg-gray-900
                flex
                flex-col
                bg-opacity-80
                absolute
                w-screen
                h-screen"
        >
            <div
                className="
                    bg-green-500 
                    w-60
                    flex-1
                    shadow-md
                    overflow-y-auto
                    "
            >
                <div
                    className="
                    h-60 
                    flex
                    justify-center
                    items-center
                "
                >
                    <div className="text-white">{props.title ?? "Navbar"}</div>
                </div>
                <div>
                    <ConditionalComponent
                        condition={props.menus ? true : false}
                        true={
                            <List
                                data={props.menus!}
                                render={(item, itemIndex) => (
                                    <div className="bg-green-600 rounded-md m-2 p-4" key={itemIndex}>
                                        <div className="text-white overflow-ellipsis">{item.name}</div>
                                    </div>
                                )}
                            />
                        }
                        false={<></>}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export const useNavbar = () => {
    const [visible, isVisible] = useState(false);

    const navbar: [boolean, React.Dispatch<React.SetStateAction<boolean>>, FC<NavbarProps>] = [
        visible,
        isVisible,
        Navbar,
    ];

    return navbar;
};
