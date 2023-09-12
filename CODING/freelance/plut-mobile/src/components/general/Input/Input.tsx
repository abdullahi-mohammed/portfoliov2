import { useState } from "react";
import { IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import styles from "./Input.module.css";

interface InputProps {
  placeholder: string;
  label: string;
  type?: "password" | "text" | "email" | "search";
  value: string;
  setValue?: any;
  autofocus?: boolean;
}

export default function Input({
  placeholder,
  label,
  type = "text",
  value,
  setValue,
  autofocus = false,
}: InputProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleShowToggle = () => setShow((prev) => !prev);

  return (
    <div>
      <IonLabel position="floating" className={styles.label}>
        {label}
      </IonLabel>
      <IonItem fill="outline" className={styles.formInput} mode="md">
        <IonInput
          mode="md"
          value={value}
          placeholder={placeholder}
          type={type === "password" ? (!show ? "password" : "text") : type}
          onIonInput={(e: any) => setValue(e.target.value)}
          className={styles.input}
          autofocus={autofocus}
          autocomplete={type === "password" ? "off" : "on"}
        ></IonInput>

        {type === "password" && (
          <IonIcon
            icon={!show ? eye : eyeOff}
            className={styles.icon}
            slot="end"
            onClick={handleShowToggle}
          ></IonIcon>
        )}
      </IonItem>
    </div>
  );
}
