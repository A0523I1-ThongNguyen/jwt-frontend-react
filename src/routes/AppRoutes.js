import { Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManagerUser/Users";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
  const projects = () => {
    return (
      <>
        <span>project page</span>
      </>
    );
  };

  return (
    <>
      <Switch>
        <Route path="/" exact>
          Home
        </Route>

        <PrivateRoutes path="/users" component={Users} />
        <Route path="/projects" component={projects} />

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">This is Error 404 Not Found !!!</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
