import React, { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import {
  BackspaceIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { evaluate } from "mathjs";
import { useUIStore } from "../../store/useUIStore";

export const Calculator = () => {
  const { calculatorOpen, setCalculatorOpen } = useUIStore();
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  const calculateAns = useCallback(() => {
    if (!input) return;
    let expression = input.replaceAll("x", "*").replaceAll("÷", "/");
    try {
      const result = evaluate(expression);
      setAnswer(isNaN(result) ? "Invalid Input!!" : result.toString());
    } catch {
      setAnswer("Invalid Input!!");
    }
  }, [input]);

  // Fix: event listener in useEffect with cleanup to prevent memory leak
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        calculateAns();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [calculateAns]);

  const inputHandler = (val: string) => {
    if (answer === "Invalid Input!!") return;
    const base = answer !== "" ? answer : input;
    const next = base + val;
    if (next.length > 14) return;
    setInput(next);
    if (answer !== "") setAnswer("");
  };

  const clearInput = () => {
    setInput("");
    setAnswer("");
  };

  const backspace = () => {
    if (answer !== "") {
      setInput(answer.slice(0, -1));
      setAnswer("");
    } else {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  const onChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  const btnClass =
    "col-span-1 flex cursor-pointer items-center justify-center bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-800 active:bg-emerald-700";

  return (
    <Draggable
      bounds="body"
      defaultPosition={{ x: window.innerWidth / 10, y: window.innerHeight / 18 }}
    >
      <div
        className="absolute z-10 flex h-1/2 w-full lg:h-1/2 lg:w-1/6 flex-row justify-between rounded-sm bg-emerald-950 text-center"
        role="dialog"
        aria-label="Calculator"
      >
        <div className="grid-rows-8 grid h-full w-full text-center">
          {/* Header row */}
          <div className="col-span-full row-span-1 grid grid-cols-4 rounded-sm bg-emerald-950 text-center">
            <div className="col-span-3 rounded-tl-sm bg-emerald-950 text-center outline outline-1 outline-offset-0 outline-emerald-700" />
            <button
              onMouseDown={() => setCalculatorOpen(false)}
              aria-label="Close calculator"
              className={`${btnClass} rounded-tr-sm`}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Display */}
          <div className="col-span-full row-span-1 flex h-full w-full items-center justify-end bg-emerald-900 pr-2 text-xl outline outline-1 outline-offset-0 outline-emerald-700">
            {answer === "" ? (
              <input
                type="text"
                aria-label="Calculator input"
                className="col-span-full row-span-1 flex h-full w-full items-center justify-end bg-emerald-900 text-right text-xl"
                value={input}
                placeholder="0"
                maxLength={12}
                onChange={onChangeTagInput}
                autoComplete="off"
              />
            ) : (
              <div className="flex flex-col w-full pr-2">
                <input
                  type="text"
                  className="bg-emerald-900 text-right text-sm w-full"
                  value={input}
                  disabled
                  aria-hidden="true"
                />
                <input
                  type="text"
                  aria-label="Calculator result"
                  className="bg-emerald-900 text-right text-xl w-full"
                  value={answer}
                  disabled
                />
              </div>
            )}
          </div>

          {/* Row: AC, ⌫, ., % */}
          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            {[["AC", () => clearInput()], [<BackspaceIcon className="h-6 w-6" key="bs" />, () => backspace()], [".", () => inputHandler(".")], ["%", () => inputHandler("%")]].map(
              ([label, action], i) => (
                <button key={i} onMouseDown={action as () => void} className={btnClass} aria-label={typeof label === "string" ? label : "Backspace"}>
                  {label as React.ReactNode}
                </button>
              ),
            )}
          </div>

          {/* Rows: 7-9÷, 4-6x, 1-3-, 0+ */}
          {[
            ["7", "8", "9", "÷"],
            ["4", "5", "6", "x"],
            ["1", "2", "3", "-"],
          ].map((row, ri) => (
            <div key={ri} className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
              {row.map((val) => (
                <button key={val} onMouseDown={() => inputHandler(val)} className={btnClass}>
                  {val}
                </button>
              ))}
            </div>
          ))}

          <div className="col-span-full row-span-1 grid grid-cols-4 bg-emerald-950 text-center">
            <button onMouseDown={() => inputHandler("0")} className={`${btnClass} col-span-3`}>0</button>
            <button onMouseDown={() => inputHandler("+")} className={btnClass}>+</button>
          </div>

          {/* Equals */}
          <div className="col-span-full row-span-1 grid grid-cols-4 rounded-b-sm bg-emerald-950 text-center">
            <button
              onMouseDown={calculateAns}
              id="equalbtn"
              aria-label="Calculate"
              className={`${btnClass} col-span-full rounded-b-sm`}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
