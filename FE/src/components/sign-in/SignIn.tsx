import React, { useEffect, useState, FormEvent, useContext } from "react";
import signInClasses from "./SignIn.module.css";
import { Card } from "../common/card/Card";
import { Input } from "../common/input/Input";
import Button from "../common/button/Button";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const isEmailValid = (str: string): boolean => {
  return str.length > 5 && str.length < 255 && str.includes("@");
};

const isPasswordValid = (str: string): boolean => {
  return str.length > 8 && str.length < 255;
};

export const SignIn = () => {
  const [successfulLogin, setSuccessfullLogin] = useState(true);
  const authContext = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState({ value: "", isValid: true });
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    isValid: true,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(emailInput.isValid && passwordInput.isValid);
    setSuccessfullLogin(true);
  }, [emailInput, passwordInput]);

  useEffect(() => {
    setIsFormValid(false);
  }, []);

  const emailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setEmailInput({
      value: currentValue,
      isValid: isEmailValid(currentValue),
    });
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setPasswordInput({
      value: currentValue,
      isValid: isPasswordValid(currentValue),
    });
  };

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        await authContext.onLogin(emailInput.value, passwordInput.value);
        setSuccessfullLogin(true);
      } catch (error) {
        setSuccessfullLogin(false);
      }
    } else {
      setEmailInput({
        value: emailInput.value,
        isValid: isEmailValid(emailInput.value),
      });
      setPasswordInput({
        value: passwordInput.value,
        isValid: isPasswordValid(passwordInput.value),
      });
    }
  };

  return (
    <Card className={signInClasses.login}>
      <form onSubmit={formSubmitHandler}>
        <div className={signInClasses.header}>
          <h2 className="h2">GetYourDiet</h2>
          <p>
            Sign in to get access to <strong>Your Fridge</strong>
          </p>
          <span className={signInClasses.error}>
            {successfulLogin ? "" : "Wrong credentials"}
          </span>
        </div>
        <div className={signInClasses["inputs-wrapper"]}>
          <Input
            className={signInClasses.input}
            label="Email"
            isValid={emailInput.isValid}
            type="email"
            id="email"
            value={emailInput.value}
            onChange={emailChangeHandler}
            errorMessage="Incorrect email"
            isProducNameInput={false}
          />
          <Input
            className={signInClasses.input}
            label="Password"
            isValid={passwordInput.isValid}
            type="password"
            id="password"
            value={passwordInput.value}
            onChange={passwordChangeHandler}
            errorMessage="Incorrect password"
            isProducNameInput={false}
          />
        </div>
        <div className={signInClasses.actions}>
          <NavLink className={signInClasses.link} to="/sign-up">
            Don't have an account?
          </NavLink>
          <Button type="submit" className={signInClasses.btn}>
            Sign In
          </Button>
        </div>
      </form>
    </Card>
  );
};
