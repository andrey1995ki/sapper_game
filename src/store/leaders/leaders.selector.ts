import {RootState} from "../store";

export const LeadersSelector = (store: RootState) => {
    return store.leaders
}
