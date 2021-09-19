import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashBoardPage.css";
import { url } from "node:inspector";
import { Button } from "@material-ui/core";

interface DashBoardPageProps {
  showStatus: boolean;
  unSubmittedTimeSheets: number;
  timeSheetsAwaitingApproval: number;
  timeSheetsApprovedLvl1: number;
  timeSheetsApprovedLvl2: number;
  rejectedTimeSheetsResubmit: number;

  timeSheetWaitingLvl1Approve: number;
  timeSheetWaitingLvl2Approve: number;
  reSubmitTimesheetAwaitedApproval: number;
  refreshStats: any;
}
interface DashBoardPageState {
  unSubmittedTimeSheets: number;
  timeSheetsAwaitingApproval: number;
  timeSheetsApprovedLvl1: number;
  timeSheetsApprovedLvl2: number;
  rejectedTimeSheetsResubmit: number;

  timeSheetWaitingLvl1Approve: number;
  timeSheetWaitingLvl2Approve: number;
  reSubmitTimesheetAwaitedApproval: number;
  emailAddress: string;
  companyImageLogo: string;
}
export default class DashBoardPage extends Component<
  DashBoardPageProps,
  DashBoardPageState
> {
  constructor(props: DashBoardPageProps) {
    super(props);
    this.state = {
      unSubmittedTimeSheets: props.unSubmittedTimeSheets,
      timeSheetsAwaitingApproval: props.timeSheetsAwaitingApproval,
      timeSheetsApprovedLvl1: props.timeSheetsApprovedLvl1,
      timeSheetsApprovedLvl2: props.timeSheetsApprovedLvl2,
      rejectedTimeSheetsResubmit: props.rejectedTimeSheetsResubmit,
      timeSheetWaitingLvl1Approve: props.timeSheetWaitingLvl1Approve,
      timeSheetWaitingLvl2Approve: props.timeSheetWaitingLvl2Approve,
      reSubmitTimesheetAwaitedApproval:
        this.props.reSubmitTimesheetAwaitedApproval,
      emailAddress: "test@gmail.com",
      companyImageLogo: "",
    };
  }

  componentDidMount() {
    this.setState({
      unSubmittedTimeSheets: this.props.unSubmittedTimeSheets,
      timeSheetsAwaitingApproval: this.props.timeSheetsAwaitingApproval,
      timeSheetsApprovedLvl1: this.props.timeSheetsApprovedLvl1,
      timeSheetsApprovedLvl2: this.props.timeSheetsApprovedLvl2,
      rejectedTimeSheetsResubmit: this.props.rejectedTimeSheetsResubmit,
      timeSheetWaitingLvl1Approve: this.props.timeSheetWaitingLvl1Approve,
      timeSheetWaitingLvl2Approve: this.props.timeSheetWaitingLvl2Approve,
      reSubmitTimesheetAwaitedApproval:
        this.props.reSubmitTimesheetAwaitedApproval,
    });
  }
  render() {
    return (
      <div className="dashboardPanel">
        <div className="leftPanel">
          {this.props.showStatus && (
            <div className="timeSheetStats">
              <div className="header">
                <h6>Personal Timesheet Entry Statistics</h6>
                <hr className="orangeLine" />
              </div>
              <Table responsive="md" striped bordered hover>
                <tbody>
                  <tr>
                    <td>{this.props.unSubmittedTimeSheets}</td>
                    <td className="alignLeft">Un-submitted Timesheets</td>
                  </tr>
                  <tr>
                    <td>{this.props.timeSheetsAwaitingApproval}</td>
                    <td className="alignLeft">Timesheets awaiting approval</td>
                  </tr>
                  <tr>
                    <td>{this.props.timeSheetsApprovedLvl1}</td>
                    <td className="alignLeft">
                      Timesheets Approved at Level 1
                    </td>
                  </tr>
                  <tr>
                    <td>{this.props.timeSheetsApprovedLvl2}</td>
                    <td className="alignLeft">
                      Timesheets Approved at Level 2
                    </td>
                  </tr>
                  <tr>
                    <td>{this.props.rejectedTimeSheetsResubmit}</td>
                    <td className="alignLeft">
                      Rejected Timesheets to be re-submitted
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
          {this.props.showStatus && (
            <div className="approveSheetStats">
              <div className="header">
                <h6>Timesheet Approval Statistics</h6>
                <hr className="orangeLine" />
              </div>
              <Table responsive="md" striped bordered hover>
                <tbody>
                  <tr>
                    <td>{this.props.timeSheetWaitingLvl1Approve}</td>
                    <td className="alignLeft">
                      Timesheets awaiting Level 1 Approval
                    </td>
                  </tr>
                  <tr>
                    <td>{this.props.timeSheetWaitingLvl2Approve}</td>
                    <td className="alignLeft">
                      Timesheets awaiting Level 2 Approval
                    </td>
                  </tr>
                  <tr>
                    <td>{this.props.reSubmitTimesheetAwaitedApproval}</td>
                    <td className="alignLeft">
                      Re-submitted Timesheets awaiting approval
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
          {this.props.showStatus && (
            <div className="refreshbtnContainer">
              <Button
                variant="outlined"
                className={"margin"}
                onClick={this.props.refreshStats}
              >
                Refresh Statistics
              </Button>
            </div>
          )}
        </div>
        <div className="rightPanel">
          <div className="companyImagePanel">
            <div className="header">
              <h6>Company Image</h6>
              <hr className="orangeLine" />
              <div style={{ height: "250px", width: "300px" }}>
                <div className="placeholder">
                  <div
                    className="myimage"
                    style={{
                      backgroundImage: `url(${this.state.companyImageLogo})`,
                    }}
                  >
                    <img />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="companySummeryPanel">
            <div className="header">
              <h6>Company Summery</h6>
              <hr className="orangeLine" />
            </div>
            <div className="summery">
              <p>
                Welcome to Chiyoda's Qtime MH Gathering System, Please select
                your action from the menu above. For any question, comments, or
                error report, please contact the following =:
              </p>
              <div className="summeryDetails">
                <div className="heading">Qtime Administrator</div>
                <div className="heading">Project Control Division</div>
                <div className="heading" style={{ display: "flex" }}>
                  Email :{" "}
                  <div className="hyperlink">{this.state.emailAddress}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
