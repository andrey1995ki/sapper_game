import React, {FC, PropsWithChildren} from 'react';
import './LayoutComponent.css'

export const LayoutComponent: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={'game-layout'}>
            <div className={'game-layout__menu'}>
                {children}
            </div>
        </div>
    );
}
