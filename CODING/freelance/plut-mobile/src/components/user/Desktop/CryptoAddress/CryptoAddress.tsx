import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../../../components/user";
import { Footer, Input } from "../../../../components";
import {
  IonContent,
  IonImg,
  IonList,
  IonProgressBar,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonModal,
} from "@ionic/react";
import styles from "./CryptoAddress.module.css";
import {
  Cryptos,
  NetWorks,
  Rates,
  SellCryptoModel,
} from "../../../../shared/models/cryptoModel";
import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import XHRUpload from "@uppy/xhr-upload";
import FileInput from "@uppy/file-input";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useCurrentUser } from "../../../../services/userService";
import { app } from "../../../../shared/const";
import { FileUploadResponse } from "../../../../shared/models/fileUpload";
import { Dashboard } from "@uppy/react";
import { BankaccoutService } from "../../../../services/bankAccountService";
import {
  BankAccountModel,
  BanksProps,
  CreateBankAccountModel,
} from "../../../../shared/models/bankaccountModel";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import axios from "axios";
import { CryptoService } from "../../../../services/cryptoService";
import { useStorage } from "../../../../hooks";
import "./CryptoAddress.css";

export default function CryptoAddress({ prevRoute }: { prevRoute: string }) {
  const history = useHistory();
  const { id, token } = useCurrentUser();
  const [cryptoUrl, setCryptoUrl] = useState("");
  const [hash, setHash] = useState("");
  const [bankAccounts, setBankAccounts] = useState([] as BankAccountModel[]);
  const [bankAccount, setBankAccount] = useState<BankAccountModel>(
    bankAccounts?.length ? bankAccounts[0] : ({} as BankAccountModel)
  );
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([] as BanksProps[]);
  const modal = useRef<HTMLIonModalElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { appData, updateData, resetData } = useStorage();

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
    const handleBanks = async () => {
      const result = await axios.get("https://nigerianbanks.xyz/");

      setBanks(result.data);
      setLoading(false);
    };

    handleBanks();
  }, []);

  useEffect(() => {
    uppy.on("complete", async (result) => {
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
        setCryptoUrl(url);
        console.log("value set for url: " + url);
      }
    });
  }, [uppy]);

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

  useEffect(() => {
    bankAccounts?.length && setBankAccount(bankAccounts[0]);
  }, [bankAccounts]);

  if (loading) return <IonProgressBar type="indeterminate"></IonProgressBar>;

  const handleLogo = (account: BankAccountModel | CreateBankAccountModel) =>
    banks?.find(
      (bank) => bank.name.toLowerCase() === account.bankName.toLowerCase()
    )?.logo || "/assets/bankSquare.svg";

  const handleAddBankAccount = () => history.push("/settings/bank-accounts");

  const handleSellCrypto = async () => {
    const payload: SellCryptoModel = {
      userId: id,
      bankAccountId: bankAccount.id,
      cryptoId: appData?.crypto?.id,
      cryptoRateId: appData?.currentRateCurrency.id,
      cryptoNetworkId: appData?.currentNetwork.id,
      uploadedProofOfAddress: cryptoUrl,
      transactionHash: hash,
      declaredCryptoAmount: Number(appData?.cryptoValue),
    };

    console.log(payload);

    const cryptoService = new CryptoService();

    setSubmitLoading(true);

    const result = await cryptoService.sellCryptos(payload, token, resetData);

    setSubmitLoading(false);

    console.log(result);

    if (result.succeeded) {
      setBankAccount(
        bankAccounts?.length ? bankAccounts[0] : ({} as BankAccountModel)
      );
      setHash("");
      setCryptoUrl("");

      updateData({
        crypto: {} as Cryptos,
        cryptoValue: null,
        currentNetwork: {} as NetWorks,
        currentRateCurrency: {} as Rates,
      });

      history.replace("/crypto-successful");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <IonContent>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTop}>
            <h3
              className={styles.headerTitle}
            >{`Sell ${appData?.crypto?.name} ${appData?.crypto?.symbol}`}</h3>
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
          <p className={styles.cryptoHeaderText}>
            Provide screenshot and transaction hash as a prove of payment
          </p>

          <Dashboard
            uppy={uppy}
            plugins={["Webcam", "FileInput"]}
            height={300}
            className="uk-margin-auto"
          ></Dashboard>

          <div className={styles.inputWrapper}>
            <Input
              placeholder="Insert / Paste transaction Hash (Optional)"
              label="Insert / paste transaction hash (Optional)"
              value={hash}
              setValue={setHash}
            />
          </div>

          <div>
            <div className={styles.bankOptions}>
              <p className={styles.bankActions}>Select Bank</p>
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

            {bankAccount?.accountName && (
              <div className={styles.bankDetailsWrapper} id="open-modal">
                <div className={styles.bankDetailsWrapperInner}>
                  <IonImg
                    className={styles.bankLogo}
                    src={handleLogo(bankAccount)}
                  />

                  <div className={styles.bankDetails}>
                    <p className={styles.accountNumber}>
                      {`${bankAccount.accountNumber.slice(
                        0,
                        3
                      )}***${bankAccount.accountNumber.slice(
                        bankAccount.accountNumber.length - 4
                      )}`}
                    </p>
                    <p className={styles.accountName}>
                      {bankAccount.accountName.toLowerCase()}
                    </p>
                  </div>
                </div>

                <IonIcon
                  icon={chevronDownOutline}
                  className={styles.bankIcon}
                />

                <IonModal ref={modal} trigger="open-modal" mode="ios">
                  <IonHeader>
                    <IonToolbar style={{ "--background": "white" }}>
                      <IonButtons slot="start">
                        <IonButton onClick={() => modal.current?.dismiss()}>
                          Cancel
                        </IonButton>
                      </IonButtons>
                      <IonTitle>Bank Accounts</IonTitle>
                    </IonToolbar>
                  </IonHeader>

                  <IonContent className="ion-padding">
                    <IonList>
                      {bankAccounts.map((bankAccount, index) => (
                        <div
                          className={styles.accountDetailsWrapper}
                          key={index}
                          onClick={() => {
                            setBankAccount(bankAccount);
                            modal.current?.dismiss();
                          }}
                        >
                          <div className={styles.accountDetails}>
                            <div className={styles.accountDetailsMain}>
                              <IonImg
                                className={styles.bankLogo}
                                src={handleLogo(bankAccount)}
                              />
                              <div className={styles.accountDetailsInner}>
                                <div className={styles.accountNumber}>
                                  {`${bankAccount.accountNumber.slice(
                                    0,
                                    3
                                  )}***${bankAccount.accountNumber.slice(
                                    bankAccount.accountNumber?.length - 4
                                  )}`}
                                </div>
                                <div className={styles.accountName}>
                                  {bankAccount.accountName.toLowerCase()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </IonList>
                  </IonContent>
                </IonModal>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footerWrapper}>
          <Footer
            onClick={handleSellCrypto}
            text="Complete"
            isDisabled={!cryptoUrl}
            errorMessage={errorMessage}
            isLoading={submitLoading}
          />
        </div>
      </div>
    </IonContent>
  );
}
