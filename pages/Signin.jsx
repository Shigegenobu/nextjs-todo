import { Box, Button, Container, TextField } from "@mui/material";
import Link from "next/link";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase";

const Signin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        // ログインができたかどうかをわかりやすくするためのアラート
        // alert( 'ログインOK!' );
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container sx={{ width: "75%" }}>
        <h2>ログインページ</h2>
          <form onSubmit={handleSubmit}>
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
            <Button sx={{ mt: 2 }} variant="contained">
              ログイン
            </Button>
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
