import "./App.css";
import { useState, useEffect, useRef } from "react";

const App = () => {
  return (
    <>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
      <Task5 />
      <Task6 />
      <Task7 />
      <Task8 />
      <Task9 />
      <Task10 />
    </>
  );
};

const Task1 = () => {
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Write something..."
          autoFocus
          className="form__input"
        />
      </form>
    </>
  );
};

const Task2 = () => {
  const [textArr, setTextArr] = useState<string[]>([]); // uzglabajam pievienotos value
  const [textInputValue, setTextInputValue] = useState(""); // paņemam jauno text value
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          inputRef.current && inputRef.current.focus();

          const newTextArr = [...textArr, textInputValue];

          setTextArr(newTextArr);
          setTextInputValue("");
        }}
      >
        <input
          type="text"
          placeholder="Write something..."
          className="form__input"
          required
          ref={inputRef}
          value={textInputValue}
          onChange={(e) => {
            setTextInputValue(e.target.value);
          }}
        />
        <button className="form__button">Submit</button>
      </form>
      <ul>
        {textArr.map((text) => {
          return <li key={text}>{text}</li>;
        })}
      </ul>
    </>
  );
};

const Task3 = () => {
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setButtonState(false);
    }, 5000);
  }, []);

  return (
    <>
      <button className="form__button" disabled={buttonState}>
        POGA
      </button>
    </>
  );
};

const Task4 = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <br />
      <br />
      <button className="form__button" onClick={() => setCounter(counter + 1)}>
        COUNT: {counter}
      </button>
      <div className="count-box">{counter * 2}</div>
    </>
  );
};

const Task5 = () => {
  const [colorBoxArr, setColorBoxArr] = useState<string[]>([]);
  const [newColorValue, setnewColorValue] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const newColorBoxArr = [...colorBoxArr, newColorValue];

          setColorBoxArr(newColorBoxArr);
          setnewColorValue("");
        }}
      >
        <button className="color-add-button">+</button>
        <select
          className="color-select-dropdown"
          id="colors"
          name="colors"
          value={newColorValue}
          onChange={(e) => {
            setnewColorValue(e.target.value);
          }}
        >
          <option value="" disabled>
            select color...
          </option>
          <option value="red">red</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
          <option value="yellow">yellow</option>
          <option value="black">black</option>
          <option value="pink">pink</option>
        </select>
      </form>
      <div className="colored-box-wrapper">
        {colorBoxArr.map((color) => {
          if (color !== "") {
            return (
              <div
                key={Math.random()}
                className="colored-box"
                style={{ backgroundColor: color }}
              ></div>
            );
          }
        })}
      </div>
    </>
  );
};

const Task6 = () => {
  const [counter, setCounter] = useState(0);
  const [textInput, setTextInput] = useState("");

  const handleClick = () => [setCounter(counter + 1)];

  // on first render
  useEffect(() => {
    console.log("FIRST RENDER");
  }, []);

  // on every single render
  useEffect(() => {
    console.log("RENDER");
  }, [counter, textInput]);

  // on count change
  useEffect(() => {
    console.log("CHANGING COUNT");
  }, [counter]);

  // on count change
  useEffect(() => {
    console.log("INPUT CHANGE");
  }, [textInput]);

  return (
    <div className="task-field-wrapper">
      <button className="task-field-button" onClick={handleClick}>
        +
      </button>
      <p>COUNT: {counter}</p>
      <form>
        <input
          className="task-field-input"
          type="text"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />
        <p>{textInput}</p>
      </form>
    </div>
  );
};

const Task7 = () => {
  const [counter, setCounter] = useState(0);
  const [textInput, setTextInput] = useState("");

  const handleClick = () => [setCounter(counter + 1)];

  useEffect(() => {
    setCounter(100);
  }, []);

  // pressing count, font changes += 1
  // https://react.dev/reference/react/useRef#usage Pitfall Do not write or read ref.current during rendering.
  const initialFontSize = 14;
  const fontSize = useRef(initialFontSize);
  useEffect(() => {
    fontSize.current = fontSize.current + 1;
  }, [counter]);

  // changing document tittle
  useEffect(() => {
    document.title = textInput;
  }, [textInput]);

  return (
    <div className="task-field-wrapper">
      <button className="task-field-button" onClick={handleClick}>
        +
      </button>
      <p style={{ fontSize: fontSize.current }}>COUNT: {counter}</p>
      <form>
        <input
          className="task-field-input"
          type="text"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />
        <p>{textInput}</p>
      </form>
    </div>
  );
};

const Task8 = () => {
  const divColor = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (divColor.current) {
      divColor.current.style.backgroundColor = "gold";
    }
  };

  return (
    <div className="task-wrapper">
      <div className="task-div" ref={divColor}></div>
      <button className="task-field-button" onClick={handleClick}>
        Change color
      </button>
    </div>
  );
};

const Task9 = () => {
  const originalDiv = useRef<HTMLDivElement | null>(null)
  const [clonedDivs, setClonedDivs] = useState<HTMLDivElement[]>([])

  const handleDuplicate = () => {
    if (originalDiv.current) {
      const clonedDiv = originalDiv.current
      const newClonedDivArr = [...clonedDivs, clonedDiv]
      setClonedDivs(newClonedDivArr)
    }
  }

  return (
    <div>
      <div className="task-wrapper-2">
        <div className="task-div-2" ref={originalDiv}></div>
        {clonedDivs.map(() => {
          return (
            <div key={Math.random()} className="task-div-2"></div>
          )
        })}
      </div>
      <button className="task-field-button" onClick={handleDuplicate}>
          Clone div
      </button>
    </div>
  )
}

const Task10 = () => {
  const movedDiv = useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    if (movedDiv.current) {
      movedDiv.current.innerHTML = 'esmu stūrī'
      movedDiv.current.style.position = "absolute"
      movedDiv.current.style.top = "5px"
      movedDiv.current.style.right = "5px"
    }
  }

  return (
    <div className="task-wrapper-3">
      <div className="task-div-3" ref={movedDiv}></div>
      <button className="task-field-button-3" onClick={handleClick}>
        Send div to corner
      </button>
    </div>
  )
}

export default App;
