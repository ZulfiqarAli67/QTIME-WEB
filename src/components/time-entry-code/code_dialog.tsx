import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CodeContent from "./code_dialog_content";
import SimpleSelect from "../common/dropdown";
import { TimeEntryCode, JobCode, getNewCode } from "../time-entry-sheet/data";
import {
  L1DTO,
  LocationDTO,
  BudgetDTO,
  FBudgeted,
  FCode03,
  FCode04,
  FCode06,
  FCode08,
  JobCodeDTO,
  JobCode01,
} from "../../utils/api/Models";
import { Api, ResponseDTO } from "../../utils/api/api";
import useFetch from "../../contexts/use-effect";

interface CodeDialogProps {
  open: boolean;
  onClose: () => void;
  code: TimeEntryCode;
  onOkPressed: (project: TimeEntryCode) => void;
  setLoader: (show: boolean) => void;
  employeeId: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primaryRow: {
      backgroundColor: "#80d8ff",
    },
    secondryRow: {
      backgroundColor: "#f5f5f5",
    },
    headerTitle: {
      backgroundColor: "#606060",
      color: "#ffff",
    },
  })
);

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0),
  },
}))(MuiDialogContent);

export default function CodeDialog(props: CodeDialogProps) {
  const classes = useStyles();
  const { getProjectCode, getJobCode, getProjectData, getLocation } =
    useFetch();
  const { setLoader } = props;
  const id = props.code.id;
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [timeEntryCode, setTimeEntryCode] = useState(props.code.codeEntry);
  const { l1, jobCode, l2, l3, l4, l5, location } = timeEntryCode;
  const classification = "0910";
  const [disabled, setDisabled] = useState(false);
  const [l1Data, setL1Data] = useState<any[]>([]);
  const [jobCodeData, setJobCodeData] = useState<any[]>([]);
  const [budgetData, setBudgetData] = useState<BudgetDTO>({
    fBudgeted: [],
    fCode03: [],
    fCode04: [],
    fCode06: [],
    fCode08: [],
  });
  const [locationData, setLocationData] = useState<any[]>([]);
  const [l2Data, setL2Data] = useState<any[]>([]);
  const [l3Data, setL3Data] = useState<any[]>([]);
  const [l4Data, setL4Data] = useState<any[]>([]);
  const [l5Data, setL5Data] = useState<any[]>([]);
  const [classificationData, setClassificationData] = useState<any[]>([
    { key: "0910", value: "0910 - JG3", title: "JG3" },
  ]);

  useEffect(() => {
    if (props.open) {
      // setTimeEntryCode(props.code.codeEntry);
      setDisabled(false);
      setInitialData();
    }
  }, [props.open]);

  useEffect(() => {
    if (props.open && l1 && !isInitialLoad) {
      getJobCodeData(l1);
    }
  }, [l1]);

  useEffect(() => {
    if (props.open && l1 && jobCode && !isInitialLoad) {
      getBudgetData(l1, jobCode);
    }
  }, [jobCode]);

  useEffect(() => {
    if (props.open && l1 && l2 && !isInitialLoad) {
      getL3Data(budgetData.fCode04, l1, l2);
    }
  }, [l2]);

  useEffect(() => {
    if (props.open && l1 && l2 && l3 && !isInitialLoad) {
      getL4Data(budgetData.fCode06, l1, l2, l3);
    }
  }, [l3]);

  useEffect(() => {
    if (props.open && l1 && l2 && l3 && l4 && !isInitialLoad) {
      getL5Data(budgetData.fCode08, l1, l2, l3, l4);
    }
  }, [l4]);

  useEffect(() => {
    if (props.open) {
      setVal(l1, props.code.codeEntry.l1);
    }
  }, [l1Data]);

  useEffect(() => {
    if (props.open && !isInitialLoad) {
      setVal(jobCodeData[0]?.key, "jobCode");
    }
  }, [jobCodeData]);

  useEffect(() => {
    if (props.open && l1 && !isInitialLoad) {
      getL2Data(budgetData.fCode03, l1);
    }
  }, [budgetData]);

  useEffect(() => {
    if (props.open && !isInitialLoad) {
      setVal(l2Data[0]?.key, "l2");
    }
  }, [l2Data]);

  useEffect(() => {
    if (props.open && !isInitialLoad) {
      setVal(l3Data[0]?.key, "l3");
    }
  }, [l3Data]);

  useEffect(() => {
    if (props.open && !isInitialLoad) {
      setVal(l4Data[0]?.key, "l4");
    }
  }, [l4Data]);

  useEffect(() => {
    if (props.open && !isInitialLoad) {
      setVal(l5Data[0]?.key, "l5");
    }
  }, [l5Data]);

  useEffect(() => {
    if (props.open && !isInitialLoad) {
      setVal(locationData[0]?.key, "location");
    }
  }, [locationData]);

  useEffect(() => {
    if (props.open && isInitialLoad) {
      setLoader(false);
      setInitialLoad(false);
    }
  }, [timeEntryCode]);

  // useEffect(() => {
  //   if (props.open && !isInitialLoad){
  //     if(locationData.length > 0)
  //     {
  //       const newCode = props.code.codeEntry;
  //       newCode.location = locationData[0]?.key;
  //       setTimeEntryCode(newCode);
  //     }
  //   }
  // }, [isInitialLoad]);

  const setInitialData = async () => {
    setLoader(true);
    const l1List: L1DTO[] = await getL1Data();
    setL1Data(mapData(l1List, "CODE01", "TITLE"));
    const locationList: LocationDTO[] = await getLocationData();
    setLocationData(mapData(locationList, "CODE", "TITLE"));

    if (props.code.id > 0) {
      const { l1, l2, l3, l4, jobCode } = props.code.codeEntry;
      await getJobCodeData(l1);
      const budgetData: BudgetDTO = await getBudgetCodes(l1, jobCode);
      setBudgetData(budgetData);
      getL2Data(budgetData.fCode03, l1);
      getL3Data(budgetData.fCode04, l1, l2);
      getL4Data(budgetData.fCode06, l1, l2, l3);
      getL5Data(budgetData.fCode08, l1, l2, l3, l4);
      setTimeEntryCode(props.code.codeEntry);
    }
  };

  // const loadOtherData = async () => {
  //   const l1List: L1DTO[] = await getL1Data();
  //   const locationList: LocationDTO[] = await getLocationData();
  //   setL1Data(mapData(l1List, "CODE01", "TITLE"));
  //   setLocationData(mapData(locationList, "CODE", "TITLE"));

  //   if (props.code.id > 0) {
  //     await getJobCodeData();
  //     // await getBudgetData();
  //     return;
  //   }
  //   setInitialLoad(false);
  // };

  const handleClickOk = () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    const newCode: TimeEntryCode = {
      id: props.code.id,
      codeEntry: {
        l1: l1,
        jobCode: jobCode,
        l2: l2,
        l3: l3,
        l4: l4,
        l5: l5,
        classification: classification,
        location: location,
        l3Title: getTitle(l3, l3Data),
        l4Title: getTitle(l4, l4Data),
      },
      int_change: props.code.int_change,
    };
    props.onOkPressed(newCode);
    handleClickCancel();
    // setDefault();
    // props.onClose();
  };

  const handleClickCancel = () => {
    setDefault();
    props.onClose();
  };

  const setDefault = () => {
    setTimeEntryCode(getNewCode().codeEntry);
    setInitialLoad(true);
    setJobCodeData([]);
    setBudgetData({
      fBudgeted: [],
      fCode03: [],
      fCode04: [],
      fCode06: [],
      fCode08: [],
    });
    setLocationData([]);
    setL1Data([]);
    setL2Data([]);
    setL3Data([]);
    setL4Data([]);
    setL5Data([]);
  };

  const getTitle = (key: string, data: any[]): string => {
    let title = "";
    data.forEach((val) => {
      if (val.key === key) {
        title = val.title;
      }
    });
    return title;
  };

  const getL1Data = async (): Promise<L1DTO[]> => {
    const result: ResponseDTO = await getProjectCode(props.employeeId);

    if (result.code === 200) {
      const l1Data: L1DTO[] = result.data;
      return l1Data;
    }

    return [];
  };

  const getJobCodes = async (l1Code: string): Promise<JobCodeDTO> => {
    const result: ResponseDTO = await getJobCode(props.employeeId, l1Code);

    if (result.code === 200) {
      const jobCodeData: JobCodeDTO = result.data;
      return jobCodeData;
    }

    return {
      fJobCodes: [],
      fCode02: [],
    };
  };

  const getBudgetCodes = async (
    l1Code: string,
    jobCode = "-"
  ): Promise<BudgetDTO> => {
    const result: ResponseDTO = await getProjectData(
      props.employeeId,
      l1Code,
      jobCode
    );

    if (result.code === 200) {
      const budgetData: BudgetDTO = result.data;
      return budgetData;
    }

    return {
      fBudgeted: [],
      fCode03: [],
      fCode04: [],
      fCode06: [],
      fCode08: [],
    };
  };

  const getLocationData = async (): Promise<LocationDTO[]> => {
    const result: ResponseDTO = await getLocation(props.employeeId);

    if (result.code === 200) {
      const locationData: LocationDTO[] = result.data;
      return locationData;
    }

    return [];
  };

  const getJobCodeData = async (l1Code: string) => {
    const newJobCodes = await getJobCodes(l1Code);
    if (newJobCodes.fCode02.length > 0) {
      const mappedData = mapData(newJobCodes.fCode02, "Code02", "Title");
      setJobCodeData(mappedData);
    }
  };

  const getBudgetData = async (l1Code: string, jobKey: string) => {
    const newBudgetCodes = await getBudgetCodes(l1Code, jobKey);
    setBudgetData(newBudgetCodes);
    // if (!isParentChanged) {
    //   mapBudgetData(newBudgetCodes);
    // }
  };

  // const mapBudgetData = () => {
  //   getL2Data(budgetData.fCode03);
  //   getL3Data(budgetData.fCode04);
  //   getL4Data(budgetData.fCode06);
  //   getL5Data(budgetData.fCode08);
  // }

  const getL2Data = (codeObj: FCode03[], l1Code: string) => {
    if (codeObj && codeObj.length > 0) {
      const l2Obj = filterBudgetData(codeObj, ["Code01"], [l1Code], "Code03");
      if (l2Obj.length > 0) {
        setL2Data(l2Obj);
      }
    }
  };

  const getL3Data = (codeObj: FCode04[], l1Code: string, l2Code: string) => {
    if (codeObj && codeObj.length > 0) {
      const l3Obj = filterBudgetData(
        codeObj,
        ["Code01", "Code03"],
        [l1Code, l2Code],
        "Code04"
      );
      if (l3Obj.length > 0) {
        setL3Data(l3Obj);
      }
    }
  };

  const getL4Data = (
    codeObj: FCode06[],
    l1Code: string,
    l2Code: string,
    l3Code: string
  ) => {
    if (codeObj && codeObj.length > 0) {
      const l4Obj = filterBudgetData(
        codeObj,
        ["Code01", "Code03", "Code04"],
        [l1Code, l2Code, l3Code],
        "Code06"
      );
      if (l4Obj.length > 0) {
        setL4Data(l4Obj);
      }
    }
  };

  const getL5Data = (
    codeObj: FCode08[],
    l1Code: string,
    l2Code: string,
    l3Code: string,
    l4Code: string
  ) => {
    if (codeObj && codeObj.length > 0) {
      const l5Obj = filterBudgetData(
        codeObj,
        ["Code01", "Code03", "Code04", "Code06"],
        [l1Code, l2Code, l3Code, l4Code],
        "Code08"
      );
      if (l5Obj.length > 0) {
        setL5Data(l5Obj);
      }
    }
  };

  const mapData = (data: any, keyProp: string, titleProp: string) => {
    const mappedData = data.map((code: any) => {
      return {
        key: code[keyProp],
        value: `${code[keyProp]} - ${code[titleProp]}`,
        title: code[titleProp],
      };
    });

    return mappedData;
  };

  const setVal = (val: string, keyProp: string) => {
    const newCode = {
      ...timeEntryCode,
      [keyProp]: val,
    };
    setTimeEntryCode(newCode);
  };

  const filterBudgetData = (
    data: any[],
    keys: string[],
    values: string[],
    code: string
  ) => {
    const filteredObj = data.reduce((filtered: any[], option: any) => {
      if (checkPropertiesValEqual(option, keys, values)) {
        var someNewValue = {
          key: option[code],
          value: `${option[code]} - ${option.Title}`,
          title: option.Title,
        };
        filtered.push(someNewValue);
      }
      return filtered;
    }, []);

    return filteredObj;
  };

  const checkPropertiesValEqual = (
    data: any,
    keys: string[],
    values: string[]
  ): boolean => {
    for (let i = 0; i < keys.length; i++) {
      if (data[keys[i]] != values[i]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="detailContainer1">
      <Dialog
        className={"detailContainer1_1"}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
        open={!isInitialLoad && props.open}
        onClose={props.onClose}
      >
        <DialogTitle id="form-dialog-title" className={classes.headerTitle}>
          {props.code.id == 0 ? "Add Codes" : "Edit Codes"}
        </DialogTitle>
        <DialogContent dividers>
          <CodeContent
            text="Project(L1)"
            data={l1Data}
            currentVal={l1}
            prop={"l1"}
            onChange={setVal}
            defaultText={"Select Project"}
          />
          <CodeContent
            text="Job Code"
            data={jobCodeData}
            currentVal={jobCode}
            prop={"jobCode"}
            isPrimary={false}
            onChange={setVal}
          />
          <CodeContent
            text="L2"
            data={l2Data}
            currentVal={l2}
            prop={"l2"}
            isPrimary={false}
            onChange={setVal}
          />
          <CodeContent
            text="L3"
            data={l3Data}
            currentVal={l3}
            prop={"l3"}
            onChange={setVal}
          />
          <CodeContent
            text="L4"
            data={l4Data}
            currentVal={l4}
            prop={"l4"}
            isPrimary={false}
            onChange={setVal}
          />
          <CodeContent
            text="Dept(L5)"
            data={l5Data}
            currentVal={l5}
            prop={"l5"}
            onChange={setVal}
          />
          <CodeContent
            text="Classification"
            data={classificationData}
            currentVal={classification}
            prop={"classification"}
            isPrimary={false}
            onChange={setVal}
          />
          <CodeContent
            text="Location"
            data={locationData}
            currentVal={location}
            prop={"location"}
            isPrimary={false}
            onChange={setVal}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disabled || !l1}
            onClick={handleClickOk}
            color="primary"
          >
            OK
          </Button>
          <Button onClick={handleClickCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
