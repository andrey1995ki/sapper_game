import {LeadersData} from "./leaders.model";
import {Difficulty} from "../app/app.model";
import {setLocalLeaders} from "../../commonUtils/localStorage";

/**
 * Функция сортирует лиедеров по заданной сложности
 * @param leadersArray Массив с лидерами
 * @param sortDifficulty Сложность по которой осуществляется сортировка
 * @return Array Отсортировананный и отфильтрованный массив
 */
export const sortLeaders = (leadersArray: Array<LeadersData>, sortDifficulty: Difficulty): Array<LeadersData> => {
    return leadersArray.filter(leader => leader.difficulty === sortDifficulty)
        .sort((leaderA, leaderB) => Number(leaderA.score) - Number(leaderB.score))
}
/**
 * Функция для добавления в массив лидеров новую запись
 * @param leadersArray Массив лидеров
 * @param changeDifficulty Сложность по которой меняются лидеры
 * @param newLeader Данные новоего "лидера"
 * @return Array Массив с новым лидером
 */
export const changeLeaders = (leadersArray: Array<LeadersData>,
                              changeDifficulty: Difficulty,
                              newLeader: LeadersData): Array<LeadersData> => {
    let easyLeaders: Array<LeadersData> = []
    let middleLeaders: Array<LeadersData> = []
    let hardLeaders: Array<LeadersData> = []
    leadersArray.forEach(leaders => {
        if (leaders.difficulty === 'easy') easyLeaders.push(leaders)
        else if (leaders.difficulty === 'middle') middleLeaders.push(leaders)
        else hardLeaders.push(leaders)
    })
    const addNewLeader = (leadersArray: Array<LeadersData>) => {
        let sortArr = sortLeaders(leadersArray, changeDifficulty)
        if (sortArr.length === 10) sortArr.splice(9, 1, newLeader)
        else sortArr.push(newLeader)
        return sortArr
    }
    if (changeDifficulty === 'easy') easyLeaders = addNewLeader(easyLeaders)
    else if (changeDifficulty === 'middle') middleLeaders = addNewLeader(middleLeaders)
    else hardLeaders = addNewLeader(hardLeaders)
    let concatLeaders = easyLeaders.concat(middleLeaders.concat(hardLeaders))
    setLocalLeaders(concatLeaders)
    return concatLeaders
}
