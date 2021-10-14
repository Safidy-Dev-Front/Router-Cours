import React from "react"; 
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

export default function Nesting(){
    return(
    <Router>
        <div>
            <ul>
                <li><Link to="/home-nesting">Home</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
        </div>
        <Switch>
            <Route exact path="/home-nesting">
                <Home />
            </Route>
            <Route exact path="/topics">
                <Topics />
            </Route>
        </Switch>
    </Router>
    )
}
function Home(){
    return(
        <h2>Home nesting</h2>
    )
}
function Topics(){
    let {path, url} = useRouteMatch();
    return(
        <div>
            <h2>Topics</h2>
            <ul>
                <li><Link to={`${url}/rendering`}>Rendeting with React</Link></li>
                <li><Link to={`${url}/Component`}>Component</Link></li>
                <li><Link to={`${url}/props-v-state`}>Props v State</Link></li>
            </ul>
            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic</h3>
                </Route>
                <Route exact path={`${path}/:topicId`}>
                    <Topic />
                </Route>
            </Switch>
        </div>
    )
}
function Topic(){
    let {topicId}= useParams();

    return <div>
        <h3>{topicId}</h3>
    </div>
}
