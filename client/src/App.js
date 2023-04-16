import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CardDetail from "./components/CardDetail/CardDetail";
import Form from './components/Form/Form';

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <Switch> 
        <Route exact path= "/" component = {Landing}/>
        <Route exact path= "/home" component = {Home}/>
        <Route exact path= "/detail/:id" component = {CardDetail}/>
        <Route exact path= "/newPokemon" component = {Form}/>
      </Switch>
      {/* <h1>Página Pokemon de Lady</h1> */}
    </div>
    </BrowserRouter>
  );
}

export default App;