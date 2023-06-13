import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { addWeeks, formatISO } from "date-fns";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const todoedit = () => {
  const [todosId, setTodosId] = useState([]);
  const [selectStatus, setSelectStatus] = useState("");
  const [todosEditTitle, setTodosEditTitle] = useState("");
  const [todosEditContents, setTodosEditContents] = useState("");
  const [todosEditDeadline, setTodosEditDeadline] = useState("");

  const router = useRouter();
  // console.log(router);
  const db = getFirestore();

  const handleSelectChange = (e) => {
    setSelectStatus(e.target.value);
  };

  const handleEditTitleChange = (e) => {
    setTodosEditTitle(e.target.value);
  };

  const handleEditContentsChange = (e) => {
    setTodosEditContents(e.target.value);
  };

  const handleEditDateFormChanges = (e) => {
    setTodosEditDeadline(e.target.value);
  };

  const handleSaveClick = async () => {
    if (!todosEditTitle || !todosEditContents || !selectStatus) {
      alert("タイトルor内容or状態が空です");
      return;
    }
    try {
      const newDocRef = doc(db, "todos", router.query.id);
      await updateDoc(newDocRef, {
        title: todosEditTitle,
        contents: todosEditContents,
        status: selectStatus,
        deadline: todosEditDeadline,
      });
      console.log("保存されました");
      // 保console存後のリダイレクト処理
      router.push("/todos/");
    } catch (error) {
      console.error("保存に失敗しました", error);
    }
  };

  // 初回レンダリング時・ルーター変更時
  useEffect(() => {
    if (router.isReady) {
      const docRef = doc(db, "todos", router.query.id);
      const docSnap = getDoc(docRef);
      docSnap.then((ref) => {
        // console.log(ref);
        setTodosId(ref.data());
        // console.log(ref.data());
      });
    }
  }, [router]);

  useEffect(() => {
    setTodosEditTitle(todosId.title || "");
    setTodosEditContents(todosId.contents || "");
    setSelectStatus(todosId.status || "");

    const defaultDate = formatISO(addWeeks(new Date(), 1), { representation: "date" });
    setTodosEditDeadline(defaultDate);
  }, [todosId]);

  return (
    <>
      <Typography variant="h5">TODO編集</Typography>

      <main>
        <Box>
          <Box sx={{ border: "1px solid black" }}>
            <Box sx={{ border: "1px dashed grey", m: 1 }}>
              <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                タイトル
              </Typography>
              <TextField value={todosEditTitle} fullWidth onChange={handleEditTitleChange} />
            </Box>
            <Box sx={{ border: "1px dashed grey", m: 1 }}>
              <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                内容
              </Typography>
              <TextField value={todosEditContents} onChange={handleEditContentsChange} fullWidth />
            </Box>
            <Box sx={{ border: "1px dashed grey", m: 1 }}>
              <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                状態
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  labelId="simple-select-autowidth-label"
                  id="simple-select-autowidth-label"
                  autoWidth
                  label="Status"
                  value={selectStatus}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="未着手">未着手</MenuItem>
                  <MenuItem value="進行中">進行中</MenuItem>
                  <MenuItem value="完了">完了</MenuItem>
                  <MenuItem value="全て">全て</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ bgcolor: "#f8d8d8", display: "flex" }}>
              <p style={{ margin: `20px 35px 0px 10px` }}>期限</p>
              <TextField
                id="date"
                type="date"
                value={todosEditDeadline}
                onChange={handleEditDateFormChanges}
                sx={{ width: 200 }}
              />
            </Box>

            <Button variant="contained" sx={{ m: 1 }} onClick={handleSaveClick}>
              保存
            </Button>

            <Link href="/todos/">
              <Button variant="contained">戻る</Button>
            </Link>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default todoedit;
