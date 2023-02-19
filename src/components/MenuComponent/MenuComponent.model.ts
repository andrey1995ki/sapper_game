export interface CustomGameProps {
    theme: 'dark' | 'light',
    choiceGame: (field: number[], bomb: number) => void
}

export interface CustomData {
    xCount: number,
    yCount: number,
    bomb: number
}
