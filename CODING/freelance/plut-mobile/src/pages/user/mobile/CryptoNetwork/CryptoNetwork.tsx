import { useHistory } from "react-router-dom";
import { Header } from "../../../../components/user";
import { Footer } from "../../../../components";
import {
  IonContent,
  IonImg,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import styles from "./CryptoNetwork.module.css";
import { copy } from "ionicons/icons";
import { useStorage } from "../../../../hooks";
import { QRCodeCanvas } from "qrcode.react";
import getSymbolFromCurrency from "currency-symbol-map";

export default function CryptoNetwork() {
  const history = useHistory();
  const { appData, updateData } = useStorage();

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

  if (!appData?.currentRateCurrency?.base) return <></>;

  console.log(appData?.crypto);

  return (
    <>
      <Header
        title={`Sell ${appData?.crypto?.name} ${appData?.crypto?.symbol}`}
        stage="Step 2/3"
      />

      <IonContent className="ion-padding">
        <div className={styles.scanAddressWrapper}>
          <QRCodeCanvas
            value={appData?.currentNetwork?.depositAddress}
            className={styles.scanAddress}
          />
        </div>

        <p className={styles.cryptoHeaderText}>
          Send{" "}
          {getSymbolFromCurrency(
            appData?.currentRateCurrency?.base?.slice(0, 3)
          )}
          {appData?.cryptoValue} worth of {appData?.crypto?.symbol} to this
          wallet.
          {/* this address doesn't support other token except for{" "}
          {appData?.crypto?.symbol} */}
        </p>

        <p className={styles.heading}>Network</p>

        <IonList>
          <IonItem>
            <IonSelect
              aria-label="network"
              placeholder={appData?.currentNetwork.name}
              onIonChange={(e: any) =>
                updateData({ currentNetwork: e.target.value })
              }
            >
              {appData?.crypto?.networks?.map((network, index) => (
                <IonSelectOption value={network} key={index}>
                  {network.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>

        <div className={styles.networkHeadingWrapper}>
          <p className={styles.heading}>
            {appData?.crypto?.symbol} deposit address
          </p>
        </div>
        <div
          className={styles.adderessWrapper}
          onClick={async () => {
            await navigator.clipboard.writeText(
              appData?.currentNetwork.depositAddress
            );
            presentToast("top", "Address copied successfully to clipboard");
          }}
        >
          <p className={styles.adderess}>
            {appData?.currentNetwork?.depositAddress}
          </p>
          <IonIcon icon={copy} className={styles.copy} />
        </div>
      </IonContent>

      <Footer
        onClick={() => history.push("/crypto-address")}
        text="Next"
        isDisabled={!Number(appData?.cryptoValue)}
        errorMessage=""
        isLoading={false}
      />
    </>
  );
}
