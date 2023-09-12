import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonMenu,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";

import {
  AllGiftcards,
  GiftCardQuantity,
  TradeGiftcards,
  TradeSuccessful,
  Dashboard,
  GiftCardRates,
  GiftCardImageUpload,
  BankAccounts,
  ComingSoon,
  TradeDetails,
  CryptoNetwork,
  CryptoAddress,
  CryptoSuccessful,
  TradeCryptos,
  Settings,
  AllCryptos,
  HowToSell,
  Transactions,
} from "../../../pages/user/mobile";

import styles from "./Routes.module.css";
import { card, home, personCircle, searchOutline } from "ionicons/icons";
import {
  CheckMail,
  ForgotPassword,
  NewPassword,
  ResetSuccessful,
} from "../../../pages/auth/mobile";
import { useStorage, useWindowDimensions } from "../../../hooks";
import {
  AllCryptosDesktop,
  AllGiftcardsDesktop,
  DashboardDesktop,
  HowToSellDesktop,
  SettingsDesktop,
  TransactionsDesktop,
} from "../../../pages/user/desktop";
import Sidenav from "../Sidenav/Sidenav";
import {
  CryptoAddressDesktop,
  CryptoNetworkDesktop,
  GiftcardImageUploadDesktop,
  GiftcardQuantityDesktop,
  LinkBankAccountDesktop,
  TradeCryptosDesktop,
  TradeDetailsDesktop,
  TradeGiftcardsDesktop,
  TradeSuccessfulDesktop,
} from "../Desktop";
import { Data } from "../../../hooks/useStorage";
import {
  CheckMailDesktop,
  ForgotPasswordDesktop,
  NewPasswordDesktop,
  ResetSuccessfulDesktop,
} from "../../../pages/auth/desktop";

export default function Routes() {
  const [value, setValue] = useState<"signup" | "login">("signup");
  const { width } = useWindowDimensions();
  const history = useHistory();
  const location = useLocation();
  const ref = useRef<any>();
  const { updateData, appData } = useStorage();
  const [myAppData, setMyAppData] = useState<Data>(appData);
  const [search, setSearch] = useState("");
  const [prevRoute, setPrevRoute] = useState("");

  useEffect(() => {
    if (
      location.pathname.includes("giftcards/") ||
      location.pathname.includes("trade-crypto") ||
      location.pathname.includes("crypto-network") ||
      location.pathname.includes("crypto-successful") ||
      location.pathname.includes("trade-details") ||
      location.pathname.includes("bank") ||
      location.pathname.includes("crypto-address")
    )
      ref?.current?.open();
    else ref?.current?.close();
  }, [location]);

  useEffect(() => {
    (async () => {
      await updateData(myAppData);
    })();
  }, [myAppData]);

  return width > 600 ? (
    <IonPage>
      <IonMenu
        onIonDidClose={() => history.push(prevRoute)}
        contentId="desktop-content"
        side="end"
        ref={ref}
        className={styles.ionMenu}
      >
        {location.pathname.includes("amount") ? (
          <GiftcardQuantityDesktop
            appData={appData}
            setMyAppData={setMyAppData}
            prevRoute={prevRoute}
          />
        ) : location.pathname.includes("upload") ? (
          <GiftcardImageUploadDesktop
            appData={appData}
            setMyAppData={setMyAppData}
            prevRoute={prevRoute}
          />
        ) : location.pathname.includes("trade-successful") ||
          location.pathname.includes("crypto-successful") ? (
          <TradeSuccessfulDesktop prevRoute={prevRoute} />
        ) : location.pathname.includes("trade-crypto") ? (
          <TradeCryptosDesktop prevRoute={prevRoute} />
        ) : location.pathname.includes("crypto-network") ? (
          <CryptoNetworkDesktop prevRoute={prevRoute} />
        ) : location.pathname.includes("crypto-address") ? (
          <CryptoAddressDesktop prevRoute={prevRoute} />
        ) : location.pathname.includes("trade-details") ? (
          <TradeDetailsDesktop prevRoute={prevRoute} />
        ) : location.pathname.includes("bank") ? (
          <LinkBankAccountDesktop prevRoute={prevRoute} />
        ) : (
          <TradeGiftcardsDesktop
            appData={appData}
            setMyAppData={setMyAppData}
            prevRoute={prevRoute}
          />
        )}
      </IonMenu>

      <div className={styles.desktopLayout} id="desktop-content">
        {location.pathname !== "/forgot-password" &&
          location.pathname !== "/new-password" &&
          location.pathname !== "/reset-successful" &&
          location.pathname !== "/check-mail" && <Sidenav />}

        <div className={styles.bodyWrapper}>
          <IonContent>
            {location.pathname !== "/forgot-password" &&
              location.pathname !== "/new-password" &&
              location.pathname !== "/reset-successful" &&
              location.pathname !== "/check-mail" && (
                <header className={styles.header}>
                  <div className={styles.searchWrapper}>
                    <IonIcon
                      icon={searchOutline}
                      class={styles.tabBarIcon}
                      className={styles.searchIcon}
                    />
                    <IonInput
                      placeholder="Search Plut"
                      className={styles.input}
                      value={search}
                      onIonChange={(e: any) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className={styles.profile}>
                    <IonImg
                      alt="profile image"
                      src="/assets/profile.svg"
                      className={styles.profileImg}
                      onClick={() => history.push("/settings")}
                    />

                    <div className={styles.notificationWrapper}>
                      <IonImg
                        alt="notification image"
                        src="/assets/notification-icon.svg"
                        className={styles.notificationIcon}
                      />
                    </div>
                  </div>
                </header>
              )}

            <Switch>
              <Redirect exact path="/" to="/dashboard" />

              <Route exact path={"/dashboard"}>
                <DashboardDesktop
                  setMyAppData={setMyAppData}
                  search={search}
                  setPrevRoute={setPrevRoute}
                />
              </Route>

              <Route exact path={["/giftcards/:id", "/giftcards/:id/*"]}>
                {prevRoute === "/dashboard" ? (
                  <DashboardDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                ) : (
                  <AllGiftcardsDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                )}
              </Route>

              <Route exact path="/giftcards">
                <AllGiftcardsDesktop
                  setMyAppData={setMyAppData}
                  search={search}
                  setPrevRoute={setPrevRoute}
                />
              </Route>

              <Route exact path="/cryptos">
                <AllCryptosDesktop
                  setMyAppData={setMyAppData}
                  search={search}
                  setPrevRoute={setPrevRoute}
                />
              </Route>

              <Route
                path={[
                  "/trade-crypto",
                  "/crypto-network",
                  "/crypto-address",
                  "/crypto-successful",
                ]}
                exact={true}
              >
                {prevRoute === "/dashboard" ? (
                  <DashboardDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                ) : (
                  <AllCryptosDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                )}
              </Route>

              <Route path="/transactions" exact={true}>
                <TransactionsDesktop
                  search={search}
                  setPrevRoute={setPrevRoute}
                />
              </Route>

              <Route path="/trade-details" exact={true}>
                <TransactionsDesktop
                  search={search}
                  setPrevRoute={setPrevRoute}
                />
              </Route>

              <Route path="/settings/bank-accounts" exact={true}>
                {prevRoute.includes("/dashboard") ? (
                  <DashboardDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                ) : prevRoute.includes("/crypto") ? (
                  <AllCryptosDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                ) : prevRoute.includes("/giftcard") ? (
                  <AllGiftcardsDesktop
                    setMyAppData={setMyAppData}
                    search={search}
                    setPrevRoute={setPrevRoute}
                  />
                ) : (
                  <SettingsDesktop setPrevRoute={setPrevRoute} />
                )}
              </Route>

              <Route path="/settings" exact={true}>
                <SettingsDesktop setPrevRoute={setPrevRoute} />
              </Route>

              <Route exact path="/forgot-password">
                <ForgotPasswordDesktop text="Back to dashboard" />
              </Route>

              <Route exact path="/check-mail">
                <CheckMailDesktop />
              </Route>

              <Route exact path="/new-password">
                <NewPasswordDesktop />
              </Route>

              <Route exact path="/reset-successful">
                <ResetSuccessfulDesktop
                  value={value}
                  setValue={setValue}
                  text="Go to dashboard"
                />
              </Route>

              <Route exact path="/how-to-sell-giftcard">
                <Suspense fallback={<></>}>
                  <HowToSellDesktop type="giftcard" />
                </Suspense>
              </Route>

              <Route exact path="/how-to-sell-crypto">
                <Suspense fallback={<></>}>
                  <HowToSellDesktop type="crypto" />
                </Suspense>
              </Route>

              <Route path="/settings/*" exact={true}>
                <ComingSoon />
              </Route>

              {/* <Route path="/giftcard-rates" exact={true}>
                <GiftCardRates />
              </Route> */}

              <Redirect exact path="*" to="/dashboard" />
            </Switch>
          </IonContent>
        </div>
      </div>
    </IonPage>
  ) : (
    <Switch>
      <Route exact path="/giftcards">
        <AllGiftcards />
      </Route>

      <Route exact path="/cryptos">
        <IonPage>
          <AllCryptos />
        </IonPage>
      </Route>

      <Route exact path="/how-to-sell-giftcard">
        <IonPage>
          <Suspense fallback={<></>}>
            <HowToSell type="giftcard" />
          </Suspense>
        </IonPage>
      </Route>

      <Route exact path="/how-to-sell-crypto">
        <IonPage>
          <Suspense fallback={<></>}>
            <HowToSell type="crypto" />
          </Suspense>
        </IonPage>
      </Route>

      <Route exact path="/giftcards/:id">
        <IonPage>
          <TradeGiftcards />
        </IonPage>
      </Route>
      <Route exact path="/giftcards/:id/amount">
        <IonPage>
          <GiftCardQuantity />
        </IonPage>
      </Route>

      <Route exact path="/giftcards/:id/upload">
        <IonPage>
          <GiftCardImageUpload />
        </IonPage>
      </Route>

      <Route exact path="/giftcards/:id/trade-successful">
        <IonPage>
          <TradeSuccessful />
        </IonPage>
      </Route>

      <Route
        path="/settings/bank-accounts"
        render={() => <BankAccounts />}
        exact={true}
      />

      <Route
        path="/trade-details"
        render={() => (
          <IonPage>
            <TradeDetails />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/trade-crypto"
        render={() => (
          <IonPage>
            <TradeCryptos />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/crypto-network"
        render={() => (
          <IonPage>
            <CryptoNetwork />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/crypto-address"
        render={() => (
          <IonPage>
            <CryptoAddress />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/crypto-successful"
        render={() => (
          <IonPage>
            <CryptoSuccessful />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/forgot-password"
        render={() => (
          <IonPage>
            <ForgotPassword />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/check-mail"
        render={() => (
          <IonPage>
            <CheckMail />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/new-password"
        render={() => (
          <IonPage>
            <NewPassword />
          </IonPage>
        )}
        exact={true}
      />

      <Route
        path="/reset-successful"
        render={() => (
          <IonPage>
            <ResetSuccessful value={value} setValue={setValue} />
          </IonPage>
        )}
        exact={true}
      />

      <Route path="/settings/*" render={() => <ComingSoon />} exact={true} />

      <Route
        path="/"
        render={() => (
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Redirect exact path="/" to="/dashboard" />

                <Route
                  path="/dashboard"
                  render={() => (
                    <IonPage>
                      <Dashboard />
                    </IonPage>
                  )}
                  exact={true}
                />

                <Route
                  path="/giftcard-rates"
                  render={() => (
                    <IonPage>
                      <GiftCardRates />
                    </IonPage>
                  )}
                  exact={true}
                />

                <Route
                  path="/transactions"
                  render={() => (
                    <IonPage>
                      <Transactions />
                    </IonPage>
                  )}
                  exact={true}
                />

                <Route
                  path="/settings"
                  render={() => (
                    <IonPage>
                      <Settings />
                    </IonPage>
                  )}
                  exact={true}
                />

                <Redirect exact path="*" to="/dashboard" />
              </Switch>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className={styles.tabBar}>
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon icon={home} class={styles.tabBarIcon} />
                <IonLabel className={styles.label}>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="transactions" href="/transactions">
                <IonIcon icon={card} class={styles.tabBarIcon} />
                <IonLabel className={styles.label}>Transactions</IonLabel>
              </IonTabButton>

              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={personCircle} class={styles.tabBarIcon} />
                <IonLabel className={styles.label}>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      />
    </Switch>
  );
}
