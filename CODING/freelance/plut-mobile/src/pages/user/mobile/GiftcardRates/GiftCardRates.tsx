import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonImg,
  IonProgressBar,
} from "@ionic/react";
import { useEffect, useState, Fragment } from "react";
import { GiftCardService } from "../../../../services/giftcardService";
import {
  GiftCardRateModel,
  RateModel,
} from "../../../../shared/models/giftcardrates";
import { Header, Search } from "../../../../components/user";
import styles from "./GiftCardRates.module.css";
import "./GiftCardRates.css";
import { useStorage } from "../../../../hooks";
import { useHistory } from "react-router-dom";

export default function GiftCardRates() {
  const [rates, setRates] = useState([] as GiftCardRateModel[]);
  const [currentRate, setCurrentRate] = useState([] as GiftCardRateModel[]);
  const [loading, setLoading] = useState(true);
  const [segmentValue, setSegmentValue] = useState<"physical" | "ecode">(
    "physical"
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const { resetData, updateData } = useStorage();
  const history = useHistory();

  useEffect(() => {
    const getGiftCardRates = async () => {
      const giftCardService = new GiftCardService();
      const result = await giftCardService.giftCard(resetData);

      setRates(result);
      setLoading(false);
    };

    getGiftCardRates();
  }, []);

  useEffect(() => {
    if (rates?.length) {
      const myRates = rates?.map((rate) => ({
        ...rate,
        rates: rate.rates.filter(
          (rate) => rate.giftCardType.toLowerCase() === segmentValue
        ),
      }));

      setCurrentRate(myRates);
    }
  }, [rates, segmentValue]);

  const handleClick = async (giftcard: GiftCardRateModel, rate: RateModel) => {
    await updateData({
      giftcard,
      giftCardId: giftcard?.id,
      countryCode: rate?.countryCode,
      giftCardType: rate?.giftCardType,
      desiredCurrency: rate,
    });

    history.push(`/giftcards/${giftcard.id}/amount`);
  };

  const handleOpenRate = (
    rate: RateModel[],
    type: string,
    giftCard: GiftCardRateModel
  ) => {
    return rate.length ? (
      <div className={styles.currentRateWraper}>
        {rate
          ?.filter((rate) => rate.giftCardType.toLowerCase() === segmentValue)
          ?.map((rate, index) => (
            <Fragment key={index}>
              {!index ? (
                <p className={styles.currentRateHeader}>
                  {type === "description" ? "Card Val" : "Rate"}
                </p>
              ) : (
                <></>
              )}

              <p
                className={styles.currentRateRate}
                onClick={() => handleClick(giftCard, rate)}
              >
                {type === "description"
                  ? rate?.description
                  : `₦${rate?.rate}/${rate?.baseCurrencyCode}`}
              </p>
            </Fragment>
          ))}
      </div>
    ) : (
      <></>
    );
  };

  const handleCountries = (rate: GiftCardRateModel) => {
    const myRates = rate.countries.map((country: any) => ({
      data: rate.rates.filter(
        (rate: any) =>
          rate.countryCode.toLowerCase() === country.countryCode.toLowerCase()
      ),
      country,
    }));

    return myRates;
  };

  return (
    <>
      <Header title="Gift card rates" />
      <div className={`${styles.segmentWrapper} ion-padding`}>
        <IonSegment
          mode="ios"
          className={styles.ionSegment}
          value={segmentValue}
          onIonChange={(e: CustomEvent) => {
            setSegmentValue(e.detail.value);
          }}
        >
          <IonSegmentButton
            value="physical"
            className={styles.ionSegmentButton}
          >
            <IonLabel>Physical cards</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="ecode" className={styles.ionSegmentButton}>
            <IonLabel>E-code</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      <div className={`ion-padding ${styles.search}`}>
        <Search
          value={searchValue}
          setValue={setSearchValue}
          placeholder="Search Giftcards"
        />
      </div>

      <IonContent className="ion-padding">
        <p className={styles.announcement}>
          *Please Note: Physical cards rates are different from E-code rates
        </p>

        {loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <IonAccordionGroup>
            {currentRate?.length ? (
              currentRate
                ?.filter((rate) =>
                  rate.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                ?.map((rate, index) => (
                  <IonAccordion
                    value={rate.name}
                    className={styles.accordion}
                    key={index}
                  >
                    <IonItem
                      slot="header"
                      color="light"
                      className={`${styles.accordionHeader} ${styles["ion-color"]} ${styles["ion-color-light"]}`}
                    >
                      <IonImg
                        src={rate.imageUrl}
                        className={styles.rateImage}
                      />
                      <IonLabel>{rate.name}</IonLabel>
                      <p className={styles.seeRates}>See rates</p>
                    </IonItem>

                    <div slot="content">
                      {handleCountries(rate).map(
                        (myRate: any, index: number) => (
                          <div
                            className={`ion-padding ${styles.currentRateWrapper}`}
                            key={index}
                          >
                            <div className={styles.countryInfo}>
                              <p className={styles.countryCode}>
                                {`(${
                                  myRate?.data[0]?.baseCurrencyCode
                                    ? myRate?.data[0]?.baseCurrencyCode
                                    : "No Available"
                                } Rates)`}
                              </p>

                              {myRate.country.flag &&
                              myRate?.data[0]?.baseCurrencyCode ? (
                                <div className={styles.flagWrapper}>
                                  <IonImg
                                    src={myRate.country.flag}
                                    className={styles.flag}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className={styles.currentRate}>
                              {handleOpenRate(myRate.data, "description", rate)}
                              {handleOpenRate(myRate.data, "rate", rate)}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </IonAccordion>
                ))
            ) : (
              <></>
            )}
          </IonAccordionGroup>
        )}
      </IonContent>
    </>
  );
}
