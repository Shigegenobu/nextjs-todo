import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DatePickerDay from "../components/DatePickerDay";
import { collection, getDocs, onSnapshot, getFirestore } from "firebase/firestore";
import db from "@/service/firebase";
import { blue } from "@mui/material/colors";

const index = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [sort, setSort] = useState({});

  const DataObject = [{ id: "id", create: "日時", deadline: "期限" }];
  const db = getFirestore();

  // firebaseからデータを取得
  useEffect(() => {
    const todoData = collection(db, "todos");
    // console.log(db);

    // ドキュメントのデータを全て取得する
    getDocs(todoData).then((snapShot) => {
      // console.log(snapShot.docs.map(doc => doc.data()))
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setTodos(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
    console.log("mount");

    // リアルタイムで取得
    onSnapshot(todoData, (todo) => {
      setTodos(todo.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    console.log("依存関係の確認");
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(todos.filter((todo) => todo.status === "未着手"));
          break;
        case "inProgress":
          setFilteredTodos(todos.filter((todo) => todo.status === "進行中"));
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "完了"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  const filteredById = searchId
    ? filteredTodos.filter((todo) => todo.id.toLowerCase().includes(searchId))
    : filteredTodos;

  const handleSortClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <h1>TODO一覧</h1>
        <Box m={4}>全１件中１件表示中</Box>
        <Box mt={3}>
          <Link href="/Mypage">
            <Button variant="contained" color="secondary">
              mypageページへ
            </Button>
          </Link>
        </Box>
      </Box>

      <Box>
        <button onClick={() => handleSort("asc")}>ID昇順</button>
        <button onClick={() => handleSort("desc")}>ID降順</button>
        <dl style={{ display: `flex` }}>
          <AutorenewIcon></AutorenewIcon>
          <dt>ステータス</dt>

          <dd>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="simple-select-autowidth-label">選択してください</InputLabel>
              <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <MenuItem value="notStarted">未着手</MenuItem>
                <MenuItem value="inProgress">進行中</MenuItem>
                <MenuItem value="done">完了</MenuItem>
                <MenuItem value="all">全て</MenuItem>
              </Select>
            </FormControl>
          </dd>
        </dl>
        <dl style={{ display: `flex` }}>
          <AccountCircleIcon></AccountCircleIcon>
          <dt style={{ margin: `10px 32px` }}>ID</dt>
          <dd>
            <TextField
              id="standard-basic"
              label="半角入力してください"
              autoComplete='off'
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </dd>
        </dl>
        <dl style={{ display: `flex` }}>
          <CalendarMonthIcon></CalendarMonthIcon>
          <dt style={{ margin: `30px 32px` }}>期限</dt>
          <dd style={{ display: `flex` }}>
            <DatePickerDay />
            <p style={{ margin: `30px 0px` }}>〜</p>
            <DatePickerDay />
          </dd>
        </dl>
      </Box>

      <TableContainer component={Paper} sx={{ minWidth: 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {DataObject.map((data) => (
              <TableRow key={data.id} onClick={handleSortClick}>
                <TableCell sx={{ color: "blue" }}>{data.id}</TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>内容</TableCell>
                <TableCell>状態</TableCell>
                <TableCell sx={{ color: "blue" }}>{data.create}</TableCell>
                <TableCell sx={{ color: "blue" }}>{data.deadline}</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {filteredById.map((todo) => (
              <TableRow key={todo.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {todo.id}
                </TableCell>
                <TableCell>
                  {/* <Link href={`${todo.id}/todoshow`}>{todo.title}</Link> */}
                  <Link href={`todos/${todo.id}/todoshow`}>{todo.title}</Link>
                </TableCell>
                <TableCell>{todo.contents}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>{Date()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={5}>
        <Link href="/todos/create">
          <Button variant="contained" color="success">
            createページへ
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default index;
