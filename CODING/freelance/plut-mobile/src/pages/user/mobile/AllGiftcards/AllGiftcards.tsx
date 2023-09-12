import { useState, useEffect } from "react";
import { IonContent, IonImg, IonProgressBar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Header, Search } from "../../../../components/user";
import { GiftCardService } from "../../../../services/giftcardService";
import { GiftCardRateModel } from "../../../../shared/models/giftcardrates";
import styles from "./AllGiftcards.module.css";
import { useStorage } from "../../../../hooks";

export default function AllGiftcards() {
  const [value, setValue] = useState<any>("");
  const [giftCards, setGiftCards] = useState([] as GiftCardRateModel[]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { resetData, updateData } = useStorage();

  useEffect(() => {
    const getGiftCardRates = async () => {
      const giftCardService = new GiftCardService();
      setLoading(true);

      const result = await giftCardService.giftCard(resetData);
      setGiftCards(result);
      setLoading(false);
    };

    getGiftCardRates();
  }, []);

  const handleClick = async (giftcard: GiftCardRateModel) => {
    await updateData({ giftcard, giftCardId: giftcard?.id });

    history.push(`/giftcards/${giftcard?.id}`);
  };

  return (
    <>
      <Header title="Sell Giftcards" />

      <IonContent className="ion-padding">
        <Search
          value={value}
          setValue={setValue}
          placeholder="Search Giftcards"
        />

        <div className={styles.heroWrapper}>
          <IonImg src="/assets/frame.png" className={styles.hero} />
          <div className={styles.heroContent}>
            <div className={styles.heroContentInner}>
              <h4 className={styles.heroTitle}>Get the best rates with Plut</h4>
              <p className={styles.heroText}>
                Get the best rates and fast payments <br />
                with plut
              </p>
            </div>
          </div>
        </div>

        <div className={styles.giftcards}>
          {loading ? (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          ) : (
            giftCards
              .filter((giftcard) =>
                giftcard.name.toLowerCase().includes(value.toLowerCase())
              )
              .map((giftcard) => (
                <div
                  className={styles.giftcard}
                  key={giftcard.name}
                  onClick={() => handleClick(giftcard)}
                >
                  <IonImg
                    src={giftcard.imageUrl}
                    className={styles.giftcardImage}
                  />
                  <p className={styles.giftcardName}>{giftcard.name}</p>
                </div>
              ))
          )}
        </div>
      </IonContent>
    </>
  );
}
