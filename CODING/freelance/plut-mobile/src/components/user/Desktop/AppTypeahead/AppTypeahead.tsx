import { useState } from "react";
import {
  IonContent,
  IonItem,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonImg,
} from "@ionic/react";
import styles from "./AppTypeahead.module.css";
import { Search } from "../../../user";

interface BanksProps {
  code: string;
  logo: string;
  name: string;
  slug: string;
  ussd: string;
}

interface TypeaheadProps {
  items: BanksProps[];
  title?: string;
  onSelectionCancel?: () => void;
  onSelectionChange?: (items: BanksProps) => void;
}

function AppTypeahead({
  items,
  title,
  onSelectionCancel,
  onSelectionChange,
}: TypeaheadProps) {
  const [bank, setBank] = useState({} as BanksProps);
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () =>
    onSelectionCancel !== undefined && onSelectionCancel();

  return (
    <IonContent>
      <div className={styles.mainWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerTop}>
            <h3 className={styles.headerTitle}>Banks</h3>
          </div>

          <IonImg
            src="/assets/ios-close.svg"
            alt="close"
            className={styles.iosClose}
            onClick={handleClose}
          />
        </div>

        <div className={styles.bodyWrapper}>
          <div className={styles.searchWrapper}>
            <Search
              setValue={setSearchValue}
              value={searchValue}
              placeholder="Search Banks"
            />
          </div>

          <IonList id="modal-list" inset={true}>
            <IonRadioGroup
              value={bank.code}
              onIonChange={(e) => {
                const selectedBank = items.find(
                  (item) => item.code === e.target.value
                );
                const bank = selectedBank ? selectedBank : ({} as BanksProps);

                setBank(bank);

                if (onSelectionChange !== undefined) {
                  onSelectionChange(bank);
                }
              }}
            >
              {items
                .filter((item) =>
                  item.name
                    .toLowerCase()
                    .trim()
                    .includes(searchValue.toLowerCase().trim())
                )
                .map((item) => (
                  <IonItem
                    lines="none"
                    key={item.code}
                    className={styles.ionItem}
                  >
                    <p
                      className={`${styles.description} ${
                        bank.code === item.code && styles.current
                      }`}
                    >
                      {item.name}
                    </p>
                    <IonRadio slot="end" value={item.code}></IonRadio>
                  </IonItem>
                ))}
            </IonRadioGroup>
          </IonList>
        </div>
      </div>
    </IonContent>
  );
}
export default AppTypeahead;
