import { Button, Footer } from "../../../../components";
import { useStorage } from "../../../../hooks";
import { Link, useHistory } from "react-router-dom";
import styles from "./CheckMail.module.css";
import { Wrapper } from "../../../../components/auth/Desktop";

export default function CheckMail() {
  const { appData } = useStorage();
  const history = useHistory();

  const handleClick = () => history.push("/new-password");

  return (
    <Wrapper>
      <h3 className={styles.title}>Reset Link Sent !</h3>
      <p className={styles.body}>
        We have sent a password reset link to your email:
      </p>
      <p className={styles.email}>{appData.email}</p>

      <a
        title="link to mail"
        href={`https://mail.google.com/mail/u/${appData.email}`}
        target="_blank"
        className={styles.mailLink}
      >
        <Button isLoading={false} type="secondary" text="Open Mail App" />
      </a>

      <div className={styles.resendWrapper}>
        <p className={styles.resendText}>
          Didn’t receive email? Check your spam section or
        </p>
        <Link to="/forgot-password" className={styles.resendLink}>
          Try another email address
        </Link>
      </div>

      <Footer
        isLoading={false}
        errorMessage=""
        text="Next"
        onClick={handleClick}
        verticalPadding={false}
      />
    </Wrapper>
  );
}
