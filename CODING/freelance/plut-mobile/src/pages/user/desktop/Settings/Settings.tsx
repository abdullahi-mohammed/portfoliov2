import { FormEvent, SetStateAction, useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { Button } from "../../../../components";
import { useHistory } from "react-router-dom";
import {
  IonImg,
  IonProgressBar,
  IonTextarea,
  IonToggle,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import {
  BankAccountModel,
  BanksProps,
  CreateBankAccountModel,
} from "../../../../shared/models/bankaccountModel";
import { useApi, useStorage } from "../../../../hooks";
import { useCurrentUser } from "../../../../services/userService";
import { BankaccoutService } from "../../../../services/bankAccountService";
import axios from "axios";
import { UserAuthService } from "../../../../services/userAuthService";

export default function Settings({ setPrevRoute }: { setPrevRoute: any }) {
  const [presentAlert] = useIonAlert();
  const [current, setCurrent] = useState<"security" | "account">("security");
  const history = useHistory();
  const [banks, setBanks] = useState([] as BanksProps[]);
  const [bankAccounts, setBankAccounts] = useState([] as BankAccountModel[]);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { request, error, isLoading, isSuccessful, setIsSuccessful } = useApi();

  const [checked, setChecked] = useState<string>("");
  const [newAccount, setNewAccount] = useState({} as CreateBankAccountModel);
  const [present] = useIonActionSheet();
  const { id, token } = useCurrentUser();
  const { resetData } = useStorage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const handleNavChange = () =>
    setCurrent((prev) => (prev === "account" ? "security" : "account"));

  const handleLogo = (account: BankAccountModel | CreateBankAccountModel) =>
    banks?.find(
      (bank) => bank.name.toLowerCase() === account.bankName.toLowerCase()
    )?.logo || "/assets/bank.svg";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    if (reason?.length <= 0) {
      setErrorMessage("Please state your reason");
      return;
    }

    const deleteUser = async () => {
      const userService = new UserAuthService();
      const deleteAccount = await userService.deleteAccount({ reason }, token);

      if (deleteAccount.succeeded) {
        await resetData();
        window.location.reload();
      }

      return deleteAccount;
    };

    request(deleteUser);
  };

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
  }, [id, newAccount]);

  const handleChecked = (id: SetStateAction<string>) => setChecked(id);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Settings</h3>

      <div>
        <div className={styles.navsWrapper}>
          <div
            className={`${styles.navWrapper} ${
              current === "security" ? styles.navWrapperCurrent : ""
            }`}
            onClick={handleNavChange}
          >
            <p
              className={`${styles.nav} ${
                current === "security" ? styles.navCurrent : ""
              }`}
            >
              Security
            </p>
          </div>

          <div
            className={`${styles.navWrapper} ${
              current === "account" ? styles.navWrapperCurrent : ""
            }`}
            onClick={handleNavChange}
          >
            <p
              className={`${styles.nav} ${
                current === "account" ? styles.navCurrent : ""
              }`}
            >
              Account
            </p>
          </div>
        </div>

        {current === "security" ? (
          <div className={styles.changePassword}>
            <div>
              <h3 className={styles.changePasswordHeader}>Change Password</h3>
              <p className={styles.changePasswordText}>Update your password.</p>
            </div>

            <div>
              <Button
                onClick={() => history.replace("/forgot-password")}
                text="Change password"
                isLoading={false}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.addBankWrapper}>
              <div>
                <h3 className={styles.changePasswordHeader}>
                  Limits & Verification
                </h3>
                <p className={styles.changePasswordText}>
                  Add your bank account to gain access to more Plut features.
                </p>
              </div>

              <div className={styles.addBank}>
                <IonImg src="/assets/bank.svg" className={styles.bankIcon} />
                <h3 className={styles.bankHeader}>Add Bank Account</h3>
                <p className={styles.bankText}>
                  This enables you to withdraw funds your Plut Wallet.
                </p>

                <Button
                  isLoading={false}
                  text="Add Bank Account"
                  type="secondary"
                  onClick={async () => {
                    await setPrevRoute("/settings");
                    history.push("/settings/bank-accounts");
                  }}
                />
              </div>
            </div>

            <div className={styles.banks}>
              <div>
                <h3 className={styles.changePasswordHeader}>Bank Account</h3>
                <p className={styles.changePasswordText}>
                  Add your bank accounts to receive cash gotten from trades
                </p>
              </div>

              <div className={styles.allBanks}>
                {loading ? (
                  <IonProgressBar type="indeterminate"></IonProgressBar>
                ) : bankAccounts?.length ? (
                  bankAccounts.map((account, index) => (
                    <div className={styles.accountDetailsWrapper} key={index}>
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
                          // onClick={handleUnlink}
                        >
                          Unlink Account
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noAccount}>No Bank Account Found</p>
                )}
              </div>
            </div>

            <div className={styles.banks}>
              <div>
                <h3 className={styles.changePasswordHeader}>Delete Account</h3>
                <p className={styles.changePasswordText}>
                  All your trade history and other data would be permanently
                  erased.
                </p>
              </div>

              <div className={styles.deleteWrapper}>
                <IonTextarea
                  placeholder="Reason for deleting account"
                  autoGrow={false}
                  value={reason}
                  onIonChange={(e: any) => setReason(e.target.value)}
                  className={styles.textArea}
                ></IonTextarea>

                <div className={styles.deleteButtonWrapper}>
                  <p
                    className={
                      errorMessage
                        ? styles.errorMesssage
                        : styles.noErrorMesssage
                    }
                  >
                    {errorMessage ? errorMessage : "No error"}
                  </p>
                  <Button
                    text="Delete My Account"
                    buttonType="button"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
