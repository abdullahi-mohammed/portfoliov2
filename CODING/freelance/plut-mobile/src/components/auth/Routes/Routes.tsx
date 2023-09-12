import { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import {
  CheckMail,
  CreateSuccessful,
  ForgotPassword,
  NewPassword,
  Onboarding,
  ResetSuccessful,
  SignupLoginForm,
  VerifyEmail,
} from "../../../pages/auth/mobile";

import {
  Login,
  Signup,
  CheckMailDesktop,
  CreateSuccessfulDesktop,
  ForgotPasswordDesktop,
  NewPasswordDesktop,
  ResetSuccessfulDesktop,
  VerifyEmailDesktop,
} from "../../../pages/auth/desktop";

import styles from "./Routes.module.css";
import { useStorage, useWindowDimensions } from "../../../hooks";

export default function Routes({ setIsLoggedIn }: { setIsLoggedIn: any }) {
  const [value, setValue] = useState<"signup" | "login">("signup");
  const location = useLocation();
  const { width } = useWindowDimensions();

  return width > 600 ? (
    <Switch>
      <Route exact path="/login">
        <Login setIsLoggedIn={setIsLoggedIn} />
      </Route>

      <Route exact path="/signup">
        <Signup setIsLoggedIn={setIsLoggedIn} />
      </Route>

      <Redirect exact path="/auth" to="/login" />
      <Redirect exact path="/welcome" to="/login" />

      <Route exact path="/verify-mail">
        <VerifyEmailDesktop />
      </Route>

      <Route exact path="/forgot-password">
        <ForgotPasswordDesktop text="Back to login" />
      </Route>

      <Route exact path="/check-mail">
        <CheckMailDesktop />
      </Route>

      <Route exact path="/new-password">
        <NewPasswordDesktop />
      </Route>

      <Route exact path="/reset-successful">
        <ResetSuccessfulDesktop
          value={value}
          setValue={setValue}
          text="Login"
        />
      </Route>

      <Route exact path="/signup-successful">
        <CreateSuccessfulDesktop
          value={value}
          setValue={setValue}
          text="Login"
        />
      </Route>

      <Route path="*">
        <Redirect to="/welcome" />
      </Route>
    </Switch>
  ) : (
    <>
      <IonPage
        className={
          location.pathname === "/welcome"
            ? styles.welcomeWrapper
            : styles.wrapper
        }
      >
        <Switch>
          <Route exact path="/welcome">
            <Onboarding setValue={setValue} value={value} />
          </Route>

          <Route exact path="/auth">
            <SignupLoginForm value={value} setIsLoggedIn={setIsLoggedIn} />
          </Route>

          <Redirect exact path="/login" to="/auth" />
          <Redirect exact path="/signup" to="/dashboard" />

          <Route exact path="/verify-mail">
            <VerifyEmail />
          </Route>

          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>

          <Route exact path="/check-mail">
            <CheckMail />
          </Route>

          <Route exact path="/new-password">
            <NewPassword />
          </Route>

          <Route exact path="/reset-successful">
            <ResetSuccessful value={value} setValue={setValue} />
          </Route>

          <Route exact path="/signup-successful">
            <CreateSuccessful value={value} setValue={setValue} />
          </Route>

          <Route path="*">
            <Redirect to="/welcome" />
          </Route>
        </Switch>
      </IonPage>
    </>
  );
}
