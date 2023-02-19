import React, {FC} from 'react';
import {BiBomb} from "react-icons/bi";
import {useAppSelector} from "../../../store/hooks";
import {AppSelector} from "../../../store/app/app.selector";
import {FiFlag} from "react-icons/fi";
import {IoHelpOutline} from "react-icons/io5";
import {findInArray} from "../FieldComponent.utils";

export const Bomb: FC = () => {
    const {gameStatus} = useAppSelector(AppSelector)
    let color: string = gameStatus === 'lose' ? 'red' : gameStatus === 'win' ? 'green' : ''

    return (
        <BiBomb color={color}/>
    );
};

export const Flag: FC<{ field: string }> = ({field}) => {
    const {flagField, bombField, gameStatus} = useAppSelector(AppSelector)
    let color = 'red'
    if (findInArray(flagField, field, (fieldF) => findInArray(bombField, fieldF)) && gameStatus) color = 'green'
    return <FiFlag color={color}/>
}
export const Questions: FC = () => {
    return <IoHelpOutline/>
}
