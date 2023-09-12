import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../../../components/auth";
import { Input, Footer } from "../../../../components";
import { useHistory } from "react-router-dom";
import { useApi, useStorage } from "../../../../hooks";
import { IonContent } from "@ionic/react";
import { UserAuthService } from "../../../../services/userAuthService";
import styles from "./NewPassword.module.css";

export default function NewPassword() {
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { request, error, isLoading, isSuccessful, setIsSuccessful } = useApi();
  const history = useHistory();
  const { appData } = useStorage();

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      history.push("/reset-successful");
    }
  }, [isSuccessful]);

  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    setErrorMessage("");
  }, [password, confirmPassword, otp]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    if (otp?.length < 6) {
      setErrorMessage("Invalid otp");
      return;
    } else if (!password) {
      setErrorMessage("Password is required");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match");
      return;
    }

    const newPassword = async () => {
      const newPassword = new UserAuthService();
      const newPass = await newPassword.newPassword({
        email: appData.email,
        newPassword: password,
        otp,
      });

      return newPass;
    };

    request(newPassword);
  };

  return (
    <>
      <Header title="" />

      <IonContent className="ion-padding">
        <h3 className={styles.title}>New Password</h3>
        <p className={styles.text}>Please enter your new password.</p>

        <form
          className={styles.inputWrapper}
          id="submit"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            setValue={setOtp}
          />
          <Input
            label="Password"
            placeholder="Set a new password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <Input
            label="Confirm Password"
            placeholder="Enter password again"
            value={confirmPassword}
            setValue={setConfirmPassword}
            type="password"
          />
        </form>
      </IonContent>

      <Footer
        buttonType="submit"
        errorMessage={errorMessage}
        text="Reset Password"
        isLoading={isLoading}
      />
    </>
  );
}
