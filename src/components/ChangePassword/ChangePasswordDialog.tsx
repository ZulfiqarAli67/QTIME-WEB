import { Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import SimpleSelect from "../common/dropdown";
import "./ChangePasswordDialog.css";
import { Api, ResponseDTO } from "../../utils/api/api";
import NativeSelectDropDown from "../common/nativeDropdown";
import swal from "sweetalert";
import * as constantClass from "../Constants/Constants";
import { withHooksHOC } from "../ApprovalTimeSheet/ApprovalTimeSheetHooks";

interface IChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  selectedEmployee: string;
  useFetch: any;
  // onOkPressed: () => void;
}
interface IChangePasswordDialogState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  selectedEmployeeIntKey: string;
  employeeList: any[];
  selectedEmployee: string;
  actualEmpList: any[];
  isCurrentPasswordDisable: boolean;
}
class ChangePasswordDialog extends Component<
  IChangePasswordDialogProps,
  IChangePasswordDialogState
> {
  constructor(props: IChangePasswordDialogProps) {
    super(props);

    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      selectedEmployeeIntKey: "",
      employeeList: [],
      selectedEmployee: "",
      actualEmpList: [],
      isCurrentPasswordDisable: false,
    };
  }

  async componentDidMount() {
    await this.retrieveEmployee();
    this.setInitialValue();
  }
  private setInitialValue = () => {
    let disable = true;
    const userLvl: string =
      localStorage.getItem(constantClass.USERLEVEL) || "0";
    if (userLvl) {
      if (parseInt(userLvl) == 1) {
        disable = false;
      }
    }
    this.setState({
      selectedEmployee: this.props.selectedEmployee,
      isCurrentPasswordDisable: disable,
    });
  };
  private retrieveEmployee = async () => {
    //const {getEmployeeList} = useFetch();
    const result: ResponseDTO = await this.props.useFetch.getEmployeeList(
      "Id,SurName,OthrNames,Int_key"
    );

      if (result.code === 200) {
          const response = result.data;
          const filteredEmployee = response.map((element: any) => {
              return {
                  key: element.Id,
                  value: `${element.Id} - ${element.SurName} ${element.OthrNames}`,
              };
          });
          this.setState({
              employeeList: filteredEmployee,
              actualEmpList: response,
          });
      }
      else {
          swal("QTIME", result.data.ExceptionMessage, "error");
      }

  };
  // private retrieveEmployee = async () => {
  //   const response = await Api.getEmployeeList("Id,SurName,OthrNames,Int_key");
  //   if (response) {
  //     const filteredEmployee = response.map((element: any) => {
  //       return {
  //         key: element.Id,
  //         value: element.SurName + " " + element.OthrNames,
  //       };
  //     });
  //     this.setState({
  //       employeeList: filteredEmployee,
  //       actualEmpList: response,
  //     });
  //   }
  // };
  private onCurrentPasswordChange = (event: any) => {
    this.setState({
      currentPassword: event.target.value,
    });
  };
  private onNewPasswordChange = (event: any) => {
    this.setState({
      newPassword: event.target.value,
    });
  };
  private onNewConfirmationPasswordChange = (event: any) => {
    this.setState({
      confirmNewPassword: event.target.value,
    });
  };

  private handleClickOk = () => {
    let selectedUserId = this.state.selectedEmployee;
    if (selectedUserId.includes("-")) {
      selectedUserId = selectedUserId.split("-")[0];
    }
    const empList = this.state.actualEmpList;
    if (selectedUserId.length > 0) {
      const selectedUserIndex = empList.findIndex((emp: any) => {
        return emp.Id == selectedUserId;
      });
      if (selectedUserIndex > -1) {
        this.changePassword(empList[selectedUserIndex].Int_key);
      }
    }
  };
  private setEmployee = (evt: any) => {
    const value = evt.target.value;
    this.setState({
      selectedEmployee: value,
    });
  };
    private changePassword = async (userIntKey: string) => {
        debugger
        const newPassword: string = this.state.newPassword;
        const currentPassword: string = this.state.currentPassword;
        const confirmNewPassword: string = this.state.confirmNewPassword;

        const userLvl: string =
            localStorage.getItem(constantClass.USERLEVEL) || "0";
        // if (userLvl) {
        //   if (parseInt(userLvl) == 1) {
        if (!(newPassword.length > 0)) {
            swal("Change password", "Please enter new password", "warning");
        }
        if (!(currentPassword.length > 0) && parseInt(userLvl) == 1) {
            swal("Change password", "Please enter current password", "warning");
        }
        if (!(confirmNewPassword.length > 0)) {
            swal(
                "Change password",
                "Please enter confirmation new password",
                "warning"
            );
        }

        if (
            newPassword.length > 0 &&
            (currentPassword.length > 0 || parseInt(userLvl) != 1) &&
            confirmNewPassword.length > 0
        ) {
            //const { changePassword } = useFetch();
            const result: ResponseDTO = await this.props.useFetch.changePassword(
                this.state.newPassword,
                this.state.confirmNewPassword,
                this.state.currentPassword,
                userIntKey
            );

            if (result.code === 200) {
                const response = result.data;
                if (response) {
                    if (response.includes("ERROR -")) {
                        swal("Change password", response.split("ERROR -")[1], "error");
                    } else if (response.includes("SUCCESS")) {
                        swal("Change password", "Successfully changed", "info");
                    }
                }
            } else {
                swal("QTIME", result.data.ExceptionMessage, "error");
            }
        }
    };
   
  // private changePassword = async (userIntKey: string) => {
  //   const newPassword: string = this.state.newPassword;
  //   const currentPassword: string = this.state.currentPassword;
  //   const confirmNewPassword: string = this.state.confirmNewPassword;
  //   if (!(newPassword.length > 0)) {
  //     swal("Change password", "Please enter new password", "warning");
  //   }
  //   if (!(currentPassword.length > 0)) {
  //     swal("Change password", "Please enter current password", "warning");
  //   }
  //   if (!(confirmNewPassword.length > 0)) {
  //     swal(
  //       "Change password",
  //       "Please enter confirmation new password",
  //       "warning"
  //     );
  //   }

  //   if (
  //     newPassword.length > 0 &&
  //     currentPassword.length > 0 &&
  //     confirmNewPassword.length > 0
  //   ) {
  //     const response = await Api.changePassword(
  //       this.state.newPassword,
  //       this.state.currentPassword,
  //       this.state.confirmNewPassword,
  //       userIntKey
  //     );
  //     if (response) {
  //       if (response.includes("ERROR -")) {
  //         swal("Change password", response.split("ERROR -")[1], "error");
  //       } else if (response.includes("SUCCESS")) {
  //         swal("Change password", "Successfully changed", "info");
  //       }
  //     }
  //   }
  // };
  render() {
    return (
      <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth={true}
          // maxWidth="sm"
          aria-labelledby="form-dialog-title"
          open={this.props.open}
          onClose={this.props.onClose}
        >
          <DialogTitle id="form-dialog-title" className="headerTitle">
            Change password
          </DialogTitle>

          {/* <DialogContent> */}
          <div className="form-group row">
            <label
              htmlFor="staticEmail"
              className="col-sm-4 col-form-label lbl"
            >
              Employee:
            </label>
            <div className="col-sm-7 cpEmployee">
              <NativeSelectDropDown
                elements={this.state.employeeList}
                onChangeEvt={this.setEmployee}
                selectedVal={this.state.selectedEmployee}
              ></NativeSelectDropDown>
            </div>
            <label
              htmlFor="currentPassword"
              className="col-sm-4 col-form-label lbl"
            >
              Enter current password:
            </label>
            <div className="col-sm-7 ">
              <input
                type="password"
                className="form-control cpContainer"
                id="currentPassword"
                onChange={this.onCurrentPasswordChange}
                disabled={this.state.isCurrentPasswordDisable}
              />
            </div>
            <label
              htmlFor="newPassword"
              className="col-sm-4 col-form-label lbl"
            >
              Enter new password:
            </label>
            <div className="col-sm-7 ">
              <input
                type="password"
                className="form-control cpContainer"
                id="newPassword"
                onChange={this.onNewPasswordChange}
              />
            </div>
            <label
              htmlFor="confirmNewPassword"
              className="col-sm-4 col-form-label lbl"
            >
              Confirm new password:
            </label>
            <div className="col-sm-7 ">
              <input
                type="password"
                className="form-control cpContainer"
                id="confirmNewPassword"
                onChange={this.onNewConfirmationPasswordChange}
              />
            </div>
          </div>

          <DialogActions>
            <Button onClick={this.handleClickOk} color="primary">
              OK
            </Button>
            <Button onClick={this.props.onClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withHooksHOC(ChangePasswordDialog);
