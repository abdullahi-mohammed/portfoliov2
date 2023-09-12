import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useStorage } from "./hooks";
import { Routes as AuthRoutes } from "./components/auth";
import { Routes as UserRoutes } from "./components/user";
// import { BankAccountForm } from "./components/bankaccount/Bankaccount";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const { appData, isLoading } = useStorage();
  const [isLoggredIn, setIsLoggedIn] = useState(false);

  return !isLoading ? (
    <IonApp>
      {!appData?.user?.token && (
        <IonReactRouter>
          <IonRouterOutlet>
            <AuthRoutes setIsLoggedIn={setIsLoggedIn} />
          </IonRouterOutlet>
        </IonReactRouter>
      )}

      {(!!appData?.user?.token || isLoggredIn) && (
        <IonReactRouter>
          <IonRouterOutlet id="main-content">
            <UserRoutes />
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  ) : (
    <></>
  );
};

export default App;
