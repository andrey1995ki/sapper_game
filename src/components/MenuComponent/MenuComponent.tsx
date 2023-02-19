import React, {useEffect, useState} from 'react';
import './MenuComponent.css'
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks";
import {preparationGame} from "../../store/app/app.slice";
import {getLocalTheme, setLocalTheme,} from "../../commonUtils/localStorage";
import {CustomGameComponent} from "./components/CustomGameComponent";
import {Difficulty} from "../../store/app/app.model";
import {ButtonMenu} from "../СommonComponent/СommonComponent";
import {getSizeUtils} from "../FieldComponent/FieldComponent.utils";


export const MenuComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [theme, setTheme] = useState(getLocalTheme())

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])
    const changeTheme = () => {
        let newTheme: 'dark' | 'light' = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        setLocalTheme(newTheme)
    }
    const choiceGame = (field: number[], bomb: number, difficulty: Difficulty | undefined = undefined) => {
        dispatch(preparationGame({...getSizeUtils(field), bombCount: bomb, difficulty}))
        navigate('/game')
    }
    return (
        <div className={'game-menu'}>
            <div className={'game-menu__header'}>
                <h2>Сапёр</h2>
                <div className={'game-menu__toggle'}>
                    {
                        theme === 'dark'
                            ? <IoSunnyOutline onClick={changeTheme}/>
                            : <IoMoonOutline onClick={changeTheme}/>
                    }
                </div>
            </div>
            <div className={'game-menu__btn buttons-group'}>
                <ButtonMenu
                    callback={() => choiceGame([8, 8], 8, 'easy')}
                    description={'Простой'} theme={theme}
                />
                <ButtonMenu
                    callback={() => choiceGame([16, 16], 40, 'middle')}
                    description={'Средний'} theme={theme}
                />
                <ButtonMenu
                    callback={() => choiceGame([32, 16], 100, 'hard')}
                    description={'Сложный'} theme={theme}
                />
                <CustomGameComponent theme={theme} choiceGame={choiceGame}/>
                <ButtonMenu
                    callback={() => navigate('/leaders')}
                    description={'Таблица Лидеров'} theme={theme}
                />
            </div>
        </div>
    );
};
