import { combineReducers } from "redux";
import { KelompokTaniReducer } from "./KelompokTani";
import { penjualanReducer } from "./Penjualan";
import { petaniReducer } from "./Petani";
import { pupukReducer } from "./Pupuk";

export const reducers = combineReducers({
    kelompokTani: KelompokTaniReducer,
    petani: petaniReducer,
    pupuk: pupukReducer,
    penjualan: penjualanReducer,
});
