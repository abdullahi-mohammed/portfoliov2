import { IonTitle } from "@ionic/react";
import styles from "./HowToSell.module.css";

interface Props {
  type: string;
}

export default function HowToSell({ type }: Props) {
  return (
    <div className={styles.videoWrapper}>
      <IonTitle className={styles.title}>
        How to sell <span className={styles.headerAccent}>{type}</span>
      </IonTitle>
      <div className={styles.videoDisplayWrapper}>
        <video controls className={styles.video}>
          <source src={`/assets/videos/${type}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
