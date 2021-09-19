import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../contexts/use-auth";
import swal from "sweetalert";

interface LocationState {
  from: any;
}

interface SignInFormProp {
  onCancel: () => void;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  actions: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  "actions-spacing": {
    "& >:not(:first-child)": {
      marginLeft: 8,
    },
  },
}));

export default function SignIn(prop: SignInFormProp) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onCancel } = prop;
  const { from } = (location.state as LocationState) || {
    from: { pathname: "/" },
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleSignIn();
  };

  const handleSignIn = async () => {
    const response = await auth.signin(() => {}, username, password);
    if (response == "success") {
      history.replace(from);
    } else if (response) {
      swal("QTIME", response, "error");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to QTIME
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <InputLabel>UserId</InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            name="userId"
            autoComplete="userId"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputLabel>Password</InputLabel>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={`${classes.actions} ${classes["actions-spacing"]}`}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Button
              onClick={onCancel}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
