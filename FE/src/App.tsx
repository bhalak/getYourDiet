import React, { useContext, useEffect } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { MyFridge } from "./components/my-fridge/MyFridge";
import { Redirect, Route, Switch } from "react-router-dom";
import { AboutUs } from "./components/about-us/AboutUs";
import { RecipesGenerator } from "./components/recipes-generator/RecipesGenerator";
import { AuthContext } from "./store/auth-context";
import { Notificator } from "./utils/notificator/Notificator";
import { SignIn } from "./components/sign-in/SignIn";
import { SignUp } from "./components/sign-up/SignUp";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const notifyUserIfProductsExpire = async () => {
      const notificator: Notificator = new Notificator();
      await notificator.notifyUserIfProductsExpire(authContext.userId);
    };
    if (authContext.isLoggedIn) {
      notifyUserIfProductsExpire();
    }
  }, [authContext.isLoggedIn]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/about" />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route>
          {authContext.isLoggedIn && (
            <Route path="/fridge">
              <MyFridge />
            </Route>
          )}

          <Route path="/generator">
            <RecipesGenerator />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
