import { useState, useEffect } from "react";
import { IonContent, IonImg, IonProgressBar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Header, Search } from "../../../../components/user";
import styles from "./AllCryptos.module.css";
import { CryptoService } from "../../../../services/cryptoService";
import { CryptoModel, Cryptos } from "../../../../shared/models/cryptoModel";
import { useStorage } from "../../../../hooks";

export default function AllCryptos() {
  const [value, setValue] = useState<any>("");
  const [cryptos, setCryptos] = useState({} as CryptoModel);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { updateData, resetData } = useStorage();

  useEffect(() => {
    const getGiftCardRates = async () => {
      const cryptoService = new CryptoService();
      setLoading(true);

      const result = await cryptoService.getCryptos(resetData);
      setCryptos(result);
      setLoading(false);
    };

    getGiftCardRates();
  }, []);

  const handleSeeCrypto = async (crypto: Cryptos) => {
    await updateData({
      crypto,
      currentRateCurrency: crypto?.rates[0],
      currentNetwork: crypto?.networks[0],
    });
    history.push("/trade-crypto");
  };

  return (
    <>
      <Header title="Sell Cryptocurrency" />

      <IonContent className="ion-padding">
        <Search
          value={value}
          setValue={setValue}
          placeholder="Search Cryptos"
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
            cryptos?.cryptoCurrencies
              ?.filter((cryptp) =>
                cryptp?.name.toLowerCase().includes(value.toLowerCase())
              )
              .map((crypto, index) => (
                <div
                  className={styles.giftcard}
                  key={index}
                  onClick={() => handleSeeCrypto(crypto)}
                >
                  <IonImg src={crypto?.logo} className={styles.giftcardImage} />
                  <p className={styles.giftcardName}>{crypto?.name}</p>
                </div>
              ))
          )}
        </div>
      </IonContent>
    </>
  );
}
