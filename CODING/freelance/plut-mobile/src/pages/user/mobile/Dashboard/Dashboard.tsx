import { useState, useEffect } from "react";

import {
  IonProgressBar,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../../../services/userService";
import { format } from "date-fns";
import { chevronForwardOutline } from "ionicons/icons";
import { GiftCardService } from "../../../../services/giftcardService";
import { GiftCardRateModel } from "../../../../shared/models/giftcardrates";
import styles from "./Dashboard.module.css";
import { CryptoService } from "../../../../services/cryptoService";
import { CryptoModel, Cryptos } from "../../../../shared/models/cryptoModel";
import { useStorage } from "../../../../hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "./Dashboard.css";

import "swiper/css";
import "swiper/css/pagination";
import HowToPopup from "../HowToPopup/HowToPopup";

interface Bills {
  image: string;
  name: string;
}

const bills: Bills[] = [
  {
    image: "/assets/airtime.png",
    name: "Airtime Purchase",
  },
  {
    image: "/assets/data.png",
    name: "Data Purchase",
  },
  {
    image: "/assets/electricity.png",
    name: "Electricity Bill",
  },
  {
    image: "/assets/tv.png",
    name: "TV Subscription",
  },
  {
    image: "/assets/internet.png",
    name: "Internet Subscription",
  },
];

const Dashboard = () => {
  const { userName } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [loadingCryptos, setLoadingCryptos] = useState(false);
  const history = useHistory();
  const [giftCards, setGiftCards] = useState([] as GiftCardRateModel[]);
  const [cryptos, setCryptos] = useState({} as CryptoModel);
  const { updateData, resetData, appData } = useStorage();

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

  useEffect(() => {
    console.log(appData?.showBalance);
  }, [appData]);

  const handleShowToggle = () =>
    updateData({ showBalance: appData?.showBalance ? false : true });
  const handlePresentToast = (text: string) => presentToast("top", text);
  const handleSeeAll = (type: "giftcards" | "cryptos") =>
    history.push(`/${type}`);

  const handleSeeGiftCard = async (id: string, giftcard: GiftCardRateModel) => {
    await updateData({ giftcard, giftCardId: giftcard?.id });
    history.push(`/giftcards/${id}`);
  };

  const handleSeeCrypto = async (crypto: Cryptos) => {
    await updateData({
      crypto,
      currentRateCurrency: crypto?.rates[0],
      currentNetwork: crypto?.networks[0],
    });
    history.push("/trade-crypto");
  };

  const handleSeeRates = () => history.push("/giftcard-rates");
  const handleHowToSellGiftcard = () => history.push("/how-to-sell-giftcard");
  const handleHowToSellCrypto = () => history.push("/how-to-sell-crypto");

  if (!appData?.user?.id) return <></>;

  return (
    <>
      {appData?.showPopup ? <HowToPopup /> : <></>}

      <IonHeader class="ion-no-border">
        <IonToolbar className={styles.ionToolBar}>
          <div className={`ion-padding ${styles.topWrapper} `}>
            <div className={styles.profileWrapper}>
              <IonImg
                alt="profile image"
                src="/assets/profile.svg"
                className={styles.profile}
              />

              <div className={styles.greetingsWrapper}>
                <div className={styles.greetingsTop}>
                  <IonTitle className={styles.title}>Hello {userName}</IonTitle>
                  <IonImg
                    alt="wave image"
                    src="/assets/wave.png"
                    className={styles.wave}
                  />
                </div>

                <p className={styles.today}>
                  {format(new Date(), "EEEE do MMMM, yyyy")}
                </p>
              </div>
            </div>

            <div className={styles.notificationWrapper}>
              <IonImg
                alt="notification image"
                src="/assets/notification.svg"
                className={styles.notificationIcon}
              />
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className={`ion-padding ${styles.content}`}>
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

        {/* <Swiper
          speed={500}
          navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
        >
          <SwiperSlide>
            <img src="/assets/plut_hero.jpg" className={styles.heroImage} />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/plut_hero.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/plut_hero.jpg" />
          </SwiperSlide>
        </Swiper> */}
        {/* <div className={styles.cardContainer}>
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
                onClick={handleShowToggle}
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
        </div> */}

        <div className={styles.line}></div>

        <div>
          <div className={styles.giftCardHeader}>
            <div className={styles.giftCardHeaderLeft}>
              <IonImg
                alt="giftcard image"
                src="/assets/giftcard.svg"
                className={styles.giftcardIcon}
              />
              <p className={styles.headerTitle}>Sell Giftcards</p>
            </div>

            <div
              className={styles.seeAllWrapper}
              onClick={() => handleSeeAll("giftcards")}
            >
              <span className={styles.seeAll}>See All</span>
              <IonIcon
                icon={chevronForwardOutline}
                className={styles.seeAllIcon}
                slot="end"
              ></IonIcon>
            </div>
          </div>

          <div className={styles.giftcards}>
            {loading ? (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            ) : giftCards?.length ? (
              giftCards?.slice(0, 6)?.map((giftcard, index) => (
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
        </div>

        <div className={styles.giftcardDetailsWrapper}>
          <div
            className={styles.seeAllRatesWrapper}
            onClick={handleHowToSellGiftcard}
          >
            <IonIcon
              icon={chevronForwardOutline}
              className={styles.howToSellIcon}
              slot="end"
            ></IonIcon>
            <span className={styles.seeAll}>How to sell giftcard</span>
          </div>

          <div className={styles.seeAllRatesWrapper} onClick={handleSeeRates}>
            <span className={styles.seeAll}>giftcard rates</span>
            <IonIcon
              icon={chevronForwardOutline}
              className={styles.seeAllIcon}
              slot="end"
            ></IonIcon>
          </div>
        </div>

        <div className={styles.line}></div>

        <div>
          <div className={styles.cryptoHeader}>
            <div className={styles.giftCardHeaderLeft}>
              <IonImg
                alt="crypto image"
                src="/assets/sell_crypto.svg"
                className={styles.giftcardIcon}
              />
              <p className={styles.headerTitle}>Sell Cryptocurrency</p>
            </div>

            <div
              className={styles.seeAllWrapper}
              onClick={() => handleSeeAll("cryptos")}
            >
              <span className={styles.seeAll}>See All</span>
              <IonIcon
                icon={chevronForwardOutline}
                className={styles.seeAllIcon}
                slot="end"
              ></IonIcon>
            </div>
          </div>

          <div className={styles.bills}>
            {loadingCryptos ? (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            ) : cryptos?.cryptoCurrencies?.length ? (
              cryptos?.cryptoCurrencies?.slice(0, 6)?.map((crypto) => (
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
        </div>

        <div className={styles.giftcardDetailsWrapper}>
          <div
            className={styles.seeAllRatesWrapper}
            onClick={handleHowToSellCrypto}
          >
            <IonIcon
              icon={chevronForwardOutline}
              className={styles.howToSellIcon}
              slot="end"
            ></IonIcon>
            <span className={styles.seeAll}>How to sell crypto</span>
          </div>

          {/* <div className={styles.seeAllRatesWrapper} onClick={handleSeeRates}>
            <span className={styles.seeAll}>giftcard rates</span>
            <IonIcon
              icon={chevronForwardOutline}
              className={styles.seeAllIcon}
              slot="end"
            ></IonIcon>
          </div> */}
        </div>

        <div className={styles.line}></div>

        <div>
          <div className={styles.billsHeader}>
            <IonImg
              alt="giftcard image"
              src="/assets/bills.png"
              className={styles.giftcardIcon}
            />
            <p className={styles.headerTitle}>Pay Bills (coming soon)</p>
          </div>

          <div className={styles.bills}>
            {bills.map((bill) => (
              <div className={styles.bill} key={bill.name}>
                <IonImg
                  alt="bill"
                  src={bill.image}
                  className={styles.billImage}
                />
                <p className={styles.billName}>{bill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default Dashboard;
