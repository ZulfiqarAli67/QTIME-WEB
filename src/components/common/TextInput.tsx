import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//   }),
// );

interface TextInputProps {
  id?: string;
  rows?: number;
  value: string;
  placeholder?: string;
  label?: string;
  events: any;
  classes?: any;
  type?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
}

export default function TextInput(props: TextInputProps) {
  const {
    id,
    rows,
    value,
    placeholder,
    label = "",
    events = {},
    classes = {},
    type,
    fullWidth = true,
    isDisabled = false,
  } = props;
  const { onChange, ...restEvents } = events;
  const { parentClass, useStyles, errorClass, inputProps } = classes;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const fieldProps = {
    ...restEvents,
    label,
    id,
    value,
    placeholder,
    className: useStyles,
    onChange: handleChange,
  };

  if (type === "textarea") {
    delete fieldProps.type;

    fieldProps.multiline = true;
    fieldProps.rows = rows || 4;
  }

  return (
    <div>
      <TextField
        variant="outlined"
        fullWidth={fullWidth}
        InputProps={{ classes: inputProps }}
        disabled={isDisabled}
        {...fieldProps}
      />
    </div>
  );
}

// function RedditTextField(props: TextFieldProps) {
//   const classes = useStylesReddit();

//   return (
//     <TextField
//       InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
//       {...props}
//     />
//   );
// }
