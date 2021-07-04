import { FC } from "react";
import { ButtonX } from "../../../../components/ButtonX";
import { KeranjangPupuk } from "../../../../models/KeranjangPupuk";
import { InputQuantity } from "./InputQuantity";

interface KeranjangPupukItemProps {
    keranjangPupuk: KeranjangPupuk;
    onClick?: () => void;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove?: () => void;
    error?: boolean;
    min?: number;
    max?: number;
}
export const KeranjangPupukItem: FC<KeranjangPupukItemProps> = (props) => {
    return (
        <div className="flex shadow-md p-4">
            <img
                alt={props.keranjangPupuk.kuotaPupukPetani.pupuk.nama}
                src={props.keranjangPupuk.kuotaPupukPetani.pupuk.foto}
                className="w-16 h-16"
            />
            <div className="ml-2 flex-1">
                <div className="text-green-700">{props.keranjangPupuk.kuotaPupukPetani.pupuk.nama}</div>
                <div className="text-gray-600">{props.keranjangPupuk.kuotaPupukPetani.pupuk.deskripsi ?? "-"}</div>
                <div className="text-gray-600">{+props.keranjangPupuk.kuotaPupukPetani.pupuk.harga}</div>
                <div className="text-gray-600">Kuota {+props.keranjangPupuk.kuotaPupukPetani.kuota} Kg</div>
            </div>
            <div className="flex flex-col items-end">
                <div className="mb-2">
                    <ButtonX onClick={props.onRemove} />
                </div>
                <div>
                    <InputQuantity
                        min={props.min}
                        max={props.max}
                        error={props.error}
                        type="number"
                        value={props.keranjangPupuk.jumlah.toString()}
                        onChange={props.onChange}
                    />
                </div>
                {props.error && <div className=" mt-2 text-sm text-red-600">Jumlah tidak boleh 0</div>}
            </div>
        </div>
    );
};
