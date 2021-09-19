import CodeDialog from "../time-entry-code/code_dialog";
import DataTable from "../common/DataTable";
import CodeEntryWeek from "../time-rentry-week/index";
import StatusBar from "../status-bar/StatusBar";
import swal from "sweetalert";
import * as constantClass from "../Constants/Constants";

import {
  GridCellValue,
  GridColDef,
  GridEditCellPropsParams,
  GridEditRowsModel,
  useGridApiRef,
} from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import {
  TimeEntryCode,
  getEmptyHours,
  getNewCode,
  TimeEntryDataTable,
  DropdownStructure,
  Day,
} from "../time-entry-sheet/data";
import { Api, ResponseDTO } from "../../utils/api/api";
import { FTmpT, TimeSheetDTO } from "../../utils/api/Models";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CommentDialog, {
  CommentScreenObject,
} from "../time-entry-sheet/comment/dialog";
import CopyDialog from "../time-entry-sheet/copy/dialog";
import {
  timeSheetColumns,
  timeSheetColumnstest,
  totalColumns,
} from "../time-entry-sheet/Columns/timeSheetColumns";
import { useLoader } from "../../contexts/use-loader";
import useFetch from "../../contexts/use-effect";
import "./timesheet.css";

interface ITimeSheetProps {
  onCloseClicked: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);
const Timesheet = (props: ITimeSheetProps) => {
  const classes = useStyles();
  const { showLoader, hideLoader } = useLoader();
  const { qTimeSaveFn, copyTimeSheet, getEndingWeek, getTimeSheetData } =
    useFetch();

  var timeSheetref = useGridApiRef();
  var totalTimeSheetRef = useGridApiRef();
  const [timeSheetDataSet, setTimeSheetDataSet] =
    React.useState<TimeSheetDTO>();
  const [rows, setRows] = React.useState<TimeEntryDataTable[]>([]);
  const [open, setOpen] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [isDataTableLoading, setIsDataTableLoading] = useState(false);
  const [isDataTableEditable, setIsDataTableEditable] = useState(false);

  const [openCopyDialog, setOpenCopyDialog] = useState(false);
  const [timeSheetHeader, updateTimeSheetHeader] =
    useState<GridColDef[]>(timeSheetColumns);
  const [totalTimeSheetRecords, setTotalTimeSheetRecords] = useState<any[]>([]);
  const [footerMessage, setFooterMessage] = useState("");
  const [selectionRowIndex, setselectionRowIndex] = useState<any[]>([]);
  const [projectCode, setProjectCode] = useState(getNewCode());
  const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>(
    {}
  );
  const [editTotalRowsModel, setEditTotalRowsModel] =
    React.useState<GridEditRowsModel>({});
  const [submitBtnCaption, setsubmitBtnCaption] = useState(1);
  const [submittedStatus, setsubmittedStatus] = useState("");
  const [employeeComment, setEmployeeComment] = useState("");
  const [copyTimeSheetPayDateData, setCopyTimeSheetPayDateData] = useState<
    DropdownStructure[]
  >([]);
  const [periods, setPeriods] = useState([]);
  const [updatedField, setUpdatedField] = useState("");
  const [selectedTimeSheetPayDate, setSelectedTimeSheetPayDate] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [newDisplayBtnCaption, setNewDisplayBtnCaption] = useState("Display");
  const [commentObject, setCommentObject] = useState<CommentScreenObject>({
        employeeComment: "",
        approver1Comment: "",
        approver2Comment: "",
        reasonCode: "",
        selectedId: "",
        approver: undefined,
  });

  useEffect(() => {
    if (updatedField.length > 0) {
      setUpdatedField("");
      const total = calculateColumnTotal(rows, updatedField);
      if (totalTimeSheetRecords.length > 0) {
        if (total.includes(".")) {
          totalTimeSheetRecords[0][updatedField] = total;
        } else {
          totalTimeSheetRecords[0][updatedField] = total + ".0";
        }
        const rowTotal = calculateTotalDataTableRow(totalTimeSheetRecords);
        totalTimeSheetRecords[0]["total"] = rowTotal;
        setTotalTimeSheetRecords([...totalTimeSheetRecords]);
      }
    }
  }, [updatedField]);

  const calculateTotalDataTableRow = (totaldtRecords: any) => {
    if (totaldtRecords.length > 0) {
      const total = calculateRowTotal(totaldtRecords[0]);
      return total;
    }
  };
  const handleEmployeeChange = (params: any) => {
    const employeeId = params.target.value.split("-")[0];
    setSelectedEmployeeId(employeeId);
    setNewDisplayBtnCaption("Display");
    setRows([]);
    setTotalTimeSheetRecords([]);
    setsubmitBtnCaption(-100);
  };
  const handleWeekObjectChange = async (obj: any, val: any) => {
    //let loggedInId = localStorage.getItem(constantClass.ID);
    //if (loggedInId) {
    //  setSelectedEmployeeId(loggedInId);
    //}
    setNewDisplayBtnCaption("Display");
    setsubmitBtnCaption(-100);
    setRows([]);
    setTotalTimeSheetRecords([]);
    const payDate = obj[val].PayDate.split("T")[0];
    let selectedDateObj = new Date(payDate);
    selectedDateObj.setDate(selectedDateObj.getDate() - 6);
    timeSheetColumns[11].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    timeSheetColumns[12].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    timeSheetColumns[13].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    timeSheetColumns[14].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    timeSheetColumns[15].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    timeSheetColumns[16].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    selectedDateObj.setDate(selectedDateObj.getDate() + 1);
    timeSheetColumns[17].headerName =
      selectedDateObj.toDateString().split(" ")[2] +
      " " +
      selectedDateObj.toDateString().split(" ")[1];
    let updatedTimesheetObj = [...timeSheetColumns];
    updateTimeSheetHeader(updatedTimesheetObj);
    setSelectedTimeSheetPayDate(payDate);
    const payDateList: any = await getPeriods();
    if (payDateList && payDateList.length > 0) {
      const filteredWeeks = payDateList.map((element: any) => {
        return {
          key: element.WeekNo,
          value: element.PayDate.split("T")[0],
        };
      });
      setPeriods(payDateList);
      setCopyTimeSheetPayDateData(filteredWeeks);
    }
  };

  const setLoader = (show: boolean) => {
    show ? showLoader() : hideLoader();
  };

  const handleClickOpen = () => {
    switch (newDisplayBtnCaption) {
      case "New":
        setOpen(!open);
        setProjectCode(getNewCode());
        break;
      case "Display":
        setTimeSheetData(selectedTimeSheetPayDate, true);
        setNewDisplayBtnCaption("New");
        break;
    }
  };
  const handleSaveClicked = () => {
    saveTimeSheet();
  };
  const handleSubmitClick = async () => {
    let updatedTimeSheetDataSet: any = timeSheetDataSet;
    if (updatedTimeSheetDataSet) {
      showLoader();
      let newRow: FTmpT = updatedTimeSheetDataSet.fTmpTs[0];
      let updatedObject: FTmpT[] = mapTimeSheetDataBeforeSave(rows, newRow);
      updatedTimeSheetDataSet.fTmpTs = updatedObject;

      switch (updatedTimeSheetDataSet.fTshSum[0].STATUS) {
        case 1:
          updatedTimeSheetDataSet.fTshSum[0].STATUS = 4;
          break;
        case 4:
          updatedTimeSheetDataSet.fTshSum[0].STATUS = 1;
          break;
        case 2:
          updatedTimeSheetDataSet.fTshSum[0].STATUS = 3;
          break;
        case 3:
          updatedTimeSheetDataSet.fTshSum[0].STATUS = 1;
          break;
      }

      const result: ResponseDTO = await qTimeSaveFn(
        "1",
        updatedTimeSheetDataSet
      );
      hideLoader();
        if (result.code === 200) {
            const data = result.data;
            if (data) {
                if (data.response) {
                    if (data.response.data.ExceptionMessage) {
                        swal("QTIME", data.response.data.ExceptionMessage, "error");
                    }
                } else {
                    if (data.includes("ERROR")) {
                        swal("QTIME", data.split("ERROR -")[1], "error");
                    } else {
                        swal(
                            "QTIME",
                            "Timesheet has been saved successfully",
                            "success"
                        ).then((value) => {
                            setIsDataTableLoading(true);
                            setTimeSheetData(selectedTimeSheetPayDate, false);
                            setIsDataTableLoading(false);
                        });
                    }
                }
            }
        }
        else {
            swal("QTIME", result.data.ExceptionMessage, "error");
        }
    }
  };
  // const handleSubmitClick = async () => {
  //   let updatedTimeSheetDataSet: any = timeSheetDataSet;
  //   if (updatedTimeSheetDataSet) {
  //     let newRow: FTmpT = updatedTimeSheetDataSet.fTmpTs[0];
  //     let updatedObject: FTmpT[] = mapTimeSheetDataBeforeSave(rows, newRow);
  //     updatedTimeSheetDataSet.fTmpTs = updatedObject;
  //     updatedTimeSheetDataSet.fTshSum[0].STATUS = 4;
  //     var data: any = await Api.qTimeSaveFn("1", updatedTimeSheetDataSet);
  //     if (data) {
  //       if (data.response) {
  //         if (data.response.data.ExceptionMessage) {
  //           swal("QTIME", data.response.data.ExceptionMessage, "error");
  //         }
  //       } else {
  //         if (data.includes("ERROR")) {
  //           swal("QTIME", data.split("ERROR -")[1], "error");
  //         } else {
  //           swal("QTIME", "Submitted Successfully", "success").then(
  //             (value) => {
  //               setTimeSheetData(selectedTimeSheetPayDate, false);
  //             }
  //           );
  //         }
  //       }
  //     }
  //   }
  // };
  const handleEditClick = () => {
    if (selectionRowIndex.length == 0) {
      swal("QTIME", "There are no record to edit.", "warning");
    } else if (selectionRowIndex.length > 1) {
      swal("QTIME", "Please select a record to edit.", "warning");
    } else if (selectionRowIndex.length == 1) {
      const selectedModel = rows.filter((element: TimeEntryDataTable) => {
        return element.id == selectionRowIndex[0];
      });
      const selectedRow = selectedModel[0];
      const editCode: TimeEntryCode = {
        id: selectedRow.id,
        codeEntry: {
          l1: selectedRow.l1,
          jobCode: selectedRow.jobCode,
          l2: selectedRow.l2,
          l3: selectedRow.l3,
          l4: selectedRow.l4,
          l5: selectedRow.l5,
          classification: selectedRow.classification,
          location: selectedRow.location,
          l3Title: selectedRow.l3Title,
          l4Title: selectedRow.l4Title,
        },
        int_change: selectedRow.int_change,
      };
      setProjectCode(editCode);
      setOpen(true);
    }
  };
  const deleteRecords = async () => {
    let timeSheetData: TimeEntryDataTable[] = rows;
    for (let i = 0; i < selectionRowIndex.length; i++) {
      const selectedModelIndex: number = timeSheetData.findIndex(
        (element: TimeEntryDataTable) => {
          return element.id == selectionRowIndex[i];
        }
      );
      if (selectedModelIndex > -1) {
        timeSheetData[selectedModelIndex].int_change = -1;
      }
    }
    if (timeSheetDataSet) {
      let updatedData: TimeSheetDTO = timeSheetDataSet;
      let newRow: FTmpT = updatedData.fTmpTs[0];
      updatedData.fTmpTs = mapTimeSheetDataBeforeSave(timeSheetData, newRow);

      const result: ResponseDTO = await qTimeSaveFn("1", updatedData);

        if (result.code === 200) {
            const data = result.data;
            if (data.response) {
                if (data.response.data.ExceptionMessage) {
                    swal("QTIME", data.response.data.ExceptionMessage, "error");
                }
            } else {
                if (data.includes("ERROR")) {
                    swal("QTIME", data.split("ERROR -")[1], "error");
                } else {
                    swal("QTIME", "Deleted successfully", "success").then((value) => {
                        setIsDataTableLoading(true);
                        setTimeSheetData(selectedTimeSheetPayDate, false);
                        setIsDataTableLoading(false);
                    });
                }
            }
        }
        else {
            swal("QTIME", result.data.ExceptionMessage, "error");
        }
    }
  };
  // const deleteRecords = async () => {
  //   let timeSheetData: TimeEntryDataTable[] = rows;
  //   for (let i = 0; i < selectionRowIndex.length; i++) {
  //     const selectedModelIndex: number = timeSheetData.findIndex(
  //       (element: TimeEntryDataTable) => {
  //         return element.id == selectionRowIndex[i];
  //       }
  //     );
  //     if (selectedModelIndex > -1) {
  //       timeSheetData[selectedModelIndex].int_change = -1;
  //     }
  //   }
  //   if (timeSheetDataSet) {
  //     let updatedData: TimeSheetDTO = timeSheetDataSet;
  //     let newRow: FTmpT = updatedData.fTmpTs[0];
  //     updatedData.fTmpTs = mapTimeSheetDataBeforeSave(timeSheetData, newRow);

  //     const data: any = await Api.qTimeSaveFn("1", updatedData);
  //     if (data.includes("ERROR")) {
  //       swal("QTIME", data.split("ERROR -")[1], "error");
  //     } else {
  //       swal("QTIME", "Deleted Successfully", "success").then((value) => {
  //         setTimeSheetData(selectedTimeSheetPayDate, false);
  //       });
  //     }
  //   }
  // };
  const handleDeleteClicked = async () => {
    if (selectionRowIndex.length > 0) {
      swal({
        title: "Are you sure?",
        text: "Do you want to delete the records",
        icon: "warning",
        buttons: ["Ok", "Cancel"],
        dangerMode: true,
        closeOnEsc: false,
        closeOnClickOutside: false,
      }).then((willDelete) => {
        if (!willDelete) {
          deleteRecords();
        }
      });
    }
  };

  const handleClickOk = (code: TimeEntryCode) => {
    let newRows: TimeEntryDataTable[] = [];
    if (code.id > 0) {
      newRows = rows.map((row) => {
        if (row.id === code.id) {
          return {
            ...row,
            ...code.codeEntry,
          };
        } else {
          return row;
        }
      });
    } else {
      let rowId = rows.length + 1;
      code.id = rowId;
      let newRow: TimeEntryDataTable = {
        id: rowId,
        ...code.codeEntry,
        ...getEmptyHours(),
        total: 0,
        int_change: 0,
      };
      newRows = [...rows, newRow];
    }

    setRows(newRows);
    setProjectCode(getNewCode());
  };
  const handleCommentClickOpen = () => {
    setOpenCommentDialog(!openCommentDialog);
    };
    {/*
  const handleCommentClick = (commentObject: CommentScreenObject) => {
    setOpenCommentDialog(!openCommentDialog);
    if (commentObject) {
      let data = timeSheetDataSet;
      if (data) {
        data.fTshSum[0].EMPNOTES = commentObject.employeeComment;
        setEmployeeComment(data.fTshSum[0].EMPNOTES);
      }

      setIsDataTableLoading(true);
      setTimeSheetDataSet(data);
      setIsDataTableLoading(false);
    }
  };*/}
  const handleCommentClick = (commentObject: CommentScreenObject) => {
        setOpenCommentDialog(!openCommentDialog);
        if (commentObject) {
            let data = timeSheetDataSet;
            if (data) {
                data.fTshSum[0].EMPNOTES = commentObject.employeeComment;
                setEmployeeComment(data.fTshSum[0].EMPNOTES);
                const commntObj: CommentScreenObject = {
                  approver: commentObject.approver,
                  approver1Comment: commentObject.approver1Comment,
                  approver2Comment: commentObject.approver2Comment,
                  employeeComment: data.fTshSum[0].EMPNOTES,
                  reasonCode: commentObject.reasonCode,
                  selectedId: commentObject.selectedId,
              };
              setCommentObject(commntObj);
          }

          setIsDataTableLoading(true);
          setTimeSheetDataSet(data);
          setIsDataTableLoading(false);
      }
  };

  const handleCommentClose = () => {
    setOpenCommentDialog(!openCommentDialog);
  };

  const handleCopyClick = () => {
    // setWarningMessage(!warningMessage);
    setOpenCopyDialog(!openCopyDialog);
    };
    const handleCopyOkClick = async (val: any) => {
    if (val) {
      if (val == "") {
        val = 0;
      }
      const payDate: any = periods.filter((date: any) => {
        return date.WeekNo == val;
      });
      const loggedInUserID = localStorage.getItem(constantClass.ID) || "";
      if (selectedEmployeeId.trim().length == 0) {
        setSelectedEmployeeId(loggedInUserID);
      }
      if (payDate.length == 1) {
        const response: ResponseDTO = await copyTimeSheet(
          selectedEmployeeId || loggedInUserID,
          selectedTimeSheetPayDate,
          payDate[0].PayDate.split("T")[0]
        );
        if (response.code === 200) {
          const data = response.data;
          setTimeSheetDataResponse(response, false);
        }
      }
    }
    setOpenCopyDialog(!openCopyDialog);
  };
  {/*
  const handleCopyOkClick = async (val: any) => {
    if (val) {
      if (val == "") {
        val = 0;
      }
      const payDate: any = periods.filter((date: any) => {
        return date.WeekNo == val;
      });
      if (payDate.length == 1) {
        const response: ResponseDTO = await copyTimeSheet(
          selectedEmployeeId,
          selectedTimeSheetPayDate,
          payDate[0].PayDate.split("T")[0]
        );
        if (response.code === 200) {
          const data = response.data;
          setTimeSheetDataResponse(response, false);
        }
      }
    }
    setOpenCopyDialog(!openCopyDialog);
  };
  */}
  // const handleCopyOkClick = async (val: any) => {
  //   if (val) {
  //     if (val == "") {
  //       val = 0;
  //     }
  //     const payDate: any = periods.filter((date: any) => {
  //       return date.WeekNo == val;
  //     });
  //     if (payDate.length == 1) {
  //       const data: any = await Api.copyTimeSheet(
  //         selectedEmployeeId,
  //         selectedTimeSheetPayDate,
  //         payDate[0].PayDate.split("T")[0]
  //       );
  //       if (data) {
  //         //SWAL
  //       }
  //     }
  //   }
  //   setOpenCopyDialog(!openCopyDialog);
  // };
  const handleCopyClose = () => {
    setOpenCopyDialog(!openCopyDialog);
  };

  const getPeriods = async () => {
    const result: ResponseDTO = await getEndingWeek();

    if (result.code === 200) {
      const periodList = result.data;
      let timeSheetPeriodList: any = [];
      for (let i = 0; i < periodList.length; i++) {
        if (periodList[i].CurPayDate == 1) {
          timeSheetPeriodList.push(periodList[i]);
          return timeSheetPeriodList;
        }
        timeSheetPeriodList.push(periodList[i]);
      }
    }
  };

  // const getPeriods = async () => {
  //   const periodList = await Api.getEndingWeek();
  //   let timeSheetPeriodList: any = [];
  //   for (let i = 0; i < periodList.length; i++) {
  //     if (periodList[i].CurPayDate == 1) {
  //       timeSheetPeriodList.push(periodList[i]);
  //       return timeSheetPeriodList;
  //     }
  //     timeSheetPeriodList.push(periodList[i]);
  //   }
  // };

  const getMonth = (monthNo: number) => {
    const months = [];
    months[1] = "Jan";
    months[2] = "Feb";
    months[3] = "Mar";
    months[4] = "Apr";
    months[5] = "May";
    months[6] = "Jun";
    months[7] = "Jul";
    months[8] = "Aug";
    months[9] = "Sep";
    months[10] = "Oct";
    months[11] = "Nov";
    months[12] = "Dec";

    return months[monthNo];
  };

  const mapTimeSheetDataBeforeSave = (
    rowsData: TimeEntryDataTable[],
    defaultStructure: FTmpT
  ) => {
    return rows.map((element: TimeEntryDataTable) => {
      return {
        Code01: element.l1,
        Code02: element.jobCode, //jobcode
        Code03: element.l2, // l2
        Code04: element.l3, //, //l3
        Code05: (defaultStructure && defaultStructure.Code05) || "",
        Dept: element.l5,
        Classifctn: element.classification,
        Location: element.location, //,
        Total: parseFloat(element.total.toString()),
        Code06: element.l4,
        Code07: (defaultStructure && defaultStructure.Code07) || "",
        Code08: element.l5,
        Code09: (defaultStructure && defaultStructure.Code09) || "",
        Code10: (defaultStructure && defaultStructure.Code10) || "",
        EnteredBy: (defaultStructure && defaultStructure.EnteredBy) || "",
        DateEdited:
          (defaultStructure && defaultStructure.DateEdited) ||
          "1900-01-01T00:00:00",
        DateAdded:
          (defaultStructure && defaultStructure.DateAdded) ||
          "1900-01-01T00:00:00",
        Holiday: (defaultStructure && defaultStructure.Holiday) || "",
        Shift: (defaultStructure && defaultStructure.Shift) || "",
        PCType: (defaultStructure && defaultStructure.PCType) || "",
        OTF: (defaultStructure && defaultStructure.OTF) || 0,
        RowNo: element.id,
        ActDesc: (defaultStructure && defaultStructure.ActDesc) || "",
        PostFreez: (defaultStructure && defaultStructure.PostFreez) || false,
        L3_Title: (defaultStructure && defaultStructure.L3_Title) || "",
        L4_Title: (defaultStructure && defaultStructure.Code06) || "",
        Int_Change: element.int_change,
        Hrs01: parseFloat(element.day1.toString()),
        Hrs02: parseFloat(element.day2.toString()),
        Hrs03: parseFloat(element.day3.toString()),
        Hrs04: parseFloat(element.day4.toString()),
        Hrs05: parseFloat(element.day5.toString()),
        Hrs06: parseFloat(element.day6.toString()),
        Hrs07: parseFloat(element.day7.toString()),
      };
    });
  };
  const saveTimeSheet = async () => {
    if (timeSheetDataSet) {
      let updatedData: TimeSheetDTO = timeSheetDataSet;
      let newRow: FTmpT = updatedData.fTmpTs[0];
      let updatedObject: FTmpT[] = mapTimeSheetDataBeforeSave(rows, newRow);

      updatedData.fTmpTs = updatedObject;
      updatedData.fTshSum[0].INT_CHANGE = 1;
      updatedData.fTshSum[0].INT_KEY = 0; // if new records added

      const result: ResponseDTO = await qTimeSaveFn("1", updatedData);

      if (result.code === 200) {
        swal("QTIME", "Timesheet has been saved successfully", "success").then(
          (value) => {
            setTimeSheetData(selectedTimeSheetPayDate, false);
          }
        );
        // }
      } else {
        swal("QTIME", result.data.ExceptionMessage, "error");
      }
    }
  };

  /*Rows related Calculation****************************************************************************************************************/
  const calculateRowTotal = (updatedRow: any, fieldName?: any) => {
    let total: any = 0;
    let val: any = 0;
    let fields = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];

    for (let i = 0; i < fields.length; i++) {
      if (updatedRow[fields[i]] == "") {
        val = 0;
      } else {
        val = parseFloat(updatedRow[fields[i]]);
      }
      total = total + val;
    }
    return parseFloat(total).toFixed(1).toString();
  };

  const updateFinalTableRowTotal = (field = "total") => {
    let fields: any = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
    let val = 0;
    let total = 0;
    for (let i = 0; i < fields.length; i++) {
      if (totalTimeSheetRecords.length > 0) {
        if (totalTimeSheetRecords[0][fields[i]] == "") {
          val = 0;
        } else {
          val = parseFloat(totalTimeSheetRecords[0][fields[i]]);
        }
        total = total + val;
      }
    }

    if (totalTimeSheetRecords.length > 0) {
      if (total.toString().includes(".")) {
        totalTimeSheetRecords[0][field] = total;
      } else {
        totalTimeSheetRecords[0][field] = total + ".0";
      }
      setTotalTimeSheetRecords([...totalTimeSheetRecords]);
    }
  };
  const getCorrectFormattedTimeSheet = (value: string) => {
    if (value.trim().length > 0) {
      if (value.includes(".")) {
        return value;
      }
      return value + ".0";
    }
    return "0.0";
  };
  const setTimeSheetData = async (
    period: string,
    isDisplayPressed: boolean
  ) => {
      showLoader();
      const loggedInUserID = localStorage.getItem(constantClass.ID) || "";
      if (selectedEmployeeId.trim().length == 0) {
          setSelectedEmployeeId(loggedInUserID);
      }
    const result: ResponseDTO = await getTimeSheetData(
        selectedEmployeeId || loggedInUserID,
      period
      );
      
      if (result.code === 200) {
          setTimeSheetDataResponse(result, isDisplayPressed);
      }
      else {
          swal("QTIME", result.data.ExceptionMessage, "error");
      }
    hideLoader();
  };

  const setTimeSheetDataResponse = (result: any, isDisplayPressed: boolean) => {
    const data: TimeSheetDTO = result.data;
    if (data.fTmpTs.length > 0) {
      const validRecords: FTmpT[] = data.fTmpTs.filter((element: FTmpT) => {
        return element.Code01 && element.Code01.length > 0;
      });
      data.fTmpTs = validRecords;
      const entryData: TimeEntryDataTable[] = data.fTmpTs.map(
        (timeData, index) => {
          return {
            id: ++index,
            jobCode: timeData.Code02,
            l1: timeData.Code01,
            l2: timeData.Code03,
            l3: timeData.Code04,
            l4: timeData.Code06,
            l5: timeData.Code08,
            classification: timeData.Classifctn,
            location: timeData.Location || "",
            l3Title: timeData.L3_Title,
            l4Title: timeData.L4_Title,
            total: getCorrectFormattedTimeSheet(timeData.Total),
            day1: getCorrectFormattedTimeSheet(timeData.Hrs01),
            day2: getCorrectFormattedTimeSheet(timeData.Hrs02),
            day3: getCorrectFormattedTimeSheet(timeData.Hrs03),
            day4: getCorrectFormattedTimeSheet(timeData.Hrs04),
            day5: getCorrectFormattedTimeSheet(timeData.Hrs05),
            day6: getCorrectFormattedTimeSheet(timeData.Hrs06),
            day7: getCorrectFormattedTimeSheet(timeData.Hrs07),
            int_change: timeData.Int_Change || 0,
          };
        }
      );
      setIsDataTableLoading(true);
      setTimeSheetDataSet(data);
      setIsDataTableLoading(false);
      setRows(entryData);
      setsubmitBtnCaption(data.fTshSum[0].STATUS);
      setsubmittedStatus(data.fTshSum[0].StsTitle);
      setEmployeeComment(data.fTshSum[0].EMPNOTES);
      isGridEditable(data.fTshSum[0].STATUS);
      updateHoliday(data.fTmpTsMisc);
        setFooterMessage(data.fTmpTsMisc[0].MthToDateHrs);
        let commentObj: CommentScreenObject = {
            approver: undefined,
            approver1Comment: data.fTshSum[0].SUPNOTES,
            approver2Comment: data.fTshSum[0].PMNOTES,
            employeeComment: data.fTshSum[0].EMPNOTES,
            reasonCode: data.fTshSum[0].RjctReason,
            selectedId: "",
        };
        setCommentObject(commentObj);
    }

    const entryTotData: any[] = data.fTmpTsTot.map((timeData, index) => {
      if (index == 0) {
        return {
          id: index,
          title: timeData.Code01,
          total: getCorrectFormattedTimeSheet(timeData.Total),
          day1: getCorrectFormattedTimeSheet(timeData.Hrs01),
          day2: getCorrectFormattedTimeSheet(timeData.Hrs02),
          day3: getCorrectFormattedTimeSheet(timeData.Hrs03),
          day4: getCorrectFormattedTimeSheet(timeData.Hrs04),
          day5: getCorrectFormattedTimeSheet(timeData.Hrs05),
          day6: getCorrectFormattedTimeSheet(timeData.Hrs06),
          day7: getCorrectFormattedTimeSheet(timeData.Hrs07),
        };
      }
      if (index == 5) {
        return {
          id: index,
          title: timeData.Code01,
          total: timeData.Total || "",
          day1: timeData.Hrs01 || "",
          day2: timeData.Hrs02 || "",
          day3: timeData.Hrs03 || "",
          day4: timeData.Hrs04 || "",
          day5: timeData.Hrs05 || "",
          day6: timeData.Hrs06 || "",
          day7: timeData.Hrs07 || "",
        };
      }
      return {
        id: index,
        title: timeData.Code01,
        total: timeData.Total,
        day1: timeData.Hrs01,
        day2: timeData.Hrs02,
        day3: timeData.Hrs03,
        day4: timeData.Hrs04,
        day5: timeData.Hrs05,
        day6: timeData.Hrs06,
        day7: timeData.Hrs07,
      };
    });
    if (entryTotData.length > 0) {
      setTotalTimeSheetRecords(entryTotData);
    }
    if (data.fTmpTs.length == 0) {
      if (isDisplayPressed) {
        setOpen(!open);
      }
    }
  };
  const findobject = (searchObj: any, fieldName: string) => {
    return searchObj.filter((element: any) => {
      return element.field == fieldName;
    });
  };
  const updateColumnHeaderBackground = (
    searchObj: any,
    fieldName: string,
    className: string
  ) => {
    let object = findobject(searchObj, fieldName);
    if (object.length == 1) {
      object[0]["headerClassName"] = className;
    }
  };
  const updateHoliday = (holidays: any) => {
    let columns: GridColDef[] = timeSheetHeader;
    if (holidays.length == 1) {
      if (holidays[0].Holiday01 == -1) {
        updateColumnHeaderBackground(columns, "day1", "red");
      } else if (holidays[0].Holiday01 == 0) {
        updateColumnHeaderBackground(columns, "day1", "blue");
      }
      if (holidays[0].Holiday02 == -1) {
        updateColumnHeaderBackground(columns, "day2", "red");
      } else if (holidays[0].Holiday02 == 0) {
        updateColumnHeaderBackground(columns, "day2", "blue");
      }
      if (holidays[0].Holiday03 == -1) {
        updateColumnHeaderBackground(columns, "day3", "red");
      } else if (holidays[0].Holiday03 == 0) {
        updateColumnHeaderBackground(columns, "day3", "blue");
      }
      if (holidays[0].Holiday04 == -1) {
        updateColumnHeaderBackground(columns, "day4", "red");
      } else if (holidays[0].Holiday04 == 0) {
        updateColumnHeaderBackground(columns, "day4", "blue");
      }
      if (holidays[0].Holiday05 == -1) {
        updateColumnHeaderBackground(columns, "day5", "red");
      } else if (holidays[0].Holiday05 == 0) {
        updateColumnHeaderBackground(columns, "day5", "blue");
      }
      if (holidays[0].Holiday06 == -1) {
        updateColumnHeaderBackground(columns, "day6", "red");
      } else if (holidays[0].Holiday06 == 0) {
        updateColumnHeaderBackground(columns, "day6", "blue");
      }
      if (holidays[0].Holiday07 == -1) {
        updateColumnHeaderBackground(columns, "day7", "red");
      } else if (holidays[0].Holiday07 == 0) {
        updateColumnHeaderBackground(columns, "day7", "blue");
      }
    }
    updateTimeSheetHeader([...columns]);
  };
  const isGridEditable = (status: number) => {
    switch (status) {
      case 1:
      case 2:
        setIsDataTableEditable(true);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        setIsDataTableEditable(false);
        break;
      default:
        setIsDataTableEditable(false);
        break;
    }
  };

  const updateTotalDatTable = (field: Day, uniqueId: any, updatedVal: any) => {
    if (updatedVal && updatedVal != "") {
      let updatedRow = totalTimeSheetRecords.filter((data) => {
        return data.id == uniqueId;
      });
      if (updatedRow) {
        updatedRow[0][field] = updatedVal;
      }
    }
  };
  const updateRowTotal = (field: Day, uniqueId: any, updatedVal: any) => {
    if (updatedVal && updatedVal != "") {
      const timeSheetData = rows;
      const updatedRow: TimeEntryDataTable[] = timeSheetData.filter(
        (data: TimeEntryDataTable) => {
          return data.id == uniqueId;
        }
      );
      if (updatedRow) {
        //update int_change
        updatedRow[0]["int_change"] = 1;
        if (updatedVal.toString().includes(".")) {
          updatedRow[0][field] = updatedVal;
        } else {
          updatedRow[0][field] = updatedVal + ".0";
        }

        const total = calculateRowTotal(updatedRow[0], field);
        const changedTimeSheetRow = rows.filter((data: any) => {
          return data.id == uniqueId;
        });
        if (changedTimeSheetRow.length > 0) {
          if (total.includes(".")) {
            changedTimeSheetRow[0]["total"] = total;
          } else {
            changedTimeSheetRow[0]["total"] = total + ".0";
          }
          setRows([...rows]);
        }
      }
    }
  };
  //end
  /*Column related Calculation****************************************************************************************************************/
  const updateColumnTotal = (field: Day, uniqueId: any, updatedVal: any) => {
    if (updatedVal && updatedVal != "") {
      const timeSheetData = rows;
      const updatedRow: TimeEntryDataTable[] = timeSheetData.filter(
        (data: TimeEntryDataTable) => {
          return data.id == uniqueId;
        }
      );
      if (updatedRow) {
        updatedRow[0][field] = parseFloat(
          parseFloat(updatedVal).toFixed(1).toString()
        );
        setUpdatedField(field);
        // const total = calculateColumnTotal(timeSheetData, field);
        // if (totalTimeSheetRecords.length > 0) {
        //   if (total.includes(".")) {
        //     totalTimeSheetRecords[0][field] = total;
        //   } else {
        //     totalTimeSheetRecords[0][field] = total + ".0";
        //   }
        //   setTotalTimeSheetRecords([...totalTimeSheetRecords]);
        // }
      }
    }
  };
  const calculateColumnTotal = (updatedObj: any, fieldName: any) => {
    let total: any = 0;
    let val: any = 0;
    for (let i = 0; i < updatedObj.length; i++) {
      if (updatedObj[i][fieldName] == "") {
        val = 0;
      } else {
        val = parseFloat(updatedObj[i][fieldName]);
      }
      total = total + val;
    }
    return parseFloat(total).toFixed(1).toString();
  };

  //end

  const isValidFormat = (id: string, value: string) => {
    let isValid = false;
    let format = "[0-9]{2}:[0-9]{2}";
    switch (parseInt(id)) {
      case 1:
        isValid = RegExp(format, "g").test(value);
        break;
      case 2:
        isValid = RegExp(format, "g").test(value);
        break;
      case 3:
        isValid = RegExp(format, "g").test(value);
        break;
      case 4:
        isValid = RegExp(format, "g").test(value);
        break;
    }
    return isValid;
  };
  const isValidValue = (value: string) => {
    let isValidHour = false;
    let isValidMinute = false;
    isValidHour = parseInt(value.split(":")[0]) <= 23;
    isValidMinute = parseInt(value.split(":")[1]) <= 59;
    return isValidHour && isValidMinute;
  };
  const handleTotalDataTableEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }: GridEditCellPropsParams, event) => {
      let isValid = false;
      if (props.value) {
        isValid = isValidFormat(id.toString(), props.value.toString());

        if (!isValid) {
          swal("QTIME", "Please Enter Correct Format as HH:MM", "warning");
        } else {
          isValid = isValidValue(props.value.toString());
          if (!isValid) {
            swal("QTIME", "Please Enter Correct Values", "warning");
          }
        }

        if (isValid) {
          updateTotalDatTable(field as Day, id, props.value);
        }
        setTotalTimeSheetRecords([...totalTimeSheetRecords]);
      }
    },
    [totalTimeSheetRecords]
  );

  const isValidInput = (value: any) => {
    let isValid = false;
    if (typeof value === "string" && !Number.isNaN(Number(value))) {
      value = Number(value);
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };
  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }: GridEditCellPropsParams, event) => {
      let isValid = false;
      const uniqueId = id;
      const updatedVal = props.value;
      const newState: any = {};
      if (updatedVal) {
        if (isValidInput(updatedVal.toString())) {
          isValid =
            isValidEntry(updatedVal) &&
            isRowTotalValid(uniqueId, field, updatedVal) &&
            isColTotalValid(uniqueId, field, updatedVal);

          if (isValid) {
            setRows([...rows]);
          } else {
            swal("QTIME", "Hours cannot exceed 24.0 hours", "warning");
            setRows([...rows]);
          }

          if (isValid) {
            updateRowTotal(field as Day, uniqueId, updatedVal);
            updateColumnTotal(field as Day, uniqueId, updatedVal);
            updateFinalTableRowTotal("total");
          }
          if (!isValid) {
            setRows([...rows]);
          } else {
            const changedTimeSheetRow: any = rows.filter((data: any) => {
              return data.id == uniqueId;
            });
            if (changedTimeSheetRow.length > 0) {
              if (updatedVal.toString().includes(".")) {
                changedTimeSheetRow[0][field] = updatedVal;
              } else {
                changedTimeSheetRow[0][field] = updatedVal + ".0";
              }
            }
            setRows([...rows]);
          }
        } else {
          setRows([...rows]);
          swal("QTIME", "Invalid input", "warning");
        }
      }
    },
    [rows, editRowsModel]
  );

  const handleRowSelectionChange = (event: any) => {
    setselectionRowIndex(event.selectionModel);
  };

  const isValidEntry = (val: any) => {
    let isValid = false;
    if (!isNaN(val)) {
      if (val <= 24) {
        isValid = true;
      }
    }
    return isValid;
  };
  const isColTotalValid = (uniqueId: any, field: any, updatedVal: any) => {
    let isValid = false;
    const updatedRow = rows.filter((data: any) => {
      return data.id == uniqueId;
    });
    if (updatedRow) {
      const total = calculateColumnTotal(rows, field);
      if (parseFloat(total) + parseFloat(updatedVal) <= 24) {
        isValid = true;
      }
    }
    return isValid;
  };
  const isRowTotalValid = (uniqueId: any, field: any, updatedVal: any) => {
    let isValid = false;

    const updatedRow: any = rows.filter((data: any) => {
      return data.id == uniqueId;
    });
    if (updatedRow) {
      const total = calculateRowTotal(updatedRow[0], field);
      if (parseFloat(total) + parseFloat(updatedVal) <= 168) {
        isValid = true;
      }
    }
    return isValid;
  };
  const editableTotalDataTableRows = (params: any) => {
    if (isDataTableEditable) {
      if (params.id == 0) {
        return false;
      }
      return true;
    }
    return false;
  };
  return (
    <div>
      {/* <Header /> */}
      <CodeDialog
        open={open}
        onClose={handleClickOpen}
        onOkPressed={handleClickOk}
        setLoader={setLoader}
        code={projectCode}
        employeeId={selectedEmployeeId}
      />

      <CommentDialog
        open={openCommentDialog}
        onClose={handleCommentClose}
        onOkPressed={handleCommentClick}
        employeeComment={employeeComment}
        rejectedCodes={[]}
        isFrom={"TimeSheet"}
        isApprover1={false}
              isApprover2={false}
              selectedObject={commentObject}
      />
      <CopyDialog
        open={openCopyDialog}
        onClose={handleCopyClose}
        onOkPressed={handleCopyOkClick}
        todayDate={
          copyTimeSheetPayDateData.length > 0
            ? copyTimeSheetPayDateData[0].key
            : 0
        }
        data={copyTimeSheetPayDateData}
      />
      <CodeEntryWeek
        onWeekObjectChange={handleWeekObjectChange}
        handleEmployeeChange={handleEmployeeChange}
      />
      <StatusBar
        onNewBtnClick={handleClickOpen}
        onSaveClick={handleSaveClicked}
        onDeleteClick={handleDeleteClicked}
        onEditClick={handleEditClick}
        onSubmitClicked={handleSubmitClick}
        submittedStatus={submittedStatus}
        submitBtnCaption={submitBtnCaption}
        onCommentClick={handleCommentClickOpen}
        onCopyClick={handleCopyClick}
        newBtnCaption={newDisplayBtnCaption}
        onCloseClick={props.onCloseClicked}
      />
      <div style={{ paddingBottom: 5 }}>
        <DataTable
          apiRef={timeSheetref}
          columns={timeSheetHeader}
          rowData={rows}
          checkboxSelection={true}
          editRowModel={editRowsModel}
          editCellChangeCommitedFn={handleEditCellChangeCommitted}
          rowSelectFn={undefined}
          selectionModelChangeFn={handleRowSelectionChange}
          isDataTableLoading={isDataTableLoading}
          isDataTableEditable={isDataTableEditable}
          isDataTableEditablefn={undefined}
        />
      </div>
      <div style={{ paddingTop: 5 }}>
        <DataTable
          apiRef={totalTimeSheetRef}
          columns={totalColumns}
          rowData={totalTimeSheetRecords}
          checkboxSelection={false}
          editCellChangeCommitedFn={handleTotalDataTableEditCellChangeCommitted}
          editRowModel={editTotalRowsModel}
          rowSelectFn={undefined}
          selectionModelChangeFn={undefined}
          isDataTableLoading={isDataTableLoading}
          isDataTableEditable={isDataTableEditable}
          isDataTableEditablefn={editableTotalDataTableRows}
        />
      </div>
      <div className="timesheetFooter">{footerMessage}</div>
    </div>
  );
};

export default Timesheet;
