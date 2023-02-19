export interface ButtonsProps {
    callback: (value: any) => void
}

export interface ButtonsMenuProps extends ButtonsProps {
    description: string
    theme: 'dark' | 'light'
}
