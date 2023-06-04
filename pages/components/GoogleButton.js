import { auth } from "@/service/firebase";
import { Box, Button } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Mypage from "../Mypage";

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
  const signInWithGoogle = () => {
    //firebaseを使ってサインインする
    signInWithPopup(auth, provider);
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
