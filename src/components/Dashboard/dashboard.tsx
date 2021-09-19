import { Component } from "react";
import ApprovalTimeSheetClass from "../ApprovalTimeSheet/ApprovalTimeSheetClass";
import Header from "../header/header";
import Timesheet from "../TimeSheet/timesheet";
import DashBoardPage from "./DashBoardPage";
import * as constantClass from "../Constants/Constants";
import { ResponseDTO } from "../../utils/api/api";
import ChangePasswordDialog from "../ChangePassword/ChangePasswordDialog";
import About from "../About/About";
import { getUserId } from "../../utils/helper";
import { withHooksHOC } from "../ApprovalTimeSheet/ApprovalTimeSheetHooks";

interface IDashboardState {
  title: string;
  approveTimeSheet: boolean;
  enterTimeSheet: boolean;
  changePassword: boolean;
  showAboutScreen: boolean;
  showStats: boolean;
  unSubmittedTimeSheets: number;
  timeSheetsAwaitingApproval: number;
  timeSheetsApprovedLvl1: number;
  timeSheetsApprovedLvl2: number;
  rejectedTimeSheetsResubmit: number;
  isLoading: boolean;
  timeSheetWaitingLvl1Approve: number;
  timeSheetWaitingLvl2Approve: number;
  reSubmitTimesheetAwaitedApproval: number;
}
enum TimeEntryStatType {
  unSubmittedTimeSheets = 1,
  timeSheetsAwaitingApproval = 4,
  timeSheetsApprovedLvl1 = 5,
  timeSheetsApprovedLvl2 = 6,
  rejectedTimeSheetsResubmit = 2,
}
interface IDashboardProps {
  useFetch: any;
}
class dashboard extends Component<IDashboardProps, IDashboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: constantClass.DASHBOARD,
      approveTimeSheet: false,
      enterTimeSheet: false,
      showStats: false,
      changePassword: false,
      showAboutScreen: false,
      isLoading: true,
      unSubmittedTimeSheets: 0,
      timeSheetsAwaitingApproval: 0,
      timeSheetsApprovedLvl1: 0,
      timeSheetsApprovedLvl2: 0,
      rejectedTimeSheetsResubmit: 0,
      timeSheetWaitingLvl1Approve: 0,
      timeSheetWaitingLvl2Approve: 0,
      reSubmitTimesheetAwaitedApproval: 0,
    };
  }
  async componentDidMount() {
    await this.retrieveLoggedInUserDetails();
    await this.retrieveDashBoardDetails();
  }

  private retrieveLoggedInUserDetails = async () => {
    let loggedInUserId = getUserId();
    if (loggedInUserId && loggedInUserId.length > 0) {
      //const { getLoggedInUserDetails } = useFetch();
      const result: ResponseDTO =
        await this.props.useFetch.getLoggedInUserDetails(loggedInUserId);

      if (result.code === 200) {
        const response = result.data;
        if (response.length > 0) {
          localStorage.setItem(constantClass.EMAIL, response[0].email);
          localStorage.setItem(constantClass.USERLEVEL, response[0].USERLEVEL);
          localStorage.setItem(constantClass.SURNAME, response[0].SURNAME);
          localStorage.setItem(constantClass.OTHRNAMES, response[0].OTHRNAMES);
          localStorage.setItem(constantClass.INT_KEY, response[0].INT_KEY);
          localStorage.setItem(constantClass.ID, response[0].ID);
          localStorage.setItem(constantClass.ACTIVE, response[0].ACTIVE);
          localStorage.setItem(constantClass.DISPNAME, response[0].DispName);
        }
      }
    }
  };

  // private retrieveLoggedInUserDetails = async () => {
  //   let loggedInUserId = localStorage.getItem(constantClass.LOGGEDIN_USERS);
  //   if (loggedInUserId && loggedInUserId.length > 0) {
  //     const response = await Api.getLoggedInUserDetails(loggedInUserId);
  //     if (response) {
  //       if (response.length > 0) {
  //         localStorage.setItem(constantClass.EMAIL, response[0].email);
  //         localStorage.setItem(constantClass.USERLEVEL, response[0].USERLEVEL);
  //         localStorage.setItem(constantClass.SURNAME, response[0].SURNAME);
  //         localStorage.setItem(constantClass.OTHRNAMES, response[0].OTHRNAMES);
  //         localStorage.setItem(constantClass.INT_KEY, response[0].INT_KEY);
  //         localStorage.setItem(constantClass.ID, response[0].ID);
  //         localStorage.setItem(constantClass.ACTIVE, response[0].ACTIVE);
  //       }
  //     }

  //   }
  // };
  private refreshStats = async () => {
    await this.retrieveDashBoardDetails();
  };
  private retrieveDashBoardDetails = async () => {
    //  const { getDashboardStats } = useFetch();
    const result: ResponseDTO = await this.props.useFetch.getDashboardStats();

    if (result.code === 200) {
      const response = result.data;

      if (response.fTmpTSEntrySts) {
        this.setState({
          showStats: true,
          unSubmittedTimeSheets: response.fTmpTSEntrySts[0].CountedRows,
          timeSheetsAwaitingApproval: response.fTmpTSEntrySts[1].CountedRows,
          timeSheetsApprovedLvl1: response.fTmpTSEntrySts[2].CountedRows,
          timeSheetsApprovedLvl2: response.fTmpTSEntrySts[3].CountedRows,
          rejectedTimeSheetsResubmit: response.fTmpTSEntrySts[4].CountedRows,

          timeSheetWaitingLvl1Approve:
            response.fTmpTSApprovalSts[0].CountedRows,
          timeSheetWaitingLvl2Approve:
            response.fTmpTSApprovalSts[1].CountedRows,
          reSubmitTimesheetAwaitedApproval:
            response.fTmpTSApprovalSts[2].CountedRows,
        });
      } else {
        this.setState({
          showStats: false,
        });
      }
    }
  };
  // private retrieveDashBoardDetails = async () => {
  //   const response: DashboardStats = await Api.getDashboardStats();
  //   if (response) {
  //     if (response.fTmpTSEntrySts) {
  //       this.setState({
  //         showStats: true,
  //         unSubmittedTimeSheets: response.fTmpTSEntrySts[0].CountedRows,
  //         timeSheetsAwaitingApproval: response.fTmpTSEntrySts[1].CountedRows,
  //         timeSheetsApprovedLvl1: response.fTmpTSEntrySts[2].CountedRows,
  //         timeSheetsApprovedLvl2: response.fTmpTSEntrySts[3].CountedRows,
  //         rejectedTimeSheetsResubmit: response.fTmpTSEntrySts[4].CountedRows,

  //         timeSheetWaitingLvl1Approve:
  //           response.fTmpTSApprovalSts[0].CountedRows,
  //         timeSheetWaitingLvl2Approve:
  //           response.fTmpTSApprovalSts[1].CountedRows,
  //         reSubmitTimesheetAwaitedApproval:
  //           response.fTmpTSApprovalSts[2].CountedRows,
  //       });
  //     } else {
  //       this.setState({
  //         showStats: false,
  //       });
  //     }
  //   }
  // };
  private switchToTimeSheet = () => {
    if (!this.state.enterTimeSheet) {
      this.setState({
        enterTimeSheet: !this.state.enterTimeSheet,
        approveTimeSheet: false,
        title: constantClass.ENTER_EDIT_TIMESHEET,
      });
    }
  };
  private switchToApprovalTimeSheet = () => {
    if (!this.state.approveTimeSheet) {
      this.setState({
        enterTimeSheet: false,
        approveTimeSheet: !this.state.approveTimeSheet,
        title: constantClass.APPROVE_TIMESHEET,
      });
    }
  };
  private openChangePassword = () => {
    this.setState({
      changePassword: !this.state.changePassword,
    });
  };
  private openAbout = () => {
    this.setState({
      showAboutScreen: !this.state.showAboutScreen,
    });
  };
  private switchToDashboard = () => {
    this.setState({
      enterTimeSheet: false,
      approveTimeSheet: false,
      title: constantClass.DASHBOARD,
    });
  };
  render() {
    return (
      <div>
        {/* {this.state.isLoading && (
          <div className="progressBar">
            <CircularProgress />
          </div>
        )} */}
        <Header
          title={this.state.title}
          enterTimeSheet={this.switchToTimeSheet}
          approvalTimeSheet={this.switchToApprovalTimeSheet}
          changePassword={this.openChangePassword}
          openAboutScreen={this.openAbout}
        />
        {!this.state.enterTimeSheet && !this.state.approveTimeSheet && (
          <DashBoardPage
            refreshStats={this.refreshStats}
            showStatus={this.state.showStats}
            unSubmittedTimeSheets={this.state.unSubmittedTimeSheets}
            timeSheetsAwaitingApproval={this.state.timeSheetsAwaitingApproval}
            timeSheetsApprovedLvl1={this.state.timeSheetsApprovedLvl1}
            timeSheetsApprovedLvl2={this.state.timeSheetsApprovedLvl2}
            rejectedTimeSheetsResubmit={this.state.rejectedTimeSheetsResubmit}
            timeSheetWaitingLvl1Approve={this.state.timeSheetWaitingLvl1Approve}
            timeSheetWaitingLvl2Approve={this.state.timeSheetWaitingLvl2Approve}
            reSubmitTimesheetAwaitedApproval={
              this.state.reSubmitTimesheetAwaitedApproval
            }
          />
        )}
        {this.state.showAboutScreen && (
          <About open={this.state.showAboutScreen} onClose={this.openAbout} />
        )}
        {this.state.enterTimeSheet && (
          <Timesheet onCloseClicked={this.switchToDashboard} />
        )}
        {this.state.approveTimeSheet && (
          <ApprovalTimeSheetClass onCloseClicked={this.switchToDashboard} />
        )}
        {this.state.changePassword && (
          <ChangePasswordDialog
            open={this.state.changePassword}
            onClose={this.openChangePassword}
            selectedEmployee={
              localStorage.getItem(constantClass.ID) +
                "-" +
                localStorage.getItem(constantClass.ID) +
                " - " +
                localStorage.getItem(constantClass.SURNAME) +
                " " +
                localStorage.getItem(constantClass.OTHRNAMES) || ""
            }
          />
        )}
      </div>
    );
  }
}

export default withHooksHOC(dashboard);
