import { IonSearchbarCustomEvent } from "@ionic/core";
import { IonSearchbar, SearchbarChangeEventDetail } from "@ionic/react";
import styles from "./Search.module.css";

interface SearchProps {
  value: string;
  setValue: any;
  placeholder: string;
}

export default function Search({ value, setValue, placeholder }: SearchProps) {
  const handleChange = (
    e: IonSearchbarCustomEvent<SearchbarChangeEventDetail>
  ) => setValue(e.target.value);

  return (
    <IonSearchbar
      mode="ios"
      placeholder={placeholder}
      value={value}
      onIonChange={(e) => handleChange(e)}
      className={styles.searchBar}
    ></IonSearchbar>
  );
}
