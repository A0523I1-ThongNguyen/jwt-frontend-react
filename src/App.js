import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Switch>
            <Route path="/" exact>
              <Nav />
            </Route>
            <Route path="/home">News</Route>
            <Route path="/news">News</Route>
            <Route path="/about">About</Route>
            <Route path="/contact">Contact</Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/dn">
              <Login />
            </Route>
            <Route path="*">This is Error 404 Not Found !!!</Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
