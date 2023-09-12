import { SignupLogin } from "../../../../components/auth/Desktop";

export default function Login({ setIsLoggedIn }: { setIsLoggedIn: any }) {
  return <SignupLogin authType="login" setIsLoggedIn={setIsLoggedIn} />;
}
