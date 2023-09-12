import { IonIcon, IonImg, IonTitle } from "@ionic/react";
import styles from "./HowToPopup.module.css";
import { close } from "ionicons/icons";
import { useStorage } from "../../../../hooks";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function HowToPopup(props: any) {
  const { updateData } = useStorage();
  const history = useHistory();
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = async () => {
    setShowPopup(false);
    await updateData({ showPopup: false });
  };

  const handleHowToSellGiftcard = async () => {
    await handleClose();
    history.push("/how-to-sell-giftcard");
  };

  const handleHowToSellCrypto = async () => {
    await handleClose();
    history.push("/how-to-sell-crypto");
  };

  if (!showPopup) return <></>;

  const modalHtml = (<div className={styles.overlay}>
    <div className={styles.wrapper}>
      <IonIcon
        icon={close}
        className={styles.closeIcon}
        onClick={handleClose}
      />

      <div className={styles.congratsWrapper}>
        <IonImg
          src="/assets/congrat.png"
          alt="congrats icon"
          className={styles.congrats}
        />
      </div>
      <IonTitle className={styles.title}>Welcome</IonTitle>
      <p className={styles.message}>
        Click one of the buttons below to learn how to sell giftcard or crypto
        on Plut.
      </p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleHowToSellGiftcard}>
          How to sell giftcard
        </button>
        <button
          className={styles.buttonSecond}
          onClick={handleHowToSellCrypto}
        >
          How to sell crypto
        </button>
      </div>
    </div>
  </div>)

  return props.modalPopOver ? modalHtml : null
}
