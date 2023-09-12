import { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import { useCurrentUser } from "../../../../services/userService";
import { useStorage } from "../../../../hooks";
import { BankaccoutService } from "../../../../services/bankAccountService";
import styles from "./GiftcardQuantity.module.css";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import Header from "../../Header/Header";
import { chevronForwardOutline } from "ionicons/icons";
import { BankAccountModel } from "../../../../shared/models/bankaccountModel";
import Footer from "../../../general/Footer/Footer";
import "./GiftcardQuantity.css";
import { Data } from "../../../../hooks/useStorage";

interface paramsProps {
  id: string;
}

interface countryProps {
  flag: "";
  description: "";
  countryCode: "";
}

export default function GiftcardQuantity({
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
  const [loading, setLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const { id, token } = useCurrentUser();
  const { updateData, resetData } = useStorage();
  const location = useLocation();

  const [declaredAmount, setDeclaredAmount] = useState(0);
  const [bankAccountId, setBankAccountId] = useState("");

  useEffect(() => {
    const getBankAccounts = async () => {
      const bankAccountService = new BankaccoutService();
      const result = await bankAccountService.getBankAccount(
        id,
        token,
        resetData
      );

      setBankAccounts(result.data);
      setLoading(false);
    };

    id && getBankAccounts();
  }, [id]);

  const handleCountry = () =>
    appData?.giftcard?.countries.find(
      (country: countryProps) => country.countryCode === appData?.countryCode
    );

  const handleRate = (type: string) => {
    return type === "description" ? (
      <div className={styles.rateWrapper}>
        <p className={styles.rateHeader}>Card Denomination Value</p>
        <p className={styles.rateHeader}>Rate</p>
        <p className={styles.rateHeader}>Total Card Value</p>
      </div>
    ) : (
      <div className={styles.rateWrapper}>
        <p className={styles.rateBody}>
          {appData?.desiredCurrency?.description}
        </p>
        <p className={styles.rateBody}>
          {appData?.desiredCurrency?.id &&
            `${getSymbolFromCurrency(
              appData?.desiredCurrency?.quoteCurrencyCode?.slice(0, 3)
            )}${appData?.desiredCurrency?.rate}/${getSymbolFromCurrency(
              appData?.desiredCurrency?.baseCurrencyCode?.slice(0, 3)
            )}`}
        </p>

        <div className={styles.actionWrapper}>
          <IonItem fill="outline">
            <IonInput
              placeholder="Amount"
              min={appData?.desiredCurrency?.minVal}
              max={appData?.desiredCurrency?.maxVal}
              value={declaredAmount}
              onIonChange={(e: any) => setDeclaredAmount(e.target.value)}
            ></IonInput>
          </IonItem>
        </div>
      </div>
    );
  };

  const handleAddBankAccount = () => history.push("/settings/bank-accounts");

  const handleConfirmGiftCard = async () => {
    setErrorMessage("");

    // if (
    //   appData?.declaredAmount > appData?.desiredCurrency?.maxVal ||
    //   appData?.declaredAmount < appData?.desiredCurrency?.minVal
    // ) {
    //   setErrorMessage(
    //     `Amount should be between ${appData?.desiredCurrency?.description}`
    //   );
    //   return;
    // }

    if (
      bankAccountId &&
      appData?.giftCardId
      // &&
      // appData?.declaredAmount <= appData?.desiredCurrency?.maxVal &&
      // appData?.declaredAmount >= appData?.desiredCurrency?.minVal
    ) {
      await setMyAppData({ ...appData, declaredAmount, bankAccountId });

      history.push(
        `${location.pathname.slice(
          0,
          location.pathname.indexOf("/amount")
        )}/upload`
      );
    } else setErrorMessage("An error occurred, check your inputs");
  };

  if (!appData?.giftcard?.rates?.length) return <></>;

  return (
    <IonContent>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTop}>
            <h3 className={styles.headerTitle}>{appData?.giftcard?.name}</h3>
            <p className={styles.headerBody}>Step 2/3</p>
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

          <h4 className={styles.heading}>Specify the value of the card</h4>

          <div className={styles.rateContainer}>
            {handleRate("description")}
            {appData?.desiredCurrency?.id && handleRate("body")}
          </div>

          <div className={styles.selectBankWrapper}>
            <h4 className={styles.heading}>Select bank account</h4>
            <div
              className={styles.seeAllWrapper}
              onClick={handleAddBankAccount}
            >
              <span className={styles.seeAll}>Add Bank Account</span>
              <IonIcon
                icon={chevronForwardOutline}
                className={styles.seeAllIcon}
                slot="end"
              ></IonIcon>
            </div>
          </div>

          {loading ? (
            <IonProgressBar
              type="indeterminate"
              className={styles.loader}
            ></IonProgressBar>
          ) : (
            <IonList className={styles.list}>
              <IonRadioGroup
                value={bankAccountId}
                onIonChange={(e: any) => setBankAccountId(e.target.value)}
              >
                {bankAccounts?.length ? (
                  bankAccounts.map((account: BankAccountModel) => (
                    <IonItem
                      lines="none"
                      key={account.id}
                      className={styles.ionItem}
                    >
                      <p
                        className={`${styles.description} ${
                          appData?.bankAccountId === account.id &&
                          styles.current
                        }`}
                      >
                        {account.accountName}
                      </p>
                      <p
                        className={`${styles.description} ${
                          appData?.bankAccountId === account.id &&
                          styles.current
                        }`}
                      >
                        {account.accountNumber}
                      </p>
                      <p
                        className={`${styles.description} ${
                          appData?.bankAccountId === account.id &&
                          styles.current
                        }`}
                      >
                        {account.bankName}
                      </p>
                      <IonRadio slot="end" value={account.id}></IonRadio>
                    </IonItem>
                  ))
                ) : (
                  <p className={styles.noAccount}>No Bank Account Found</p>
                )}
              </IonRadioGroup>
            </IonList>
          )}
        </div>

        <div className={styles.footerWrapper}>
          <Footer
            text="Next"
            isLoading={false}
            isDisabled={
              !bankAccountId || !appData?.giftCardId
              // ||
              // !appData?.declaredAmount
            }
            errorMessage={errorMessage}
            onClick={handleConfirmGiftCard}
            extraComponents={
              appData?.giftcard?.rates &&
              appData?.giftCardId &&
              declaredAmount > 0 ? (
                <div className={styles.amount}>
                  <p className={styles.amountText}>You will get a total of:</p>
                  <span className={styles.amountPrice}>
                    {`${getSymbolFromCurrency(
                      appData?.desiredCurrency?.quoteCurrencyCode?.slice(0, 3)
                    )}${
                      !!appData?.desiredCurrency?.id
                        ? (declaredAmount * appData?.desiredCurrency?.rate)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : ""
                    }`}
                  </span>
                </div>
              ) : (
                <></>
              )
            }
          />
        </div>
      </div>
    </IonContent>
  );
}
