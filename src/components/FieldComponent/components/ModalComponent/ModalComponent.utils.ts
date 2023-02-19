import {LeadersData} from "../../../../store/leaders/leaders.model";

/**
 * Функция для определения места
 * @param leaderArray Сортированный по текущему уровню сложности масив
 * @param time Затраченное время
 * @return Number Занятое место
 */
export const getPlace = (leaderArray: Array<LeadersData>, time: number) => {
    let place = leaderArray.findIndex(leader => time < leader.score) + 1
    if (place === 0) {
        place = leaderArray.length >= 10 ? -1 : leaderArray.length + 1
    }
    return place
}
