import { IonContent, IonImg } from "@ionic/react";
import styles from "./Wrapper.module.css";

export default function Wrapper({ children }: { children: any }) {
  return (
    <IonContent>
      <div className={styles.outerWrapper}>
        <IonImg
          alt="top image"
          src="/assets/logo-purple.svg"
          className={styles.logo}
        />

        <div className={styles.wrapper}>{children}</div>
      </div>
    </IonContent>
  );
}
