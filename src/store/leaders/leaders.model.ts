import {Difficulty} from "../app/app.model";

export interface LeadersState {
    leaders: Array<LeadersData>
}

export interface LeadersData {
    name: string
    score: number
    difficulty: Difficulty
}

export interface AddInLeadersActions {
    name: string
    score: number
    difficulty: Difficulty
}
