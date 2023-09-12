import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Header } from "../../../../components/user";
import { Footer } from "../../../../components";
import {
  IonContent,
  IonImg,
  IonItem,
  IonList,
  IonProgressBar,
  IonSelectOption,
  IonSelect,
  IonRadioGroup,
  IonRadio,
  IonInput,
  IonIcon,
} from "@ionic/react";
import { BankaccoutService } from "../../../../services/bankAccountService";
import { useCurrentUser } from "../../../../services/userService";
import { BankAccountModel } from "../../../../shared/models/bankaccountModel";
import styles from "./GiftCardQuantity.module.css";
import "./GiftCardQuantity.css";
import { chevronForwardOutline } from "ionicons/icons";
import { useStorage } from "../../../../hooks";
import { RateModel } from "../../../../shared/models/giftcardrates";
import getSymbolFromCurrency from "currency-symbol-map";

interface paramsProps {
  id: string;
}

interface countryProps {
  flag: "";
  description: "";
  countryCode: "";
}

export default function GiftCardQuantity() {
  const params = useParams<paramsProps>();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const { id, token } = useCurrentUser();
  const { appData, updateData, resetData } = useStorage();

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
              value={appData?.declaredAmount}
              onIonChange={(e: any) =>
                updateData({ declaredAmount: e.target.value })
              }
            ></IonInput>
          </IonItem>
        </div>
      </div>
    );
  };

  const handleAddBankAccount = () => history.push("/settings/bank-accounts");

  const handleConfirmGiftCard = () => {
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
      appData?.bankAccountId &&
      appData?.giftCardId
      // &&
      // appData?.declaredAmount <= appData?.desiredCurrency?.maxVal &&
      // appData?.declaredAmount >= appData?.desiredCurrency?.minVal
    )
      history.push(`/giftcards/${params.id}/upload`);
    else setErrorMessage("An error occurred, check your inputs");
  };

  if (!appData?.giftcard?.rates?.length) return <></>;

  return (
    <>
      <Header title={`${appData?.giftcard?.name}`} stage="Step 2/3" />
      <IonContent className="ion-padding">
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
            <p className={styles.countryCode}>{`(${appData?.countryCode})`}</p>

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
          <div className={styles.seeAllWrapper} onClick={handleAddBankAccount}>
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
              value={appData?.bankAccountId}
              onIonChange={(e: any) =>
                updateData({ bankAccountId: e.target.value })
              }
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
                        appData?.bankAccountId === account.id && styles.current
                      }`}
                    >
                      {account.accountName}
                    </p>
                    <p
                      className={`${styles.description} ${
                        appData?.bankAccountId === account.id && styles.current
                      }`}
                    >
                      {account.accountNumber}
                    </p>
                    <p
                      className={`${styles.description} ${
                        appData?.bankAccountId === account.id && styles.current
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
      </IonContent>

      <Footer
        text="Confirm"
        isLoading={false}
        isDisabled={
          !appData?.bankAccountId || !appData?.giftCardId
          // ||
          // !appData?.declaredAmount
        }
        errorMessage={errorMessage}
        onClick={handleConfirmGiftCard}
        extraComponents={
          appData?.giftcard?.rates &&
          appData?.giftCardId &&
          appData?.declaredAmount > 0 ? (
            <div className={styles.amount}>
              <p className={styles.amountText}>You will get a total of:</p>
              <span className={styles.amountPrice}>
                {`${getSymbolFromCurrency(
                  appData?.desiredCurrency?.quoteCurrencyCode?.slice(0, 3)
                )}${
                  !!appData?.desiredCurrency?.id
                    ? (appData?.declaredAmount * appData?.desiredCurrency?.rate)
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
    </>
  );
}
