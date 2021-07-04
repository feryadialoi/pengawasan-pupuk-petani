import { createStore, applyMiddleware, compose } from "redux";
import { KelompokTaniState } from "./reducers/KelompokTani";
import { PenjualanState } from "./reducers/Penjualan";
import { PetaniState } from "./reducers/Petani";
import { PupukState } from "./reducers/Pupuk";
import { reducers } from "./reducers/Reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface RootState {
    kelompokTani: KelompokTaniState;
    petani: PetaniState;
    pupuk: PupukState;
    penjualan: PenjualanState;
}

export const store = createStore(reducers, composeEnhancers(applyMiddleware()));
