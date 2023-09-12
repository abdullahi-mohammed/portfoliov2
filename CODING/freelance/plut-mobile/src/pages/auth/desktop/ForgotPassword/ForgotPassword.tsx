import { FormEvent, useEffect, useState } from "react";
import { Footer, Input } from "../../../../components";
import { useApi, useStorage } from "../../../../hooks";
import { useHistory } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { UserAuthService } from "../../../../services/userAuthService";
import { Wrapper } from "../../../../components/auth/Desktop";

export default function ForgotPassword({ text }: { text: string }) {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { request, isSuccessful, setIsSuccessful, error, isLoading } = useApi();
  const { updateData } = useStorage();

  const history = useHistory();

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      history.push("/check-mail");
    }
  }, [isSuccessful]);

  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    updateData({ email });
    const forgotPassword = async () => {
      const forgotPassword = new UserAuthService();
      const forgot = await forgotPassword.forgotPassword({
        email,
      });
      return forgot;
    };

    request(forgotPassword);
  };

  return (
    <Wrapper>
      <p className={styles.goBack} onClick={() => history.replace("/login")}>
        {text}
      </p>
      <h3 className={styles.title}>Forgot Password</h3>
      <p className={styles.body}>
        Enter the email address associated with your account and we will send
        you a reset password link.
      </p>

      <form
        id="submit"
        onSubmit={(e) => handleSubmit(e)}
        className={styles.form}
      >
        <Input
          type="email"
          label="Email address"
          placeholder="Enter your email address"
          value={email}
          setValue={setEmail}
        />
      </form>

      <Footer
        buttonType="submit"
        errorMessage={errorMessage}
        text="Send Reset Link"
        isLoading={isLoading}
        verticalPadding={false}
      />
    </Wrapper>
  );
}
