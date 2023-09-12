import { SignupLogin } from "../../../../components/auth/Desktop";

export default function Signup({ setIsLoggedIn }: { setIsLoggedIn: any }) {
  return <SignupLogin authType="signup" setIsLoggedIn={setIsLoggedIn} />;
}
