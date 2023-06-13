import Head from "next/head";
import Link from "next/link";
import GoogleButton from "./components/GoogleButton";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>todoリスト</title>
      </Head>

      <ul>
        <li>
          <Link href="/SignUp">サインアップ</Link>
        </li>
        <li>
          <Link href="/Signin">ログイン</Link>
        </li>
        <li>
          <Link href="/Mypage">マイページ</Link>
        </li>
      </ul>

      {/* <GoogleButton /> */}

      <Container>
        <Link href="/todos/">todosページへいく</Link>
      </Container>
    </>
  );
}
