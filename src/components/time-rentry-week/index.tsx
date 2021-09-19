import { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NativeSelectDropDown from "../common/nativeDropdown";
import Typography from "@material-ui/core/Typography";
import { Api, ResponseDTO } from "../../utils/api/api";
import * as constantClass from "../Constants/Constants";
import { isDebuggerStatement } from "typescript";
import useFetch from "../../contexts/use-effect";

interface CodeContentProps {
  text: string;
  select: any;
  isPrimary: boolean;
}
interface CodeEntryWeekProps {
  onWeekObjectChange: any;
  handleEmployeeChange: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: 10,
      margin: 10,
    },
    week: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
      height: 50,
      justifyContent: "center",
    },
    dropdownTitle: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "15%",
      textAlign: "left",
    },
    paper: {
      "border-radius": theme.spacing(0),
      border: "1px solid #FFFFFF",
      padding: theme.spacing(0),
      paddingLeft: theme.spacing(1),
      height: theme.spacing(6),
      display: "flex",
      "justify-content": "center",
      "flex-direction": "column",
    },
    primaryRow: {
      backgroundColor: "#80d8ff",
    },
    secondryRow: {
      backgroundColor: "#f5f5f5",
    },
    weekno: {
      paddingLeft: 5,
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",

      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    weeknolbl: {
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      fontSize: "1rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    qTimeDropdown: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      alignContent: "flex-start",
    },
    periodDropDownTitle: {
      width: "40%",
    },
  })
);

export default function CodeEntryWeek(props: CodeEntryWeekProps) {
  let classes = useStyles();
  let [periods, setPeriods] = useState([]);
  let [employees, setEmployees] = useState([]);
  let [weekNo, setWeekNo] = useState([]);
  let [selectedEmployee, setSelectedEmployee] = useState("");
  let [periodObj, setPeriodObject] = useState([]);
  let [currentWeek, setCurrentWeek] = useState(String);
  const { getEmployeeList, getEndingWeek } = useFetch();

  useEffect(() => {
    getEmployees();
    getPeriodEnding();
  }, []);

  const getEmployees = async () => {
    const result: ResponseDTO = await getEmployeeList("Id,SurName,OthrNames");

    if (result.code === 200) {
      // const employeeList = result.data.slice(0, 49);

      const filteredEmployee = result.data.map((element: any) => {
        return {
          key: element.Id,
          value: `${element.DispName}`,
        };
      });
      setEmployees(filteredEmployee);
      const loggedInId = localStorage.getItem(constantClass.ID) || "";
      const loggedInSurname = localStorage.getItem(constantClass.SURNAME) || "";
      const loggedInOthername =
        localStorage.getItem(constantClass.OTHRNAMES) || "";
      if (
        loggedInId.length > 0 &&
        loggedInSurname.length > 0 &&
        loggedInOthername.length > 0
      ) {
        setSelectedEmployee(
          loggedInId +
            "-" +
            `${loggedInId} - ${loggedInSurname} ${loggedInOthername}`
        );
      }
    }
  };

  const getPeriodEnding = async () => {
    const result: ResponseDTO = await getEndingWeek();

    if (result.code === 200) {
      const periodList = result.data;
      let currentPayWeek: any = findCurrentWeekDate(periodList);
      const filteredWeeks = periodList.map((element: any) => {
        return {
          key: element.WeekNo,
          value: element.PayDate.split("T")[0],
        };
      });

      setPeriods(filteredWeeks);
      setPeriodObject(periodList);
      if (currentPayWeek && currentPayWeek.length > 0) {
        setWeekNo(currentPayWeek[0].WeekNo);
        setCurrentWeek(
          currentPayWeek[0].WeekNo +
            "-" +
            currentPayWeek[0].PayDate.split("T")[0]
        );
        const currentPayWeekIndex = periodList.findIndex((element: any) => {
          return element.WeekNo == currentPayWeek[0].WeekNo;
        });
        if (currentPayWeekIndex > -1) {
          props.onWeekObjectChange(periodList, currentPayWeekIndex);
        }
      }
    }
  };

  let findCurrentWeekDate = (periodList: any) => {
    return periodList.filter((element: any) => {
      return element.CurPayDate == 1;
    });
  };
  let onWeekChange = (event: any) => {
    setWeekNo(event.target.value.split("-")[0]);
    setCurrentWeek(event.target.value);
    props.onWeekObjectChange(periodObj, event.target.selectedIndex);
  };

  let employeeChange = (event: any) => {
    setSelectedEmployee(event.target.value);
    props.handleEmployeeChange(event);
  };
  return (
    <div className={classes.root + " empDetailContainer"}>
      <Grid container spacing={0}>
        <Grid item xs={7}>
          <div className={classes.week}>
            <Typography
              className={classes.dropdownTitle + " font15"}
              gutterBottom
            >
              Employee
            </Typography>
            <NativeSelectDropDown
              elements={employees}
              selectedVal={selectedEmployee}
              onChangeEvt={employeeChange}
            ></NativeSelectDropDown>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.week}>
            <label className={classes.weeknolbl + " font15"}>Week no: </label>
            <label className={classes.weekno + " font15"}>{weekNo}</label>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.week}>
            <Typography
              className={
                `${classes.dropdownTitle} ${classes.periodDropDownTitle}` +
                " font15"
              }
              gutterBottom
            >
              Period Ending
            </Typography>
            <NativeSelectDropDown
              selectedVal={currentWeek}
              elements={periods}
              onChangeEvt={onWeekChange}
            ></NativeSelectDropDown>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
