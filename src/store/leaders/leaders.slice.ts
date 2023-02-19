import {AddInLeadersActions, LeadersState} from "./leaders.model";
import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {changeLeaders} from "./leaders.utils";
import {getLocalLeaders} from "../../commonUtils/localStorage";

const initialState: LeadersState = {
    leaders: getLocalLeaders()
}
const LeadersSlice = createSlice({
    name: 'leaders',
    initialState,
    reducers: {
        addInLeaders(state, action: PayloadAction<AddInLeadersActions>) {
            state.leaders = changeLeaders(current(state).leaders, action.payload.difficulty, action.payload)
        }
    }
})
export const {addInLeaders} = LeadersSlice.actions

export default LeadersSlice.reducer
