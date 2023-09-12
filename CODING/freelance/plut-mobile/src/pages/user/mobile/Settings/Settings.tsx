import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { create } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useApi, useStorage } from "../../../../hooks";
import { useCurrentUser } from "../../../../services/userService";
import styles from "./Settings.module.css";
import "./Settings.css";
import { LocationDescriptor } from "history";
import { FormEvent, useEffect, useRef, useState } from "react";
import { OverlayEventDetail } from "@ionic/core";
import { Button } from "../../../../components";
import { UserAuthService } from "../../../../services/userAuthService";

interface settIngsContentProps {
  header: string;
  text: string;
  icon: string;
  route: string;
}

interface settIngsProps {
  title: string;
  content: settIngsContentProps[];
}

export default function Settings() {
  const { request, error, isLoading, isSuccessful, setIsSuccessful } = useApi();
  const [showLiveChat, setSHowLiveChat] = useState<boolean>(false);
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();
  const { appData, resetData } = useStorage();
  const { userName, token } = useCurrentUser();
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
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

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
    }
  }

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

  const modal = useRef<HTMLIonModalElement>(null);

  const handlePresentToast = (text: string) => presentToast("top", text);

  const handleClick = () => {
    const handleLogout = async () => {
      await resetData();
      window.location.reload();
    };

    presentAlert({
      mode: "ios",
      header: "Logout ?",
      message: "Are you sure you want to logout of your account",
      cssClass: `${styles.logoutAlert} ${styles["sc-ion-alert-ios-h"]}`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: styles.cancelAlert,
        },
        {
          text: "Logout",
          cssClass: styles.confirmAlert,
          role: "confirm",
          handler: handleLogout,
        },
      ],
    });
  };

  const settings: settIngsProps[] = [
    {
      title: "SECURITY",
      content: [
        {
          header: "Change Password",
          text: "Pay easily with your debit card",
          icon: "/assets/changePassword.svg",
          route: "/forgot-password",
        },
        {
          header: "Change Security Pin",
          text: "Pay easily with your debit card",
          icon: "/assets/changePin.svg",
          route: "/settings/reset-security-pin",
        },
      ],
    },
    {
      title: "ACCOUNT",
      content: [
        {
          header: "Limits & Verification",
          text: "Gain access to all our features",
          icon: "/assets/verification.svg",
          route: "/settings/verification",
        },
        {
          header: "Linked Bank Accounts",
          text: "Manage your linked bank accounts",
          icon: "/assets/bank.svg",
          route: "/settings/bank-accounts",
        },
        {
          header: "Debit or Credit Cards",
          text: "Manage your debit or credit cards",
          icon: "/assets/card.svg",
          route: "/settings/bank-cards",
        },
        {
          header: "Delete Account",
          text: "Delete your Plut account",
          icon: "/assets/changePin.svg",
          route: "/settings/delete-account",
        },
      ],
    },
    {
      title: "PREFERENCES",
      content: [
        {
          header: "Notifications",
          text: "Pay easily with your debit card",
          icon: "/assets/notificationIcon.svg",
          route: "/settings/notifications",
        },
      ],
    },
    {
      title: "SUPPORT",
      content: [
        {
          header: "File A Complaint",
          text: "Gain access to all our features",
          icon: "/assets/verification.svg",
          route: "/settings/complaint",
        },
        {
          header: "Live Chat",
          text: "Manage your linked bank accounts",
          icon: "/assets/bank.svg",
          route: "",
        },
      ],
    },
  ];

  const handleNavigate = (route: LocationDescriptor<unknown>) => {
    if (!route) setSHowLiveChat(true);
    else history.push(route);
  };

  return (
    <>
      <IonHeader class="ion-no-border">
        <IonToolbar className={styles.ionToolBar}>
          <IonTitle class={`ion-text-center ${styles.headerTitle}`}>
            Settings
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className={styles.profileWrapper}>
          <IonImg
            alt="profile image"
            src="/assets/profile.svg"
            className={styles.profile}
          />

          <div className={styles.greetingsWrapper}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.email}>{appData.user.email}</span>
          </div>
        </div>

        <div className={styles.editButtonWrapper}>
          <IonButton shape="round" className={styles.editButton}>
            <IonIcon slot="start" icon={create} />
            Edit Profile
          </IonButton>
        </div>

        <div className={styles.allSettings}>
          {settings.map((settings) => (
            <div className={styles.settingsWrapper} key={settings.title}>
              <h3 className={styles.title}>{settings.title}</h3>

              <div>
                {settings.content.map((settings, index, array) => (
                  <IonItem
                    id={
                      settings.route === "/settings/delete-account"
                        ? "open-modal"
                        : ""
                    }
                    button
                    className={`${styles.settingsItem} ${
                      index === array?.length - 1 && styles.settingsItemNoLine
                    }`}
                    onClick={() =>
                      settings.route === "/settings/bank-accounts" ||
                      settings.route === "/forgot-password" ||
                      settings.route === ""
                        ? handleNavigate(settings.route)
                        : settings.route !== "/settings/delete-account"
                        ? handlePresentToast("Coming soon")
                        : ""
                    }
                    key={settings.header}
                  >
                    <IonImg
                      src={settings.icon}
                      className={styles.settingsIcon}
                    />
                    <div className={styles.settingsTextWrapper}>
                      <span className={styles.header}>{settings.header}</span>
                      <span className={styles.text}>{settings.text}</span>
                    </div>
                  </IonItem>
                ))}
              </div>
            </div>
          ))}

          {showLiveChat ? (
            <div className={styles.tawtTo}>
              <iframe
                className={styles.tawtToFrame}
                src="https://tawk.to/chat/6463274ead80445890ed2bd9/1h0hl33sm"
                title="Live Chat"
              ></iframe>
            </div>
          ) : (
            <></>
          )}

          {showLiveChat ? (
            <img
              src="/assets/closeLarge.svg"
              alt="close"
              width={24}
              height={24}
              className={styles.tawtToClose}
              onClick={() => setSHowLiveChat(false)}
            />
          ) : (
            <></>
          )}

          <IonItem
            button
            className={`${styles.settingsItem} ${styles.settingsItemNoLine} ${styles.settingsItemBottom}`}
          >
            <div className={styles.settingsTextWrapper}>
              <span className={styles.header}>Privacy & Terms</span>
            </div>
          </IonItem>

          <IonItem
            button
            className={`${styles.settingsItem} ${styles.settingsItemNoLine} ${styles.settingsItemBottom}`}
            onClick={handleClick}
          >
            <div className={styles.settingsTextWrapper}>
              <span className={styles.header}>Logout</span>
            </div>
          </IonItem>

          <IonModal
            ref={modal}
            trigger="open-modal"
            onWillDismiss={(ev) => onWillDismiss(ev)}
          >
            <IonHeader className="ion-no-border">
              <IonToolbar className={styles.ionToolBar} mode="ios">
                <IonTitle>Delete Account</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent className={styles.content}>
              <div className={styles.deleteWrapper}>
                <p className={styles.typeDetails}>
                  All your trade history and other data would be permanently
                  erased.
                </p>

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
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </>
  );
}
