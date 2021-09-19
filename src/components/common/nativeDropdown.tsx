import React, { useState } from "react";
import "./nativeDropdown.css";

import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useEffect } from "react";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        "border-radius": theme.spacing(0),
      },
    },
    input: {
      height: theme.spacing(4),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(0),
      paddingTop: theme.spacing(0),
      display: "flex",
      "justify-content": "center",
      "flex-direction": "column",
      backgroundColor: "#FFFF",
      "border-radius": theme.spacing(0),
      flexWrap: "wrap",
      alignContent: "flex-start",
    },
    WithStyles: {
      paddingTop: "5px",
      height: "26px",
    },
  })
)(OutlinedInput);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      //  margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: 120,
      "-webkit-box-sizing": "border-box",
      "-moz-box-sizing": "border-box",
      "box-sizing": "border-box",
      width: "100%",
      "border-radius": theme.spacing(0),
      borderRadius: 0,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface SelectProps {
  elements: { key: string; value: string }[];
  selectedVal?: string;
  onChangeEvt?: any;
}

export default function NativeSelectDropDown(props: SelectProps) {
  const classes = useStyles();
  const [selectedVal, setVal] = useState(props.selectedVal);
  useEffect(() => {
    setInitialData();
  }, [props]);

  const setInitialData = () => {
    if (props.selectedVal && props.selectedVal.length > 0) {
      setVal(props.selectedVal);
    }
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVal(event.target.value as string);
    if (props.onChangeEvt) {
      return props.onChangeEvt(event);
    }
  };

  return (
    <FormControl size="small" className={classes.formControl}>
      {/* <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel> */}
      <NativeSelect
        id="demo-simple-select-outlined"
        value={selectedVal}
        onChange={handleChange}
        className="qTimeDropdown"
        input={<BootstrapInput />}
        inputProps={{ "aria-label": "age" }}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {props.elements &&
          props.elements.map((element) => {
            return (
              <option
                key={element.key}
                value={element.key + "-" + element.value}
              >
                {element.value}
              </option>
            );
          })}
      </NativeSelect>
    </FormControl>
  );
}
