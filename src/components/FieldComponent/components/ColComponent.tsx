import React, {FC, useEffect, useState} from 'react';
import {ColProps} from "../FieldComponent.model";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {AppSelector} from "../../../store/app/app.selector";
import {addOpenField, removeField, setGameStatus, startGame} from "../../../store/app/app.slice";
import {Bomb, Flag, Questions} from "./IconComponents";
import {arrangeBomb, checkWin, findBombsNearby, findInArray} from "../FieldComponent.utils";

export const Col: FC<ColProps> = ({colPosition, size}) => {
    const [status, setStatus] = useState<'close' | 'open'>('close')
    const dispatch = useAppDispatch()
    const [nearbyBombs, setNearbyBombs] = useState<number>(0)
    const {
        gameStart,
        gameField,
        bombField,
        bombCount,
        gameStatus,
        flagField,
        openField,
        questionField
    } = useAppSelector(AppSelector)
    const checkField = () => {
        if (!gameStart) {
            let getBombs = arrangeBomb(colPosition, bombCount, gameField)
            dispatch(startGame({bombField: getBombs}))
            findBombsNearby(getBombs, colPosition, gameField, openField, dispatch, setNearbyBombs)
        } else {
            if (findInArray(bombField, colPosition)) {
                dispatch(setGameStatus({gameStatus: 'lose'}))
            } else {
                findBombsNearby(bombField, colPosition, gameField, openField, dispatch, setNearbyBombs)
                if (checkWin(gameField, openField, bombField)) {
                    dispatch(setGameStatus({gameStatus: 'win'}))
                }
            }
        }
    }
    const clickField = () => {
        if (status === 'close' && !gameStatus) {
            findInArray(flagField, colPosition) && dispatch(removeField({field: colPosition, type: 'flagField'}))
            findInArray(questionField, colPosition) && dispatch(removeField({
                field: colPosition,
                type: 'questionField'
            }))
            dispatch(addOpenField({field: colPosition}))
        }
    }
    useEffect(() => {
        if (findInArray(openField, colPosition) && status === 'close' && !findInArray(flagField, colPosition)) {
            setStatus('open')
            checkField()
        }
        if (openField.length === 0 && status === 'open') {
            setNearbyBombs(0)
            setStatus('close')
        }
    }, [colPosition, flagField, openField, status])

    return (
        <div className={'col-field'} field-status={status} onClick={clickField} id={colPosition} field-size={size}>
            {
                findInArray(bombField, colPosition, (searching) => !findInArray(flagField, searching))
                && gameStatus
                && <Bomb/>
            }
            {
                findInArray(flagField, colPosition)
                && <Flag field={colPosition}/>
            }
            {
                findInArray(questionField, colPosition) && !gameStatus
                && <Questions/>
            }
            {
                nearbyBombs > 0 && <span count-color={nearbyBombs}>{nearbyBombs}</span>
            }
        </div>
    );
};
