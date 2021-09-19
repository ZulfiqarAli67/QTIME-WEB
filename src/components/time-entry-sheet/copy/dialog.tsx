import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SimpleSelect from "../../common/dropdown";
import CodeContent from "../../time-entry-code/code_dialog_content";

interface CopyDialogProps {
  open: boolean;
  onClose: () => void;
  onOkPressed: (date: string) => void;
  data: any;
  todayDate: any;
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
    primaryRow: {
      backgroundColor: "#80d8ff",
    },
    secondryRow: {
      backgroundColor: "#f5f5f5",
    },
    headerTitle:{
      backgroundColor: "#606060",
      color: "#ffff",
    }
  })
);


export default function CopyDialog(props: CopyDialogProps) {
  const classes = useStyles();

  const { data } = props;
  const [copyDate, setCopyDate] = useState(props.todayDate);

  useEffect(() => {
    setCurrentDate();
  }, [props]);

  const setCurrentDate = () => {
    const currentWeek = data.filter((element: any) => {
      return element.CurPayDate == 1;
    });
    if (currentWeek.length > 0) {
      setCopyDate(currentWeek[0].WeekNo);
    }
  };
  const handleClickOk = () => {
    props.onOkPressed(copyDate);
    props.onClose();
  };

  const setLocation = (val: string) => {
    setCopyDate(val);
  };

  const getSelectedPeriod = () => {
    return (
      <SimpleSelect
        elements={data}
        onSelect={setLocation}
        selectedVal={copyDate}
        label={"Period"}
        styles={{
          formControlClass: classes.rejectSelect,
          inputClass: classes.input,
        }}
      ></SimpleSelect>
    );
  };

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        // maxWidth="sm"
        aria-labelledby="form-dialog-title"
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle id="form-dialog-title" className={classes.headerTitle}>Copy Timesheet</DialogTitle>
        <DialogContent dividers>
          <CodeContent
            text="Period Ending"
            data={data}
            isPrimary={true}
            onChange={setLocation}
            currentVal={copyDate}
            prop={""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOk} color="primary">
            OK
          </Button>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
