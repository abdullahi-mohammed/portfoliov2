import { IonButton, IonSpinner } from "@ionic/react";
import styles from "./Button.module.css";
import { ButtonProps } from "../../../shared/types/ButtonProps";
import "./Button.css";

export default function Button({
  text,
  type = "primary",
  onClick = () => {},
  isDisabled = false,
  buttonType = "button",
  isLoading,
}: ButtonProps) {
  return (
    <>
      <IonButton
        form="submit"
        disabled={isDisabled}
        color={type === "primary" ? "primary" : "light"}
        className={styles.button}
        expand="block"
        shape="round"
        size="large"
        onClick={onClick}
        type={buttonType}
      >
        {isLoading ? (
          <IonSpinner name="dots" className={styles.spinner}></IonSpinner>
        ) : (
          <span
            className={
              isDisabled
                ? styles.textDisabled
                : type === "primary"
                ? styles.textPrimary
                : styles.textSecondary
            }
          >
            {text}
          </span>
        )}
      </IonButton>

      {buttonType === "submit" && (
        <button
          type="submit"
          form="submit"
          className={styles.submitButton}
        ></button>
      )}
    </>
  );
}
