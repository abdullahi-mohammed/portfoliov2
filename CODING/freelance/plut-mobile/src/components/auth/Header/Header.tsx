import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <IonHeader class="ion-no-border">
      <IonToolbar className={styles.ionToolBar}>
        <IonButtons slot="start">
          <IonBackButton className={styles.backButton}></IonBackButton>
        </IonButtons>

        <IonTitle class={`ion-text-center ${styles.headerTitle}`}>
          {title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
