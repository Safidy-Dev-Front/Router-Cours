import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link,useParams} from "react-router-dom";
import ParamsRoute from './parameters-url/url-parameters';
import ParamsRoute from './nesting/nesting';

function App() {
  return (
    <div className="App">
      <h1>Router Cours</h1>
      <ParamsRoute/>
      <Nesting />
    </div>
  );
}

export default App;
