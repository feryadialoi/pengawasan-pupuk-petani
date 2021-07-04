import { FC } from "react";
import { KuotaPupukPetani } from "../../../../models/KuotaPupukPetani";

interface KuotaPupukPetaniItemProps {
    kuotaPupukPetani: KuotaPupukPetani;
    onClick?: () => void;
}

export const KuotaPupukPetaniItem: FC<KuotaPupukPetaniItemProps> = (props) => {
    return (
        <div
            onClick={props.onClick}
            className={`
                shadow-md flex p-4 mb-4 hover:bg-gray-100
            `}
        >
            <img
                alt={props.kuotaPupukPetani.pupuk.nama}
                src={props.kuotaPupukPetani.pupuk.foto}
                className="w-16 h-16"
            />
            <div className="ml-2">
                <div className="text-gray-600">{props.kuotaPupukPetani.pupuk.nama}</div>
                <div className="text-gray-600">{+props.kuotaPupukPetani.pupuk.harga}</div>
                <div
                    className={`
                        ${+props.kuotaPupukPetani.kuota === 0 ? "text-red" : "text-gray-600"}
                    `}
                >
                    {+props.kuotaPupukPetani.kuota} Kg
                </div>
            </div>
        </div>
    );
};
