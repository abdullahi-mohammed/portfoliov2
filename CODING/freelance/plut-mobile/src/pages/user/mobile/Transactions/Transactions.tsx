import { useState, useEffect, Fragment } from "react";
import {
  IonButton,
  IonChip,
  IonContent,
  IonIcon,
  IonImg,
  IonLabel,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
  useIonToast,
} from "@ionic/react";
import styles from "./Transactions.module.css";
import { eye, eyeOff } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { TransactionService } from "../../../../services/transactionService";
import { TransactionModel } from "../../../../shared/models/transactionModel";
import { useCurrentUser } from "../../../../services/userService";
import { format, isToday, isYesterday } from "date-fns";
import { useStorage } from "../../../../hooks";
import getSymbolFromCurrency from "currency-symbol-map";

export default function Transactions() {
  const [loading, setLoading] = useState(true);
  const [segmentValue, setSegmentValue] = useState<
    "all" | "crypto" | "giftcards"
  >("all");
  const [transactions, setTransactions] = useState([] as TransactionModel[]);
  const history = useHistory();
  const { id, token } = useCurrentUser();
  const { updateData, resetData, appData } = useStorage();

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
  }, [id, resetData, token]);

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

  // const handleSeeAll = () => history.push("/giftcards");
  // const handleSeeAll = () => {};
  const handlePresentToast = (text: string) => presentToast("top", text);
  const handleToggleShow = () =>
    updateData({ showBalance: appData?.showBalance ? false : true });
  const handleTradeDetails = async (transaction: TransactionModel) => {
    await updateData({ tradeDetails: transaction });
    history.push("/trade-details");
  };

  return (
    <>
      <IonContent>
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

        <div className="ion-padding">
          <div className={styles.accountNumber}>
            <h3 className={styles.accountHeading}>
              Tap to enable your Plut Account Number
            </h3>
            <p className={styles.accountText}>
              Verify your identity to get access to your plut account details
            </p>
          </div>

          <div className={styles.tradeHeader}>
            <p className={styles.headerTitle}>Trade History</p>

            {/* <div className={styles.seeAllWrapper} onClick={handleSeeAll}>
              <span className={styles.seeAll}>See All</span>
              <IonIcon
                icon={chevronForwardOutline}
                className={styles.seeAllIcon}
                slot="end"
              ></IonIcon>
            </div> */}
          </div>

          <div className={styles.transactionList}>
            {loading ? (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            ) : (
              <div>
                <IonSegment
                  mode="ios"
                  className={styles.ionSegment}
                  value={segmentValue}
                  onIonChange={(e: CustomEvent) => {
                    setSegmentValue(e.detail.value);
                  }}
                >
                  <IonSegmentButton
                    value="all"
                    className={styles.ionSegmentButton}
                  >
                    <IonLabel>All</IonLabel>
                  </IonSegmentButton>

                  <IonSegmentButton
                    value="crypto"
                    className={styles.ionSegmentButton}
                  >
                    <IonLabel>Crypto</IonLabel>
                  </IonSegmentButton>

                  <IonSegmentButton
                    value="giftcard"
                    className={styles.ionSegmentButton}
                  >
                    <IonLabel>Giftcards</IonLabel>
                  </IonSegmentButton>
                </IonSegment>

                <div className={styles.transactionsWrapper}>
                  {filteredTransactions()?.map((transactions, index) =>
                    transactions?.length ? (
                      <div
                        className={styles.transactionsWrapperInner}
                        key={index}
                      >
                        <h3 className={styles.transactionTime}>
                          {dateOptions[index]}
                        </h3>

                        {transactions.filter(
                          (transaction) =>
                            transaction.transactionCategory.toLowerCase() ===
                            segmentValue.toLowerCase() ||
                            segmentValue.toLowerCase() === "all"
                        )?.length ? (
                          <div>
                            {transactions
                              .filter(
                                (transaction) =>
                                  transaction.transactionCategory.toLowerCase() ===
                                  segmentValue.toLowerCase() ||
                                  segmentValue.toLowerCase() === "all"
                              )
                              .map((transaction, index) =>
                                transaction.transactionCategory
                                  .toLowerCase()
                                  .trim() === "giftcard" ? (
                                  <div
                                    key={index}
                                    className={styles.transaction}
                                    onClick={() =>
                                      handleTradeDetails(transaction)
                                    }
                                  >
                                    <IonImg
                                      src={
                                        transaction?.giftCardExchanges[0]
                                          ?.giftCard?.imageUrl
                                      }
                                      className={styles.transactionImage}
                                    />

                                    <div
                                      className={
                                        styles.transactionDetailsWrapper
                                      }
                                    >
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
                                          transaction?.giftCardExchanges[0]
                                            ?.giftCard?.name
                                        }{" "}
                                        {transaction?.transactionCategory}
                                      </p>
                                      <p className={styles.transactionType}>
                                        (
                                        {
                                          transaction?.giftCardExchanges[0]
                                            ?.giftCardRate?.giftCardType
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
                                    className={`${styles.cryptoHistoryWrapper
                                      } ${segmentValue.toLowerCase() === "all"
                                        ? styles.borderTop
                                        : ""
                                      }`}
                                    onClick={() =>
                                      handleTradeDetails(transaction)
                                    }
                                  >
                                    <IonImg
                                      src={
                                        transaction?.cryptoExchanges
                                          ?.cryptoCurrencies?.logo
                                      }
                                      className={styles.cryptoImage}
                                    />
                                    <div className={styles.cryptoCode}>
                                      <p className={styles.cryptoValueHeader}>
                                        {
                                          transaction?.cryptoExchanges
                                            ?.cryptoCurrencies?.name
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
                                        {
                                          transaction.cryptoExchanges
                                            .declaredCryptoAmount
                                        }{" "}
                                        {
                                          transaction.cryptoExchanges
                                            .exchangeRate.base
                                        }
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
                                )
                              )}
                          </div>
                        ) : (
                          <p className={styles.noTransactions}>
                            No Transaction(s)
                          </p>
                        )}
                      </div>
                    ) : (
                      <Fragment key={index}></Fragment>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </>
  );
}
