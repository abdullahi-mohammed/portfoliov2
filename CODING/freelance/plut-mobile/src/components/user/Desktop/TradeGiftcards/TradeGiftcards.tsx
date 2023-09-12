import {
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useStorage } from "../../../../hooks";
import Header from "../../Header/Header";
import styles from "./TradeGiftcards.module.css";
import { useEffect, useRef, useState } from "react";
import { RateModel } from "../../../../shared/models/giftcardrates";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import Footer from "../../../general/Footer/Footer";
import { useHistory, useLocation } from "react-router-dom";
import { Data } from "../../../../hooks/useStorage";
import "./TradeGiftcards.css";

interface countryProps {
  flag: "";
  description: "";
  countryCode: "";
}

export default function TradeGiftcards({
  appData,
  setMyAppData,
  prevRoute,
}: {
  appData: Data;
  setMyAppData: any;
  prevRoute: string;
}) {
  const { updateData } = useStorage();
  const [currency, setCurrency] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [segmentValue, setSegmentValue] = useState<"physical" | "ecode" | "">(
    "physical"
  );
  const modal = useRef<HTMLIonModalElement>(null);
  const [loaded, setLoaded] = useState(false);

  const [myDesiredCurrency, setmMDesiredCurrency] = useState({} as RateModel);
  const history = useHistory();
  const location = useLocation();

  const handleCountry = () =>
    appData?.giftcard?.countries.find(
      (country: countryProps) => country.countryCode === currency
    );

  useEffect(() => {
    appData?.giftcard?.name && setLoaded(true);
  }, [appData]);

  const [message, setMessage] = useState("");

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  useEffect(() => {
    const handleChange = async () =>
      setMyAppData({ ...appData, countryCode: currency });

    handleChange();
  }, [currency]);

  useEffect(() => {
    const handleChange = async () =>
      setMyAppData({ ...appData, giftCardType: currencyType });

    handleChange();
  }, [currencyType]);

  useEffect(() => {
    const handleChange = async () =>
      setMyAppData({ ...appData, desiredCurrency: myDesiredCurrency });

    handleChange();
  }, [myDesiredCurrency]);

  const handleClick = () =>
    currency && currencyType && history.push(`${location.pathname}/amount`);

  if (!loaded) return <></>;

  return !appData?.giftcard?.giftCardTypes?.length ? (
    <IonContent>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTop}>
          <h3 className={styles.headerTitle}>{appData?.giftcard?.name}</h3>
          <p className={styles.headerBody}>Step 1/3</p>
        </div>

        <IonImg
          src="/assets/ios-close.svg"
          alt="close"
          className={styles.iosClose}
          onClick={() => history.push(prevRoute)}
        />
      </div>

      <p className={styles.secondHeadingNotAvailable}>
        Oops!, Sorry not available at the moment
      </p>
    </IonContent>
  ) : (
    <IonContent>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTop}>
            <h3 className={styles.headerTitle}>{appData?.giftcard?.name}</h3>
            <p className={styles.headerBody}>Step 1/3</p>
          </div>

          <IonImg
            src="/assets/ios-close.svg"
            alt="close"
            className={styles.iosClose}
            onClick={() => history.push(prevRoute)}
          />
        </div>

        <div className={styles.bodyWrapper}>
          <div className={styles.topWrapper}>
            <IonImg
              src={appData?.giftcard?.imageUrl}
              className={styles.giftcardImage}
            />
            <div className={styles.cardInfo}>
              <p className={styles.giftcardName}>{appData?.giftcard?.name}</p>
              {currencyType && (
                <p className={styles.cardInfoType}>({currencyType})</p>
              )}
            </div>

            {appData?.giftcard?.countries?.length && currency && (
              <div className={styles.countryInfo}>
                <p className={styles.countryCode}>
                  {`(${handleCountry().countryCode})`}
                </p>

                <div className={styles.flagWrapper}>
                  <IonImg src={handleCountry().flag} className={styles.flag} />
                </div>
              </div>
            )}
          </div>

          <h4 className={styles.heading}>
            Please select your giftcards currency
          </h4>

          <IonList className={styles.list}>
            <IonRadioGroup
              value={currency}
              onIonChange={(e: any) => setCurrency(e.target.value)}
            >
              {appData?.giftcard?.countries &&
                appData?.giftcard?.countries.map((country: countryProps) => (
                  <IonItem
                    lines="none"
                    key={country.countryCode}
                    className={styles.ionItem}
                  >
                    <div className={styles.ionItemTop}>
                      <div className={styles.flagWrapper}>
                        <IonImg src={country.flag} className={styles.flag} />
                      </div>
                      <p
                        className={`${styles.description} ${
                          currency === country.countryCode && styles.current
                        }`}
                      >
                        {country.description}
                      </p>
                    </div>
                    <IonRadio slot="end" value={country.countryCode}></IonRadio>
                  </IonItem>
                ))}
            </IonRadioGroup>
          </IonList>

          <div className={styles.line}></div>

          {currency && (
            <>
              <div className={styles.headingWrapper}>
                <h4 className={styles.secondHeading}>
                  Please select your card type
                </h4>
                <span className={styles.whatIsThis} id="open-modal">
                  What’s this?
                </span>
              </div>

              <IonList className={styles.list}>
                <IonRadioGroup
                  value={currencyType}
                  onIonChange={(e: any) => setCurrencyType(e.target.value)}
                >
                  {appData?.giftcard?.giftCardTypes &&
                    appData?.giftcard?.giftCardTypes.map((type: string) => (
                      <IonItem
                        lines="none"
                        key={type}
                        className={styles.ionItem}
                      >
                        <p
                          className={`${styles.description} ${
                            currencyType === type && styles.current
                          }`}
                        >
                          {type}
                        </p>
                        <IonRadio slot="end" value={type}></IonRadio>
                      </IonItem>
                    ))}
                </IonRadioGroup>
              </IonList>

              <div className={styles.line}></div>

              <IonModal
                mode="ios"
                ref={modal}
                trigger="open-modal"
                onWillDismiss={(ev) => onWillDismiss(ev)}
                initialBreakpoint={0.5}
                breakpoints={[0, 0.25, 0.5, 0.75]}
              >
                <IonHeader className="ion-no-border">
                  <IonToolbar className={styles.ionToolBar}>
                    <IonTitle>Card Types</IonTitle>
                  </IonToolbar>
                </IonHeader>

                <IonContent className={styles.content}>
                  <IonSegment
                    mode="md"
                    value={segmentValue}
                    onIonChange={(e: CustomEvent) => {
                      setSegmentValue(e.detail.value);
                    }}
                  >
                    <IonSegmentButton
                      value="physical"
                      className={styles.ionSegmentButton}
                    >
                      <IonLabel>Physical card</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton
                      value="ecode"
                      className={styles.ionSegmentButton}
                    >
                      <IonLabel>E Code</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>

                  {segmentValue === "physical" ? (
                    <div>
                      <p className={styles.typeDetails}>
                        Physical gift cards are physical plastic cards that you
                        can get from a store. It usually looks like a credit
                        card or a debit card in rectangular form.
                      </p>
                      <IonImg
                        src="/assets/card.png"
                        className={styles.cardImage}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className={styles.typeDetails}>
                        Physical gift cards are physical plastic cards that you
                        can get from a store. It usually looks like a credit
                        card or a debit card in rectangular form.
                      </p>
                      <IonImg
                        src="/assets/card.png"
                        className={styles.cardImage}
                      />
                    </div>
                  )}
                </IonContent>
              </IonModal>
            </>
          )}

          {currencyType && (
            <>
              <h4 className={styles.heading}>
                Please select the currency you wish to convert to
              </h4>

              <IonItem fill="outline" className={styles.formInput} mode="md">
                <IonList style={{ width: "100%" }}>
                  <IonSelect
                    aria-label="rate"
                    placeholder="Desired currency"
                    value={myDesiredCurrency}
                    onIonChange={(e) => setmMDesiredCurrency(e.target.value)}
                    className={styles.rateSelect}
                  >
                    {appData?.giftcard?.rates
                      ?.filter(
                        (rate) =>
                          rate?.giftCardType?.toLowerCase()?.trim() ===
                          currencyType.toLowerCase()?.trim()
                      )
                      ?.map((rate, index) => (
                        <IonSelectOption
                          value={rate}
                          key={index}
                          className={styles.cryptoSymbol}
                        >
                          <div className={styles.cryptoSymbolWrapper}>
                            <p className={styles.cryptoSymbol}>
                              {rate?.quoteCurrencyCode}
                            </p>
                            <p className={styles.cryptoSymbolDescription}>
                              ({rate?.description})
                            </p>
                          </div>
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonList>
              </IonItem>
            </>
          )}
        </div>

        <div className={styles.footerWrapper}>
          <Footer
            onClick={handleClick}
            text="Next"
            isDisabled={!currency || !currencyType || !myDesiredCurrency?.id}
            errorMessage=""
            isLoading={false}
          />
        </div>
      </div>
    </IonContent>
  );
}
