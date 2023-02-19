import {RootState} from "../store";

export const AppSelector = (store: RootState) => {
    return store.app
}
