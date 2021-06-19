import React, { useEffect, useState } from "react";
import useReceiveKeyEnter from "./useReceiveKeyEnter";
import { useWindowDimensions } from "./useWindowDimentions";
import abcjs from "abcjs";
import toABC from "./util/toABC";
import "./slide.css";

const keyStyles = {
  height: 300,
  width: 64,
  backgroundColor: "#F5FCFF",
  border: "1px solid black",
};

const keyStylesOn = {
  ...keyStyles,
  backgroundColor: "#adefde",
};

const blackKeyStyles = {
  height: 150,
  width: 32,
  backgroundColor: "black",
  border: "1px solid black",
  marginLeft: -17,
  marginRight: -17,
  zIndex: 1,
};

const blackKeyStylesOn = {
  ...blackKeyStyles,
  backgroundColor: "#aaabcb",
};

const keyLong = {
  position: "fixed" as "fixed",
  bottom: 0,
  transformOrigin: "bottom",
  animationName: "to-long",
  animationDuration: "2s",
  animationFillMode: "forwards",
};

const keyShort = {
  position: "fixed" as "fixed",
  bottom: 0,
  transformOrigin: "bottom",
  animationName: "to-short",
  animationDuration: "2s",
  animationFillMode: "forwards",
};

const WhiteKey: React.FC<{ nowplay: boolean }> = ({ nowplay }) => {
  return <div style={nowplay ? keyStylesOn : keyStyles}></div>;
};

const BlackKey: React.FC<{ nowplay: boolean }> = ({ nowplay }) => {
  return <div style={nowplay ? blackKeyStylesOn : blackKeyStyles}></div>;
};

const PianoMode: React.FC<{ doRemove: boolean }> = ({ doRemove }) => {
  const [noteList, setNoteList] = useState<string>("");

  const windowDimensions = useWindowDimensions();
  const keyNum = windowDimensions.width / 64;
  const [tone, counter] = useReceiveKeyEnter();

  const list = [];

  // どこから有効キーにするか
  const playStartIndex = Math.floor(keyNum / 7 / 2) * 7;
  // どこまで有効キーにするか
  const playEndIndex = playStartIndex + 7;

  //鍵盤作成
  for (let index = 0; index < keyNum; index++) {
    const playable = index >= playStartIndex && index < playEndIndex;
    switch (index % 7) {
      case 0:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "do" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            nowplay={playable && !doRemove ? tone === "#do" : false}
          />
        );
        break;
      case 1:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "re" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            nowplay={playable && !doRemove ? tone === "#re" : false}
          />
        );
        break;
      case 2:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "mi" : false}
          />
        );
        break;
      case 3:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "fa" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            nowplay={playable && !doRemove ? tone === "#fa" : false}
          />
        );
        break;
      case 4:
        list.push(
          <WhiteKey key={index} nowplay={playable ? tone === "so" : false} />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            nowplay={playable && !doRemove ? tone === "#so" : false}
          />
        );
        break;
      case 5:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "ra" : false}
          />
        );
        list.push(
          <BlackKey
            key={index + 0.5}
            nowplay={playable && !doRemove ? tone === "#ra" : false}
          />
        );
        break;
      case 6:
        list.push(
          <WhiteKey
            key={index}
            nowplay={playable && !doRemove ? tone === "shi" : false}
          />
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    var addTone = toABC(tone, counter);

    setNoteList((prevNoteList) => prevNoteList + addTone);
  }, [tone]);
  abcjs.renderAbc("abc", noteList);

  return (
    <div style={doRemove ? keyShort : keyLong}>
      <div id="abc"></div>
      <div style={{ display: "flex" }}>{list}</div>
    </div>
  );
};

export const PianoBase: React.FC = () => {
  const windowDimensions = useWindowDimensions();
  const keyNum = windowDimensions.width / 64;

  const list = [];
  for (let index = 0; index < keyNum; index++) {
    switch (index % 7) {
      case 0:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(<BlackKey key={index + 0.5} nowplay={false} />);
        break;
      case 1:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(<BlackKey key={index + 0.5} nowplay={false} />);
        break;
      case 2:
        list.push(<WhiteKey key={index} nowplay={false} />);
        break;
      case 3:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(<BlackKey key={index + 0.5} nowplay={false} />);
        break;
      case 4:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(<BlackKey key={index + 0.5} nowplay={false} />);
        break;
      case 5:
        list.push(<WhiteKey key={index} nowplay={false} />);
        list.push(<BlackKey key={index + 0.5} nowplay={false} />);
        break;
      case 6:
        list.push(<WhiteKey key={index} nowplay={false} />);
        break;
      default:
        break;
    }
  }
  return (
    <div
      style={{
        display: "flex",
        transform: "scaleY(0.1)",
        position: "fixed" as "fixed",
        bottom: -135,
        zIndex: -1,
      }}
    >
      {list}
    </div>
  );
};

export default PianoMode;
