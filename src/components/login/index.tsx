import React, { useContext, createContext, useState } from "react";
import LoginDialog from "./dialog";
import { Button } from "@material-ui/core";
import "./landingScreen.css";
import { Table } from "react-bootstrap";

export default function LoginPage() {
  const [open, setOpen] = useState(false);

  const onLoginBtnClick = () => {
    setOpen(!open);
  };

  return (
    <div className="content">
      <div>
        <div>
          <div className="landingPage_header">
            <div className="landingPage_header_1"></div>
            <div className="landingPage_header_2"></div>
          </div>
          <div className="landingPage_body">
            <div className="landingPage_body_title">
              <h3>Welcome to Chiyoda's QTIME Timesheet Management System!!!</h3>
              <h5>Engineering and Construction man-hour control on Projects</h5>
            </div>
            <div className="landingPage_body_content_1">
              <div className="landingPage_body_content_1_left">
                <div className="bold font20">Qtime Administrator</div>
                <div className="bold">Project Control Department</div>
                <div>
                  <label className="bold">Email :</label>
                  <span className="hyperlink">QTIME@ykh.chiyoda.co.jp</span>
                </div>
                <div className="font12">
                  For any question, comments or error report
                </div>
              </div>
              <div className="landingPage_body_content_1_right">
                <div className="loginContainer">
                  <div className="bold font20" style={{ color: "orange" }}>
                    QUICK links
                  </div>
                  <div
                    className="loginCon bold font20"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={onLoginBtnClick}
                  >
                    <button className="login_btn">
                      <i className="login"></i>
                    </button>
                    <span>Login</span>
                  </div>
                  <div>
                    <label className="bold">FAQ - </label>{" "}
                    <label className="hyperlink bold">
                      &#60;click here!!!&#62;
                    </label>
                  </div>
                </div>
              </div>
              <div className="emptyContainer"></div>
            </div>
            <div className="landingPage_body_content_2">
              <div className="landingPage_body_content_2_left">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th
                        className="greyBackground bold italic white leftText"
                        colSpan={8}
                      >
                        Timesheet Entry Cycle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bold font14 leftText">Timesheet Entry</td>
                      <td className="bold font14 leftText">Daily</td>
                    </tr>
                    <tr>
                      <td className="bold font14 leftText">Timesheet Cutoff</td>
                      <td className="bold font14 leftText">every Sunday</td>
                    </tr>
                    <tr>
                      <td className="bold font14 leftText">
                        Timesheet Approval
                      </td>
                      <td className="bold font14 leftText">every Monday</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="landingPage_body_content_2_right">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th
                        className="greyBackground bold italic white leftText"
                        colSpan={8}
                      >
                        For All Users
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="leftText font14">
                        <span className="hyperlink">Click Here</span> for
                        Project's information <br></br>
                        (PAF Entry form, User&Approval list etc)
                      </td>
                    </tr>
                    <tr>
                      <td className="leftText font14">
                        <label className="bold">
                          Version Up <br></br>
                          "Accessing QTIME from Internet<br></br>
                          "Entering & Approving Timesheets with 0MH"
                        </label>

                        <label>
                          See Updated User Manual{" "}
                          <label className="hyperlink">
                            &#60;QTIME Web Manual&#62;
                          </label>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="emptyContainer"></div>
            </div>
            <div className="landingPage_body_footer">
              <label>
                <button className="login_btn">
                  <i className="login"></i>
                </button>
              </label>
              <label>
                Looking for
                <label className="orange">
                  &nbsp; PAF ENTRY FORM, Overtime Approval Requests,
                  User&Approver Lists
                </label>
                &nbsp;etc?
              </label>
            </div>
            <div className="btn-btnContainer">
              <Button
                variant="contained"
                className="form-input"
                size="large"
              >
                Click Here
              </Button>
            </div>
          </div>
        </div>
        <LoginDialog open={open} onClose={onLoginBtnClick}></LoginDialog>
      </div>
    </div>
  );
}
