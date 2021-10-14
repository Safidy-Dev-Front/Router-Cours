import React from "react"
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

export default function CustomLinkExample(){
    return(
        <Router>
            <div>
                <SchollMenuLink activeOnlyWhenExact={true} to="/home-custom" label="Home"/>
                <SchollMenuLink to="/about-custom" label="about"/>
                <Switch>
                    <Route exact path="/home-custom">
                        <Home/>
                    </Route>
                    <Route exact path="/about-custom">
                        <About/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

function SchollMenuLink({label, to, activeOnlyWhenExact}){
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    })
    return (
        <div className={match ? "active": ""}>
            {match && "-"}
            <Link to={to} >{label}</Link>
        </div>
    )
}
function Home(){
    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}

function About(){
    return(
        <div>
            <h2>About</h2>
        </div>
    )
}