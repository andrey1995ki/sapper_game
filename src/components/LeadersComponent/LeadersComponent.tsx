import React, {ChangeEvent, useEffect, useState} from 'react';
import {TableComponent} from "./components/TableComponent";
import Form from 'react-bootstrap/Form';
import './LeadersComponent.css'
import {ButtonsBack} from "../СommonComponent/СommonComponent";
import {useNavigate} from "react-router-dom";
import {Difficulty} from "../../store/app/app.model";
import {useAppSelector} from "../../store/hooks";
import {LeadersSelector} from "../../store/leaders/leaders.selector";
import {LeadersData} from "../../store/leaders/leaders.model";
import {sortLeaders} from "../../store/leaders/leaders.utils";

export const LeadersComponent = () => {
    const navigate = useNavigate()
    const {leaders} = useAppSelector(LeadersSelector)
    const [leadersArray, setLeadersArray] = useState<Array<LeadersData>>([])
    const options = [
        {value: 'easy', description: 'Простой'},
        {value: 'middle', description: 'Средний'},
        {value: 'hard', description: 'Сложный'}
    ]
    useEffect(() => {
        setLeadersArray(sortLeaders(leaders, options[0].value as Difficulty))
    }, [])
    const changeDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
        const currentDifficulty = e.target.value;
        setLeadersArray(sortLeaders(leaders, currentDifficulty as Difficulty))
    }
    return (
        <div className={'game-leaders'}>
            <div className={'game-leaders__btns'}>
                <ButtonsBack callback={() => navigate('/')}/>
                <Form.Select size="sm" className={'game-leaders__select'} onChange={changeDifficulty}>
                    {
                        options.map(option => <option key={option.value}
                                                      value={option.value}>{option.description}</option>)
                    }
                </Form.Select>
            </div>
            <div>
                {
                    leadersArray.length > 0 ? <TableComponent leaders={leadersArray}/>
                        :
                        <div className={'game-leaders__not-found'}>
                            <p>Здесь пока пусто. Станьте первым.</p>
                        </div>
                }
            </div>
        </div>
    );
};
