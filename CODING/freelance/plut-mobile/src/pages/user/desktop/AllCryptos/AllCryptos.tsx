import { useState, useEffect } from "react";
import { IonContent, IonImg, IonProgressBar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Header, Search } from "../../../../components/user";
import styles from "./AllCryptos.module.css";
import { CryptoService } from "../../../../services/cryptoService";
import { CryptoModel, Cryptos } from "../../../../shared/models/cryptoModel";
import { useStorage } from "../../../../hooks";

export default function AllCryptos({
  setMyAppData,
  search,
  setPrevRoute,
}: {
  setMyAppData: any;
  setPrevRoute: any;
  search: string;
}) {
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
    await setPrevRoute("/cryptos");
    history.push("/trade-crypto");
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Sell Cryptocurrencies</h3>
      <p className={styles.headerText}>
        Sell cryptocurrencies at the best rates in the market.
      </p>

      <div className={styles.giftcards}>
        {loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          cryptos?.cryptoCurrencies
            ?.filter((cryptp) =>
              cryptp?.name.toLowerCase().includes(search.trim().toLowerCase())
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
    </div>
  );
}
