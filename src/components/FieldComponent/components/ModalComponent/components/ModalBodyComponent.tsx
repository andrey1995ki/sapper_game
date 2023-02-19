import React, {FC} from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ModalBodyProps} from "../ModalComponent.model";

export const ModalBodyComponent: FC<ModalBodyProps> = ({
                                                           leaderArray,
                                                           gameStatus,
                                                           difficulty,
                                                           time,
                                                           place,
                                                           theme,
                                                           closeModal,
                                                           setName
                                                       }) => {
    const badTime = leaderArray[leaderArray.length - 1]?.score || 0
    return (
        <Modal.Body>
            <h4>
                <div style={{textAlign: 'center'}}>Вы {gameStatus === 'win' ? 'выиграли' : 'проиграли'}</div>
            </h4>
            {
                gameStatus === 'win' &&
                <div className={'result-modal__result'}>
                    <p>Ваше время: {time}</p>
                    {
                        difficulty &&
                        <div>
                            {
                                place === -1
                                    ?
                                    <>
                                        <p>Для попдания в таблицу лидеров требуется улучшить время до: {badTime}</p>
                                        <p>Не сдавайтесь!</p>
                                    </>
                                    :
                                    <>
                                        <p>Ваше место в таблице лидеров: {place}</p>
                                        <p>Введите имя для сохранения результата</p>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className={'result-modal__save'}
                                                placeholder="Имя"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <Button
                                                variant={`outline-${theme === 'dark' ? 'light' : 'dark'}`}
                                                onClick={() => closeModal()}>Сохранить</Button>
                                        </InputGroup>
                                    </>
                            }
                        </div>
                    }
                </div>
            }
        </Modal.Body>
    );
};
