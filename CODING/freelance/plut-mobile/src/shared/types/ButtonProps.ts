export interface ButtonProps {
  text: string;
  type?: "primary" | "secondary";
  onClick?: any;
  isDisabled?: boolean;
  isLoading: boolean;
  buttonType?: "submit" | "reset" | "button";
}
