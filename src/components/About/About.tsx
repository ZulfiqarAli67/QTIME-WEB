import { Dialog, DialogActions } from "@material-ui/core";
import { Component } from "react";
import { Button } from "react-bootstrap";
import "./About.css";

interface IAboutProps {
  open: boolean;
  onClose: () => void;
}
interface IAboutState {}
export default class About extends Component<IAboutProps, IAboutState> {
  constructor(props: IAboutProps) {
    super(props);
  }

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
          {/* <DialogContent> */}
          <div className="form-group row ">
            <div className="abountContainer">
              <h3>QTIME:</h3>
              <h6>Version : 1.00.00</h6>
              <div className="summeryContainer">
                <div className="summeryContainer2">
                  <label>QDMS Solutions Pty Ltd.,</label>
                  <br />
                  <label>Suite 212, 283 Collins St.</label>
                  <br />
                  <label>Melbourne VIC 3000</label>
                  <br />
                  <label>Australia</label>
                  <br />
                  <br />
                  <label>Ph: +61 (3) 9015 4200</label>
                  <br />
                  <label>Info: +61 (3) 6134 4686</label>
                  <br />
                  <span className="bold">Email</span>
                  <br />
                  <div className="support">
                    Support:
                    <label className="hyperlink">
                      support@gdmssolutions.com
                    </label>
                  </div>
                </div>
              </div>
              <label>
                &copy; 2001 - 2021
                <span className="hyperlink">QDMS Solutions Pty Ltd.</span>
              </label>
              <br />
              <label>All right reserved.</label>
            </div>
          </div>

          <DialogActions>
            <Button onClick={this.props.onClose} color="secondary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
