import {
  IonButton,
  IonChip,
  IonIcon,
  IonImg,
  IonProgressBar,
  useIonToast,
} from "@ionic/react";
import { useCurrentUser } from "../../../../services/userService";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { TransactionModel } from "../../../../shared/models/transactionModel";
import { useStorage } from "../../../../hooks";
import { TransactionService } from "../../../../services/transactionService";
import { format, isToday, isYesterday } from "date-fns";
import { eye, eyeOff } from "ionicons/icons";
import getSymbolFromCurrency from "currency-symbol-map";
import { GiftCardRateModel } from "../../../../shared/models/giftcardrates";
import { GiftCardService } from "../../../../services/giftcardService";
import { CryptoService } from "../../../../services/cryptoService";
import { CryptoModel, Cryptos } from "../../../../shared/models/cryptoModel";
import { HowToPopup } from "../../mobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { getValue } from "firebase/remote-config";
import { fetchAndActivate } from "firebase/remote-config";

import { firebaseConfig } from './helpers';

export default function Dashboard({
  setMyAppData,
  setPrevRoute,
  search,
}: {
  setMyAppData: any;
  setPrevRoute: any;
  search: string;
}) {
  const { userName } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([] as TransactionModel[]);
  const history = useHistory();
  const { id, token } = useCurrentUser();
  const { updateData, resetData, appData } = useStorage();
  const [giftCards, setGiftCards] = useState([] as GiftCardRateModel[]);
  const [loadingCryptos, setLoadingCryptos] = useState(false);
  const [cryptos, setCryptos] = useState({} as CryptoModel);


  //Dashboard Remote Config
  const [sellCryptoCurrencyToggle, setSellCryptoCurrencyToggle] = useState(false)
  const [sellGiftcardToggle, setSellGiftcardToggle] = useState(false)

  const [sellGiftCardTitle, setSellGiftCardTitle] = useState('')
  const [sellCryptoTitle, setSellCryptoTitle] = useState('')

  const [carouselToggle, setCarouselToggle] = useState(false)
  const [modalPopOver, setModalPopOver] = useState(false)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // Initialize Remote Config and get a reference to the service
  const remoteConfig = getRemoteConfig(app);

  useEffect(() => {
    (async function () {
      await fetchAndActivate(remoteConfig)
        .then((res) => {
          console.log(res);

        })
        .catch((err) => {
          console.log(err);

        });

      const sellCryptoCurrency = getValue(remoteConfig, "dashboardSellCryptocurrency");
      const sellCryptoCurrencyToggle = sellCryptoCurrency.asBoolean()
      const sellGiftCard = getValue(remoteConfig, "dashboardSellGiftCard");
      const sellGiftCardToggle = sellGiftCard.asBoolean()

      const sellGiftCardTitle = getValue(remoteConfig, "dashboardSellGiftCardTitle");
      const sellGiftCardTitleVal = sellGiftCardTitle.asString()
      const sellCryptocurrencyTitle = getValue(remoteConfig, "dashboardSellCryptocurrencyTitle");
      const sellCryptocurrencyTitleVal = sellCryptocurrencyTitle.asString()

      const remoteCarouselToggle = getValue(remoteConfig, "dashboardCarouselToggle");
      const carouselToggle = remoteCarouselToggle.asBoolean()
      const remoteWelcomeModalToggle = getValue(remoteConfig, "dashboardWelcomeModalToggle");
      const WelcomeModalToggle = remoteWelcomeModalToggle.asBoolean()


      setSellGiftcardToggle(sellGiftCardToggle)
      setSellCryptoCurrencyToggle(sellCryptoCurrencyToggle)

      setSellGiftCardTitle(sellGiftCardTitleVal)
      setSellCryptoTitle(sellCryptocurrencyTitleVal)

      setCarouselToggle(carouselToggle)
      setModalPopOver(WelcomeModalToggle)

    })()
  }, [])
  //---------------------------------------

  const getGiftCardRates: () => void = async () => {

    const giftCardService = new GiftCardService();
    setLoading(true);

    const result = await giftCardService.giftCard(resetData);

    setGiftCards(result);
    setLoading(false);
  };

  const getCryptos: () => void = async () => {
    const cryptoService = new CryptoService();
    setLoadingCryptos(true);

    const result = await cryptoService.getCryptos(resetData);

    setCryptos(result);
    setLoadingCryptos(false);
  };

  useEffect(() => {
    getGiftCardRates();
    getCryptos();
  }, []);

  const [present] = useIonToast();

  const presentToast = (
    position: "top" | "middle" | "bottom",
    message: string
  ) => {
    present({
      message,
      duration: 1500,
      position,
    });
  };

  const handleShowToggle = () =>
    updateData({ showBalance: appData?.showBalance ? false : true });
  const handlePresentToast = (text: string) => presentToast("top", text);
  const handleSeeAll = (type: "giftcards" | "cryptos") =>
    history.push(`/${type}`);

  const handleSeeGiftCard = async (id: string, giftcard: GiftCardRateModel) => {
    await updateData({ giftcard, giftCardId: giftcard?.id });
    await setPrevRoute("/dashboard");
    history.push(`/giftcards/${id}`);
  };

  const handleSeeCrypto = async (crypto: Cryptos) => {
    await updateData({
      crypto,
      currentRateCurrency: crypto?.rates[0],
      currentNetwork: crypto?.networks[0],
    });
    await setPrevRoute("/dashboard");
    history.push("/trade-crypto");
  };

  useEffect(() => {
    setMyAppData(appData);
  }, [appData]);

  const handleSeeRates = () => history.push("/giftcard-rates");
  const handleHowToSellGiftcard = () => history.push("/how-to-sell-giftcard");
  const handleHowToSellCrypto = () => history.push("/how-to-sell-crypto");

  useEffect(() => {
    const getTransactions = async () => {
      const transactionService = new TransactionService();

      setLoading(true);

      const transactions = await transactionService.getTransacions(
        id,
        token,
        resetData
      );
      setTransactions(transactions?.data?.items);

      setLoading(false);
    };

    id && getTransactions();
  }, [id]);

  function formatDate(date: number | Date) {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return "Older";
  }

  const dateOptions = ["today", "yesterday", "older"];

  const filteredTransactions = () =>
    dateOptions?.map((date, index) => {
      return transactions?.filter(
        (transaction) =>
          formatDate(new Date(transaction?.createdAt)).toLowerCase() ===
          dateOptions[index]
      );
    });

  const handleToggleShow = () =>
    updateData({ showBalance: appData?.showBalance ? false : true });
  const handleTradeDetails = async (transaction: TransactionModel) => {
    await updateData({ tradeDetails: transaction });
    history.push("/trade-details");
  };

  const carousel = <div style={{ marginBottom: '40px' }}>
    <Swiper
      // pagination={true}
      pagination={{
        el: ".swiper-custom-pagination",
      }}
      navigation={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={5}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide className={styles.heroImageWrapper}>
        <img src="/assets/plut_hero.jpg" className={styles.heroImage} />
      </SwiperSlide>

      <SwiperSlide className={styles.heroImageWrapper}>
        <img src="/assets/plut_hero3.jpg" className={styles.heroImage} />
      </SwiperSlide>

      <SwiperSlide className={styles.heroImageWrapper}>
        <img src="/assets/plut_hero2.jpg" className={styles.heroImage} />
      </SwiperSlide>
    </Swiper>

    <div className="swiper-custom-pagination" />
  </div>

  const sellGiftCardHtml =
    <section className={styles.section}>
      <div className={styles.top}>
        <p className={styles.topHeader}>{sellGiftCardTitle || 'Sell Giftcard'}</p>
        <p
          className={styles.seeAll}
          onClick={() => history.push("/giftcards")}
        >
          See all
        </p>
      </div>

      <div className={styles.giftcards}>
        {loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : giftCards?.length ? (
          giftCards
            ?.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .includes(search.trim().toLowerCase()) || search === ""
            )
            ?.slice(0, 6)
            ?.map((giftcard, index) => (
              <div
                className={styles.giftcard}
                key={index}
                onClick={() => handleSeeGiftCard(giftcard.id, giftcard)}
              >
                <IonImg
                  alt="giftcard"
                  src={giftcard.imageUrl}
                  className={styles.giftcardImage}
                />
              </div>
            ))
        ) : (
          <p className={styles.secondHeadingNotAvailable}>
            Giftcards currently not available
          </p>
        )}
      </div>
    </section>

  const sellCryptoHtml = <div className={styles.cryptoSection}>
    <section className={styles.section}>
      <div className={styles.top}>
        <p className={styles.topHeader}>{sellCryptoTitle || "Sell Cryptocurrency"}</p>
        <p
          className={styles.seeAll}
          onClick={() => history.push("/cryptos")}
        >
          See all
        </p>
      </div>

      <div className={styles.bills}>
        {loadingCryptos ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : cryptos?.cryptoCurrencies?.length ? (
          cryptos?.cryptoCurrencies
            ?.filter(
              (item) =>
                item.name
                  .toLowerCase()
                  .includes(search.trim().toLowerCase()) || search === ""
            )
            ?.slice(0, 6)
            ?.map((crypto) => (
              <div
                className={styles.bill}
                key={crypto?.name}
                onClick={() => handleSeeCrypto(crypto)}
              >
                <IonImg
                  alt="crypto"
                  src={crypto?.logo}
                  className={styles.billImage}
                />
                <p className={styles.billName}>{crypto.name}</p>
              </div>
            ))
        ) : (
          <p className={styles.secondHeadingNotAvailable}>
            Cryptos currently not available
          </p>
        )}
      </div>
    </section>
  </div>

  if (!appData?.user?.id) return <></>;

  return (
    <div className={styles.wrapper}>
      {appData?.showPopup ? <HowToPopup modalPopOver={modalPopOver} /> : <></>}

      <h3 className={styles.header}>Dashboard</h3>
      <p className={styles.welcomText}>
        Welcome to Plut, {userName}{" "}
        <IonImg
          alt="wave image"
          src="/assets/wave.png"
          className={styles.wave}
        />
      </p>

      {carouselToggle ? carousel : null}

      <div className={styles.sectionsWrapper}>
        <section className={styles.section}>
          <div className={styles.top}>
            <p className={styles.topHeader}>Wallet</p>
          </div>

          <div className={styles.cardContainer}>
            <IonImg
              alt="card image"
              src="/assets/watermark.png"
              className={styles.watermark}
            />

            <div className={styles.cardDetails}>
              <div className={styles.cardHeaderWrapper}>
                <p className={styles.cardHeader}>Wallet Balance</p>
                <IonIcon
                  icon={!appData?.showBalance ? eye : eyeOff}
                  className={styles.icon}
                  slot="end"
                  onClick={handleToggleShow}
                ></IonIcon>
              </div>

              <p className={styles.cardBalance}>
                {appData?.showBalance
                  ? `₦${(0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                  : "****"}
              </p>

              <div className={styles.cardOptions}>
                <IonButton
                  fill="clear"
                  shape="round"
                  className={styles.cardOPtionsButton}
                  onClick={() => handlePresentToast("Coming soon")}
                >
                  <IonIcon
                    icon="/assets/fund.svg"
                    className={styles.optionsIcon}
                    slot="start"
                  ></IonIcon>
                  Fund Wallet
                </IonButton>

                <IonButton
                  id="open-toast"
                  fill="clear"
                  shape="round"
                  className={styles.cardOPtionsButton}
                  onClick={() =>
                    handlePresentToast(
                      "Coming soon - Payments are made directly to your bank account"
                    )
                  }
                >
                  <IonIcon
                    icon="/assets/withdraw.svg"
                    className={styles.optionsIcon}
                    slot="start"
                  ></IonIcon>
                  Withdraw Money
                </IonButton>
              </div>
            </div>
          </div>

          <div className={styles.accountNumber}>
            <h3 className={styles.accountHeading}>
              Click to enable your Plut Account Number
            </h3>
            <p className={styles.accountText}>
              Verify your identity to get access to your <br /> plut account
              details
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.top}>
            <p className={styles.topHeader}>Transactions</p>
            <p
              className={styles.seeAll}
              onClick={() => history.push("/transactions")}
            >
              See all
            </p>
          </div>

          <div className={styles.transactionList}>
            {loading ? (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            ) : filteredTransactions()[0]?.length ? (
              <div className={styles.transactionsWrapper}>
                <h3 className={styles.transactionTime}>{dateOptions[0]}</h3>

                {filteredTransactions()[0]
                  ?.slice(0, 3)
                  ?.map((transaction, index) => (
                    <div key={index} className={styles.allTransactionsWrapper}>
                      {transaction.transactionCategory.toLowerCase().trim() ===
                        "giftcard" ? (
                        <div
                          key={index}
                          className={styles.transaction}
                          onClick={() => handleTradeDetails(transaction)}
                        >
                          <IonImg
                            src={
                              transaction?.giftCardExchanges[0]?.giftCard
                                ?.imageUrl
                            }
                            className={styles.transactionImage}
                          />

                          <div className={styles.transactionDetailsWrapper}>
                            <p className={styles.transactionAmount}>
                              {getSymbolFromCurrency(
                                transaction?.giftCardExchanges[0]?.quoteCurrencyCode?.slice(
                                  0,
                                  3
                                )
                              )}
                              {transaction?.amount
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </p>
                            <p className={styles.transactionCategory}>
                              {
                                transaction?.giftCardExchanges[0]?.giftCard
                                  ?.name
                              }{" "}
                              {transaction?.transactionCategory}
                            </p>
                            <p className={styles.transactionType}>
                              (
                              {
                                transaction?.giftCardExchanges[0]?.giftCardRate
                                  ?.giftCardType
                              }
                              )
                            </p>
                          </div>

                          <div className={styles.transactionStatus}>
                            <IonChip
                              color={
                                transaction.transactionStatus.toLowerCase() ===
                                  "success"
                                  ? "success"
                                  : transaction.transactionStatus.toLowerCase() ===
                                    "pending"
                                    ? "tertiary"
                                    : "danger"
                              }
                            >
                              {transaction.transactionStatus.toLowerCase() ===
                                "pending"
                                ? "Processing"
                                : transaction.transactionStatus}
                            </IonChip>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={styles.cryptoHistoryWrapper}
                          onClick={() => handleTradeDetails(transaction)}
                        >
                          <IonImg
                            src={
                              transaction?.cryptoExchanges?.cryptoCurrencies
                                ?.logo
                            }
                            className={styles.cryptoImage}
                          />
                          <div className={styles.cryptoCode}>
                            <p className={styles.cryptoValueHeader}>
                              {
                                transaction?.cryptoExchanges?.cryptoCurrencies
                                  ?.name
                              }{" "}
                              sold
                            </p>
                            <p className={styles.cryptoValueBody}>
                              {format(
                                new Date(transaction.createdAt),
                                "d/M/yyyy hh:mm a"
                              )}
                            </p>
                          </div>
                          <div
                            className={`${styles.cryptoCode} ${styles.cryptoCodeLast}`}
                          >
                            <p className={styles.cryptoValueHeader}>
                              {transaction.cryptoExchanges.declaredCryptoAmount}{" "}
                              {transaction.cryptoExchanges.exchangeRate.base}
                            </p>
                            <p
                              className={`${styles.cryptoValueBody} ${transaction.transactionStatus.toLowerCase() ===
                                "success"
                                ? styles.cryptoSuccess
                                : transaction.transactionStatus.toLowerCase() ===
                                  "pending"
                                  ? styles.cryptoPending
                                  : styles.cryptoFailed
                                }`}
                            >
                              {transaction.transactionStatus.toLowerCase() ===
                                "failed"
                                ? "Declined"
                                : transaction.transactionStatus}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p className={styles.noTransactions}>No Transaction(s) Today</p>
            )}
          </div>
        </section>
      </div>

      {sellGiftcardToggle ? sellGiftCardHtml : null}

      {sellCryptoCurrencyToggle ? sellCryptoHtml : null}

    </div>
  );
}
