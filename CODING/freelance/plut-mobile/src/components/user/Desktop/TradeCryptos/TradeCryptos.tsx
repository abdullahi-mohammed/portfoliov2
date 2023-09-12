import { useHistory } from "react-router-dom";
import { Header } from "../../../../components/user";
import { Footer } from "../../../../components";
import {
  IonContent,
  IonImg,
  IonItem,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import styles from "./TradeCryptos.module.css";
import getSymbolFromCurrency from "currency-symbol-map";
import { useStorage } from "../../../../hooks";
import { useState } from "react";

export default function TradeCryptos({ prevRoute }: { prevRoute: string }) {
  const history = useHistory();
  const { appData, updateData } = useStorage();

  if (!appData?.currentRateCurrency?.base) return <></>;

  console.log(appData?.currentRateCurrency);

  return (
    <IonContent>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTop}>
            <h3
              className={styles.headerTitle}
            >{`Sell ${appData?.crypto?.name} ${appData?.crypto?.symbol}`}</h3>
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
          <p className={styles.cryptoHeaderText}>
            Please enter the desired {appData?.currentRateCurrency?.base} amount
            to be converted to {appData?.currentRateCurrency?.quote} for a
            seamless selling experience
          </p>

          <p className={styles.heading}>Sell {appData?.crypto?.name}</p>

          <IonItem fill="outline" className={styles.formInput} mode="md">
            <p className={styles.cryptoSymbol}>
              {appData?.currentRateCurrency?.base}
            </p>
            <IonInput
              placeholder={`Enter Amount of ${appData?.crypto?.symbol} in ${appData?.currentRateCurrency?.base}`}
              className={styles.cryptoInput}
              value={appData?.cryptoValue}
              onIonChange={(e: any) =>
                updateData({ cryptoValue: e.target.value })
              }
              inputMode="decimal"
            ></IonInput>

            <div className={styles.iconWrapper}>
              <IonImg src={appData?.crypto?.logo} className={styles.icon} />
              <p className={styles.cryptoSymbol}>{appData?.crypto?.symbol}</p>
            </div>
          </IonItem>

          <p className={styles.cryptoValue}>
            {`1 ${
              appData?.currentRateCurrency?.base
            } = ${appData?.currentRateCurrency?.rate
              ?.toFixed(2)
              ?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}${
              appData?.currentRateCurrency?.quote
            }`}
          </p>

          <p className={styles.heading}>You will receive</p>

          <IonItem fill="outline" className={styles.formInput} mode="md">
            <p className={styles.cryptoSymbol}>
              {getSymbolFromCurrency(
                appData?.currentRateCurrency?.quote?.slice(0, 3)
              )}
            </p>
            <IonInput
              disabled
              placeholder={"Amount"}
              className={styles.cryptoInput}
              value={
                !!(
                  Number(appData?.currentRateCurrency?.rate) *
                  Number(appData?.cryptoValue)
                )
                  ? (
                      Number(appData?.currentRateCurrency?.rate) *
                      Number(appData?.cryptoValue)
                    )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : appData?.cryptoValue?.toString()?.length
                  ? "Enter a valid amount"
                  : ""
              }
            ></IonInput>

            {/* <div className={styles.iconWrapper} id="open-modal">
            <IonImg
              src={`https://flagsapi.com/${currentRateCurrency.quote
                ?.slice(0, 2)
                ?.toUpperCase()
                ?.trim()}/shiny/64.png`}
              className={styles.icon}
            />
            <p className={styles.cryptoSymbol}>{currentRateCurrency.quote}</p>
            <IonIcon
              icon={chevronDownOutline}
              className={styles.iconRight}
              slot="end"
            ></IonIcon>
          </div> */}

            <IonList style={{ width: "100px" }}>
              <IonSelect
                aria-label="rate"
                placeholder={appData?.currentRateCurrency?.quote}
                value={appData?.currentRateCurrency}
                onIonChange={(e) =>
                  updateData({ currentRateCurrency: e.target.value })
                }
                className={styles.rateSelect}
              >
                {appData?.crypto?.rates
                  ?.filter((rate) => rate.exchangeType.toLowerCase() === "sell")
                  ?.map((rate, index) => (
                    <IonSelectOption
                      value={rate}
                      key={index}
                      className={styles.cryptoSymbol}
                    >
                      <p className={styles.cryptoSymbol}>{rate.quote}</p>
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonList>
          </IonItem>
        </div>

        <div className={styles.footerWrapper}>
          <Footer
            onClick={() => history.push("/crypto-network")}
            text="Proceed"
            isDisabled={!Number(appData?.cryptoValue)}
            errorMessage=""
            isLoading={false}
          />
        </div>
      </div>
    </IonContent>
  );
}
