import React from 'react';
import {FiFrown} from "react-icons/fi";
import './ErrorComponent.css'

export const ErrorComponent = () => {
    return (
        <div className={'error'}>
            <FiFrown size={50}/>
            <p>Произошла непредвиденная ошибка.</p>
            <p>Пожалуйста обновите страницу.</p>
        </div>
    );
};
