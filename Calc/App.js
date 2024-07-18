import "./App.css";
import { useState } from "react";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (total) {
      setPreState("");
      setTotal(false);
      setInput("");
    }

    // Prevent multiple decimal points
    if (e.target.innerText === "." && curState.includes(".")) return;

    // Handle appending numbers correctly
    const newInput = curState + e.target.innerText;
    setCurState(newInput);
    setInput(newInput); // Update input display
  };

  const operatorType = (op) => {
    if (curState === "") return;
    if (preState !== "") {
      equal();
    } else {
      setPreState(curState);
      setCurState("");
      setOperator(op);
    }
  };

  const equal = () => {
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "*":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput(cal);
    setPreState(cal);
    setCurState("");
    setOperator(null);
    setTotal(true);
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    if (preState) {
      setCurState(String((parseFloat(curState) / 100) * parseFloat(preState)));
    } else {
      setCurState(String(parseFloat(curState) / 100));
    }
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
    setOperator(null);
    setTotal(false);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="Screen">{input}</div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn orange" onClick={() => operatorType("/")}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={() => operatorType("*")}>
          *
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={() => operatorType("+")}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={() => operatorType("-")}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn orange" onClick={equal}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
