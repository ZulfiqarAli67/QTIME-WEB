import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import TextInput from "../common/TextInput";
import CommentDialog, {
  CommentScreenObject,
} from "../time-entry-sheet/comment/dialog";
import {
  GridColDef,
  GridEditCellPropsParams,
  GridRowSelectedParams,
} from "@material-ui/data-grid";
import NativeSelectDropDown from "../common/nativeDropdown";
import DataTable from "../common/DataTable";
import { FaPaperclip } from "react-icons/fa";
import "./ApprovalTimeSheet.css";
import { Api, ResponseDTO } from "../../utils/api/api";
import { fRjctReson, fTmpEmployeeForApproval } from "../../utils/api/Models";
import swal from "sweetalert";
import { withHooksHOC } from "./ApprovalTimeSheetHooks";

interface ApproveScreenObj {
  fRjctReson: fRjctReson[];
  fTmpEmployeeForApproval: fTmpEmployeeForApproval[];
}
interface IApproveSheetProps {
  onCloseClicked: any;
  useFetch: any;
}
type ApprovalTimeSheetState = {
  periods: any[];
  currentWeek: string;
  fRjctReson: fRjctReson[];
  rejectedReasons: any[];
  approvalSheetRecords: fTmpEmployeeForApproval[];
  approverlvl1: string;
  approverlvl2: string;
  noOfEmployee: string;
  totalHours: string;
  openCommentDialog: boolean;
  employeeComment: string;
  isStandard: boolean;
  isNonWorking: boolean;
  isMissing: boolean;
  isApproveAll: boolean;
  isStandardDisabled: boolean;
  isNonWorkingDisabled: boolean;
  isMissingDisabled: boolean;
  isApproveAllDisabled: boolean;
  selectedValue: number;
  commentScreenOpenedFrom: "TimeSheet" | "ApproveAttachment" | "ApproveReject";
  isApprover1Login: boolean;
  isApprover2Login: boolean;
  selectedId: string;
  isDataTableLoading: boolean;
  isDataTableEditable: boolean;
  selectedCheckbox: "approver1" | "approver2" | "rejected";
  commentObject: CommentScreenObject;
  selectedRowIndex: any[];
};
class ApprovalTimeSheetClass extends Component<
  IApproveSheetProps,
  ApprovalTimeSheetState
> {
  // private approvalRef = useGridApiRef();
  constructor(props: any) {
    super(props);
    this.state = {
      periods: [],
      currentWeek: "0",
      rejectedReasons: [],
      approvalSheetRecords: [],
      approverlvl1: "",
      approverlvl2: "",
      noOfEmployee: "",
      totalHours: "",
      openCommentDialog: false,
      employeeComment: "",
      isStandard: true,
      isNonWorking: false,
      isMissing: false,
      isApproveAll: false,
      isStandardDisabled: false,
      isNonWorkingDisabled: false,
      isMissingDisabled: true,
      isApproveAllDisabled: false,
      selectedValue: 0,
      commentScreenOpenedFrom: "ApproveAttachment",
      fRjctReson: [],
      isApprover2Login: false,
      isApprover1Login: false,
      selectedId: "",
      isDataTableLoading: false,
      isDataTableEditable: true,
      selectedCheckbox: "approver1",
      commentObject: {
        employeeComment: "",
        approver1Comment: "",
        approver2Comment: "",
        reasonCode: "",
        selectedId: "",
        approver: undefined,
      },
      selectedRowIndex: [],
    };
    (window as any).ApprovalTimeSheetClassInstance = this;
  }

  public async componentDidMount() {
    const periodList = await this.retrievePayDate();
    void (await this.setCurrentDate(periodList));
    this.setState({
      totalHours: "0",
    });
  }
  private setCurrentDate = (periodList: any) => {
    if (periodList && periodList.length > 0) {
      let currentPayWeek: any = this.findCurrentWeekDate(periodList);
      if (currentPayWeek && currentPayWeek.length > 0) {
        if (this.state.periods.length > 0) {
          this.setState({
            currentWeek:
              currentPayWeek[0].WeekNo +
              "-" +
              currentPayWeek[0].PayDate.split("T")[0],
          });
        }
      }
    }
  };
  private findCurrentWeekDate = (periodList: any) => {
    return periodList.filter((element: any) => {
      return element.CurPayDate == 1;
    });
  };
  private retrievePayDate = async () => {
    //const {getEndingWeek} = useFetch();
    const result: ResponseDTO = await this.props.useFetch.getEndingWeek();

    if (result.code === 200) {
      const periodList = result.data;
      const filteredWeeks = periodList.map((element: any) => {
        return {
          key: element.WeekNo,
          value: element.PayDate.split("T")[0],
        };
      });
      this.setState({
        periods: filteredWeeks,
      });
      return periodList;
    }
  };

  // private retrievePayDate = async () => {
  //   const periodList = await Api.getEndingWeek();
  //   const filteredWeeks = periodList.map((element: any) => {
  //     return {
  //       key: element.WeekNo,
  //       value: element.PayDate.split("T")[0],
  //     };
  //   });
  //   this.setState({
  //     periods: filteredWeeks,
  //   });
  //   return periodList;
  // };

  private gettsTypeVal = () => {
    let val = 0;
    if (this.state.isStandard && this.state.isNonWorking) {
      val = 4;
    } else if (this.state.isNonWorking) {
      val = 2;
    } else if (this.state.isStandard) {
      val = 1;
    } else {
      val = 3;
    }
    return val.toString();
  };
  private retrieveEmployeeData = async (filterTypeVal: any) => {
    let selectedWeekNo = this.state.currentWeek;
    selectedWeekNo = selectedWeekNo.split("-")[0];
    let tsType = this.gettsTypeVal();
    let filterType = this.state.selectedValue;
    if (filterTypeVal != undefined) {
      filterType = filterTypeVal;
    }
    const selectedPayDate = this.state.periods.filter((object: any) => {
      return selectedWeekNo == object.key;
    });
    if (selectedPayDate && selectedPayDate.length > 0) {
      //const {getApprovalEmployeeList} = useFetch();
      const result: ResponseDTO =
        await this.props.useFetch.getApprovalEmployeeList(
          selectedPayDate[0].value,
          tsType,
          filterType
        );
      const response = result.data;

      if (result.code === 200) {
        if (response.fTmpEmployeeForApproval) {
          const empApproveData: fTmpEmployeeForApproval[] =
            response.fTmpEmployeeForApproval.map(
              (empData: any, index: number) => {
                return {
                  id: empData.Id,
                  supvNo: empData.SupvNo,
                  projMgr: empData.ProjMgr,
                  proxySup: empData.ProxySup,
                  prxyPrjMgr: empData.PrxyPrjMgr,
                  proxyAct: empData.ProxyAct,
                  calc_OT: empData.Calc_OT,
                  pAF_No: empData.PAF_No,
                  tsType: empData.TsType,
                  employeeName: empData.EmployeeName,
                  status: empData.Status,
                  statusLvl: empData.StatusLvl,
                  prevStatus: empData.PrevStatus,
                  prevStatusLvl: empData.PrevStatusLvl,
                  submitted: empData.Submitted,
                  apprvLvl1: empData.ApprvLvl1,
                  apprvLvl2: empData.ApprvLvl2,
                  rejected: empData.Rejected,
                  prevAppLvl1: empData.PrevAppLvl1,
                  prevAppLvl2: empData.PrevAppLvl2,
                  prevReject: empData.PrevReject,
                  isApprvLvl1: empData.IsApprvLvl1,
                  isApprvLvl2: empData.IsApprvLvl2,
                  isRejected: empData.IsRejected,
                  reasonCode: empData.ReasonCode,
                  totalHrs: empData.TotalHrs,
                  empNotes: empData.EmpNotes,
                  supvNotes: empData.SupvNotes,
                  pMNotes: empData.PMNotes,
                  proxyActSupv: empData.ProxyActSupv,
                  proxyActPrjMgr: empData.ProxyActPrjMgr,
                  isCmntExts: empData.IsCmntExts,
                  int_Tsh: empData.Int_Tsh,
                  lvl1ApprvName: empData.Lvl1ApprvName,
                  lvl2ApprvName: empData.Lvl2ApprvName,
                  selected: empData.Selected,
                  dispTotalHrs: empData.DispTotalHrs,
                };
              }
            );
          let total = 0.0;
          empApproveData.forEach((element) => {
            if (element.totalHrs) {
              total = total + element.totalHrs;
            }
          });
            let finalTotal = "0.0";
            if (total.toString().includes(".")) {
                finalTotal = total.toString();
            } else {
                finalTotal = total.toString() + ".0";
            }
            this.setState({
                approvalSheetRecords: empApproveData,
                // rejectedReasons: response.fRjctReson,
                totalHours: finalTotal,
                noOfEmployee: empApproveData.length.toString(),
                isDataTableLoading: false,
            });
        }
        if (response.fRjctReson) {
          if (response.fRjctReson.length > 0) {
            const reason = response.fRjctReson.map((element: any) => {
              return {
                key: element.ReasonCode,
                value: element.Title,
              };
            });

            this.setState({
              rejectedReasons: reason,
              fRjctReson: response.fRjctReson,
            });
          }
        }
      } else {
        swal("QTIME", result.data.ExceptionMessage, "error");
        this.setState({
          isDataTableLoading: false,
        });
      }
    }
  };
  // private retrieveEmployeeData = async (filterTypeVal: any) => {
  //   const selectedWeekNo = this.state.currentWeek;
  //   let tsType = this.gettsTypeVal();
  //   let filterType = this.state.selectedValue;
  //   if (filterTypeVal != undefined) {
  //     filterType = filterTypeVal;
  //   }
  //   const selectedPayDate = this.state.periods.filter((object: any) => {
  //     return selectedWeekNo === object.key;
  //   });
  //   if (selectedPayDate && selectedPayDate.length > 0) {
  //     const response = await Api.getApprovalEmployeeList(
  //       selectedPayDate[0].value,
  //       tsType,
  //       filterType
  //     );
  //     if (response) {
  //       if (response.fTmpEmployeeForApproval) {
  //         const empApproveData: fTmpEmployeeForApproval[] =
  //           response.fTmpEmployeeForApproval.map((empData: any, index) => {
  //             return {
  //               id: empData.Id,
  //               supvNo: empData.SupvNo,
  //               projMgr: empData.ProjMgr,
  //               proxySup: empData.ProxySup,
  //               prxyPrjMgr: empData.PrxyPrjMgr,
  //               proxyAct: empData.ProxyAct,
  //               calc_OT: empData.Calc_OT,
  //               pAF_No: empData.PAF_No,
  //               tsType: empData.TsType,
  //               employeeName: empData.EmployeeName,
  //               status: empData.Status,
  //               statusLvl: empData.StatusLvl,
  //               prevStatus: empData.PrevStatus,
  //               prevStatusLvl: empData.PrevStatusLvl,
  //               submitted: empData.Submitted,
  //               apprvLvl1: empData.ApprvLvl1,
  //               apprvLvl2: empData.ApprvLvl2,
  //               rejected: empData.Rejected,
  //               prevAppLvl1: empData.PrevAppLvl1,
  //               prevAppLvl2: empData.PrevAppLvl2,
  //               prevReject: empData.PrevReject,
  //               isApprvLvl1: empData.IsApprvLvl1,
  //               isApprvLvl2: empData.IsApprvLvl2,
  //               isRejected: empData.IsRejected,
  //               reasonCode: empData.ReasonCode,
  //               totalHrs: empData.TotalHrs,
  //               empNotes: empData.EmpNotes,
  //               supvNotes: empData.SupvNotes,
  //               pMNotes: empData.PMNotes,
  //               proxyActSupv: empData.ProxyActSupv,
  //               proxyActPrjMgr: empData.ProxyActPrjMgr,
  //               isCmntExts: empData.IsCmntExts,
  //               int_Tsh: empData.Int_Tsh,
  //               lvl1ApprvName: empData.Lvl1ApprvName,
  //               lvl2ApprvName: empData.Lvl2ApprvName,
  //               selected: empData.Selected,
  //             };
  //           });
  //         let total = 0.0;
  //         empApproveData.forEach((element) => {
  //           if (element.totalHrs) {
  //             total = total + element.totalHrs;
  //           }
  //         });
  //         this.setState({
  //           approvalSheetRecords: empApproveData,
  //           // rejectedReasons: response.fRjctReson,
  //           totalHours: total.toString(),
  //           noOfEmployee: empApproveData.length.toString(),
  //         });
  //       }
  //       if (response.fRjctReson) {
  //         if (response.fRjctReson.length > 0) {
  //           const reason = response.fRjctReson.map((element) => {
  //             return {
  //               key: element.ReasonCode,
  //               value: element.Title,
  //             };
  //           });

  //           this.setState({
  //             rejectedReasons: reason,
  //             fRjctReson: response.fRjctReson,
  //           });
  //         }
  //       }
  //     }
  //   }
  // };
  private handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let isStandard = this.state.isStandard;
    let isNotWorking = this.state.isNonWorking;
    let isMissing = this.state.isMissing;
    let isApproveAll = this.state.isApproveAll;
    let isStandardDisabled = this.state.isStandardDisabled;
    let isNonWorkingDisabled = this.state.isNonWorkingDisabled;
    let isMissingDisabled = this.state.isMissingDisabled;
    if (event.target.name) {
      switch (event.target.name) {
        case "standard":
          isStandard = event.target.checked;
          if (event.target.checked) {
            isMissingDisabled = true;
          } else {
            if (isNotWorking) {
              isMissingDisabled = true;
            } else {
              isMissingDisabled = false;
            }
          }

          break;
        case "nonWorking":
          isNotWorking = event.target.checked;
          if (event.target.checked) {
            isMissingDisabled = true;
          } else {
            if (isStandard) {
              isMissingDisabled = true;
            } else {
              isMissingDisabled = false;
            }
          }
          break;
        case "missing":
          isMissing = event.target.checked;
          if (event.target.checked) {
            isStandardDisabled = true;
            isNonWorkingDisabled = true;
          } else {
            isStandardDisabled = false;
            isNonWorkingDisabled = false;
          }

          break;
        case "approveall":
          isApproveAll = event.target.checked;
          break;
      }
      this.setState({
        isStandard: isStandard,
        isMissing: isMissing,
        isNonWorking: isNotWorking,
        isApproveAll: isApproveAll,
        isStandardDisabled: isStandardDisabled,
        isMissingDisabled: isMissingDisabled,
        isNonWorkingDisabled: isNonWorkingDisabled,
      });
    }
  };
  private handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      this.setState({
        selectedValue: parseInt(event.target.value),
      });
      this.updateApprovalGrid(parseInt(event.target.value));
    }
  };

  private updateApprovalGrid = async (filterType: number) => {
    await this.retrieveEmployeeData(filterType);
  };
  private onWeekChange = (event: any) => {
    this.setState({
      currentWeek: event.target.value,
    });
  };
  private handleCheckBoxClick = (params: any) => {
    if (params) {
      let id = params.target.id.split("_")[1];
      let type = params.target.id.split("_")[0];
      let selectedCheckbox: "approver1" | "approver2" | "rejected" =
        "approver1";
      const approveSheetRecords = this.state.approvalSheetRecords;
      if (approveSheetRecords.length > 0) {
        const selectedRecordIndex = approveSheetRecords.findIndex(
          (record: fTmpEmployeeForApproval) => {
            return record.id == id;
          }
        );
        if (selectedRecordIndex > -1) {
          switch (type) {
            case "apprvLvl1":
              selectedCheckbox = "approver1";
              approveSheetRecords[selectedRecordIndex].apprvLvl1 = params.target
                .checked
                ? 1
                : 0;
              if (
                approveSheetRecords[selectedRecordIndex].apprvLvl1 ==
                approveSheetRecords[selectedRecordIndex].prevAppLvl1
              ) {
                approveSheetRecords[selectedRecordIndex].status =
                  approveSheetRecords[selectedRecordIndex].prevStatus;
                approveSheetRecords[selectedRecordIndex].statusLvl =
                  approveSheetRecords[selectedRecordIndex].prevStatusLvl;
              } else {
                approveSheetRecords[selectedRecordIndex].status =
                  "Approved Lvl1";
                approveSheetRecords[selectedRecordIndex].statusLvl = 5;
                approveSheetRecords[selectedRecordIndex].rejected = 0;
                approveSheetRecords[selectedRecordIndex].reasonCode = "";
              }
              if (params.target.checked == false) {
                approveSheetRecords[selectedRecordIndex].supvNotes = "";
              }
              break;
            case "apprvLvl2":
              selectedCheckbox = "approver2";
              approveSheetRecords[selectedRecordIndex].apprvLvl2 = params.target
                .checked
                ? 1
                : 0;
              if (
                approveSheetRecords[selectedRecordIndex].apprvLvl2 ==
                approveSheetRecords[selectedRecordIndex].prevAppLvl2
              ) {
                approveSheetRecords[selectedRecordIndex].status =
                  approveSheetRecords[selectedRecordIndex].prevStatus;
                approveSheetRecords[selectedRecordIndex].statusLvl =
                  approveSheetRecords[selectedRecordIndex].prevStatusLvl;
              } else {
                approveSheetRecords[selectedRecordIndex].status =
                  "Approved Lvl2";
                approveSheetRecords[selectedRecordIndex].statusLvl = 6;
                approveSheetRecords[selectedRecordIndex].rejected = 0;
                approveSheetRecords[selectedRecordIndex].reasonCode = "";
              }
              if (params.target.checked == false) {
                approveSheetRecords[selectedRecordIndex].pMNotes = "";
              }
              break;
            case "rejected":
              if (params.target.checked == false) {
                approveSheetRecords[selectedRecordIndex].reasonCode = "";
              }
              selectedCheckbox = "rejected";
              approveSheetRecords[selectedRecordIndex].rejected = params.target
                .checked
                ? 1
                : 0;
              if (
                approveSheetRecords[selectedRecordIndex].rejected ==
                approveSheetRecords[selectedRecordIndex].prevReject
              ) {
                approveSheetRecords[selectedRecordIndex].status =
                  approveSheetRecords[selectedRecordIndex].prevStatus;
                approveSheetRecords[selectedRecordIndex].statusLvl =
                  approveSheetRecords[selectedRecordIndex].prevStatusLvl;
              } else {
                approveSheetRecords[selectedRecordIndex].status = "Rejected";
                approveSheetRecords[selectedRecordIndex].statusLvl = 2;
                if (approveSheetRecords[selectedRecordIndex].isApprvLvl1) {
                  approveSheetRecords[selectedRecordIndex].apprvLvl1 = 0;
                  approveSheetRecords[selectedRecordIndex].supvNotes = "";
                }
                if (approveSheetRecords[selectedRecordIndex].isApprvLvl2) {
                  approveSheetRecords[selectedRecordIndex].apprvLvl2 = 0;
                  approveSheetRecords[selectedRecordIndex].pMNotes = "";
                }
              }
              break;
          }
          this.setState({
            selectedId: id,
            approvalSheetRecords: [...approveSheetRecords],
            isApprover1Login:
              approveSheetRecords[selectedRecordIndex].isApprvLvl1 == 1,
            isApprover2Login:
              approveSheetRecords[selectedRecordIndex].isApprvLvl2 == 1,
            selectedCheckbox: selectedCheckbox,
          });

          if (params.target.checked) {
            const commentObject: CommentScreenObject = {
              employeeComment:
                approveSheetRecords[selectedRecordIndex].empNotes || "",
              approver1Comment:
                approveSheetRecords[selectedRecordIndex].supvNotes || "",
              approver2Comment:
                approveSheetRecords[selectedRecordIndex].pMNotes || "",
              reasonCode:
                approveSheetRecords[selectedRecordIndex].reasonCode || "",
              selectedId: "",
              approver: undefined,
            };

            this.setState({
              commentScreenOpenedFrom: "ApproveReject",
              commentObject: commentObject,
            });
            this.changeCommentScreenState();
          }
        }
      }
    }
  };

  private handleCommentOkClick = (commentObject: CommentScreenObject) => {
    this.changeCommentScreenState();
    const approveScreenDataobject = this.state.approvalSheetRecords;
    const selectedIndex = approveScreenDataobject.findIndex((element) => {
      return element.id == commentObject.selectedId;
    });
    if (selectedIndex > -1) {
      approveScreenDataobject[selectedIndex].supvNotes =
        commentObject.approver1Comment;
      approveScreenDataobject[selectedIndex].pMNotes =
        commentObject.approver2Comment;
      approveScreenDataobject[selectedIndex].reasonCode =
        commentObject.approver == "Approver1"
          ? commentObject.reasonCode
          : commentObject.reasonCode;
      this.setState({
        approvalSheetRecords: [...approveScreenDataobject],
      });
    }
  };
  private handleCommentClick = (id: string) => {
    let commentObject: CommentScreenObject = {
      employeeComment: "",
      approver1Comment: "",
      approver2Comment: "",
      reasonCode: "",
      selectedId: "",
      approver: undefined,
    };
    const approveSheetRecords = this.state.approvalSheetRecords;
    if (approveSheetRecords.length > 0) {
      const selectedRecordIndex = approveSheetRecords.findIndex(
        (record: fTmpEmployeeForApproval) => {
          return record.id == id;
        }
      );
      if (selectedRecordIndex > -1) {
        commentObject = {
          employeeComment:
            approveSheetRecords[selectedRecordIndex].empNotes || "",
          approver1Comment:
            approveSheetRecords[selectedRecordIndex].supvNotes || "",
          approver2Comment:
            approveSheetRecords[selectedRecordIndex].pMNotes || "",
          reasonCode: approveSheetRecords[selectedRecordIndex].reasonCode || "",
          selectedId: "",
          approver:
            approveSheetRecords[selectedRecordIndex].isApprvLvl1 == 1
              ? "Approver1"
              : "Approver2",
        };
      }
    }

    this.setState({
      commentObject: commentObject,
      selectedId: id,
      commentScreenOpenedFrom: "ApproveAttachment",
    });
    this.changeCommentScreenState();
  };
  private handleGetEmployee = async () => {
    this.setState({
      isDataTableLoading: true,
    });
    await this.retrieveEmployeeData(undefined);
  };
  private handleSave = () => {
    this.saveData();
  };
  private updateSaveObject = (saveObject: ApproveScreenObj) => {
    const selectedIndex = this.state.selectedRowIndex;
    let rowData = saveObject.fTmpEmployeeForApproval;
    if (this.state.isMissing) {
      if (selectedIndex.length > 0) {
        for (let i = 0; i < selectedIndex.length; i++) {
          const selectedModelIndex: number = rowData.findIndex(
            (element: fTmpEmployeeForApproval) => {
              return element.id == selectedIndex[i];
            }
          );
          if (selectedModelIndex > -1) {
            rowData[selectedModelIndex].selected = 1;
          }
        }
        saveObject.fTmpEmployeeForApproval = rowData;
      }
    }
    return saveObject;
  };
  private saveData = async () => {
    let saveObject: ApproveScreenObj = {
      fRjctReson: this.state.fRjctReson,
      fTmpEmployeeForApproval: this.state.approvalSheetRecords,
    };

    if (saveObject) {
      saveObject = this.updateSaveObject(saveObject);
      let selectedWeekNo = this.state.currentWeek;
      selectedWeekNo = selectedWeekNo.split("-")[0]; //
      const selectedPayDate = this.state.periods.filter((object: any) => {
        return selectedWeekNo == object.key;
      });
      if (selectedPayDate && selectedPayDate.length > 0) {
        //const { qApproveSaveFn } = useFetch();
        const result: ResponseDTO = await this.props.useFetch.qApproveSaveFn(
          selectedPayDate[0].value,
          this.gettsTypeVal(),
          saveObject
        );

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
              swal(
                "QTIME",
                "Timesheet has been approved successfully",
                "success"
              ).then((value) => {
                this.updateApprovalGrid(this.state.selectedValue);
              });
            }
          }
        }
      }
    }
  };

  private handleCommentClose = () => {
    this.changeCommentScreenState();
  };
  private setSeletedIndex = (params: any) => {
    this.setState({
      selectedRowIndex: params.selectionModel,
    });
  };
  private changeCommentScreenState = () => {
    const openCommentDialog = this.state.openCommentDialog;
    this.setState({
      openCommentDialog: !openCommentDialog,
    });
  };
  private onRowSelected = (params: GridRowSelectedParams) => {
    this.setState({
      approverlvl1: params.data.lvl1ApprvName,
      approverlvl2: params.data.lvl2ApprvName,
    });
  };
  private isRowSelectable = (params: any) => {
    this.setState({
      approverlvl1: params.row.lvl1ApprvName,
      approverlvl2: params.row.lvl2ApprvName,
    });
    if (this.state.isMissing) {
      return true;
    }
    return false;
  };
  private handleEditCellChangeCommitted = (
    params: GridEditCellPropsParams,
    event?: any
  ) => {};
  render() {
    return (
      <div className={"approvalTimeSheetContent"}>
        <CommentDialog
          open={this.state.openCommentDialog}
          onClose={this.handleCommentClose}
          onOkPressed={this.handleCommentOkClick}
          employeeComment={this.state.employeeComment}
          rejectedCodes={this.state.rejectedReasons}
          isFrom={this.state.commentScreenOpenedFrom}
          isApprover1={this.state.isApprover1Login}
          isApprover2={this.state.isApprover2Login}
          selectedId={this.state.selectedId}
          isCheckBoxChecked={this.state.selectedCheckbox}
          selectedObject={this.state.commentObject}
        />
        <div className={"timeSheetTypeBox"}>
          <div className={"week"}>
            <Typography className={"dropdownTitle"} gutterBottom>
              Period Ending
            </Typography>
            <NativeSelectDropDown
              selectedVal={this.state.currentWeek.toString()}
              elements={this.state.periods}
              onChangeEvt={this.onWeekChange}
            ></NativeSelectDropDown>
          </div>
          <div className={"timeSheetType"}></div>
          <div className="btnContainer">
            <div className="btn-getEmployee">
              <Button
                variant="outlined"
                className={"margin"}
                onClick={this.handleGetEmployee}
              >
                Get Employee
              </Button>
            </div>

            <button className="btn-save">
              <i className="btnSave" onClick={this.handleSave}></i>
            </button>

            <button className="btn-Close">
              <i className="btnClose" onClick={this.props.onCloseClicked}></i>
            </button>
          </div>
        </div>
        <div className={"timeSheetType timeSheetType_2"}>
          <FormGroup row>
            <label className={" MuiFormControlLabel-root label"}>
              Timesheet Type
            </label>

            <FormControlLabel
              control={
                <Checkbox
                  disabled={this.state.isStandardDisabled}
                  checked={this.state.isStandard}
                  onChange={this.handleCheckBoxChange}
                  name="standard"
                  color="primary"
                />
              }
              label="Standard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={this.state.isNonWorkingDisabled}
                  checked={this.state.isNonWorking}
                  onChange={this.handleCheckBoxChange}
                  name="nonWorking"
                  color="primary"
                />
              }
              label="Non-Working"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isMissing}
                  disabled={this.state.isMissingDisabled}
                  onChange={this.handleCheckBoxChange}
                  name="missing"
                  color="primary"
                />
              }
              label="Missing"
            />
          </FormGroup>
        </div>
        <div className="approvalDatTable">
          <div className={"radioGroup"}>
            <FormControlLabel
              value={5}
              control={
                <Radio
                  checked={this.state.selectedValue == 5}
                  onChange={this.handleRadioChange}
                  value={5}
                  color="default"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "D" }}
                />
              }
              label="Approved Lvl1"
            />
            <FormControlLabel
              value={6}
              control={
                <Radio
                  checked={this.state.selectedValue == 6}
                  onChange={this.handleRadioChange}
                  value={6}
                  color="default"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "D" }}
                />
              }
              label="Approved Lvl2"
            />
            <FormControlLabel
              value={4}
              control={
                <Radio
                  checked={this.state.selectedValue == 4}
                  onChange={this.handleRadioChange}
                  value={4}
                  color="default"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "D" }}
                />
              }
              label="Awaiting Approvel"
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  checked={this.state.selectedValue == 2}
                  onChange={this.handleRadioChange}
                  value={2}
                  color="default"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "D" }}
                />
              }
              label="Rejected"
            />
            <FormControlLabel
              value={0}
              control={
                <Radio
                  checked={this.state.selectedValue == 0}
                  onChange={this.handleRadioChange}
                  value={0}
                  color="default"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "D" }}
                />
              }
              label="Show All"
            />
          </div>
          <div className="approveAll">
                    {/*<FormControlLabel
              control={
                <Checkbox
                  hidden={true}
                  disabled={true}
                  checked={this.state.isApproveAll}
                  onChange={this.handleCheckBoxChange}
                  name="approveall"
                  color="primary"
                />
              }
              label="Approve All"
            />*/}
          </div>
        </div>

        <div className="datatable">
          <DataTable
            apiRef={undefined}
            columns={approvalColumns}
            rowData={this.state.approvalSheetRecords}
            checkboxSelection={true}
            editRowModel={undefined}
            rowSelectFn={this.onRowSelected}
            editCellChangeCommitedFn={this.handleEditCellChangeCommitted}
            selectionModelChangeFn={this.setSeletedIndex}
            isDataTableLoading={this.state.isDataTableLoading}
            isDataTableEditable={false}
            isDataTableEditablefn={undefined}
            isRowSelectionfn={this.isRowSelectable}
          />
        </div>
        <div className="footer">
          <div className="approversContainer">
            <div className="approvers">
              <label>Approver Lvl1</label>
              <TextInput
                value={this.state.approverlvl1}
                events={{
                  onChange: (data: any) => console.log(data),
                }}
                classes={{
                  useStyles: "rejectInput",
                  inputProps: "inputStyles",
                }}
                isDisabled={true}
              />
            </div>
            <div className="approvers">
              <label>Approver Lvl2</label>
              <TextInput
                value={this.state.approverlvl2}
                events={{
                  onChange: (data: any) => console.log(data),
                }}
                classes={{
                  useStyles: "rejectInput",
                  inputProps: "inputStyles",
                }}
                isDisabled={true}
              />
            </div>
          </div>
          <div className="approverTotal">
            <div className="tot">
              <label>No of Employees</label>
              <TextInput
                value={this.state.noOfEmployee}
                events={{
                  onChange: (data: any) => console.log(data),
                }}
                classes={{
                  useStyles: "inputTot",
                  inputProps: "inputStyles",
                }}
                isDisabled={true}
              />
            </div>
            <div className="tot">
              <label>Total Hours</label>
              <TextInput
                value={this.state.totalHours}
                events={{
                  onChange: (data: any) => console.log(data),
                }}
                classes={{
                  useStyles: "inputTot",
                  inputProps: "inputStyles",
                }}
                isDisabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
let approvalColumns: GridColDef[] = [
  {
    field: "isCmntExts",
    headerName: " ",
    width: 60,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      if (params) {
        if (params.row[params.field] == 1) {
          const onClick = (params: any) => {
            (window as any).ApprovalTimeSheetClassInstance.handleCommentClick(
              params.currentTarget.id,
              params
            );
          };
          return (
            <div id={params.row["id"]} onClick={onClick}>
              <FaPaperclip />
            </div>
          );
        }
        return <div></div>;
      }
    },
  },
  {
    field: "id",
    headerName: "Employee ID",
    width: 150,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "employeeName",
    headerName: "Employee Name",
    width: 150,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tsType",
    headerName: "Timesheet Type",
    width: 150,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "pAF_No",
    headerName: "PAF No",
    width: 150,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "supvNo",
    headerName: "1st Approver Id",
    width: 150,
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    type: "editable",
  },
  {
    field: "apprvLvl1",
    headerName: "Approved Lvl1",
    width: 150,
    editable: false,
    sortable: false,
    type: "boolean",
    disableColumnMenu: true,
    renderCell: (params) => {
      let returnElement: any = "";
      if (params) {
        const onChange = (params: any) => {
          (window as any).ApprovalTimeSheetClassInstance.handleCheckBoxClick(
            params
          );
        };
        if (params.row.isApprvLvl1) {
          if (params.row.apprvLvl1 == 1) {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl1_" + params.id}
                name="apprvLvl1"
                checked
                onChange={onChange}
              />
            );
          } else {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl1_" + params.id}
                name="apprvLvl1"
                checked={false}
                onChange={onChange}
              />
            );
          }
        } else {
          if (params.row.apprvLvl1 == 1) {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl1_" + params.id}
                name="apprvLvl1"
                checked
                disabled
                onChange={onChange}
              />
            );
          } else {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl1_" + params.id}
                name="apprvLvl1"
                disabled
                checked={false}
                onChange={onChange}
              />
            );
          }
        }
        return returnElement;
      }
    },
  },
  {
    field: "apprvLvl2",
    headerName: "Approved Lv2",
    width: 150,
    editable: false,
    sortable: false,
    type: "boolean",
    disableColumnMenu: true,
    renderCell: (params) => {
      let returnElement: any = "";
      if (params) {
        const onChange = (params: any) => {
          (window as any).ApprovalTimeSheetClassInstance.handleCheckBoxClick(
            params
          );
        };
        if (params.row.isApprvLvl2) {
          if (params.row.apprvLvl2 == 1) {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl2_" + params.id}
                name="apprvLvl2"
                checked
                onChange={onChange}
              />
            );
          } else {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl2_" + params.id}
                name="apprvLvl2"
                checked={false}
                onChange={onChange}
              />
            );
          }
        } else {
          if (params.row.apprvLvl2 == 1) {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl2_" + params.id}
                name="apprvLvl2"
                checked
                disabled
                onChange={onChange}
              />
            );
          } else {
            returnElement = (
              <input
                type="checkbox"
                id={"apprvLvl2_" + params.id}
                name="apprvLvl2"
                disabled
                checked={false}
                onChange={onChange}
              />
            );
          }
        }
        return returnElement;
      }
    },
  },
  {
    field: "rejected",
    headerName: "Rejected",
    width: 150,
    editable: false,
    sortable: false,
    type: "boolean",
    disableColumnMenu: true,
    renderCell: (params) => {
      let returnElement: any = "";
      if (params) {
        const onChange = (params: any) => {
          (window as any).ApprovalTimeSheetClassInstance.handleCheckBoxClick(
            params
          );
        };
        if (params.row.isRejected) {
          if (params.row.rejected == 1) {
            returnElement = (
              <input
                type="checkbox"
                id={"rejected_" + params.id}
                name="rejected"
                checked
                onChange={onChange}
              />
            );
          } else {
            returnElement = (
              <input
                type="checkbox"
                id={"rejected_" + params.id}
                name="rejected"
                checked={false}
                onChange={onChange}
              />
            );
          }
        } else {
          if (params.row.rejected == 1) {
            returnElement = (
              <input
                type="checkbox"
                id={"rejected_" + params.id}
                name="rejected"
                checked
                disabled
                onChange={onChange}
              />
            );
          } else {
            returnElement = (
              <input
                type="checkbox"
                id={"rejected_" + params.id}
                name="rejected"
                checked={false}
                disabled
                onChange={onChange}
              />
            );
          }
        }
        return returnElement;
      }
    },
  },
  {
    field: "reasonCode",
    headerName: "Reason code",
    width: 150,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "dispTotalHrs",
    align: "right",
    headerName: "Total",
    width: 80,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
];
export default withHooksHOC(ApprovalTimeSheetClass);
