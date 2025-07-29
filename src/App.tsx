import {
  InputEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./App.module.css";
import DeleteIcon from "./components/DeleteIcon";
import { LoadingIndicator } from "./components/LoadingIndicator";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  //   focus on recordInput
  const focus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleKey: KeyboardEventHandler = (e) => {
    if (e.code == "Enter") {
      const newValue = inputRef.current.value;
      if (newValue === "") return;
      setRecords((prev) => [...prev, newValue]);
      inputRef.current.value = "";
    }
  };

  const reset = () => {
    setRecords([]);
    inputRef.current.value = "";
  };

  const exportFile = async () => {
    if (records.length <= 0) return;
    if (loading) return;
    setLoading(true);
    await window.electronAPI.saveFile(records);
    setLoading(false);
  };

  const deleteRecord = (targetIndex: number) => {
    setRecords((prev) => {
      return prev.filter((_, index) => {
        return index !== targetIndex;
      });
    });
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
        />
        <div className={styles.recordPanel}>
          {records.map((record, index) => {
            return (
              <div key={index} className={styles.recordPanelItem}>
                <button
                  onClick={() => {
                    deleteRecord(index);
                  }}
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
        <button onClick={reset}>Reset</button>
        <button id="exportBtn" onClick={exportFile} disabled={loading}>
          Export
        </button>
      </div>
    </div>
  );
}

export default App;
