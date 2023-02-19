import {LeadersData} from "../store/leaders/leaders.model";

export const getLocalTheme = (): 'light' | 'dark' => {
    const theme = localStorage.getItem('theme') || 'dark';
    return theme as 'light' | 'dark'
}
export const setLocalTheme = (theme: 'dark' | 'light') => {
    localStorage.setItem('theme', theme)
}
export const getLocalLeaders = (): Array<LeadersData> => {
    let leaders = localStorage.getItem('leaders')
    return leaders ? JSON.parse(leaders) : []
}
export const setLocalLeaders = (leadersArray: Array<LeadersData>) => {
    localStorage.setItem('leaders', JSON.stringify(leadersArray))
}
