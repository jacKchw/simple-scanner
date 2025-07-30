import AlertIcon from "../AlertIcon";
import DeleteIcon from "../DeleteIcon";
import styles from "./styles.module.css";

interface ClearAllDialogProp {
  onClickConfirm: () => void;
  onClickBack: () => void;
}

const ClearAllDialog = ({
  onClickConfirm,
  onClickBack,
}: ClearAllDialogProp) => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <AlertIcon />
        Confirm to clear ALL records?
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onClickConfirm}>
            <DeleteIcon />
            Confirm
          </button>
          <button className={styles.backBtn} onClick={onClickBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default ClearAllDialog;
