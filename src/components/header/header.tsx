import { makeStyles } from "@material-ui/core/styles";
import * as constantClass from "../Constants/Constants";
import Link from "@material-ui/core/Link";
import CSS from "csstype";
import "./header.css";
import { url } from "node:inspector";
import qaHeader from "../../assets/images/qaHeader_Right2.jpg";
import { useAuth } from "../../contexts/use-auth";
import useFetch from "../../contexts/use-effect";
import { useHistory, Redirect } from "react-router-dom";

interface HeaderProps {
  enterTimeSheet: () => void;
  approvalTimeSheet: () => void;
  changePassword: () => void;
  openAboutScreen: () => void;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    height: "60px",
    "background-color": "black",
    "text-align": "center",
  },
  left: {
    color: "white",
    float: "left",
    width: "25%",
    "font-size": "40px",
    "background-color": "#df8734",
    "vertical-align": "sub",
  },
  middle: {
    color: "white",
    width: "75%",
    "padding-top": "30px",
    bottom: 0,
  },
  right: {
    float: "right",
    color: "white",
    "padding-top": "10px",
    "font-size": "30px",
    flex: 1,
  },
  headerMenue: {
    height: "30px",
    "background-color": "blue",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  "MuiTypography-colorPrimary": {
    color: "#ffffff",
  },
  "makeStyles-menHeader-6makeStyles-enterTimeSheet-8": {
    marginLeft: "16px",
  },
  menHeader: {
    color: "white",
  },
  container: {
    position: "relative",
    margin: "0 auto",
    overflow: "hidden",

    "&::after": {
      content: '""',
      position: "absolute",
      "background-color": "black",
      "padding-bottom": "241.42136%",
      width: "100%",
      bottom: 0,
      left: 0,
      transform: "rotate(135deg)",
    },
  },
  enterTimeSheet: {
    marginLeft: "16px",
  },
  logout: {},
  aboutQtime: {},
  approveTimeSheet: {},
  changePassword: {},
  compLogo: {
    backgroundImage: `url(${qaHeader})`,
  },
}));

export default function Header(props: HeaderProps) {
  const history = useHistory();
  const auth = useAuth();
  const { logOut } = useFetch();
  const preventDefault = (event: any) => event.preventDefault();
  const testClass: CSS.Properties = {};
  const classes = useStyles();
  const today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const headerMessage =
    constantClass.HEADER_ESSAGE +
    localStorage.getItem(constantClass.DISPNAME) +
    " on " +
    new Date().toDateString() +
    " " +
    time;

  const logout = () => {
    logOut();
    auth.signout(() => history.push("/"));
  };
  return (
    <div className="content">
      <div className={classes.header}>
        <div className={`${classes.left} ${classes.container}`}>QTIME</div>
        <div className={classes.middle}>{headerMessage}</div>
        {/* <div className={classes.right}>
          <img style={{height:'100%',width:'100%'}} src={qaHeader} alt="qa time logo" />
        </div> */}
      </div>
      {/* "enterTimeSheet menHeader" */}
      <div className="headerMenue">
        <div className="headerGroup1">
          <div className="menHeader enterTimeSheet font15">
            <Link onClick={props.enterTimeSheet}>
              {constantClass.ENTER_TIMESHEET}
            </Link>
          </div>
          <div className="menHeader approveTimeSheet font15">
            <Link onClick={props.approvalTimeSheet}>
              {constantClass.APPROVE_TIMESHEET}
            </Link>
          </div>
          <div className="menHeader changePassword font15">
            <Link onClick={props.changePassword}>
              {constantClass.CHANGE_PASSWORD}
            </Link>
          </div>
        </div>
        <div className="headerGroup2">
          <div className="menHeader aboutQTime font15">
            <Link onClick={props.openAboutScreen}>
              {constantClass.ABOUT_QTIME}
            </Link>
          </div>
          <div className="menHeader logout font15">
            <Link onClick={logout}>{constantClass.LOGOUT}</Link>
          </div>
        </div>
      </div>
      <div className="subHeader">{props.title}</div>
    </div>
  );
}
