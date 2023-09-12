import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { addCircle, checkmarkCircle, chevronDownOutline } from "ionicons/icons";
import { Header } from "../../../../components/user";
import styles from "./BankAccounts.module.css";
import "./BankAccounts.css";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useCurrentUser } from "../../../../services/userService";
import { BankaccoutService } from "../../../../services/bankAccountService";
import {
  BankAccountModel,
  BanksProps,
  CreateBankAccountModel,
} from "../../../../shared/models/bankaccountModel";
import { Button, Footer, Input } from "../../../../components";
import { AppTypeahead } from "../../../../components";
import axios from "axios";
import { useStorage } from "../../../../hooks";

const BankAccounts = () => {
  const [presentAlert] = useIonAlert();
  const [bankAccounts, setBankAccounts] = useState([] as BankAccountModel[]);
  const [banks, setBanks] = useState([] as BanksProps[]);
  const [loading, setLoading] = useState(true);
  const [loadingUserBanks, setLoadingUserBanks] = useState(true);
  const { id, token } = useCurrentUser();
  const [checked, setChecked] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [selectedBank, setSelecedBank] = useState({} as BanksProps);
  const [loadingAccountName, setLoadingAccountName] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isBanksFocused, setIsBanksFocused] = useState(false);
  const [isAddBankLoading, setIsAddBankLoading] = useState(false);
  const [errorAddingBank, setErrorAddingBank] = useState("");
  const [newAccount, setNewAccount] = useState({} as CreateBankAccountModel);
  const [present] = useIonActionSheet();
  const { resetData } = useStorage();

  const modal = useRef<HTMLIonModalElement>(null);
  const modal2 = useRef<HTMLIonModalElement>(null);
  const page = useRef(undefined);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);

    const handleBanks = async () => {
      const bankaccounts = await axios.get(
        "https://dev-wallet.renamarkets.com/api/v1/bankaccount/banks/NGN"
      );
      const defaultBankImage =
        "https://png.pngtree.com/element_our/png/20181114/bank-icon-png_239804.jpg";

      let bankData = bankaccounts.data.data;
      bankData = bankData.map((a: any) => {
        const bank = {
          name: a.name,
          slug: a.name,
          code: a.code,
          ussd: "",
          logo: defaultBankImage,
        };
        return bank;
      });
      setBanks(bankData);

      setLoading(false);
    };

    handleBanks();
  }, []);

  useEffect(() => {
    const getBankAccounts = async () => {
      const bankAccountService = new BankaccoutService();
      const result = await bankAccountService.getBankAccount(
        id,
        token,
        resetData
      );

      setBankAccounts(result.data);
      setLoadingUserBanks(false);
    };

    id && getBankAccounts();
  }, [id, newAccount]);

  useEffect(() => {
    setErrorAddingBank("");

    const handleAccountName = async () => {
      setLoadingAccountName(true);
      // const response = await axios.get(
      //   `https://maylancer.org/api/nuban/api.php?account_number=${accountNumber}&bank_code=${selectedBank.code}`
      // );

      const getBankAccount = await axios.post(
        "https://dev-wallet.renamarkets.com/api/v1/bankaccount/banks/validate-account",
        {
          bankCode: selectedBank.code,
          accountNumber: accountNumber,
          countryCode: "NGN",
        }
      );
      setLoadingAccountName(false);
      // if (response.data.status.toLowerCase() === "error") {
      //   setErrorMessage("Account not found");
      //   setAccountName("");
      // } else {
      //   setAccountName(response.data.account_name);
      //   setErrorMessage("");
      // }

      if (!getBankAccount.data.succeeded) {
        setErrorMessage("Account not found: " + getBankAccount.data.message);
        setAccountName("");
      } else {
        setAccountName(getBankAccount.data.data.accountName);
        setErrorMessage("");
      }
    };

    if (accountNumber.length == 10 && selectedBank.name) handleAccountName();
  }, [accountNumber, selectedBank]);

  const handleUnlink = () => {
    const handleUnlinkAccount = async () => {};

    presentAlert({
      header: "Unlink Bank Account  ",
      message: "Are you sure you want to unlink your bank account ?",
      cssClass: `${styles.unlinkAlert} ${styles["sc-ion-alert-ios-h"]}`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: styles.cancelAlert,
        },
        {
          text: "Unlink",
          cssClass: styles.confirmAlert,
          role: "confirm",
          handler: handleUnlinkAccount,
        },
      ],
    });
  };

  const handleDismiss = () => {
    return new Promise<boolean>((resolve, reject) => {
      present({
        header: "Are you sure?",
        buttons: [
          {
            text: "Yes",
            role: "confirm",
          },
          {
            text: "No",
            role: "cancel",
          },
        ],

        onWillDismiss: (ev) => {
          if (ev.detail.role === "confirm") resolve(true);
          else reject();
        },
      });
    });
  };

  const handleSubmit = async () => {
    setIsAddBankLoading(true);
    setErrorAddingBank("");

    const bankService = new BankaccoutService();

    const result = await bankService.createBankAccount(
      {
        accountName,
        bankName: selectedBank.name,
        accountNumber,
        userId: id,
      },
      token,
      resetData
    );

    setIsAddBankLoading(false);

    if (result.succeeded) setNewAccount(result.data);
    else setErrorAddingBank(result.message);
  };

  const handleLogo = (account: BankAccountModel | CreateBankAccountModel) =>
    banks?.find(
      (bank) => bank.name.toLowerCase() === account.bankName.toLowerCase()
    )?.logo || "/assets/bankSquare.svg";

  const handleChecked = (id: SetStateAction<string>) => setChecked(id);
  const handleDismissModal = () => {
    setNewAccount({} as CreateBankAccountModel);
    setSelecedBank({} as BanksProps);
    setAccountName("");
    setAccountNumber("");

    modal.current?.dismiss();
  };

  return (
    <IonPage ref={page}>
      <Header title="Bank Accounts" />

      <IonContent className="ion-padding">
        {loadingUserBanks || loading ? (
          <IonProgressBar type="indeterminate"></IonProgressBar>
        ) : (
          <div className={styles.content}>
            <h3 className={styles.header}>
              Add your bank accounts to receive cash gotten from trades
            </h3>

            {bankAccounts?.length ? (
              bankAccounts.map((account, index) => (
                <div className={styles.accountDetailsWrapper} key={index}>
                  <div className={styles.accountDetails}>
                    <div className={styles.accountDetailsMain}>
                      <IonImg
                        className={styles.bankLogo}
                        src={handleLogo(account)}
                      />
                      <div className={styles.accountDetailsInner}>
                        <div className={styles.accountNumber}>
                          {`${account.accountNumber.slice(
                            0,
                            3
                          )}***${account.accountNumber.slice(
                            account.accountNumber?.length - 4
                          )}`}
                        </div>
                        <div className={styles.accountName}>
                          {account.accountName.toLowerCase()}
                        </div>
                      </div>
                    </div>

                    <button
                      className={styles.accountDetailsButton}
                      onClick={handleUnlink}
                    >
                      Unlink Account
                    </button>
                  </div>

                  <div className={styles.defaultWrapper}>
                    <div className={styles.defaultText}>
                      Set as Default Account
                    </div>
                    <IonToggle
                      onClick={() => handleChecked(account.id)}
                      checked={account.id === checked}
                      color="success"
                      className={styles.toggle}
                    ></IonToggle>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noAccount}>No Bank Account Found</p>
            )}

            <div className={styles.linkAccount} id="open-modal">
              <IonIcon icon={addCircle} className={styles.linkAccountIcon} />
              <span className={styles.linkAccountText}>
                {bankAccounts?.length
                  ? "Link Another Bank Account"
                  : "Add Bank Account"}
              </span>
            </div>

            {!bankAccounts?.length && (
              <div className={styles.messsageWrapper}>
                <h2 className={styles.message}>
                  At least one bank account is needed to maintain a verified
                  plut account, please add another bank account before unlinking
                  this account
                </h2>
              </div>
            )}

            <IonModal
              ref={modal}
              trigger="open-modal"
              presentingElement={presentingElement}
              canDismiss={handleDismiss}
            >
              <IonHeader class="ion-no-border">
                <IonToolbar className={`ion-padding ${styles.ionToolBar}`}>
                  <IonTitle>Link Bank Account</IonTitle>

                  {!newAccount.accountName && (
                    <IonButtons slot="end">
                      <IonImg
                        src="/assets/close.svg"
                        onClick={handleDismissModal}
                        className={styles.close}
                      />
                    </IonButtons>
                  )}
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                <div
                  className={
                    newAccount.accountName
                      ? styles.bankIconWrapperSuccessful
                      : styles.bankIconWrapper
                  }
                >
                  <IonImg src="/assets/bank.svg" className={styles.bankIcon} />
                </div>
                <h3
                  className={
                    newAccount.accountName
                      ? styles.bankDetailsHeaderSuccessful
                      : styles.bankDetailsHeader
                  }
                >
                  {newAccount.accountName
                    ? "Bank account successfully linked"
                    : "Enter your bank details"}
                </h3>

                <div>
                  {!newAccount.accountName && (
                    <p className={styles.bankDetailsText}>
                      Please add your bank account so we can pay your money
                      directly to you when you sell your gift cards
                    </p>
                  )}

                  <div
                    className={
                      !newAccount.accountName ? styles.visible : styles.disable
                    }
                  >
                    <div className={styles.accountNumberWrapper}>
                      <Input
                        label="Account Number"
                        placeholder="Enter your account number"
                        value={accountNumber?.toString()}
                        setValue={setAccountNumber}
                      />
                    </div>

                    <div className={styles.bankNameWrapper}>
                      <IonLabel position="floating" className={styles.label}>
                        Bank Name
                      </IonLabel>

                      <IonItem
                        onFocus={() => setIsBanksFocused(true)}
                        onBlur={() => setIsBanksFocused(false)}
                        button={true}
                        detail={false}
                        id="select-banks"
                        className={
                          isBanksFocused
                            ? `${styles.selectBank} ${styles.selectBankFocus}`
                            : styles.selectBank
                        }
                      >
                        <div
                          slot="start"
                          id="selected-banks"
                          className={
                            selectedBank.name
                              ? styles.selectedbankName
                              : styles.selectedbankNameLight
                          }
                        >
                          {selectedBank.name
                            ? selectedBank.name
                            : "Select Bank"}
                        </div>
                        <IonIcon
                          icon={chevronDownOutline}
                          slot="end"
                          className={styles.donwArrow}
                        />
                      </IonItem>
                    </div>
                    {loadingAccountName ? (
                      <IonProgressBar type="indeterminate"></IonProgressBar>
                    ) : (
                      <div className={styles.accountNameWrapper}>
                        {accountName && (
                          <IonIcon
                            icon={checkmarkCircle}
                            className={styles.accountNameIcon}
                          />
                        )}
                        {errorMessage && (
                          <IonIcon
                            icon={checkmarkCircle}
                            className={styles.accountNameIconError}
                          />
                        )}
                        <p className={styles.accountName}>
                          {errorMessage
                            ? errorMessage.toLowerCase()
                            : accountName.toLowerCase()}
                        </p>
                      </div>
                    )}
                  </div>

                  {newAccount.accountName && (
                    <div>
                      <div className={styles.newAccount}>
                        <IonImg
                          className={styles.bankLogo}
                          src={handleLogo(newAccount)}
                        />
                        <div className={styles.newAccountDetails}>
                          <span className={styles.newAccountNumber}>
                            {`${newAccount.accountNumber.slice(
                              0,
                              3
                            )}***${newAccount.accountNumber.slice(
                              newAccount.accountNumber?.length - 4
                            )}`}
                          </span>
                          <span className={styles.newAccountName}>
                            {newAccount.accountName.toLowerCase()}
                          </span>
                        </div>
                        <IonIcon
                          icon={checkmarkCircle}
                          className={styles.accountNameIconLarge}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <IonModal ref={modal2} trigger="select-banks">
                  <AppTypeahead
                    title="Banks"
                    items={banks}
                    onSelectionCancel={() => modal2.current?.dismiss()}
                    onSelectionChange={(bank: BanksProps) => {
                      setSelecedBank(bank);
                      modal2.current?.dismiss();
                    }}
                  />
                </IonModal>
              </IonContent>

              {newAccount.accountName ? (
                <Footer
                  text="Done"
                  errorMessage=""
                  onClick={handleDismissModal}
                  isLoading={false}
                  extraComponentsPosition="bottom"
                  extraComponents={
                    <div className={styles.addAnother}>
                      <Button
                        text="Add Another Bank Account"
                        isLoading={false}
                        onClick={handleDismissModal}
                        type="secondary"
                      />
                    </div>
                  }
                />
              ) : (
                <Footer
                  text="Add Bank Account"
                  isDisabled={
                    !accountName || !!errorMessage || accountNumber.length != 10
                  }
                  errorMessage={errorAddingBank}
                  onClick={handleSubmit}
                  isLoading={isAddBankLoading}
                />
              )}
            </IonModal>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BankAccounts;
