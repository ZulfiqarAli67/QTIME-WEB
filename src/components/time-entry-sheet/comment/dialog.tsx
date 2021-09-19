import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import SimpleSelect from "../../common/dropdown";

import TextInput from "../../common/TextInput";
import Typography from "@material-ui/core/Typography";

interface CommentDialogProps {
  open: boolean;
  onClose: () => void;
  onOkPressed: (comment: CommentScreenObject) => void;
  employeeComment: string;
  rejectedCodes: any[];
  selectedReason?: any;
  isFrom: "TimeSheet" | "ApproveAttachment" | "ApproveReject";
  isApprover1: boolean;
  isApprover2: boolean;
  selectedId?: string;
  isCheckBoxChecked?: "approver1" | "approver2" | "rejected";
  selectedObject?: CommentScreenObject;
}

export interface CommentScreenObject {
  employeeComment: string;
  approver1Comment: string;
  approver2Comment: string;
  reasonCode: string;
  selectedId: string;
  approver: "Approver1" | "Approver2" | undefined;
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
      marginTop: 5,
      // height: 30,
      // padding: 0,
    },
    rejectInput: {
      // width : '100%',
      // height : 30,
      // borderRadius: 0,
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
  })
);

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 32,
      borderRadius: 0,
      marginTop: 5,
    },
  })
);

const useStylesTextArea = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
      marginTop: 16,
    },
  })
);

export default function CommentDialog(props: CommentDialogProps) {
  const classes = useStyles();
  const inputStyles = useStylesReddit();
  const textAreaStyles = useStylesTextArea();
  const [employeeComments, setemployeeComments] = useState(
    props.employeeComment
  );
  const [approver1Comment, setApprover1Comment] = useState("");

  const [approver2Comment, setApprover2Comment] = useState("");

  const [approver1Reason, setApprover1Reason] = useState({
    key: "0",
    value: "",
  });

  const [approver2Reason, setApprover2Reason] = useState({
    key: "0",
    value: "",
  });
  const [rejectedReasons, setRejectedReasons] = useState(props.rejectedCodes);
  const [selectedRasonCode, setSelectedRasonCode] = useState(
    props.selectedReason
  );
  const [isEmployeeCommentDisabled, setIsEmployeeCommentDisabled] =
    useState(false);
  const [isApprover1CommenttDisabled, setIsApprover1CommenttDisabled] =
    useState(true);
  const [isApprover1RejectDisabled, setIsApprover1RejectDisabled] =
    useState(true);
  const [isApprover2RejectDisabled, setIsApprover2RejectDisabled] =
    useState(true);
  const [isApprover2CommenttDisabled, setIsApprover2CommenttDisabled] =
    useState(true);
  useEffect(() => {
    setemployeeComments(props.employeeComment);

    const mappedRejectedCodes = props.rejectedCodes.map((codes) => {
      return {
        key: codes.key,
        value: codes.key,
      };
    });

    setRejectedReasons(mappedRejectedCodes);
    setValues(props.selectedObject);
    switch (props.isFrom) {
      case "TimeSheet":
        setIsEmployeeCommentDisabled(false);
        setIsApprover1CommenttDisabled(true);
        setIsApprover1RejectDisabled(true);
        setIsApprover2RejectDisabled(true);
        setIsApprover2CommenttDisabled(true);
        break;
      case "ApproveAttachment":
        setIsEmployeeCommentDisabled(true);
        setIsApprover1CommenttDisabled(true);
        setIsApprover1RejectDisabled(true);
        setIsApprover2RejectDisabled(true);
        setIsApprover2CommenttDisabled(true);
        if (props.isApprover1) {
          setIsApprover1CommenttDisabled(false);
        }
        if (props.isApprover2) {
          setIsApprover2CommenttDisabled(false);
        }

        break;
      case "ApproveReject":
        setIsEmployeeCommentDisabled(true);
        setIsApprover1CommenttDisabled(true);
        setIsApprover1RejectDisabled(true);
        setIsApprover2RejectDisabled(true);
        setIsApprover2CommenttDisabled(true);

        switch (props.isCheckBoxChecked) {
          case "approver1":
            setIsApprover1CommenttDisabled(false);
            break;
          case "approver2":
            setIsApprover2CommenttDisabled(false);
            break;
          case "rejected":
            if (props.isApprover1) {
              setIsApprover1RejectDisabled(false);
            }
            if (props.isApprover2) {
              setIsApprover2RejectDisabled(false);
            }
            break;
        }
        break;
    }
  }, [props]);

  const setValues = (commentObj: CommentScreenObject | undefined) => {
    if (commentObj) {
      setemployeeComments(commentObj.employeeComment);
      setApprover1Comment(commentObj.approver1Comment);
      setApprover2Comment(commentObj.approver2Comment);

      const filtered = props.rejectedCodes.filter(
        (reasons) => reasons.key === commentObj.reasonCode
      );

      if (filtered.length > 0) {
        commentObj.approver === "Approver1"
          ? setApprover1Reason({
              key: filtered[0].key,
              value: filtered[0].value,
            })
          : setApprover2Reason({
              key: filtered[0].key,
              value: filtered[0].value,
            });
      }

      setSelectedRasonCode(commentObj.reasonCode);
    }
  };
  const handleClickOk = () => {
    const commentObject: CommentScreenObject = {
      approver1Comment: approver1Comment,
      reasonCode:
        approver1Reason.value.length > 0
          ? approver1Reason.key == '0'
            ? ""
            : approver1Reason.key
          : approver2Reason.key == '0'
          ? ""
          : approver2Reason.key,
      employeeComment: employeeComments,
      selectedId: props.selectedId == undefined ? "" : props.selectedId,
      approver2Comment: approver2Comment,
      approver: props.isApprover1
        ? "Approver1"
        : props.isApprover2
        ? "Approver2"
        : undefined,
    };
    props.onOkPressed(commentObject);
    resetState();
    props.onClose();
  };

  const resetState = () => {
    setemployeeComments("");
    setApprover1Comment("");
    setApprover2Comment("");
    setApprover1Reason({ key: "0", value: "" });
    setApprover2Reason({ key: "0", value: "" });
    setRejectedReasons([]);
    setSelectedRasonCode("");
    setIsEmployeeCommentDisabled(false);
    setIsApprover1CommenttDisabled(true);
    setIsApprover1RejectDisabled(true);
    setIsApprover2RejectDisabled(true);
    setIsApprover2CommenttDisabled(true);
  };

  const setApproverOneRejectedReason = (val: string) => {
    const filtered = props.rejectedCodes.filter(
      (reasons) => reasons.key === val
    );

    if (filtered.length > 0) {
      const selectedVal = { key: filtered[0].key, value: filtered[0].value };
      setApprover1Reason(selectedVal);
    }
  };
  const setApproverTwoRejectedReason = (val: string) => {
    const filtered = props.rejectedCodes.filter(
      (reasons) => reasons.key === val
    );

    if (filtered.length > 0) {
      const selectedVal = { key: filtered[0].key, value: filtered[0].value };
      setApprover2Reason(selectedVal);
    }
  };

  const setRelavantData = () => {
    const reason = props.rejectedCodes;
  };
  const getApproverTwoRejectedReason = () => {
    return (
      <SimpleSelect
        elements={rejectedReasons}
        onSelect={setApproverTwoRejectedReason}
        selectedVal={approver2Reason.key}
        isDisabled={isApprover2RejectDisabled}
        label={"Rejected reason"}
        styles={{
          formControlClass: classes.rejectSelect,
          inputClass: classes.input,
        }}
      ></SimpleSelect>
    );
  };
  const getApproverOneRejectedReason = () => {
    return (
      <SimpleSelect
        elements={rejectedReasons}
        onSelect={setApproverOneRejectedReason}
        selectedVal={approver1Reason.key}
        isDisabled={isApprover1RejectDisabled}
        label={"Rejected reason"}
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
        <DialogTitle id="form-dialog-title">Timesheet comments</DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <div>
                  <InputLabel>Employee comments</InputLabel>
                  <TextInput
                    rows={4}
                    value={employeeComments}
                    // label={"Employee comments"}
                    events={{
                      onChange: (data: any) => {
                        setemployeeComments(data);
                      },
                    }}
                    classes={{ inputProps: textAreaStyles }}
                    type={"textarea"}
                    isDisabled={isEmployeeCommentDisabled}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <InputLabel>Approver 1 comments</InputLabel>
                  <TextInput
                    rows={4}
                    value={approver1Comment}
                    // label={"Approver 1 comments"}
                    events={{
                      onChange: (data: any) => {
                        setApprover1Comment(data);
                      },
                    }}
                    classes={{ inputProps: textAreaStyles }}
                    type={"textarea"}
                    isDisabled={isApprover1CommenttDisabled}
                  />
                  <Grid container>
                    <Grid item xs={4}>
                      {getApproverOneRejectedReason()}
                    </Grid>
                    <Grid item xs={8}>
                      <TextInput
                        value={approver1Reason.value}
                        events={{
                          onChange: (data: any) => console.log(data),
                        }}
                        classes={{
                          useStyles: classes.rejectInput,
                          inputProps: inputStyles,
                        }}
                        isDisabled={true}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div>
                  <InputLabel>Approver 2 comments</InputLabel>
                  <TextInput
                    rows={4}
                    value={approver2Comment}
                    // label={"Approver 2 comments"}
                    events={{
                      onChange: (data: any) => {
                        setApprover2Comment(data);
                      },
                    }}
                    classes={{ inputProps: textAreaStyles }}
                    type={"textarea"}
                    isDisabled={isApprover2CommenttDisabled}
                  />
                  <Grid container>
                    <Grid item xs={4}>
                      {getApproverTwoRejectedReason()}
                    </Grid>
                    <Grid item xs={8}>
                      <TextInput
                        value={approver2Reason.value}
                        events={{
                          onChange: (data: any) => console.log(data),
                        }}
                        classes={{
                          useStyles: classes.rejectInput,
                          inputProps: inputStyles,
                        }}
                        isDisabled={true}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
          {/* <div style={{height : "500px"}}></div> */}
        </DialogContent>
        <DialogActions>
          <Typography className={classes.actionText}>
            {"* - All comments must be in English"}
          </Typography>
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
