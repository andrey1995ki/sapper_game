import React, {FC, useCallback, useEffect, useState} from 'react';
import './FieldComponent.css'
import {Col} from "./components/ColComponent";
import {AppSelector} from "../../store/app/app.selector";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";
import {resetGame} from "../../store/app/app.slice";
import {TfiFlag, TfiTimer} from "react-icons/tfi";
import {addFlagInField, showingField} from "./FieldComponent.utils";
import {ResultModal} from "./components/ModalComponent/ModalComponent";
import {ButtonsBack, ButtonsReset} from "../СommonComponent/СommonComponent";
import {Row} from "./components/RowComponent";


export const FieldComponent: FC = () => {
    const {
        size,
        gameField,
        gameStart,
        gameStatus,
        bombCount,
        flagField,
        openField,
        questionField
    } = useAppSelector(AppSelector)
    const [gameTimer, setGameTimer] = useState(0)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const addFlag = useCallback((e: MouseEvent) => {
        e.preventDefault()
        addFlagInField(e, dispatch, gameStatus, gameStart, flagField, questionField)
    }, [dispatch, flagField, gameStart, gameStatus, questionField])
    const showField = useCallback((e: MouseEvent) => {
        if (e.button === 1 && !gameStatus) {
            e.preventDefault()
            showingField(e, gameField, dispatch, flagField, openField)
        }
    }, [dispatch, flagField, gameField, gameStatus, openField])
    useEffect(() => {
        document.addEventListener('contextmenu', addFlag)
        return (() => document.removeEventListener('contextmenu', addFlag))
    }, [gameStatus, flagField, gameStart, questionField, addFlag])
    useEffect(() => {
        document.addEventListener('mousedown', showField)
        document.addEventListener('mouseup', showField)
        return (() => {
            document.removeEventListener('mousedown', showField)
            document.removeEventListener('mouseup', showField)
        })
    }, [gameStatus, flagField, openField, showField])
    useEffect(() => {
        if (gameField.length !== 2) navigate('/')
    }, [gameField, navigate])
    useEffect(() => {
        const timer = setTimeout(() => {
            if (gameStart && !gameStatus) {
                setGameTimer(gameTimer + 1);
            }
        }, 1000)
        return () => clearTimeout(timer)
    }, [gameTimer, gameStart, gameStatus]);
    /**
     * Функция для генерации игрового поля по заданным размерам FieldComponent
     */
    const generateField = () => {
        const rowArray = []
        for (let i = 0; i < gameField[1]; i++) {
            const colArray = []
            for (let j = 0; j < gameField[0]; j++) {
                colArray.push(<Col key={`${i}Col${j}`} colPosition={`${j}.${i}`}
                                   size={size}/>)
            }
            rowArray.push(<Row key={`Row${i}`}>{colArray}</Row>)
        }
        return rowArray
    }
    const setResetGame = (back: boolean) => {
        setGameTimer(0)
        dispatch(resetGame({}))
        back && navigate('/')
    }
    return (
        <div className={'game-field'}>
            <div className={'game-field__header header-item'}>
                <ButtonsBack callback={() => setResetGame(true)}/>
                <h4 className={'header-item__group'}>
                    <div className={'header-item__group-left'}><TfiFlag/></div>
                    <div className={'header-item__group-right'}>{bombCount - flagField.length}</div>
                </h4>
                <h4 className={'header-item__group'}>
                    <div className={'header-item__group-left'}><TfiTimer/></div>
                    <div className={'header-item__group-right'}>{gameTimer}</div>
                </h4>
                <ButtonsReset callback={() => setResetGame(false)}/>
            </div>
            <div>
                {generateField()}
            </div>
            {
                gameStatus &&
                <ResultModal setResetGame={setResetGame} time={gameTimer}/>
            }

        </div>
    );
}
