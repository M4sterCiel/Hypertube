import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Flag from "react-world-flags";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function DialogSelect() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    locale: ""
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: String(event.target.value) });
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Flag code={"US"} height="16" />
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="locale-native-simple">locale</InputLabel>
              <Select
                native
                value={state.locale}
                onChange={handleChange("locale")}
                input={<Input id="locale-native-simple" />}
              >
                <option value="" />
                <option value={"en"}>English</option>
                <option value={"es"}>Español</option>
                <option value={"fr"}>Français</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="locale-simple">locale</InputLabel>
              <Select
                value={state.locale}
                onChange={handleChange("locale")}
                input={<Input id="locale-simple" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"es"}>Español</MenuItem>
                <MenuItem value={"fr"}>Français</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
