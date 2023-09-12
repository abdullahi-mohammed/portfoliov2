import { IonIcon, IonImg } from "@ionic/react";
import styles from "./Sidenav.module.css";
import {
  home,
  card,
  personCircle,
  chevronDownOutline,
  chevronUpOutline,
} from "ionicons/icons";
import { useLocation, useHistory } from "react-router";
import { useState } from "react";

const navs = [
  {
    name: "Home",
    route: "/dashboard",
    icon: home,
    subroutes: [
      {
        name: "Dashboard",
        route: "/dashboard",
      },
      {
        name: "Sell Giftcards",
        route: "/giftcards",
      },
      {
        name: "Sell Cryptos",
        route: "/cryptos",
      },
    ],
  },

  {
    name: "Transactions",
    route: "/transactions",
    icon: card,
  },

  {
    name: "Settings",
    route: "/settings",
    icon: personCircle,
  },
];

export default function Sidenav() {
  const pathname = useLocation().pathname;
  const history = useHistory();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <nav className={styles.wrapper}>
      <IonImg
        alt="top image"
        src="/assets/logo-purple.svg"
        className={styles.logo}
      />

      <ul className={styles.navs}>
        {navs.map((nav) => (
          <li className={styles.nav}>
            <div
              className={styles.navItem}
              onClick={() => {
                if (nav.route === "/dashboard")
                  setIsDashboardOpen((prev) => !prev);
                else history.push(nav.route);
              }}
            >
              <IonIcon
                icon={nav.icon}
                class={
                  pathname === nav.route ||
                  ((pathname === nav.route ||
                    pathname.includes("/giftcard") ||
                    pathname.includes("/crypto")) &&
                    nav.name === "Home")
                    ? styles.navIconCurrent
                    : styles.navIcon
                }
              />

              <p
                className={
                  pathname === nav.route ||
                  ((pathname === nav.route ||
                    pathname.includes("/giftcard") ||
                    pathname.includes("/crypto")) &&
                    nav.name === "Home")
                    ? styles.navNameCurrent
                    : styles.navName
                }
              >
                {nav.name}
              </p>

              {nav.subroutes?.length && (
                <IonIcon
                  icon={isDashboardOpen ? chevronUpOutline : chevronDownOutline}
                  class={
                    pathname === nav.route ||
                    ((pathname === nav.route ||
                      pathname.includes("/giftcard") ||
                      pathname.includes("/crypto")) &&
                      nav.name === "Home")
                      ? styles.downCurrent
                      : styles.down
                  }
                />
              )}
            </div>

            {nav.subroutes?.length && isDashboardOpen && (
              <ul className={styles.navsInner}>
                {nav.subroutes.map((nav) => (
                  <p
                    onClick={() => {
                      history.push(nav.route);
                    }}
                    className={
                      pathname === nav.route
                        ? styles.navNameInnerCurrent
                        : styles.navNameInner
                    }
                  >
                    {nav.name}
                  </p>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
