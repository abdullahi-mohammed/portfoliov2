import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { IonContent, IonHeader, IonImg, IonToolbar } from "@ionic/react";
import { Button } from "../../../../components";
import { OnBoarding } from "../../../../components/auth";
import { useHistory } from "react-router-dom";
import styles from "./Onboarding.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "./Onboarding.css";
import { useWindowDimensions } from "../../../../hooks";

interface OnboardingProps {
  setValue: any;
  value: string;
}

export default function Onboarding({ setValue, value }: OnboardingProps) {
  const [first, setFirst] = useState<boolean>(true);
  const history = useHistory();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (first) setFirst(false);
    else history.replace("/auth");
  }, [value]);

  useEffect(() => {
    width > 650 && history.push(`/login`);
  }, [width]);

  const handleNavigate = (currentValue: "login" | "signup") =>
    value === currentValue ? history.push("/auth") : setValue(currentValue);

  return (
    <>
      <IonHeader class="ion-no-border">
        <IonToolbar className={styles.ionToolBar}>
          <IonImg
            alt="top image"
            src="/assets/logo-purple.svg"
            className={styles.image}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent className={styles.content}>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          speed={500}
          loop={false}
          navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <OnBoarding
              src="/assets/sell-gift-card-image.png"
              classid="bigImage"
              title="Sell Giftcards"
              text="Plut make you trade giftcards and pay your utility bills with ease
              and sends commission straight to your bank account."
            />
          </SwiperSlide>
          <SwiperSlide>
            <OnBoarding
              src="/assets/pay-bills.png"
              classid="bigImageTwo"
              title="Pay your Bills"
              text="Plut make you trade giftcards and pay your utility bills with ease
              and sends commission straight to your bank account."
            />
          </SwiperSlide>
        </Swiper>
      </IonContent>

      <div className={`${styles.footer} ion-padding`}>
        <Button
          isLoading={false}
          text="Create an account"
          onClick={() => handleNavigate("signup")}
        />
        <Button
          isLoading={false}
          text="Login"
          type="secondary"
          onClick={() => handleNavigate("login")}
        />
      </div>
    </>
  );
}
