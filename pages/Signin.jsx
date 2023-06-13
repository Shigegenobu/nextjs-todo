import { Box, Button, Container, TextField } from "@mui/material";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase";
import { useRouter } from "next/router";
import GoogleButton from "./components/GoogleButton";
import { useState } from "react";

const Signin = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      //成功したら.then,失敗したら.catchへ進む
      .then(() => {
        router.push("/Mypage");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        switch (error.code) {
          case "auth/invalid-email":
            setError("正しいメールアドレスの形式で入力してください。");
            break;
          case "auth/user-not-found":
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
          case "auth/wrong-password":
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
          default:
            setError("メールアドレスかパスワードに誤りがあります。");
            break;
        }
      });
  };

  return (
    <>
      <Container sx={{ width: "75%" }}>
        <h2>ログインページ</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Box>
            <p>メールアドレス</p>
            <TextField
              id="outlined-basic"
              label="メールアドレスを入力してください"
              variant="outlined"
              fullWidth
              autoComplete="off"
              name="email"
              type="email"
            />
            <p>パスワード</p>
            <TextField
              id="outlined-basic"
              label="パスワードを入力してください"
              variant="outlined"
              fullWidth
              autoComplete="off"
              name="password"
              type="password"
            />
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              ログイン
            </Button>
          </Box>

          <Box sx={{ mt: 4 }}>
            <GoogleButton />
          </Box>

          <Box sx={{ mt: 6 }}>
            <Link href="/SignUp">
              <Button variant="contained"> 新規登録はこちらから</Button>
            </Link>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Signin;
