import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  BackspaceIcon,
  DivideIcon,
  EqualsIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { evaluate } from "mathjs";

export const Calculator = ({ setCalculatorOpen }) => {
  const [input, setInput] = useState("");
  const [inputString, setInputString] = useState("");
  const [latestInput, setLatestInput] = useState("");
  const [answer, setAnswer] = useState("");
  const closeCalculator = () => {
    setCalculatorOpen(false);
  };

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("equalbtn").click();
    }
  });

  const onChangeTagInput = (e) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  //input
  const inputHandler = (event) => {
    if (answer === "Invalid Input!!") return;
    let val = event.target.innerText;

    let str = input + val;
    if (str.length > 14) return;

    if (answer !== "") {
      setInput(answer + val);
      setAnswer("");
    } else setInput(str);
  };

  //Clear screen
  const clearInput = () => {
    setInput("");
    setAnswer("");
  };

  // calculate final answer
  const calculateAns = () => {
    if (input === "") return;
    let result = 0;
    let finalexpression = input;

    finalexpression = finalexpression.replaceAll("x", "*");
    finalexpression = finalexpression.replaceAll("÷", "/");

    try {
      result = evaluate(finalexpression); //mathjs
    } catch (error) {
      result = error.message === "Invalid Input!!"; //error.message;
    }
    isNaN(result) ? setAnswer(result.toString()) : setAnswer(result.toString());
  };

  // remove last character
  const backspace = () => {
    if (answer !== "") {
      setInput(answer.toString().slice(0, -1));
      setAnswer("");
    } else setInput((prev) => prev.slice(0, -1));
  };

  return (
    <Draggable
      bounds="body"
      defaultPosition={{
        x: window.innerWidth / 10,
        y: window.innerHeight / 18,
      }}
    >
      <div className="absolute z-10 flex h-1/2 w-1/6 flex-row justify-between rounded-sm bg-emerald-950 text-center">
        <div className="grid-rows-7 grid h-full w-full text-center">
          <div className="col-span-full row-span-1 grid grid-cols-4 rounded-sm bg-emerald-950 text-center">
            <div className="col-span-3 rounded-tl-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700"></div>
            <button
              onMouseDown={closeCalculator}
              className="col-span-1 flex cursor-pointer items-center justify-center rounded-tr-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="col-span-full row-span-1 flex h-full w-full grid-cols-4 items-center justify-end bg-emerald-900 pr-2 text-xl outline outline-1 outline-offset-0 outline-emerald-700">
            {answer === "" ? (
              <input
                type="text"
                name="input"
                className="col-span-full row-span-1 flex h-full w-full grid-cols-4 items-center justify-end bg-emerald-900 text-right text-xl"
                value={input}
                placeholder="0"
                maxLength={12}
                // disabled
                onChange={onChangeTagInput}
                autoComplete="off"
              />
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-end pb-1.5">
                  <input
                    type="text"
                    name="input"
                    className="bg-emerald-900 pr-2 text-right text-sm"
                    value={input}
                    placeholder="0"
                    maxLength={12}
                    disabled
                  />
                </div>
                <div className="flex flex-row items-center justify-end">
                  <input
                    type="text"
                    name="value"
                    className="bg-emerald-900 pr-2 text-right text-xl"
                    value={answer}
                    disabled
                  />
                </div>
              </div>
            )}
          </div>

          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <button
              onMouseDown={clearInput}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              AC
            </button>
            <button
              onMouseDown={backspace}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              <BackspaceIcon className="h-6 w-6" />
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              .
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              %
            </button>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              7
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              8
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              9
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              ÷
            </button>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              4
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              5
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              6
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              x
            </button>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              1
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              2
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              3
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              -
            </button>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <button
              onMouseDown={inputHandler}
              className="col-span-3 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              0
            </button>
            <button
              onMouseDown={inputHandler}
              className="col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              +
            </button>
          </div>
          <div className="col-span-full row-span-1 grid grid-cols-4 rounded-b-sm bg-emerald-950 text-center">
            <button
              onMouseDown={calculateAns}
              id="equalbtn"
              className="col-span-full flex cursor-pointer items-center justify-center rounded-b-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
