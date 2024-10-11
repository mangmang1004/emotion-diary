import { replace, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";

import useDiary from "../hooks/useDiary";

function Edit() {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    //윈도우에 팝업이 뜨는 창
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구 하기 않아요.")) {
      //일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true }); //뒤로 가기 방지
    }
  };

  return (
    <div>
      <Header
        leftChild={
          <Button text={"< 뒤로가기"} onClick={() => nav(-1, replace(true))} />
        }
        title={"일기 수정하기"}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      {/* curDiaryItem이 null이 아닐 때만 Editor 렌더링 */}
      {curDiaryItem && <Editor initData={curDiaryItem} onSubmit={onSubmit} />}
    </div>
  );
}

export default Edit;
