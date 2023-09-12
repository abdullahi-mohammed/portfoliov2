import { IonImg } from "@ionic/react";
import styles from "./OnBoarding.module.css";

interface OnBoardingProps {
  src: string;
  classid: string;
  title: string;
  text: string;
}

const OnBoarding = ({ src, classid, title, text }: OnBoardingProps) => {
  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.bigImageWrapper}>
        <IonImg alt="top image" src={src} className={styles[classid]} />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.textWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default OnBoarding;
