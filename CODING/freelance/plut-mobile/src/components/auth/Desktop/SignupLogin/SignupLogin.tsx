import { IonContent, IonImg } from "@ionic/react";
import Input from "../../../general/Input/Input";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import styles from "./SignupLogin.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import Button from "../../../general/Button/Button";
import { useApi, useStorage, useWindowDimensions } from "../../../../hooks";
import { Link, useHistory } from "react-router-dom";
import "./SignupLogin.css";
import { UserAuthService } from "../../../../services/userAuthService";

interface SignupLoginType {
  authType: "login" | "signup";
  setIsLoggedIn: any;
}

export default function SignupLogin({
  authType,
  setIsLoggedIn,
}: SignupLoginType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { width } = useWindowDimensions();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { appData, updateData } = useStorage();

  const { request, error, isLoading, isSuccessful, setIsSuccessful } = useApi();

  const {
    request: loginRequest,
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    isSuccessful: isLoginSuccessful,
    setIsSuccessful: setIsLoginSuccessful,
  } = useApi();

  const [heading, setHeading] = useState<string>("");

  useEffect(() => {
    setHeading(authType === "login" ? "Welcome Back" : "Get Started");
  }, [authType]);

  useEffect(() => {
    // if (appData?.user?.token) window.location.reload();
    if (appData?.user?.token) setIsLoggedIn(true);
    // if (appData?.user?.token) history.push("/");
  }, [appData]);

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      history.push("/verify-mail");
    }
  }, [isSuccessful]);

  useEffect(() => {
    if (isLoginSuccessful) {
      setIsLoginSuccessful(false);

      if (loginData.isVerified) {
        updateData({
          email: "",
          showPopup: true,
          user: {
            id: loginData.user.id,
            email: loginData.user.email,
            firstName: loginData.user.firstName,
            lastName: loginData.user.lastName,
            profileImageUrl: "",
            token: loginData.token,
            refreshToken: loginData.refreshToken,
            userName: loginData.user.userName,
            phoneNumber: loginData.user.phoneNumber,
          },
        });
      } else {
        updateData({ user: {}, email });
        history.push("/verify-mail", { from: "/auth" });
      }
    }
  }, [isLoginSuccessful]);

  // Error
  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    loginError && setErrorMessage(loginError);
  }, [loginError]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  // Register and Login
  const handleSignup = async () => {
    setErrorMessage("");

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    } else if (!password) {
      setErrorMessage("Password is required");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match");
      return;
    }

    updateData({ email });
    const registerUser = async () => {
      const signupService = new UserAuthService();
      const signup = await signupService.register({ email, password });
      return signup;
    };

    request(registerUser);
  };

  const handleLogin = async () => {
    setErrorMessage("");

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    const loginUser = async () => {
      const loginService = new UserAuthService();
      const login = (await loginService.login({ email, password })) as any;

      return login;
    };

    loginRequest(loginUser);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    authType === "signup" ? handleSignup() : handleLogin();
  };

  return (
    <IonContent>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <IonImg
            alt="top image"
            src="/assets/logo-purple.svg"
            className={styles.logo}
          />

          <div className={styles.formWrapper}>
            <h3 className={styles.title}>{heading}</h3>
            <p className={styles.text}>
              Welcome back! Please enter your details.
            </p>

            <form
              className={styles.form}
              id="submit"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Input
                label="Email"
                placeholder="Enter your email address"
                value={email}
                setValue={setEmail}
                autofocus={true}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                setValue={setPassword}
                type="password"
              />

              {authType === "signup" && (
                <Input
                  placeholder="Enter your password again"
                  label="Confirm Password"
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  type="password"
                />
              )}

              <div className={styles.forgotPasswordWrapper}>
                {authType === "login" ? (
                  <Link to="/forgot-password" className={styles.forgotPassword}>
                    Forgot Password ?
                  </Link>
                ) : (
                  <p className={styles.proceed}>
                    By proceeding, I accept{" "}
                    <span className={styles.proceedAccent}>
                      Plut’s Terms and Conditions
                    </span>{" "}
                    and confirm that I have read{" "}
                    <span className={styles.proceedAccent}>
                      Plut’s Privacy Policy
                    </span>
                  </p>
                )}
              </div>

              <p
                className={
                  errorMessage ? styles.errorMesssage : styles.noErrorMesssage
                }
              >
                {errorMessage.length ? errorMessage : "No error"}
              </p>

              <div className={styles.buttonWrapper}>
                {authType === "login" ? (
                  <Button
                    isLoading={isLoginLoading}
                    buttonType="submit"
                    text="Login"
                  />
                ) : (
                  <Button
                    isLoading={isLoading}
                    buttonType="submit"
                    text="Create an account"
                  />
                )}
              </div>
            </form>

            <div className={styles.signUpWrapper}>
              {authType === "login" ? (
                <span className={styles.signUp}>
                  Don't have an account ?{" "}
                  <Link to="/signup" className={styles.signUpAccent}>
                    Sign Up for free
                  </Link>
                </span>
              ) : (
                <span className={styles.signUp}>
                  Have an account ?{" "}
                  <span
                    onClick={() => history.push("/login")}
                    className={styles.signUpAccent}
                  >
                    Login
                  </span>
                </span>
              )}
            </div>
          </div>
        </main>

        {width >= 900 && (
          <aside className={styles.aside}>
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
                el: ".swiper-custom-pagination-bullet",
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.swiper}
            >
              <SwiperSlide>
                <div className={styles.outerBodyWrapper}>
                  <div className={styles.bodyWrapper}>
                    <div className={styles.bigImageWrapper}>
                      <IonImg
                        alt="top image"
                        src="/assets/sell-gift-card-image.png"
                        className={styles.bigImage}
                      />
                      <div className={styles.overlay}></div>
                    </div>

                    <div className={styles.textWrapper}>
                      <h1 className={styles.textTitle}>Sell Giftcards</h1>
                      <p className={styles.textBody}>
                        Plut make you trade giftcards and pay your utility bills
                        with ease and sends commission straight to your bank
                        account.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={styles.outerBodyWrapper}>
                  <div className={styles.bodyWrapper}>
                    <div className={styles.bigImageWrapper}>
                      <IonImg
                        alt="top image"
                        src="/assets/pay-bills.png"
                        className={styles.bigImageTwo}
                      />
                      <div className={styles.overlay}></div>
                    </div>

                    <div className={styles.textWrapper}>
                      <h1 className={styles.textTitle}>Pay your Bills</h1>
                      <p className={styles.textBody}>
                        Plut make you trade giftcards and pay your utility bills
                        with ease and sends commission straight to your bank
                        account.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <div className="swiper-custom-pagination-bullet" />
            </Swiper>
          </aside>
        )}
      </div>
    </IonContent>
  );
}
