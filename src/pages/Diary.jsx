import { useParams, useNavigate } from "react-router-dom"; //동적으로 만들어진 주소의 값에서 동적인 값을 가져오는 hook
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";

import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";


function Diary() {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중....</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;

  return (
    <div>
      <Header
        title={getStringedDate(new Date(createdDate))}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
}

export default Diary;
