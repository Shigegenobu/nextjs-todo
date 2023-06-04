import React from "react";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase";
import { useAuthContext } from "./context/AuthContext";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("登録");
    const { email, password } = event.target.elements;
    // const { email, password, userName } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // ユーザー登録すると自動的にログインされてuserCredential.userでユーザーの情報を取得できる
        const user = userCredential.user;
        // ユーザー登録ができたかどうかをわかりやすくするためのアラート
        alert("登録完了！");
        console.log(user);
        // // ユーザー名の保存などの処理を行う
        // ユーザー名の保存
        // const userId = user.uid; // ユーザーのUIDを取得
        // const userNameValue = userName.value.trim();

        // // Firebase Realtime Databaseにユーザー名を保存
        // const usersRef = database.ref("users"); // "users"という参照を取得
        // usersRef.child(userId).set({
        //   // ユーザーIDをキーにしてデータを保存
        //   userName: userNameValue,
        // });
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(email.value, password.value);
    // console.log(email.value, password.value, userName.value);
    router.push("/Signin");
  };

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <h2>登録ページ</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <p>メールアドレス</p>
            <TextField
              id="email"
              label="メールアドレスを入力してください"
              variant="outlined"
              fullWidth
              autoComplete="off"
              name="email"
              type="email"
            />
            <p>パスワード</p>
            <TextField
              id="password"
              label="パスワードを入力してください"
              variant="outlined"
              fullWidth
              autoComplete="off"
              name="password"
              type="password"
            />
            {/* <p>ユーザー名</p>
            <TextField
              id="userName"
              label="ユーザー名を入力してください"
              variant="outlined"
              fullWidth
              autoComplete="off"
              name="userName"
              type="text"
            /> */}

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" size="large" type="submit">
                新規登録
              </Button>
            </Box>

            <Link href="/Signin">ログインはこちらから</Link>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
