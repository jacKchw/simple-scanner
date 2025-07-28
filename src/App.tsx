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
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  //   focus on idInput
  const focus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleKey: KeyboardEventHandler = (e) => {
    if (e.code == "Enter") {
      const newValue = inputRef.current.value;
      if (newValue === "") return;
      setIds((prev) => [...prev, newValue]);
      inputRef.current.value = "";
    }
  };

  const reset = () => {
    setIds([]);
    inputRef.current.value = "";
  };

  const exportFile = async () => {
    if (ids.length <= 0) return;
    setLoading(true);
    await window.electronAPI.saveFile(ids);
    setLoading(false);
  };

  const deleteId = (targetIndex: number) => {
    setIds((prev) => {
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
      <div className={styles.idSection}>
        <input
          className={styles.idInput}
          id="idInput"
          type="text"
          ref={inputRef}
          autoFocus
          onKeyDown={handleKey}
        />
        <div className={styles.idPanel}>
          {ids.map((id, index) => {
            return (
              <div key={index} className={styles.idPanelItem}>
                <button
                  onClick={() => {
                    deleteId(index);
                  }}
                >
                  <DeleteIcon />
                </button>
                <div>{id}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.sideSection}>
        <div>Amount: {ids.length}</div>
        <button onClick={reset}>Reset</button>
        <button id="exportBtn" onClick={exportFile}>
          Export
        </button>
      </div>
    </div>
  );
}

export default App;
