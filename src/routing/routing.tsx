import {createBrowserRouter} from "react-router-dom";
import {FieldComponent} from "../components/FieldComponent/FieldComponent";
import React from "react";
import {MenuComponent} from "../components/MenuComponent/MenuComponent";
import {LeadersComponent} from "../components/LeadersComponent/LeadersComponent";
import {ErrorComponent} from '../components/ErrorComponent/ErrorComponent'

export const router = createBrowserRouter([
        {
            path: '/',
            element: <MenuComponent/>,
            errorElement: <ErrorComponent/>
        },
        {
            path: 'game',
            element: <FieldComponent/>,
            errorElement: <ErrorComponent/>
        },
        {
            path: 'leaders',
            element: <LeadersComponent/>,
            errorElement: <ErrorComponent/>
        },
    ],
    {
        basename: '/sapper_game'
    }
)
