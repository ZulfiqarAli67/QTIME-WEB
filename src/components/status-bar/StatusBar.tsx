import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./StatusBar.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface StatusBarProps {
  onNewBtnClick: any;
  onEditClick: any;
  onDeleteClick: any;
  onSaveClick: any;
  onCommentClick: any;
  onCopyClick: any;
  onSubmitClicked: any;
  submittedStatus: any;
  submitBtnCaption: number;
  newBtnCaption: string;
  onCloseClick: any;
}
export default function StatusBar(props: StatusBarProps) {
  const classes = useStyles();
  const [isNewDisabled, setIsNewDisabled] = useState(true);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isCopyDisabled, setIsCopyDisabled] = useState(true);
  const [isPrintDisabled, setIsPrintDisabled] = useState(true);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isCommentDisabled, setIsCommentDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (props) {
      if (props.submitBtnCaption) {
        switch (props.submitBtnCaption) {
          case 1:
          case 2:
            setIsNewDisabled(false);
            setIsEditDisabled(false);
            setIsDeleteDisabled(false);
            setIsPrintDisabled(false);
            setIsSaveDisabled(false);
            setIsCommentDisabled(false);
            setIsSubmitDisabled(false);
            setIsCopyDisabled(false);
            break;
          case 3:
          case 4:
            setIsCommentDisabled(false);
            setIsPrintDisabled(false);
            setIsSubmitDisabled(false);
            setIsNewDisabled(true);
            setIsEditDisabled(true);
            setIsDeleteDisabled(true);
            setIsSaveDisabled(true);
            setIsCopyDisabled(true);

            break;
          case 5:
          case 6:
            setIsPrintDisabled(false);
            setIsCommentDisabled(false);
            setIsSubmitDisabled(true);
            setIsNewDisabled(true);
            setIsEditDisabled(true);
            setIsDeleteDisabled(true);
            setIsSaveDisabled(true);
            setIsCopyDisabled(true);
            break;
          case -100:
            setIsNewDisabled(false);
            setIsEditDisabled(false);
            setIsDeleteDisabled(false);
            setIsPrintDisabled(false);
            setIsSaveDisabled(false);
            setIsCommentDisabled(false);
            setIsSubmitDisabled(false);
            setIsCopyDisabled(false);
            break;
        }
      }
    }
  }, [props]);
  let submittedStatus = "Not Submitted";
  let submitBtnCaption = "Submit";

  if (props.submittedStatus && props.submittedStatus.length > 0) {
    submittedStatus = props.submittedStatus;
  }

  if (props.submitBtnCaption) {
    switch (props.submitBtnCaption) {
      case 1:
        submitBtnCaption = "Submit";
        break;
      case 2:
        submitBtnCaption = "Rejected and Resubmit";
        break;
      case 3:
        submitBtnCaption = "Un Submit";
        break;
      case 4:
        submitBtnCaption = "Un Submit";
        break;
      case 5:
        submitBtnCaption = " Approved Lvl1";
        break;
      case 6:
        submitBtnCaption = "Approved Lvl2";
        break;
      case -100:
        submittedStatus = "Not Submitted"; //
        submitBtnCaption = "Submit";
        break;
    }
  }

  return (
    <div className="statusBar">
      <div className="statusBar-section1">
        <Button
          variant="outlined"
          className={classes.margin}
          disabled={isNewDisabled}
          onClick={props.onNewBtnClick}
        >
          {props.newBtnCaption}
        </Button>

        {!isEditDisabled && (
          <button className="btn-edit">
            <i className="btnEdit" onClick={props.onEditClick}></i>
          </button>
        )}

        {!isDeleteDisabled && (
          <button className="btn-remove">
            <i className="btnRemove" onClick={props.onDeleteClick}></i>
          </button>
        )}
        {!isSaveDisabled && (
          <button className="btn-save">
            <i className="btnSave" onClick={props.onSaveClick}></i>
          </button>
        )}
        {!isCommentDisabled && (
          <button className="btn-comment">
            <i className="btnComment" onClick={props.onCommentClick}></i>
          </button>
        )}
        {!isCopyDisabled && (
          <button className="btn-copy">
            <i className="btnCopy" onClick={props.onCopyClick}></i>
          </button>
        )}

        <button className="btn-Close" disabled={false}>
          <i className="btnClose" onClick={props.onCloseClick}></i>
        </button>
      </div>
      <div className="statusBar-section2">
        <Button
          size="small"
          variant="outlined"
          className={classes.margin}
          disabled={isSubmitDisabled}
          onClick={props.onSubmitClicked}
        >
          {submitBtnCaption}
        </Button>
        <label className="lblStatus">Status:</label>
        <label className="lblStatusVal">{submittedStatus}</label>
      </div>
    </div>
  );
}
