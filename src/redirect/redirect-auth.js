import React, {useContext, createContext, useState} from "react"; 
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";

export default function Auth(){
    return(
        <ProvideAuth>
            <Router>
                <div>
                    <AuthButton />
                    <ul>
                        <li><Link to="/public">Public Page</Link></li>
                        <li><Link to="/protected">Protected Page</Link></li>
                    </ul>
                    <Switch>
                        <Route path="/public">
                            <PublicPage/>
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <PrivateRoute path="/protected">
                            <Protected/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    )
}
const fakeAuth = { isAuthenticated: false, 
    signin(cb){
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb){
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
 }
const authContext = createContext();
function ProvideAuth({children}){
    const auth = useProvideAuth();
    return(
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}
function useAuth(){
    return useContext(authContext);
}

function useProvideAuth(){
    const [ user, setUser ] = useState(null);

    const signin = cb =>{
        return fakeAuth.signin(()=>{
            setUser("user");
            cb();
        })
    }
    const signout = cb =>{
        return fakeAuth.signout(()=>{
            setUser(null);
            cb();
        })
    }
    return {user, signin, signout}
}

function AuthButton(){
    let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
        <p>
            Welecome{' '}<button onClick={()=>{auth.signout(()=> history.push("/"))}}>Sign Out</button>
        </p>
    ) : (<p>Vous n'avez pas d'acces</p>)
}


function PrivateRoute({children, ...rest}){
    let auth = useAuth();

    return(
        <Route {...rest} render={({location})=>{
            auth.user ? (
                children
            ):(
                <Redirect to={{
                    pathname="/login",
                    state:{from: location}
                }} />
            )
        }} />
    )
}

function PublicPage(){
    return <h3>Public</h3>
}
function Protected(){
    return <h3>Protected</h3>
}
function LoginPage(){
    
    let history = useHistory()
    let location = useLocation()
    let auth = useAuth();

    let {from} = location.state || {from: {pathname:"/"}}
    let login = () =>{
        auth.signin(()=>{
            history.replace(from)
        })
    }
    return (
        <div>
            <p>
                You must log in to view the page at {from.pathname}
            </p>
            <button onClick={login}>Log in</button>
        </div>
    )
}
