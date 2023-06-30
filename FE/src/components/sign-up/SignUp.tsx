import React, { useEffect, useState, FormEvent, useContext } from "react";
import signUpClasses from "./SignUp.module.css";
import { Card } from "../common/card/Card";
import { Input } from "../common/input/Input";
import Button from "../common/button/Button";
import { AuthContext } from "../../store/auth-context";
import { RequestApiUtils } from "../../utils/api/RequestApiUtils";

const isEmailValid = (str: string): boolean => {
  return str.length > 5 && str.length < 255 && str.includes("@");
};

const isPasswordValid = (str: string): boolean => {
  return str.length > 8 && str.length < 255;
};

const isConfirmPasswordValid = (
  confirmPassword: string,
  password: string
): boolean => {
  if (confirmPassword !== password) {
    return false;
  }

  return confirmPassword.length > 8 && confirmPassword.length < 255;
};

export const SignUp = () => {
  const [successfulSignUp, setSuccessfullSignUp] = useState(true);
  const authContext = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState({ value: "", isValid: true });
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    isValid: true,
  });
  const [confirmPasswordInput, setConfirPasswordInput] = useState({
    value: "",
    isValid: true,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setSuccessfullSignUp(true);
    setIsFormValid(
      emailInput.isValid &&
        passwordInput.isValid &&
        confirmPasswordInput.isValid
    );
  }, [emailInput, passwordInput, confirmPasswordInput]);

  useEffect(() => {
    setIsFormValid(false);
  }, []);

  useEffect(()=>{
    if (confirmPasswordInput.value !== "") {
      setConfirPasswordInput({
        value: confirmPasswordInput.value,
        isValid: isConfirmPasswordValid(
          confirmPasswordInput.value,
          passwordInput.value
        ),
      });
    }
  }, [passwordInput]);

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

  const confirmPasswordChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const currentValue: string = (event.target as HTMLInputElement).value;
    setConfirPasswordInput({
      value: currentValue,
      isValid: isConfirmPasswordValid(currentValue, passwordInput.value),
    });
  };

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        await RequestApiUtils.createNewUser(
          emailInput.value,
          passwordInput.value
        );
        await authContext.onLogin(emailInput.value, passwordInput.value);
        setSuccessfullSignUp(true);
      } catch (error) {
        setSuccessfullSignUp(false);
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
      setConfirPasswordInput({
        value: confirmPasswordInput.value,
        isValid: isConfirmPasswordValid(confirmPasswordInput.value, passwordInput.value),
      });
    }
  };

  return (
    <Card className={signUpClasses.login}>
      <form onSubmit={formSubmitHandler}>
        <div className={signUpClasses.header}>
          <h2 className="h2">GetYourDiet</h2>
          <p>
            Register to get access to <strong>Your Fridge</strong>
          </p>
          <span className={signUpClasses.error}>
            {successfulSignUp ? "" : "Such email already exists"}
          </span>
        </div>
        <div className={signUpClasses["inputs-wrapper"]}>
          <Input
            className={signUpClasses.input}
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
            className={signUpClasses.input}
            label="Password"
            isValid={passwordInput.isValid}
            type="password"
            id="password"
            value={passwordInput.value}
            onChange={passwordChangeHandler}
            errorMessage="Incorrect password"
            isProducNameInput={false}
          />
          <Input
            className={signUpClasses.input}
            label="Confirm password"
            isValid={confirmPasswordInput.isValid}
            type="password"
            id="confirm-password"
            value={confirmPasswordInput.value}
            onChange={confirmPasswordChangeHandler}
            errorMessage="Passwords should match"
            isProducNameInput={false}
          />
        </div>
        <div className={signUpClasses.actions}>
          <Button type="submit" className={signUpClasses.btn}>
            Sign Up
          </Button>
        </div>
      </form>
    </Card>
  );
};
