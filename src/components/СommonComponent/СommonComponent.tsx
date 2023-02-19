import React, {FC} from 'react';
import {TfiAngleLeft, TfiLoop} from "react-icons/tfi";
import {getLocalTheme} from "../../commonUtils/localStorage";
import {ButtonsMenuProps, ButtonsProps} from "./CommonComponent.model";
import {Button} from "react-bootstrap";
import './CommonComponent.css'


export const ButtonsBack: FC<ButtonsProps> = ({callback}) => {
    const theme = getLocalTheme()
    return (
        <div className={'header-item__btn'}>
            <Button variant={`outline-${theme === 'light' ? 'dark' : 'light'}`} onClick={callback}>
                <TfiAngleLeft/>
            </Button>
        </div>
    );
};
export const ButtonsReset: FC<ButtonsProps> = ({callback}) => {
    const theme = getLocalTheme()
    return (
        <div className={'header-item__btn'}>
            <Button variant={`outline-${theme === 'light' ? 'dark' : 'light'}`} onClick={callback}>
                <TfiLoop/>
            </Button>
        </div>
    );
};
export const ButtonMenu: FC<ButtonsMenuProps> = ({callback, description, theme}) => {
    return (
        <Button variant={`outline-${theme === 'light' ? 'dark' : 'light'}`} onClick={callback}
                className={'buttons-group-btn'}>
            {description}
        </Button>
    )
}
