import { IonImg, IonProgressBar } from "@ionic/react";
import styles from "./AllGiftcards.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GiftCardRateModel } from "../../../../shared/models/giftcardrates";
import { useStorage } from "../../../../hooks";
import { GiftCardService } from "../../../../services/giftcardService";

export default function TradeGiftcards({
  setMyAppData,
  search,
  setPrevRoute,
}: {
  setMyAppData: any;
  setPrevRoute: any;
  search: string;
}) {
  const [giftCards, setGiftCards] = useState([] as GiftCardRateModel[]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { resetData, updateData, appData } = useStorage();

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

  const handleSeeGiftCard = async (id: string, giftcard: GiftCardRateModel) => {
    await updateData({ giftcard, giftCardId: giftcard?.id });
    await setPrevRoute("/giftcards");
    history.push(`/giftcards/${id}`);
  };

  useEffect(() => {
    setMyAppData(appData);
  }, [appData]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Sell Giftcards</h3>
      <p className={styles.headerText}>
        Sell giftcards at the best rates in the market.
      </p>

      <div className={styles.giftcards}>
        {loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          giftCards
            .filter((giftcard) =>
              giftcard.name.toLowerCase().includes(search.trim().toLowerCase())
            )
            .map((giftcard) => (
              <div
                className={styles.giftcard}
                key={giftcard.name}
                onClick={() => handleSeeGiftCard(giftcard.id, giftcard)}
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
    </div>
  );
}
