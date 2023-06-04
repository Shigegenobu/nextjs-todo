import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { auth } from "@/service/firebase";
import {  signOut } from "firebase/auth";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

const Mypage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user && user !== "") {
      // 初回のレンダリング時にuserが更新されていない場合は無視する
      router.push("/Signin");
    }
  }, [user, router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        router.push("/Signin");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (!user) {
    // userがまだ更新されていない場合はnullを返す
    return null;
  }

  return (
    <>
      <Box>
        <Typography>名前</Typography>
        <Typography>xxxx</Typography>
      </Box>

      <Box>
        <Typography>ID</Typography>
        <Typography>aaaa</Typography>
      </Box>

      <Link href="/todos/">
        <Button variant="contained">todo一覧ページへいく</Button>
      </Link>

      <Button variant="contained" onClick={handleLogout}>
        ログアウト
      </Button>
    </>
  );
};

export default Mypage;
