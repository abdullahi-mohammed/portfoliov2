import { IonContent, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../../components";
import styles from "./CryptoSuccessful.module.css";

export default function CryptoSuccessful() {
  const history = useHistory();

  const handleClick = () => history.push("/");

  return (
    <>
      <IonContent className="ion-padding">
        <div className={styles.wrapper}>
          <IonImg
            src="/assets/successful-trade.svg"
            className={styles.successImage}
          />

          <h4 className={styles.heading}>
            Your trade has been successfully placed
          </h4>
          <p className={styles.text}>
            It will take between{" "}
            <span className={styles.textAccent}>30-45 minutes</span> to confirm
            the validity of your cards and when that’s done your funds will be
            disbursed to your Plut Wallet
          </p>

          <div className={styles.stagesWrapper}>
            <div className={styles.stages}>
              <div className={styles.nextWrapper}>
                <div className={styles.lineLeft}></div>
                <IonImg src="/assets/stage-done.svg" className={styles.done} />
                <div className={styles.line}></div>
              </div>
              <p className={styles.stage}>
                Trade <br /> Placed
              </p>
            </div>

            <div className={styles.stagesMiddle}>
              <div className={styles.nextWrapper}>
                <div className={styles.line}></div>
                <div className={styles.next}></div>
                <div className={styles.lineRight}></div>
              </div>
              <p className={styles.stage}>
                Verifying <br />
                crypto
              </p>
            </div>

            <div className={styles.stages}>
              <div className={styles.nextWrapper}>
                <div className={styles.lineRight}></div>
                <div className={styles.last}></div>
                <div className={styles.lineLeft}></div>
              </div>
              <p className={styles.stage}>
                Funds
                <br /> disbursed
              </p>
            </div>
          </div>
        </div>

        <Button
          isLoading={false}
          type="secondary"
          text="Go to Home"
          onClick={handleClick}
        />
      </IonContent>
    </>
  );
}
