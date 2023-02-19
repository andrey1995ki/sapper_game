import {CustomData} from "./MenuComponent.model";
import {Dispatch, SetStateAction} from "react";

type SetCustomType = Dispatch<SetStateAction<CustomData>>
type SetCustomValidType = Dispatch<SetStateAction<boolean>>

/**
 *
 * @param value значение для проверки
 * @param custom объект ведёных данных (Стейт)
 * @param setCustomValid функция для установки стиейта валидации
 */
const validCustomData = (value: number, custom: CustomData, setCustomValid: SetCustomValidType) => {
    setCustomValid((custom.xCount * custom.yCount) - 4 >= value && value > 0)
}
/**
 *
 * @param type тип поля. Значение из ключей стейта CustomData
 * @param value введённое значение
 * @param custom объект ведёных данных (Стейт)
 * @param setCustom функция для установка стейта с введёнными данными
 * @param setCustomValid функция для установки стиейта валидации
 */
export const setCustomData = (type: keyof CustomData, value: number, custom: CustomData, setCustom: SetCustomType, setCustomValid: SetCustomValidType) => {
    if (type !== 'bomb') {
        let anotherType: 'xCount' | 'yCount' = type === 'yCount' ? 'xCount' : 'yCount'
        let currentValue = value > 32 ? 32 : value < 0 ? 4 : value
        let newCountBomb = custom[anotherType] * currentValue
        newCountBomb = Math.ceil(newCountBomb * 15.5 / 100)
        setCustom(prevState => ({...prevState, [type]: currentValue, bomb: newCountBomb}))
    } else {
        setCustom(prevState => ({...prevState, bomb: value}))
    }
    validCustomData(value, custom, setCustomValid)
}
