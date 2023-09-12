import { IonContent, IonImg } from "@ionic/react";
import { Header } from "../../../../components/auth";
import { Button, Footer } from "../../../../components";
import { Link, useHistory } from "react-router-dom";
import { useStorage } from "../../../../hooks";
import styles from "./CheckMail.module.css";

export default function CheckMail() {
  const { appData } = useStorage();
  const history = useHistory();

  const handleClick = () => history.push("/new-password");

  return (
    <>
      <Header title="" />

      <IonContent className="ion-padding">
        <div className={styles.contentWrapper}>
          <IonImg
            alt="top image"
            src="/assets/check-mail.svg"
            className={styles.image}
          />
          <h3 className={styles.title}>Check your Mail</h3>
          <p className={styles.text}>
            We have sent a password reset link to your email:
          </p>
          <p className={`${styles.text} ${styles.textAccent}`}>
            {appData.email}
          </p>

          <a
            title="link to mail"
            href={`https://mail.google.com/mail/u/${appData.email}`}
            target="_blank"
            className={styles.mailLink}
          >
            <Button isLoading={false} type="secondary" text="Open Mail App" />
          </a>

          <Link to="/forgot-password" className={styles.resend}>
            Didn’t receive email? Check your spam section or <br />
            <span className={styles.resendAccent}>
              Try another email address
            </span>
          </Link>
        </div>
      </IonContent>

      <Footer
        isLoading={false}
        errorMessage=""
        text="Next"
        onClick={handleClick}
      />
    </>
  );
}
