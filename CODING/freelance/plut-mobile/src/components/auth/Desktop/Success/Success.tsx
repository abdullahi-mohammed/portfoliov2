import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../../components";
import styles from "./Success.module.css";
import Wrapper from "../Wrapper/Wrapper";

interface SuccessProps {
  type: "reset" | "create";
  setValue: any;
  value: string;
  text: string;
}

export default function Success({ type, setValue, value, text }: SuccessProps) {
  const history = useHistory();
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    if (first) setFirst(false);
    else history.replace("/auth");
  }, [value]);

  const handleClick = () =>
    value === "login" ? history.replace("/auth") : setValue("login");

  return (
    <Wrapper>
      <h3 className={styles.title}>
        {type === "reset"
          ? "You’ve successfully reset your password"
          : "You’ve successfully created your account"}
      </h3>
      <p className={styles.body}>
        {type === "reset"
          ? "You can now use your new password to login to your plut account."
          : "You can now login to your plut account."}
      </p>

      <Button
        isLoading={false}
        text={text}
        onClick={() => history.replace("/login")}
      />
    </Wrapper>
  );
}
