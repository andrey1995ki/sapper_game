import {LeadersData} from "../../../../store/leaders/leaders.model";
import {Difficulty, GameStatus} from "../../../../store/app/app.model";
import {Dispatch, SetStateAction} from "react";

export interface ModalBodyProps {
    leaderArray: Array<LeadersData>
    gameStatus: GameStatus
    difficulty: Difficulty | undefined
    time: number
    place: number
    theme: 'dark' | 'light'
    closeModal: () => void
    setName: Dispatch<SetStateAction<string>>

}
