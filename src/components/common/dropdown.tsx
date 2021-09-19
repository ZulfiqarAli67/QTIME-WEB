import React, { useState } from "react";
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

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0
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
      //padding: theme.spacing(0),
      //   borderRadius: 4,
      //   position: 'relative',
      //   backgroundColor: theme.palette.background.paper,
      //   border: '1px solid #ced4da',
      //   fontSize: 16,
      //   padding: '10px 26px 10px 12px',
      //   transition: theme.transitions.create(['border-color', 'box-shadow']),
      //   // Use the system font instead of the default Roboto font.
      //   fontFamily: [
      //     '-apple-system',
      //     'BlinkMacSystemFont',
      //     '"Segoe UI"',
      //     'Roboto',
      //     '"Helvetica Neue"',
      //     'Arial',
      //     'sans-serif',
      //     '"Apple Color Emoji"',
      //     '"Segoe UI Emoji"',
      //     '"Segoe UI Symbol"',
      //   ].join(','),
      //   '&:focus': {
      //     borderRadius: 4,
      //     borderColor: '#80bdff',
      //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      //   },
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
  elements: { key: string; value: string }[],
  selectedVal: string,
  isDisabled? : boolean,
  onSelect: (selected : any) => any;
  styles? : any,
  label? : string,
  fullWidth? : boolean,
  displayEmpty? : boolean,
  defaultText? : string
}

export default function SimpleSelect(props: SelectProps) {
  const classes = useStyles();
  const {
    elements,
    selectedVal,
    isDisabled,
    onSelect,
    label = "",
    styles = {},
    fullWidth = true,
    displayEmpty = true,
    defaultText = "",
  } = props; 
  const { formControlClass, inputClass } = styles; 
  // const [selectedVal, setVal] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value)
    // setVal(event.target.value as string);
    onSelect(event.target.value);
  };

  return (
    <FormControl size="small" className={formControlClass || classes.formControl} fullWidth={fullWidth}>
      <Select
        labelId="simple-select-outlined-label"
        disabled={isDisabled || false}
        id="simple-select-outlined"
        value={selectedVal}
        onChange={handleChange}
        className={inputClass}
        input={<BootstrapInput />}
        label={label}
        fullWidth={fullWidth}
        displayEmpty={displayEmpty}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}
      >
        <MenuItem disabled value={""}>
            {defaultText || <em>None</em>}
          </MenuItem>
        {elements &&
          elements.map((element) => {
            return (
              <MenuItem value={element.key}>
                {element.value}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
