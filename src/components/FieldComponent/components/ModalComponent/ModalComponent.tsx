import React, {FC, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getLocalTheme} from "../../../../commonUtils/localStorage";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {AppSelector} from "../../../../store/app/app.selector";
import {LeadersSelector} from "../../../../store/leaders/leaders.selector";
import {LeadersData} from "../../../../store/leaders/leaders.model";
import {sortLeaders} from "../../../../store/leaders/leaders.utils";
import {addInLeaders} from "../../../../store/leaders/leaders.slice";
import {ModalBodyComponent} from "./components/ModalBodyComponent";
import {getPlace} from "./ModalComponent.utils";

export const ResultModal: FC<{ setResetGame: (rest: boolean) => void, time: number }> = ({setResetGame, time}) => {
    const {gameStatus, difficulty} = useAppSelector(AppSelector)
    const dispatch = useAppDispatch()
    const {leaders} = useAppSelector(LeadersSelector)
    const [show, setShow] = useState(false);
    const [name, setName] = useState('Аноним')
    useEffect(() => {
        if (gameStatus) setShow(true)
    }, [gameStatus])
    const leaderArray: Array<LeadersData> = sortLeaders(leaders, difficulty || 'easy')
    const place = getPlace(leaderArray, time)
    const closeModal = (type?: 'new' | 'menu') => {
        setShow(false)
        if (type) {
            setResetGame(type === 'menu')
        }
        if (gameStatus === 'win' && place !== -1)
            dispatch(addInLeaders({name: name, difficulty: difficulty || 'easy', score: time}))
    }
    const theme = getLocalTheme()
    return (
        <Modal show={show} onHide={() => closeModal()} centered className={'result-modal'}>
            <ModalBodyComponent leaderArray={leaderArray} gameStatus={gameStatus}
                                difficulty={difficulty} time={time} place={place} theme={theme}
                                closeModal={closeModal} setName={setName}/>
            <Modal.Footer>
                <div style={{display: "flex", width: '100%', justifyContent: 'space-around'}}>
                    <Button variant={`outline-${theme === 'dark' ? 'light' : 'dark'}`}
                            onClick={() => closeModal('new')}>
                        Начать сначала
                    </Button>
                    <Button variant={`outline-${theme === 'dark' ? 'light' : 'dark'}`}
                            onClick={() => closeModal('menu')}>
                        В меню
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
