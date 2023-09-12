import { useState, useEffect, useMemo } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Header } from "../../../../components/user";
import { Footer } from "../../../../components";
import { IonContent, IonImg } from "@ionic/react";
import { useCurrentUser } from "../../../../services/userService";
import { app } from "../../../../shared/const";
import { TransactionService } from "../../../../services/transactionService";
import { Dashboard } from "@uppy/react";
import { FileUploadResponse } from "../../../../shared/models/fileUpload";
import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import XHRUpload from "@uppy/xhr-upload";
import FileInput from "@uppy/file-input";
import styles from "./GiftcardImageUpload.module.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useStorage } from "../../../../hooks";
import {
  GiftCardRateModel,
  RateModel,
} from "../../../../shared/models/giftcardrates";
import getSymbolFromCurrency from "currency-symbol-map";
import { Data } from "../../../../hooks/useStorage";

interface paramsProps {
  id: string;
}

interface countryProps {
  flag: "";
  description: "";
  countryCode: "";
}

export default function GiftcardImageUpload({
  appData,
  setMyAppData,
  prevRoute,
}: {
  appData: Data;
  setMyAppData: any;
  prevRoute: string;
}) {
  const params = useParams<paramsProps>();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [giftCardUrl, setGiftCardUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { id, token } = useCurrentUser();
  const { updateData, resetData } = useStorage();
  const location = useLocation();

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        allowedFileTypes: ["image/*"],
      },
    })
      .use(Webcam)
      .use(FileInput, {})
      .use(XHRUpload, {
        endpoint: app.coreApi.coreApiUrl + "/api/v1/fileupload/upload-image",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
  }, [token]);

  useEffect(() => {
    uppy.on("complete", async (result) => {
      console.log(result);

      if (result?.failed[0]?.response?.status === 401) {
        await resetData();
        window.location.reload();
      }

      const url = result.successful
        ?.map((result: any) => {
          const url: string = result?.response?.body?.data?.url;

          return url;
        })
        ?.toString();

      if (url) {
        setGiftCardUrl(`${giftCardUrl},${url}`);
        console.log("value set for url: " + url);
      }
    });
  }, [uppy]);

  const handleSubmit = async () => {
    const transactionService = new TransactionService();

    setLoading(true);

    console.log({
      userId: id,
      bankAccountId: appData?.bankAccountId,
      countryCode: appData?.countryCode,
      giftCardType: appData?.giftCardType,
      declaredAmount: appData?.declaredAmount,
      giftCardUrl,
      giftCardId: appData?.giftcard?.id,
    });

    const result = await transactionService.sellGiftCard(
      {
        userId: id,
        bankAccountId: appData?.bankAccountId,
        countryCode: appData?.countryCode,
        giftCardType: appData?.giftCardType,
        declaredAmount: appData?.declaredAmount,
        giftCardUrl,
        giftCardId: appData?.giftcard?.id,
        rateId: appData?.desiredCurrency?.id,
      },
      token,
      resetData
    );

    setLoading(false);

    if (result.succeeded) {
      setMyAppData({
        giftcard: {} as GiftCardRateModel,
        countryCode: "",
        giftCardType: "",
        bankAccountId: "",
        declaredAmount: null,
        giftCardId: "",
        desiredCurrency: {} as RateModel,
      });
      setGiftCardUrl("");

      history.replace(
        `${location.pathname.slice(
          0,
          location.pathname.indexOf("/upload")
        )}/trade-successful`
      );
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleCountry = () =>
    appData?.giftcard?.countries.find(
      (country: { countryCode: string }) =>
        country.countryCode === appData?.countryCode
    );

  const handleRate = (type: string) => {
    return type === "description" ? (
      <div className={styles.rateWrapper}>
        <p className={styles.rateHeader}>Cards Denomination Value</p>
        <p className={styles.rateHeader}>Rate</p>
        <p className={styles.rateHeader}>Total Card Value</p>
      </div>
    ) : (
      <div className={styles.rateWrapper}>
        <p className={styles.rateBody}>
          {appData?.desiredCurrency?.description}
        </p>
        <p className={styles.rateBody}>{`${getSymbolFromCurrency(
          appData?.desiredCurrency?.quoteCurrencyCode?.slice(0, 3)
        )}${appData?.desiredCurrency?.rate}/${getSymbolFromCurrency(
          appData?.desiredCurrency?.baseCurrencyCode?.slice(0, 3)
        )}`}</p>
        <p className={styles.rateBody}>{appData?.declaredAmount}</p>
      </div>
    );
  };

  const handlePlaceTrade = () => {
    setErrorMessage("");

    if (
      id &&
      appData?.bankAccountId &&
      appData?.countryCode &&
      appData?.giftCardId &&
      appData?.giftCardType &&
      appData?.giftCardId &&
      // appData?.declaredAmount <= appData?.desiredCurrency?.maxVal &&
      // appData?.declaredAmount >= appData?.desiredCurrency?.minVal &&
      appData?.desiredCurrency?.id
    )
      handleSubmit();
    else setErrorMessage("Oops, an error occured");
  };

  return (
    <IonContent>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTop}>
            <h3 className={styles.headerTitle}>{appData?.giftcard?.name}</h3>
            <p className={styles.headerBody}>Step 3/3</p>
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
              src={appData?.giftcard.imageUrl}
              className={styles.giftcardImage}
            />
            <div className={styles.cardInfo}>
              <p className={styles.giftcardName}>{appData?.giftcard.name}</p>
              <p className={styles.cardInfoType}>({appData?.giftCardType})</p>
            </div>

            <div className={styles.countryInfo}>
              <p
                className={styles.countryCode}
              >{`(${appData?.countryCode})`}</p>

              {appData?.giftcard?.countries && (
                <div className={styles.flagWrapper}>
                  <IonImg src={handleCountry()?.flag} className={styles.flag} />
                </div>
              )}
            </div>
          </div>

          <div className={styles.rateMainWrapper}>
            <div className={styles.rateContainer}>
              {appData?.giftcard?.rates &&
                appData?.giftCardId &&
                handleRate("description")}
              {appData?.giftcard?.rates &&
                appData?.giftCardId &&
                handleRate("body")}
            </div>

            {appData?.giftcard?.rates &&
              appData?.giftCardId &&
              appData?.declaredAmount > 0 && (
                <div className={styles.amount}>
                  <p className={styles.amountText}>Total Amount:</p>
                  <span className={styles.amountPrice}>
                    {`${getSymbolFromCurrency(
                      appData?.desiredCurrency?.quoteCurrencyCode?.slice(0, 3)
                    )}${(
                      appData?.declaredAmount * appData?.desiredCurrency?.rate
                    )
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                  </span>
                </div>
              )}
          </div>

          <h4 className={styles.heading}>Please upload proof of the card</h4>

          <Dashboard
            uppy={uppy}
            plugins={["Webcam", "FileInput"]}
            height={300}
            className="uk-margin-auto"
          ></Dashboard>
        </div>

        <div className={styles.footerWrapper}>
          <Footer
            onClick={handlePlaceTrade}
            text="Place Trade"
            isLoading={loading}
            isDisabled={!giftCardUrl}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </IonContent>
  );
}
