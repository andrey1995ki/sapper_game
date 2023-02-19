import {Dispatch as DispatchRedux} from "@reduxjs/toolkit";
import {addField, addOpenField, removeField} from "../../store/app/app.slice";
import {Dispatch as DispatchReact, SetStateAction} from "react";
import {Size} from "../../store/app/app.model";

/**
 * Функиця предназначенная для установки класса ячейки в зависимости от размера
 * @param colSize размер ячейки
 * @return Size имя для класса ячейки
 */
const getSize = (colSize: number): Size => {
    if (colSize === 40) return 'extra-extra-large'
    if (colSize === 30) return 'extra-large'
    if (colSize === 25) return 'large'
    if (colSize === 20) return 'medium'
    if (colSize === 15) return 'small'
    return 'extra-small'
}
/**
 * Функция предназначенная для определение максимально возможного размера ячейки
 *  в зависимости от ширины и высоты экрана и разеров игрового поля
 * @param gameField размеры игрового поля в массиве
 * @param availableWidth ширина экрана в момент запуска игры
 * @param availableHeight высота экрана в момент запуска игры за вычитом шапки
 * @return number максимальный размер ячейки, если максимальный размер ячейки из вохможных не найден то 0
 */
const getSizeCol = (gameField: number[], availableWidth: number, availableHeight: number): number => {
    const colSize = [40, 30, 25, 20, 15, 10]
    let currentSize = 0
    colSize.forEach(size => {
        if ((gameField[0] * size) + 10 < availableWidth && (gameField[1] * size) + 10 < availableHeight && currentSize === 0) {
            currentSize = size
        }
    })
    return currentSize
}
/**
 * Функция предназначенная для определения размер игрового поля подходящего под экран устройства,
 *  так же при необходимости может перевернуть поле для комфортного расположения на экране
 * @param gameField размер игового поля
 * @return Object объект с именем класса для ячейки (size) и разер игрового поля (FieldComponent), развёрнутое при необходимости
 */
export const getSizeUtils = (gameField: number[]) => {
    let screenWidth = document.documentElement.clientWidth
    let screenHeight = document.documentElement.clientHeight - 48
    let colSize = getSizeCol(gameField, screenWidth, screenHeight)
    let reversed: number[] = []
    if ((colSize === 0 || colSize === 10) && gameField[0] !== gameField[1]) {
        reversed = [gameField[1], gameField[0]]
        colSize = getSizeCol(reversed, screenWidth, screenHeight)
        if (colSize === 10) reversed = gameField
    }
    return {size: getSize(colSize), gameField: reversed.length > 0 ? reversed : gameField}
}
/**
 * Функция для поиска значения в масстиве
 * @param searchingArray Массив для поиска
 * @param searchingValue Искомое значение
 * @param callback Функция callback необходимая для двойного поиска
 * @return Boolean true или false в зависимости от результата поиска
 */
export const findInArray = (searchingArray: string[], searchingValue: string, callback?: (searchingValue: string) => boolean): boolean => {
    if (callback) {
        return !!searchingArray.find(field => field === searchingValue && callback(field))
    }
    return !!searchingArray.find(field => field === searchingValue)
}
/**
 * Функция для прохода по массиву. Предназначена для полного либо частичного по данным переденного мссива
 *  и получение массива координат.
 * @param array Массив с координатоми для прохода
 * @param fullPass Проодить полность массив или только граничные значения (-1/+1)
 * @param callback Функция callback в которую передаются координаты для каждого прохода
 * @return Array массив с координатаи прохода
 */
export const arrayPass = (array: string[] | number[], fullPass: boolean, callback?: (checkField: string) => void): string[] => {
    const newArray: string[] = []
    const startI = fullPass ? 0 : Number(array[0]) - 1
    const endI = fullPass ? Number(array[0]) : Number(array[0]) + 2
    const startJ = fullPass ? 0 : Number(array[1]) - 1
    const endJ = fullPass ? Number(array[1]) : Number(array[1]) + 2
    for (let i = startI; i < endI; i++) {
        for (let j = startJ; j < endJ; j++) {
            let checkField = `${i}.${j}`
            callback && callback(checkField)
            newArray.push(checkField)
        }
    }
    return newArray
}
/**
 * Функия предназначения для исключения координат не попадающих в игровое поле
 * @param gameField Массив размера игового поля
 * @param checkArray Массив для проверка
 * @return Array Отфильтрованный массив без координат за облостью игрового опля
 */
export const beyondArray = (gameField: string[] | number[], checkArray: string[]) => {
    return checkArray.filter(field => {
        let fieldArr: number[] = field.split('.').map(coordinate => Number(coordinate))
        return !(fieldArr[0] >= gameField[0] || fieldArr[1] >= gameField[1] || fieldArr[1] < 0 || fieldArr[0] < 0);
    })
}
/**
 * Функция расставляющая бомбы по игровому полю после нажатия.
 * Определяет область нажатия куда не должны упасть бомбы,
 * при наличии на поле более 10 свободжных клеток делает эту область миниму 9 клеток иначе клетка 1.
 * @param startField Координаты клетки куда нажал игрок
 * @param countBomb Колличество бомб для данной сессии игры
 * @param gameField Координаты игрового поля
 * @return Array Массив с координатами бомб
 */
export const arrangeBomb = (startField: string, countBomb: number, gameField: number[]): string[] => {
    const bombArray: string[] = []
    let randomPoint = (point: number) => {
        return Math.floor(Math.random() * point)
    }
    let checkStartSize = (gameField[0] * gameField[1]) - countBomb
    const clearStartArray = checkStartSize > 10 ? arrayPass(startField.split('.'), false) : [startField]
    const randomBomb = (): string => {
        let randomField = `${randomPoint(gameField[0])}.${randomPoint(gameField[1])}`

        if (findInArray(bombArray, randomField) || findInArray(clearStartArray, randomField)) return randomBomb()
        return randomField
    }
    for (let i = 0; i < countBomb; i++) {
        let bomb = randomBomb()
        bombArray.push(bomb)
    }
    return bombArray
}
/**
 * Функция для определения колличетсва бомб граничищих с ячейкой
 * @param bombsField Массив с координатами бомб
 * @param currentField Координы текущей проверяемой ячейки
 * @return Object обхект с колличеством бомб (countBomb) и пустыми соседними полями (clearField) при отутсвии бомб рядом
 */
export const findBombs = (bombsField: string[], currentField: string) => {
    const checkArray: string[] = []
    arrayPass(currentField.split('.'), false, (checkField) => {
        checkField !== currentField && checkArray.push(checkField)
    })
    let countBomb = 0
    let clearField: string[] = []
    checkArray.forEach(field => {
        if (findInArray(bombsField, field)) {
            countBomb = countBomb + 1
        } else clearField.push(field)
    })
    return {countBomb: countBomb, clearField: countBomb > 0 ? [] : clearField};

}
/**
 * Функция для получения элемента div ячейки. Для исключения попадания мышки на дочерние элементы
 * @param element Проверяемый элемент
 * @return element div ячейки
 */
const getDivCol = (element: HTMLDivElement): HTMLDivElement => {
    if (element.localName === 'div') {
        return element
    } else {
        return getDivCol(element.parentElement as HTMLDivElement)
    }
}
/**
 * Функция для установки флага\вопроса в ячейку
 * Проверяет ячейку закрыта ли она, проверяет имееся ли на ней уже флаг или вопрос,
 * если нет то ставит, если да то убирает
 * @param e Событие клика
 * @param dispatch
 * @param gameStatus Текущий статус игры
 * @param gameStart Начаа ли игра
 * @param flagField Массив с координатами флагов
 * @param questionField Массив с координатамы вопросов
 */
export const addFlagInField = (e: MouseEvent, dispatch: DispatchRedux, gameStatus: 'win' | 'lose' | undefined,
                               gameStart: boolean, flagField: string[], questionField: string[]) => {
    if (!gameStatus && gameStart) {
        const target = getDivCol(e.target as HTMLDivElement);
        const status = target.getAttribute('field-status')
        if (target.id && status !== 'open') {
            if (findInArray(flagField, target.id)) {
                dispatch(removeField({field: target.id, type: 'flagField'}))
                dispatch(addField({field: target.id, type: 'questionField'}))
            } else if (findInArray(questionField, target.id)) {
                dispatch(removeField({field: target.id, type: 'questionField'}))
            } else {
                dispatch(addField({field: target.id, type: 'flagField'}))
            }
        }

    }
}
/**
 * Значения времени нажатия на кнопку мыши и её отпускания
 */
let mouseDownTime: Date, mouseUpTime: Date
/**
 * Массив для координат подсвечиваемых ячеек
 */
let showArray: string[] = []
/**
 * Функция для подсвечивания 8 ячеек вокруг выбранной
 * устанавливает атрибут для выделоения подсвечиваемых ячеек, проверяет разницу времени между нажатиями
 * если она меньше 1 сек. и колличество флагов вокруг ячейки равно количеству бомб поблизости
 * открывает ячейки не помечанные флагом
 * @param e Событие клика
 * @param gameField Координаты игрового поля
 * @param dispatch
 * @param flagField Координаты полей помечанных флагами
 * @param openField Координаты открытых ячеек
 */
export const showingField = (e: MouseEvent, gameField: number[], dispatch: DispatchRedux, flagField: string[], openField: string[]) => {
    const target = getDivCol(e.target as HTMLDivElement);
    let id = target.id
    let countBombNearby = Number(target.innerText)
    if (e.type === 'mousedown') {
        mouseDownTime = new Date()
        showArray = arrayPass(id?.split('.') || [], false, (checkField) => {
            document.getElementById(checkField)?.setAttribute('show-status', 'show')
        })
        showArray = beyondArray(gameField, showArray)
        showArray = showArray.filter(showF => !findInArray(openField, showF))

    } else {
        arrayPass(gameField, true, (checkField) => {
            document.getElementById(checkField)?.removeAttribute('show-status')
        })
        mouseUpTime = new Date()
    }
    const pressingTime = (Number(mouseUpTime) - Number(mouseDownTime)) / 1000
    if (pressingTime <= 1 && pressingTime > 0 && countBombNearby > 0) {
        let flagShowField = flagField.filter(flagF => findInArray(showArray, flagF))
        if (flagShowField.length === countBombNearby) {
            let openedField = showArray.filter(showF => !findInArray(flagShowField, showF))
            openedField.forEach(open => {
                dispatch(addOpenField({field: open}))
            })
        }
    }

}
/**
 * Функция проверяющая победу в игре. Если колличество закрытых ячеек равно разницы игрового поля - колличества бомб
 * то определяется победа. т.к. проверка на попадания на бомбу происходит при клике.
 * Совпадение флага с бомбой игнорируется для исключения случайной победы при рандомном расставлении флагов
 * P.s. уверен что в клетке нет бомбы - открывай
 * @param gameField Координаты игрового поля
 * @param openField Массив с координатами открытых полей
 * @param bombField Массив с координатами бомб
 * @return Boolean результат проверки true или false
 */
export const checkWin = (gameField: number[], openField: string[], bombField: string[]) => {
    let countFiled = gameField[0] * gameField[1]
    return openField.length === (countFiled - bombField.length)
}
/**
 * Функция для открытия соседних ячеек при нажатии на пустую область
 * @param gameField Координаты игрового поля
 * @param clearField Массив с координатами соседних полей для открытия
 * @param openField Массив с координатами открытых полей
 * @param dispatch
 */
export const openClearField = (gameField: number[], clearField: string[], openField: string[], dispatch: DispatchRedux) => {
    let withoutOutside = beyondArray(gameField, clearField)
    let closeFields = withoutOutside.filter(field => !findInArray(openField, field))
    closeFields.forEach(field => {
        dispatch(addOpenField({field: field}))
    })
}
/**
 * Функция проверяющая нашлись ли бобы после открытия и открывает соседниие клетки
 * @param bombsArray Массив с координатами боб
 * @param currentField Координаты текущей ячейик
 * @param gameField Координаты игрового поля
 * @param openField Массив с координатаи открытих полей
 * @param dispatch
 * @param setNearbyBombs Функция для запись колличества найденных бомб в стейт
 */
export const findBombsNearby = (bombsArray: string[], currentField: string,
                                gameField: number[], openField: string[],
                                dispatch: DispatchRedux, setNearbyBombs: DispatchReact<SetStateAction<number>>) => {
    let bombs = findBombs(bombsArray, currentField)
    openClearField(gameField, bombs.clearField, openField, dispatch)
    setNearbyBombs(bombs.countBomb)
}


