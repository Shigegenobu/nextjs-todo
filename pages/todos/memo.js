
      <br></br>
      <Box sx={{ border: "10px solid green" }}></Box>
      <br></br>
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
              {todos.map((todo) => (
                <Box key={uuidv4()}>
                  <Box sx={{ border: "1px dashed grey", m: 1 }}>
                    <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                      タイトル
                    </Typography>
                    <Typography variant="p" display="block">
                      {todo.title}
                    </Typography>
                  </Box>
                  <Box sx={{ border: "1px dashed grey", m: 1 }}>
                    <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                      内容
                    </Typography>
                    <Typography variant="p" display="block">
                      {todo.contents}
                    </Typography>
                  </Box>
                  <Box sx={{ border: "1px dashed grey", m: 1 }}>
                    <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                      状態
                    </Typography>
                    <Typography variant="p" display="block">
                      {todo.status}
                    </Typography>
                  </Box>
                  <Link href="/todos/todoedit">
                    <Button variant="contained" sx={{ m: 1 }}>
                      編集
                    </Button>
                  </Link>

                  <Button variant="contained" sx={{ m: 1 }} onClick={() => handleDeleteClick(todo)}>
                    削除
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </main>
      </>
      <br></br>
      <Box sx={{ border: "10px solid green" }}></Box>
      <br></br>
      <>
        <Typography variant="h5">TODO編集</Typography>

        <main>
          <Box key={uuidv4}>
            <Box sx={{ border: "1px solid black" }}>
              <Box sx={{ border: "1px dashed grey", m: 1 }}>
                <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                  タイトル
                </Typography>
                <Typography variant="p" display="block">
                  {todos.title}
                </Typography>
              </Box>
              <Box sx={{ border: "1px dashed grey", m: 1 }}>
                <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                  期限
                </Typography>
                <Typography variant="p" display="block">
                  {todos.date}
                </Typography>
              </Box>
              <Box sx={{ border: "1px dashed grey", m: 1 }}>
                <Typography variant="p" display="block" sx={{ backgroundColor: "orange" }}>
                  状態
                </Typography>
                <Typography variant="p" display="block">
                  {todos.state}
                </Typography>
              </Box>

              <Link href="/todos/">
                <Button variant="contained" sx={{ m: 1 }}>
                  保存
                </Button>
              </Link>
            </Box>
          </Box>
        </main>
      </>


  const [sort, setSort] = useState("");
  const [sortedTodos, setSortedTodos] = useState([]);

useEffect(() => {
  const todoData = collection(db, "todos");
  getDocs(todoData).then((snapShot) => {
    setTodos(snapShot.docs.map((doc) => ({ ...doc.data() })));
    console.log(snapShot.docs.map(doc => doc.data()))
  });
  console.log("mount");

  let sorted = todos; // ソート前のtodosをコピー
  if (sort === "asc") {
    sorted = [...todos].sort((a, b) => a.id - b.id); // idを昇順にソート
  } else if (sort === "desc") {
    sorted = [...todos].sort((a, b) => b.id - a.id); // idを降順にソート
  }

  setSortedTodos(sorted);
}, [sort]);

const handleSort = (type) => {
  setSort(type);
  console.log('ソート')
};



<button onClick={() => handleSort("asc")}>ID昇順</button>
      <button onClick={() => handleSort("desc")}>ID降順</button>
      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            {todo.id}
            {todo.title}
            {todo.contents}
          </li>
        ))}
      </ul>