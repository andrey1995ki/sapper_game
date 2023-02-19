import React, {FC, useState} from 'react';
import {IoCloseOutline} from "react-icons/io5";
import {ButtonMenu} from "../../СommonComponent/СommonComponent";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {CustomData, CustomGameProps} from "../MenuComponent.model";
import {setCustomData} from "../MenuComponent.utils";
import {HiArrowNarrowDown, HiArrowNarrowRight} from "react-icons/hi";

export const CustomGameComponent: FC<CustomGameProps> = ({theme, choiceGame}) => {
    const [showCustom, setShowCustom] = useState(false)
    const [custom, setCustom] = useState<CustomData>({
        xCount: 4,
        yCount: 4,
        bomb: 2
    })
    const [customValid, setCustomValid] = useState(true)
    const changeCustomData = (type: keyof CustomData, value: number) => {
        setCustomData(type, value, custom, setCustom, setCustomValid)
    }
    const addCustom = () => {
        if (custom.xCount >= 4 && custom.yCount >= 4 && custom.bomb > 0 && showCustom) {
            choiceGame([custom.xCount, custom.yCount], custom.bomb)
        } else {
            setShowCustom(!showCustom)
        }
    }
    return (
        <>
            <ButtonMenu description={'Своя игра'} theme={theme} callback={addCustom}/>
            {
                showCustom &&
                <div className={'custom-mode__menu'}>
                    <div className={'custom-mode__close'} onClick={() => setShowCustom(false)}>
                        <IoCloseOutline size={20}/>
                    </div>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"><HiArrowNarrowRight/></InputGroup.Text>
                        <Form.Control
                            type={'number'} value={custom.xCount} max={32} min={4}
                            onChange={(e) => changeCustomData('xCount', Number(e.target.value))}
                            className={`form-control`}
                        />
                        <InputGroup.Text id="inputGroup-sizing-sm"><HiArrowNarrowDown/></InputGroup.Text>
                        <Form.Control
                            type={'number'} value={custom.yCount} max={32} min={4}
                            onChange={(e) => changeCustomData('yCount', Number(e.target.value))}
                            className={`form-control`}
                        />
                        <InputGroup.Text id="inputGroup-sizing-sm">Мин</InputGroup.Text>
                        <Form.Control
                            type={'number'} value={custom.bomb}
                            onChange={(e) => changeCustomData('bomb', Number(e.target.value))}
                            className={`form-control ${!customValid && 'is-invalid'}`}
                            disabled={!(custom.xCount > 0 && custom.yCount > 0)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Мин не может быть 0 и должно быть хотя бы 3 свободных клетки
                        </Form.Control.Feedback>
                    </InputGroup>
                </div>
            }
        </>

    );
};
