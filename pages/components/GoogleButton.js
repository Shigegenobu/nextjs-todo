import { auth, provider } from "@/service/firebase";
import { Box, Button } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Mypage from "../Mypage";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

export default function GoogleButton() {
  const [user] = useAuthState(auth);

  return (
    <Box>
      {user ? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </Box>
  );
}

//Googleボタンでサインイン
function SignInButton() {
  const router = useRouter();
  const signInWithGoogle = () => {
    //firebaseを使ってサインインする
    signInWithPopup(auth, provider)
      .then(() => {
        router.push("/Mypage");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Button variant="outlined" onClick={signInWithGoogle}>
        Googleでサインイン
      </Button>
    </>
  );
}
//サインアウト
function SignOutButton() {
  return (
    <>
      <Button variant="outlined" onClick={() => auth.signOut()}>
        サインアウト
      </Button>
    </>
  );
}

function UserInfo() {
  return (
    <>
      ユーザー情報
      <Mypage />
    </>
  );
}
