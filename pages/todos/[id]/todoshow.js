import db from "@/service/firebase";
import { Box, Button, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

const todoshow = () => {
  const [todosId, setTodosId] = useState({});

  const router = useRouter();
  const db = getFirestore();
  // console.log(router.query.id);
  // console.log(router);

  const handleDeleteClick = async () => {
    try {
      await deleteDoc(doc(db, "todos", router.query.id));
      console.log("削除されました");
      // 削除後のリダイレクト処理を追加
      router.push("/todos");
    } catch (error) {
      console.error("削除に失敗しました", error);
    }
  };

  useEffect(() => {
    // router.isReadyは、ゲームでいうロード中を判断している
    if (router.isReady) {
      let docRef = doc(db, "todos", router.query.id);
      let docSnap = getDoc(docRef);
      // console.log(docRef)
      // console.log(router.query.id)
      docSnap.then((ref) => {
        if (ref.exists()) {
          // console.log(ref.exists());
          setTodosId(ref.data());
          console.log(ref.data());
        }
      });
    }
  }, [router]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">TODO詳細</Typography>
        <Box>
          <Button variant="contained" sx={{ mr: 5 }}>
            コメント
          </Button>
          <Link href="/todos/">
            <Button variant="contained">戻る</Button>
          </Link>
        </Box>
      </Box>

      <main>
        <Box>
          <Box sx={{ border: "1px solid black" }}>
            <Box sx={{ border: "1px dashed grey", m: 1 }}>
              <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                タイトル
              </Typography>
              <Typography variant="p" display="block">
                {todosId.title}
              </Typography>
            </Box>
            <Box sx={{ border: "1px dashed grey", m: 1 }}>
              <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                内容
              </Typography>
              <Typography variant="p" display="block">
                {todosId.contents}
              </Typography>
            </Box>
            <Box sx={{ border: "1px dashed grey", m: 1 }}>
              <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                状態
              </Typography>
              <Typography variant="p" display="block">
                {todosId.status}
              </Typography>
            </Box>
            <Link href={`/todos/todoedit?id=${router.query.id}`}>
              <Button variant="contained" sx={{ m: 1 }}>
                編集
              </Button>
            </Link>

            <Button variant="contained" sx={{ m: 1 }} onClick={() => handleDeleteClick()}>
              削除
            </Button>
          </Box>
        </Box>
      </main>

      <Link href="/todos/create">createページへ</Link>
    </>
  );
};

export default todoshow;
