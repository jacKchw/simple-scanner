import {
  KeyboardEventHandler,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./App.module.css";
import DeleteIcon from "./components/DeleteIcon";
import { LoadingIndicator } from "./components/LoadingIndicator";

type AddRecordAction = {
  type: "add";
  value: string;
};

type DeleteRecordAction = {
  type: "delete";
  index: number;
};
type ClearAllRecordAction = {
  type: "clearAll";
};

type RecordAction = AddRecordAction | DeleteRecordAction | ClearAllRecordAction;

const recordReducer = (state: string[], action: RecordAction): string[] => {
  let newRecords: string[] = [];
  switch (action.type) {
    case "add":
      newRecords = [...state, action.value];
      break;
    case "delete":
      newRecords = state.filter((_, index) => {
        return index !== action.index;
      });
      break;
  }

  const recordJson = JSON.stringify(newRecords);
  localStorage.setItem("records", recordJson);
  return newRecords;
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [records, recordsDispatch] = useReducer<
    string[],
    string[],
    [RecordAction]
  >(recordReducer, [], () => {
    const recordJson = localStorage.getItem("records");
    const prev = JSON.parse(recordJson);
    if (prev) return prev;
    return [];
  });
  const [loading, setLoading] = useState(false);

  //   focus on recordInput
  const focus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleKey: KeyboardEventHandler = (e) => {
    if (loading) return;
    if (e.code == "Enter") {
      const newValue = inputRef.current.value;
      if (newValue === "") return;
      recordsDispatch({ type: "add", value: newValue });
      inputRef.current.value = "";
    }
  };

  const exportFile = async () => {
    if (records.length <= 0) return;
    if (loading) return;
    setLoading(true);
    await window.electronAPI.saveFile(records);
    setLoading(false);
  };

  useEffect(() => {
    focus();
  }, []);

  return (
    <div className={styles.container} onClick={focus} onMouseDown={focus}>
      {loading && <LoadingIndicator />}
      <div className={styles.recordSection}>
        <input
          className={styles.recordInput}
          id="recordInput"
          type="text"
          ref={inputRef}
          autoFocus
          onKeyDown={handleKey}
          disabled={loading}
        />
        <div className={styles.recordPanel}>
          {records.map((record, index) => {
            return (
              <div key={index} className={styles.recordPanelItem}>
                <button
                  onClick={() => {
                    recordsDispatch({ type: "delete", index: index });
                  }}
                  disabled={loading}
                >
                  <DeleteIcon />
                </button>
                <div>{record}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.sideSection}>
        <div>Amount: {records.length}</div>
        <button
          onClick={() => {
            recordsDispatch({ type: "clearAll" });
            inputRef.current.value = "";
          }}
        >
          Reset
        </button>
        <button id="exportBtn" onClick={exportFile} disabled={loading}>
          Export
        </button>
      </div>
    </div>
  );
}

export default App;
