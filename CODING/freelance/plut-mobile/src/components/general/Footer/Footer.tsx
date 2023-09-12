import { IonFooter, IonToolbar } from "@ionic/react";
import Button from "../Button/Button";
import { ButtonProps } from "../../../shared/types/ButtonProps";
import styles from "./Footer.module.css";

interface FooterProps extends ButtonProps {
  errorMessage: string;
  extraComponents?: any;
  extraComponentsPosition?: "top" | "bottom";
  verticalPadding?: boolean;
}

export default function Footer({
  onClick = () => {},
  type = "primary",
  text,
  isDisabled = false,
  errorMessage,
  buttonType = "button",
  isLoading,
  extraComponents,
  extraComponentsPosition = "top",
  verticalPadding = true,
}: FooterProps) {
  return (
    <IonFooter
      className={`ion-no-border ${verticalPadding ? "ion-padding" : ""}`}
    >
      <IonToolbar className={styles.footer}>
        <p
          className={
            errorMessage ? styles.errorMesssage : styles.noErrorMesssage
          }
        >
          {errorMessage ? errorMessage : "No error"}
        </p>

        {extraComponentsPosition === "top" && extraComponents}

        <Button
          onClick={onClick}
          text={text}
          type={type}
          isDisabled={isDisabled}
          buttonType={buttonType}
          isLoading={isLoading}
        />

        {extraComponentsPosition === "bottom" && extraComponents}
      </IonToolbar>
    </IonFooter>
  );
}
