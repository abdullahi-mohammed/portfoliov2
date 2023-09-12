import { User } from "../shared/models/userModel";
import useStorage from "../hooks/useStorage";

export const useCurrentUser = () => {
  const { appData } = useStorage();

  const user: User = {
    id: appData.user.id,
    firstName: "John Doe",
    email: appData.user.email,
    lastName: appData.user.lastName,
    profileImageUrl: appData.user.profileImageUrl,
    token: appData.user.token,
    refreshToken: appData.user.refreshToken,
    userName:
      appData.user.userName.split("@")[0].charAt(0).toUpperCase() +
      appData.user.userName.split("@")[0].slice(1),
    phoneNumber: appData.user.phoneNumber,
  };

  return user;
};
