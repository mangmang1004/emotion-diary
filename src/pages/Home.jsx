import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

//이번 달에 적은 일기 필터링 하는 함수
//pivotDate : 기준이 되는 날짜, data : 일기를 모아놓은 데이타
const getMonthlyData = (pivotDate, data) => {
  //이번 달 시작 값
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  //이번 달 시작 값
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, //다음 날의 0일 전 = 전 달의 마지막 날 
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

function Home() {
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData);

  const onIncreseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <>
      <Header
        leftChild={<Button text={"<"} onClick={onDecreseMonth} />}
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        rightChild={<Button text={">"} onClick={onIncreseMonth} />}
      />
      <DiaryList data={monthlyData}/>
    </>
  );
}

export default Home;
