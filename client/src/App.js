import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing";
import Home from "./components/Home";


function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <Switch> 
        <Route exact path= "/" component = {Landing}/>
        <Route path= "/home" component = {Home}/>
      </Switch>
      <h1>Página Pokemon de Lady</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
