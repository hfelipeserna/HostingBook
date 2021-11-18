import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import Producto from "./components/Producto/Producto.jsx";
import ScrollToTop from "./components/ScrollToTop";
import loggedContext from "./contexts/loggedContext";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userInformation, setUserInformation] = useState({
    nombre: "",
    apellido: "",
  });

  return (
    <loggedContext.Provider
      value={{ isLogged, setIsLogged, userInformation, setUserInformation }}
    >
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/product/:id" component={Producto} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    </loggedContext.Provider>
  );
}

export default App;
