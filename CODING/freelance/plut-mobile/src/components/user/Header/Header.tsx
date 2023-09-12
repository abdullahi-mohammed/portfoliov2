import { IonHeader, IonImg, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  stage?: string;
}

export default function Header({ title, stage }: HeaderProps) {
  const history = useHistory();

  const handleGoBack = () => history.goBack();

  return (
    <IonHeader class="ion-no-border">
      <IonToolbar className={styles.ionToolBar}>
        <div className={`${styles.wrapper} ion-padding`} onClick={handleGoBack}>
          <IonImg src="/assets/back.png" className={styles.backButton} />
        </div>
        <IonTitle class={`ion-text-center ${styles.headerTitle}`}>
          {title}
        </IonTitle>
        {!!stage && <p className={styles.level}>{stage}</p>}
      </IonToolbar>
    </IonHeader>
  );
}
