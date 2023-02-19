export type Difficulty = 'easy' | 'middle' | 'hard'
export type Size = 'extra-extra-large' | 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small'
export type GameStatus = 'win' | 'lose' | undefined

export interface AppState {
    gameField: number[]
    bombCount: number
    bombField: Array<string>
    gameStart: boolean
    gameStatus: GameStatus
    flagField: string[]
    questionField: string[]
    openField: string[]
    difficulty?: Difficulty
    size: Size
}

export interface PreparationGameActions {
    gameField: number[]
    bombCount: number
    size: Size
    difficulty?: Difficulty
}

export interface StartGameAction {
    bombField: string[]
}

export interface GameStatusAction {
    gameStatus: GameStatus
}

export interface FieldAction {
    field: string
}

export interface CommonFieldAction extends FieldAction {
    type: keyof Omit<AppState, 'gameStatus' | 'difficulty' | 'gameStart' | 'bombCount' | 'gameField' | 'size'>
}


