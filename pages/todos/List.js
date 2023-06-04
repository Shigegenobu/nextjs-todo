import Link from "next/link";
import React from "react";

const List = () => {
  return (
    <>
      <div>
        <p>TODO一覧</p>
        <p>全０件中０件表示中</p>
      </div>
      <div>
        <p>ステータス</p>
        <p>ID</p>
        <p>期限</p>
      </div>
      <div>
        <p>
          <input value="全て" />
          <input value="未着手" />
          <input value="進行中" />
          <input value="完了" />
        </p>
        <p>
          <input placeholder="タイトルを入力" />
        </p>
        <p>
          <input value="2023/5/20" />~
          <input value="20235/23" />
        </p>
      </div>
      <Link href='/'>Homeページへ</Link>
    </>
  );
};

export default List;
