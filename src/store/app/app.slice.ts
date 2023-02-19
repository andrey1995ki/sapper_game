import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    AppState,
    CommonFieldAction,
    FieldAction,
    GameStatusAction,
    PreparationGameActions,
    StartGameAction
} from "./app.model";

const initialState: AppState = {
    gameField: [],
    bombCount: 0,
    bombField: [],
    gameStart: false,
    gameStatus: undefined,
    flagField: [],
    questionField: [],
    openField: [],
    difficulty: undefined,
    size: 'medium'
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        preparationGame(state, action: PayloadAction<PreparationGameActions>) {
            state.gameField = action.payload.gameField
            state.bombCount = action.payload.bombCount
            state.size = action.payload.size
            state.difficulty = action.payload.difficulty
        },
        startGame(state, action: PayloadAction<StartGameAction>) {
            state.gameStart = true
            state.bombField = action.payload.bombField
        },
        setGameStatus(state, action: PayloadAction<GameStatusAction>) {
            state.gameStatus = action.payload.gameStatus
        },
        addField(state, action: PayloadAction<CommonFieldAction>) {
            state[action.payload.type].push(action.payload.field)
        },
        removeField(state, action: PayloadAction<CommonFieldAction>) {
            state[action.payload.type] = state[action.payload.type].filter(field => field !== action.payload.field)
        },
        addOpenField(state, action: PayloadAction<FieldAction>) {
            state.openField = state.openField.filter(field => field !== action.payload.field).concat(action.payload.field)
        },
        resetGame(state, action: PayloadAction<any>) {
            state.bombField = []
            state.gameStart = false
            state.gameStatus = undefined
            state.flagField = []
            state.openField = []
            state.questionField = []
        }
    }
})
export const {
    preparationGame,
    startGame,
    setGameStatus,
    addOpenField,
    resetGame,
    addField,
    removeField
} = AppSlice.actions;

export default AppSlice.reducer
