import React, {useEffect} from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {LayoutComponent} from "./components/LayoutComponent/LayoutComponent";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {RouterProvider,} from "react-router-dom";
import {router} from "./routing/routing";
import {getLocalTheme} from "./commonUtils/localStorage";

function App() {
    useEffect(() => {
        document.body.setAttribute('data-theme', getLocalTheme())
    }, [])
    return (
        <div className="App">
            <Provider store={store}>
                <LayoutComponent>
                    <RouterProvider router={router} />
                </LayoutComponent>
            </Provider>
        </div>
    );
}

export default App;
