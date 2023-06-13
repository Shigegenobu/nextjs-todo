import React, { useState } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { createUserWithEmailAndPassword, getAuth ,updateProfile} from "firebase/auth";
import { useRouter } from "next/router";

const SignUp = () => {
  const auth = getAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("登録");

    const { email, password } = event.target.elements;

    try {
      // ユーザー作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;

      // ユーザー名を設定
      const displayName = ""; // ユーザー名を空の文字列に設定
      await updateProfile(user, { displayName });

      // ユーザー作成が成功した場合の処理
      console.log("ユーザーが作成されました");
      router.push("/Signin");
    } catch (error) {
      // ユーザー作成が失敗した場合の処理
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          setError("正しいメールアドレスの形式で入力してください。");
          break;
        case "auth/weak-password":
          setError("パスワードは6文字以上を設定する必要があります。");
          break;
        case "auth/email-already-in-use":
          setError("そのメールアドレスは登録済みです。");
          break;
        default:
          setError("メールアドレスかパスワードに誤りがあります。");
          break;
      }
    }

    // createUserWithEmailAndPassword(auth, email.value, password.value).catch((error) => {
    //   console.error(error);
    //   switch (error.code) {
    //     case "auth/invalid-email":
    //       setError("正しいメールアドレスの形式で入力してください。");
    //       break;
    //     case "auth/weak-password":
    //       setError("パスワードは6文字以上を設定する必要があります。");
    //       break;
    //     case "auth/email-already-in-use":
    //       setError("そのメールアドレスは登録済みです。");
    //       break;
    //     default:
    //       setError("メールアドレスかパスワードに誤りがあります。");
    //       break;
    //   }
    // });

    // console.log(email.value, password.value);
    // router.push("/Signin");
  };

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 5 }}>
        <h2>登録ページ</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
