import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

export default function ParamsRoute(){
    return(
        <Router>
            <div>
                <h2>Test ParamsRoute</h2>
                <ul>
                    <li><Link to='/netflix'>Netflix</Link></li>
                    <li><Link to='/Zillow-Group'>Zillow Group</Link></li>
                    <li><Link to='/Safidy-Web-Solutions'>Safidy Web Solutions</Link></li>
                    <li><Link to='/Dev-safidy'>Dev safidy</Link></li>
                </ul>
                <Switch>
                    <Route path="/:id" children={<Child />}/>
                </Switch>
            </div>
        </Router>
    )
}

function Child(){
    let {id} = useParams();
    return <div>
        <h3>ID: {id}</h3>
    </div>
}