import React, {FC, PropsWithChildren} from 'react';

export const Row: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={'row-field'}>
            {children}
        </div>
    );
};
