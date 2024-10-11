import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

function DiaryList({ data }) {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // toSorted 사용 (원본 배열을 변경하지 않음)
    return data.toSorted((a, b) => {
      return sortType === "oldest"
        ? Number(a.createdDate) - Number(b.createdDate)
        : Number(b.createdDate) - Number(a.createdDate)
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
          onClick={() => nav("/new")}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          //리스트 형태로 각각의 컴포넌트나 ui를 렌더링 하기 위해서 key 값이 필요함
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default DiaryList;
