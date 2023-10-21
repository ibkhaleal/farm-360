import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";


export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const response = await axios.get("/api/user/initial");

  return response.data
};
