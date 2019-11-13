import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from "react-router-dom";
import routes from "./router";

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <HashRouter>
        <Switch>
            {routes.map(function (route,index) {
                return <Route exact path={route.path} key={index} component={route.component}></Route>
            })}
        </Switch>
    </HashRouter>
),document.getElementById("root"));


