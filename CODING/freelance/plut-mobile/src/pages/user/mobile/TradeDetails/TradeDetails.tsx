import { IonContent, IonImg, IonProgressBar } from "@ionic/react";
import { Header } from "../../../../components/user";
import styles from "./TradeDetails.module.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  BankAccountModel,
  BanksProps,
  CreateBankAccountModel,
} from "../../../../shared/models/bankaccountModel";
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import { useStorage } from "../../../../hooks";

interface TransactionStatusType {
  status: "pending" | "success" | "failed";
  title: string;
  message: string;
}

export default function TradeDetails() {
  const { appData } = useStorage();
  const tradeStatus: TransactionStatusType[] = [
    {
      status: "pending",
      title: "Transaction Processing",
      message: `We are currently reviewing the validity of your ${
        appData?.tradeDetails?.transactionCategory?.toLowerCase() === "giftcard"
          ? "giftcard"
          : "crypto"
      }, This shouldn’t take long.`,
    },
    {
      status: "success",
      title: "Transaction Successful",
      message:
        "All files were successfully reviewed and funds have been disbursed to your bank account.",
    },
    {
      status: "failed",
      title: "Transaction Failed",
      message:
        "All files were successfully reviewed and unfortunately wasn't accepted.",
    },
  ];

  const [currentStatus, setCurrentStatus] = useState(
    {} as TransactionStatusType
  );

  const [banks, setBanks] = useState([] as BanksProps[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentStatus(
      tradeStatus.find(
        (status) =>
          status.status ===
          appData?.tradeDetails?.transactionStatus?.toLowerCase()?.trim()
      ) || tradeStatus[0]
    );

    const handleBanks = async () => {
      const result = await axios.get("https://nigerianbanks.xyz/");

      setBanks(result.data);
      setLoading(false);
    };

    handleBanks();
  }, [appData]);

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
          {appData?.tradeDetails?.giftCardExchanges?.length
            ? appData?.tradeDetails?.giftCardExchanges[0]?.giftCardRate
                ?.description
            : ""}
        </p>
        <p className={styles.rateBody}>
          {appData?.tradeDetails?.giftCardExchanges?.length
            ? `${getSymbolFromCurrency(
                appData?.tradeDetails?.giftCardExchanges[0]?.quoteCurrencyCode?.slice(
                  0,
                  3
                )
              )}${
                appData?.tradeDetails?.giftCardExchanges[0]?.giftCardRate?.rate
              }/${getSymbolFromCurrency(
                appData?.tradeDetails?.giftCardExchanges[0]?.baseCurrencyCode?.slice(
                  0,
                  3
                )
              )}`
            : ""}
        </p>
        <p className={styles.rateBody}>
          {appData?.tradeDetails?.giftCardExchanges?.length
            ? appData?.tradeDetails?.giftCardExchanges[0]?.declaredAmount
            : ""}
        </p>
      </div>
    );
  };

  const handleLogo = (account: BankAccountModel | CreateBankAccountModel) =>
    banks?.find(
      (bank) => bank?.name?.toLowerCase() === account?.bankName?.toLowerCase()
    )?.logo || "/assets/bankSquare.svg";

  if (loading) return <IonProgressBar type="indeterminate"></IonProgressBar>;

  return (
    <>
      <div className={styles.header}>
        <Header title="Trade History" />
      </div>

      <IonContent>
        <div className={styles.ionContent}>
          <div className="ion-padding">
            <div className={styles.stagesWrapper}>
              <div className={styles.stages}>
                <div className={styles.nextWrapper}>
                  <div className={styles.lineLeft}></div>
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "failed" ? (
                    <IonImg src="/assets/failed.svg" className={styles.done} />
                  ) : (
                    <IonImg
                      src="/assets/stage-done.svg"
                      className={styles.done}
                    />
                  )}
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "failed" ? (
                    <div className={styles.lineGray}></div>
                  ) : (
                    <div className={styles.line}></div>
                  )}
                </div>
                <p className={styles.stage}>
                  Trade <br /> Placed
                </p>
              </div>

              <div className={styles.stagesMiddle}>
                <div className={styles.nextWrapper}>
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "failed" ? (
                    <div className={styles.lineGray}></div>
                  ) : (
                    <div className={styles.line}></div>
                  )}
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "pending" ||
                  appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "success" ? (
                    <IonImg
                      src="/assets/stage-done.svg"
                      className={styles.done}
                    />
                  ) : (
                    <IonImg src="/assets/failed.svg" className={styles.done} />
                  )}
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "failed" ? (
                    <div className={styles.lineGray}></div>
                  ) : (
                    <div className={styles.line}></div>
                  )}
                </div>
                <p className={styles.stage}>
                  Verifying <br />
                  {appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
                  "giftcard"
                    ? "giftcard"
                    : "crypto"}
                </p>
              </div>

              <div className={styles.stages}>
                <div className={styles.nextWrapper}>
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "failed" ? (
                    <div className={styles.lineGray}></div>
                  ) : (
                    <div className={styles.line}></div>
                  )}
                  {appData?.tradeDetails?.transactionStatus
                    ?.toLowerCase()
                    ?.trim() === "success" ? (
                    <IonImg
                      src="/assets/stage-done.svg"
                      className={styles.done}
                    />
                  ) : appData?.tradeDetails?.transactionStatus
                      ?.toLowerCase()
                      ?.trim() === "failed" ? (
                    <IonImg src="/assets/failed.svg" className={styles.done} />
                  ) : (
                    <div className={styles.next}></div>
                  )}
                  <div className={styles.lineLeft}></div>
                </div>
                <p className={styles.stage}>
                  Funds
                  <br /> disbursed
                </p>
              </div>
            </div>

            <div
              className={`${styles.statusWrapper} ${
                currentStatus.status === "pending"
                  ? styles.statusWrapperPending
                  : currentStatus.status === "success"
                  ? styles.statusWrapperSuccess
                  : ""
              }`}
            >
              <h3 className={styles.statusHeader}>{currentStatus.title}</h3>
              <p className={styles.statusBody}>{currentStatus.message}</p>
              {appData?.tradeDetails?.transactionStatus
                ?.toLowerCase()
                ?.trim() === "failed" && (
                <h3
                  className={`${styles.statusHeader} ${styles.statusHeaderMT}`}
                >
                  Reason:{" "}
                  <p className={styles.reasonText}>
                    {appData?.tradeDetails.failedReason.toLowerCase()}
                  </p>
                </h3>
              )}
            </div>
          </div>

          {appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
            "giftcard" && (
            <div className={styles.topWrapperOuter}>
              <div className={styles.topWrapper}>
                <IonImg
                  src={
                    appData?.tradeDetails?.giftCardExchanges?.length
                      ? appData?.tradeDetails?.giftCardExchanges[0]?.giftCard
                          ?.imageUrl
                      : ""
                  }
                  className={styles.giftcardImage}
                />
                <div className={styles.cardInfo}>
                  <p className={styles.giftcardName}>
                    {appData?.tradeDetails?.giftCardExchanges?.length
                      ? appData?.tradeDetails?.giftCardExchanges[0]?.giftCard
                          ?.name
                      : ""}
                  </p>
                  <p className={styles.cardInfoType}>
                    (
                    {appData?.tradeDetails?.giftCardExchanges?.length
                      ? appData?.tradeDetails?.giftCardExchanges[0]
                          ?.giftCardRate?.giftCardType
                      : ""}
                    )
                  </p>
                </div>

                <div className={styles.countryInfo}>
                  <p className={styles.countryCode}>{`(${
                    appData?.tradeDetails?.giftCardExchanges?.length
                      ? appData?.tradeDetails?.giftCardExchanges[0]
                          ?.baseCurrencyCode
                      : ""
                  })`}</p>

                  <div className={styles.flagWrapper}>
                    <IonImg
                      src={
                        appData?.tradeDetails?.giftCardExchanges?.length
                          ? `https://flagsapi.com/${appData?.tradeDetails?.giftCardExchanges[0]?.countryCode
                              ?.slice(0, 2)
                              ?.toUpperCase()
                              ?.trim()}/shiny/64.png`
                          : ""
                      }
                      className={styles.flag}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.rateMainWrapper}>
                <div className={styles.rateContainer}>
                  {handleRate("description")}
                  {handleRate("body")}
                </div>

                <div className={styles.amount}>
                  <p className={styles.amountText}>Total Amount:</p>
                  <span className={styles.amountPrice}>
                    {`${getSymbolFromCurrency(
                      appData?.tradeDetails?.giftCardExchanges[0]?.quoteCurrencyCode?.slice(
                        0,
                        3
                      )
                    )}${Number(appData?.tradeDetails?.amount)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ion-padding">
          {appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
            "crypto" && (
            <div className={styles.cryproTop}>
              <IonImg
                src={
                  appData?.tradeDetails?.cryptoExchanges?.cryptoCurrencies?.logo
                    ? appData?.tradeDetails?.cryptoExchanges?.cryptoCurrencies
                        ?.logo
                    : ""
                }
                className={styles.giftcardImage}
              />
              <p
                className={styles.cryptoNameAndSymbol}
              >{`${appData?.tradeDetails?.cryptoExchanges?.cryptoCurrencies?.name} ${appData?.tradeDetails?.cryptoExchanges?.cryptoCurrencies?.symbol}`}</p>
              <p className={styles.cryptoCategory}>Cryptocurrency</p>
              <p className={styles.cryptoAmount}>
                {appData?.tradeDetails?.cryptoExchanges?.declaredCryptoAmount}{" "}
                {appData?.tradeDetails?.cryptoExchanges?.exchangeRate?.base}
              </p>
            </div>
          )}

          <div
            className={`${styles.detailsWrapper} ${
              appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
              "giftcard"
                ? styles.detailsWrapperBorder
                : ""
            }`}
          >
            <p className={styles.bottomDetails}>Details</p>
            <div className={styles.bottomInfo}>
              <div className={styles.bottomInfoWrapper}>
                <p className={styles.bottomDetailsTitle}>Date / Time</p>
                <p className={styles.bottomDetailsText}>
                  {appData?.tradeDetails?.createdAt &&
                    format(
                      new Date(appData?.tradeDetails?.createdAt),
                      "do MMMM yyyy 'at' hh:mm:a"
                    )}
                </p>
              </div>
              {appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
                "giftcard" && (
                <div className={styles.bottomInfoWrapper}>
                  <p className={styles.bottomDetailsTitle}>Trade ID</p>
                  <p className={styles.bottomDetailsText}>
                    {appData?.tradeDetails?.giftCardExchanges?.length &&
                      appData?.tradeDetails?.giftCardExchanges[0]?.id}
                  </p>
                </div>
              )}

              {appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
                "crypto" && (
                <>
                  <div className={styles.bottomInfoWrapper}>
                    <p className={styles.bottomDetailsTitle}>
                      Transaction hash
                    </p>
                    <p className={styles.bottomDetailsText}>
                      {`${appData?.tradeDetails?.cryptoExchanges?.transactionHash?.slice(
                        0,
                        6
                      )}***${appData?.tradeDetails?.cryptoExchanges?.transactionHash?.slice(
                        appData?.tradeDetails?.cryptoExchanges?.transactionHash
                          ?.length - 4
                      )}`}
                    </p>
                  </div>
                  <div className={styles.bottomInfoWrapper}>
                    <p className={styles.bottomDetailsTitle}>Expected value</p>
                    <p className={styles.bottomDetailsText}>
                      {getSymbolFromCurrency(
                        appData?.tradeDetails?.cryptoExchanges?.exchangeRate?.quote.slice(
                          0,
                          3
                        )
                      )}
                      {appData?.tradeDetails?.amount
                        ?.toFixed(2)
                        ?.replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </p>
                  </div>
                  <div className={styles.bottomInfoWrapper}>
                    <p className={styles.bottomDetailsTitle}>Bank</p>
                    <p className={styles.bottomDetailsText}>
                      {appData?.tradeDetails?.bankAccount?.bankName.toUpperCase()}
                    </p>
                  </div>
                  <div className={styles.bottomInfoWrapper}>
                    <p className={styles.bottomDetailsTitle}>Account number</p>
                    <p className={styles.bottomDetailsText}>
                      {`${appData?.tradeDetails?.bankAccount?.accountNumber.slice(
                        0,
                        3
                      )}***${appData?.tradeDetails?.bankAccount?.accountNumber.slice(
                        appData?.tradeDetails?.bankAccount?.accountNumber
                          ?.length - 4
                      )}`}
                    </p>
                  </div>
                  <div className={styles.bottomInfoWrapper}>
                    <p className={styles.bottomDetailsTitle}>Rate</p>
                    <p className={styles.bottomDetailsText}>
                      1{" "}
                      {
                        appData?.tradeDetails?.cryptoExchanges?.exchangeRate
                          ?.base
                      }{" "}
                      /{" "}
                      {
                        appData?.tradeDetails?.cryptoExchanges?.exchangeRate
                          ?.rate
                      }{" "}
                      {
                        appData?.tradeDetails?.cryptoExchanges?.exchangeRate
                          ?.quote
                      }
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {appData?.tradeDetails?.transactionCategory?.toLowerCase() ===
            "giftcard" && (
            <div>
              <p className={styles.bottomDetailsPayment}>Payment Method</p>

              <div className={styles.bankDetails}>
                <IonImg
                  className={styles.bankLogo}
                  src={handleLogo(appData?.tradeDetails?.bankAccount)}
                />

                <div>
                  <p className={styles.bankAccountNumber}>
                    {`${appData?.tradeDetails?.bankAccount?.accountNumber?.slice(
                      0,
                      3
                    )}***${appData?.tradeDetails?.bankAccount?.accountNumber?.slice(
                      appData?.tradeDetails?.bankAccount?.accountNumber
                        ?.length - 4
                    )}`}
                  </p>
                  <p className={styles.bankAccountNameBottom}>
                    {appData?.tradeDetails?.bankAccount?.accountName}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
}
