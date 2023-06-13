import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/service/firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

const Mypage = () => {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  // console.log(user);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!user && user !== "") {
      // 初回のレンダリング時にuserが更新されていない場合は無視する
      router.push("/Signin");
    }
  }, [user, router]);

  const handleUpdateDisplayName = () => {
    updateProfile(auth.currentUser, { displayName: displayName })
      .then(() => {
        console.log("ユーザー名が更新されました");
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            const updatedUser = {
              ...user,
              displayName: currentUser.displayName,
            };
            setUser(updatedUser); // setUser関数はuseAuthContextから提供される場合の例です
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <TextField
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          label="ユーザー名を入力してください"
          variant="outlined"
          autoComplete="off"
          name="displayName"
          type="text"
          sx={{ width: 300 ,my:3}}
        />

        <Button sx={{ my: 4}} variant="contained" onClick={handleUpdateDisplayName}>
          ユーザー名を更新
        </Button>

        <Typography sx={{ fontWeight: "bold", color: "orange" }}>名前</Typography>
        <Typography>{user.displayName}</Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography sx={{ fontWeight: "bold", color: "orange" }}>ID</Typography>
        <Typography>{user.uid}</Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography sx={{ fontWeight: "bold", color: "orange" }}>email</Typography>
        <Typography>{user.email}</Typography>
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
