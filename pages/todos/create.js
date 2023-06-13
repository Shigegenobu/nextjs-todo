import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { useRouter } from "next/router";
import { addWeeks, formatISO } from "date-fns";

const create = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  const router = useRouter();
  const db = getFirestore();

  const handleTitleFormChanges = (e) => {
    setTitle(e.target.value);
  };

  const handleContentsFormChanges = (e) => {
    setContents(e.target.value);
  };

  const handleSelectChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDateFormChanges = (e) => {
    setDeadline(e.target.value);
  };

  const resetInput = () => {
    setTitle("");
    setContents("");
    setStatus("");
    setDeadline("");
  };

  const handleClick = async (e) => {
    if (!title || !contents || !status) {
      alert("タイトル or 内容 or 状態 が空です");
      return;
    }

    // new Doc create(追加する)
    const newDoc = doc(collection(db, "todos"));

    // Firestore save
    await setDoc(newDoc, {
      id: newDoc.id,
      title: title,
      status: status,
      contents: contents,
      created_at: Timestamp.now(),
      deadline: deadline,
    })
      .then(() => {
        alert("保存完了");
        resetInput();
        console.log("Document written with ID:", newDoc.id);
      })
      .catch((error) => {
        console.error(error);
      });
    router.push("/todos");
  };

  useEffect(() => {
    //データベースからデータを取得する
    const todoData = collection(db, "todos");
    getDocs(todoData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setTodos(snapShot.docs.map((doc) => ({ ...doc.data() })));

      //リアルタイムで取得
      onSnapshot(todoData, (todo) => {
        setTodos(todo.docs.map((doc) => ({ ...doc.data() })));
      });
      console.log("mount");
    });
  }, []);

  useEffect(() => {
    const defaultDate = formatISO(addWeeks(new Date(), 1), { representation: "date" });
    setDeadline(defaultDate);
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos, deadline]);

  return (
    <>
      <>
        <h1>TODO作成</h1>
        <p>新規todoを追加</p>
        <Box sx={{ border: 1, borderRadius: 1, borderColor: "text.primary" }}>
          <Box>
            <Box sx={{ bgcolor: "#c2eafc", display: "flex" }}>
              <p style={{ padding: `10px 35px 10px 10px`, width: `100px` }}>タイトル</p>
              <TextField
                id="standard-basic"
                label="タイトルを入力してください"
                margin="dense"
                variant="standard"
                fullWidth
                autoComplete="off"
                value={title}
                onChange={handleTitleFormChanges}
              />
            </Box>
            <Box sx={{ bgcolor: "#fff7b0", display: "flex" }}>
              <p style={{ padding: `5px 30px 10px 10px`, width: `100px` }}>内容</p>
              <TextField
                id="outlined-basic"
                label="詳細情報を入力してください"
                margin="dense"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={contents}
                onChange={handleContentsFormChanges}
              />
            </Box>
            <Box sx={{ bgcolor: "#d1c4e9", display: "flex" }}>
              <p style={{ margin: `20px 35px 0px 10px` }}>ステータス</p>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="simple-select-autowidth-label">選択してください</InputLabel>
                <Select
                  labelId="simple-select-autowidth-label"
                  id="simple-select-autowidth-label"
                  autoWidth
                  label="Status"
                  value={status}
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
                value={deadline}
                onChange={handleDateFormChanges}
                sx={{ width: 200 }}
              />
            </Box>
          </Box>
        </Box>

        <Button sx={{ mt: 5 }} variant="contained" onClick={handleClick}>
          新規追加
        </Button>
      </>

      <Link href="/todos/">
        <Button variant="contained" color="success" sx={{ mt: 5, ml: 3 }}>
          todo一覧ページへいく
        </Button>
      </Link>
    </>
  );
};

export default create;
