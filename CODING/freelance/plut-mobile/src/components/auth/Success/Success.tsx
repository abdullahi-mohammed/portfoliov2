import { useState, useEffect } from "react";
import { IonContent, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Footer } from "../../../components";
import styles from "./Success.module.css";

interface SuccessProps {
  type: "reset" | "create";
  setValue: any;
  value: string;
}

export default function Success({ type, setValue, value }: SuccessProps) {
  const history = useHistory();
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    if (first) setFirst(false);
    else history.replace("/auth");
  }, [value]);

  const handleClick = () =>
    value === "login" ? history.replace("/auth") : setValue("login");

  return (
    <>
      <IonContent className="ion-padding">
        <div className={styles.contentWrapper}>
          <IonImg
            alt="top image"
            src="/assets/success.svg"
            className={styles.successImg}
          />
          <h3 className={styles.title}>
            {type === "reset"
              ? "You’ve successfully reset your password"
              : "You’ve successfully created your account"}
          </h3>
          <p className={styles.text}>
            {type === "reset"
              ? "You can now use your new password to login to your plut account."
              : "You can now login to your plut account."}
          </p>
        </div>
      </IonContent>

      <Footer
        errorMessage=""
        text="Login"
        isLoading={false}
        onClick={handleClick}
      />
    </>
  );
}
