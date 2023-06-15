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
import { collection, getDocs, onSnapshot, getFirestore } from "firebase/firestore";

const index = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortCreateDirection, setSortCreateDirection] = useState("asc");
  const [sortDeadlineDirection, setSortDeadlineDirection] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const DataObject = [{ id: "id", create: "日時", deadline: "期限" }];
  const db = getFirestore();

  const filteredById = searchId
    ? filteredTodos.filter((todo) => todo.id.toLowerCase().includes(searchId))
    : filteredTodos;

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

    // リアルタイムで取得
    onSnapshot(todoData, (todo) => {
      setTodos(todo.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    // console.log(todos);
  }, [todos]);

  useEffect(() => {
    // console.log("依存関係の確認");
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

  useEffect(() => {
    const filterTodosByDate = () => {
      const filteredByDate = todos.filter((todo) => {
        // もし startDate と endDate が設定されている場合、期限がその範囲内かどうかを判定
        if (startDate && endDate) {
          return (
            todo.deadline >= new Date(startDate).toISOString() &&
            todo.deadline <= new Date(endDate).toISOString()
          );
        }
        // startDate のみが設定されている場合、期限が startDate 以降かどうかを判定
        if (startDate) {
          return todo.deadline >= new Date(startDate).toISOString();
        }
        // endDate のみが設定されている場合、期限が endDate 以前かどうかを判定
        if (endDate) {
          return todo.deadline <= new Date(endDate).toISOString();
        }
        // startDate や endDate が設定されていない場合は絞り込まない
        return true;
      });
      setFilteredTodos(filteredByDate);
    };
    filterTodosByDate();
  }, [startDate, endDate, todos]);

  const handleSortClick = () => {
    if (sortDirection === "asc") {
      setSortDirection("desc"); // 現在の方向がascならばdescに変更
      setFilteredTodos([...filteredTodos].sort((a, b) => b.id.localeCompare(a.id))); // IDを降順で並び替え
    } else {
      setSortDirection("asc"); // 現在の方向がdescならばascに変更
      setFilteredTodos([...filteredTodos].sort((a, b) => a.id.localeCompare(b.id))); // IDを昇順で並び替え
    }
  };

  const handleCreateClick = () => {
    if (sortCreateDirection === "asc") {
      setSortCreateDirection("desc");
      setFilteredTodos(
        [...filteredTodos].sort(
          (a, b) => b.created_at.toDate().getTime() - a.created_at.toDate().getTime()
        )
      ); // createを降順で並び替え
    } else {
      setSortCreateDirection("asc");
      setFilteredTodos(
        [...filteredTodos].sort(
          (a, b) => a.created_at.toDate().getTime() - b.created_at.toDate().getTime()
        )
      ); // createを昇順で並び替え
    }
  };

  const handleDeadlineClick = () => {
    if (sortDeadlineDirection === "asc") {
      setSortDeadlineDirection("desc");
      setFilteredTodos([...filteredTodos].sort((a, b) => b.deadline.localeCompare(a.deadline))); // deadlineを降順で並び替え
    } else {
      setSortDeadlineDirection("asc");
      setFilteredTodos([...filteredTodos].sort((a, b) => a.deadline.localeCompare(b.deadline))); // deadlineを昇順で並び替え
    }
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
              autoComplete="off"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </dd>
        </dl>
        <dl style={{ display: `flex` }}>
          <CalendarMonthIcon></CalendarMonthIcon>
          <dt style={{ margin: `30px 32px` }}>期限</dt>
          <dd style={{ display: `flex` }}>
            <TextField
              id="date"
              type="date"
              sx={{ width: 200 }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p style={{ margin: `15px` }}>〜</p>
            <TextField
              id="date"
              type="date"
              sx={{ width: 200 }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </dd>
        </dl>

        <Box sx={{ my: 2, display: "flex", justifyContent: "space-evenly", width: 300 }}>
          <Box>
            <button onClick={() => handleSortClick()}>
              {sortDirection === "asc" ? "ID昇順" : "ID降順"}
            </button>
          </Box>
          <Box>
            <button onClick={() => handleCreateClick()}>
              {sortCreateDirection === "asc" ? "日時昇順" : "日時降順"}
            </button>
          </Box>
          <Box>
            <button onClick={() => handleDeadlineClick()}>
              {sortDeadlineDirection === "asc" ? "期限昇順" : "期限降順"}
            </button>
          </Box>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ minWidth: 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {DataObject.map((data) => (
              <TableRow key={data.id}>
                <TableCell sx={{ color: "blue" }}>{data.id}</TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>内容</TableCell>
                <TableCell>状態</TableCell>
                <TableCell sx={{ color: "blue" }}>{data.create}</TableCell>
                <TableCell sx={{ color: "blue" }}>
                  {data.deadline}(期限が過ぎたら、赤文字)
                </TableCell>
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
                <TableCell>{todo.created_at.toDate().toLocaleString()}</TableCell>
                {/* <TableCell>{todo.deadline}</TableCell> */}
                <TableCell>
                  {new Date(todo.deadline) < new Date() ? (
                    <span style={{ color: "red" }}>{todo.deadline}</span>
                  ) : (
                    <span style={{ color: "black" }}>{todo.deadline}</span>
                  )}
                </TableCell>
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
