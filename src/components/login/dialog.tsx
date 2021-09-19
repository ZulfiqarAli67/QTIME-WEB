import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SignIn from "./login_form";
import "./landingScreen.css";
interface LoginDialog {
  open: boolean;
  onClose: () => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    input: {
      // width : '100%'
    },
    rejectSelect: {
      height: 30,
      padding: 0,
    },
    rejectInput: {
      // width : '100%',
      // height : 30,
      borderRadius: 0,
    },
    actionText: {
      flex: "0 0 auto",
      display: "flex",
      padding: 8,
      "align-items": "center",
      "justify-content": "flex-start",
    },
    headerTitle: {
      backgroundColor: "#606060",
      color: "#ffff",
    },
  })
);

export default function LoginDialog(props: LoginDialog) {
  const classes = useStyles();

  const { open, onClose } = props;
  const onLogin = () => {};
  return (
    <div className="content">
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        // maxWidth="sm"
        aria-labelledby="form-dialog-title"
        open={open}
        onClose={onClose}
      >
        <DialogContent dividers>
          <SignIn onCancel={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
