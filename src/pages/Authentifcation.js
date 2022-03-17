import React, {useState, useEffect} from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  CssBaseline,
  Button,
  Alert,
  Snackbar,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../redux/userSlice";

export default function Authentification() {
  const logedIn = useSelector(state => state.userReducer.logedIn);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState();
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const vertical = "top";
  const horizontal = "center";
  useEffect(() => {
    if (logedIn) {
      navigate("/dashbored");
    }
  });

  const handelUsername = e => {
    e.preventDefault();
    setLogin(e.target.value);
  };
  const handelPassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handelLogin = async e => {
    e.preventDefault();
    dispatch(auth({login, password}))
      .unwrap()
      .then(result => {
        if (result.message) {
          setAlert(
            <Snackbar
              open={true}
              autoHideDuration={6000}
              anchorOrigin={{vertical, horizontal}}>
              <Alert variant="filled" severity="error">
                {result.message}
              </Alert>
            </Snackbar>,
          );
        }
      });
  };
  return (
    <div
      style={{
        display: "flex",
        aligneItems: "center",
        justifyContent: "center",
        marginTop: "7rem",
      }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{m: 1, bgcolor: "secondary.main"}}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="login"
              name="login"
              autoComplete="login"
              value={login}
              onChange={handelUsername}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              required
              label="mot de passe"
              variant="outlined"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={handelPassword}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="button"
              onClick={handelLogin}
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}>
              Sign In
            </Button>
          </form>
          <div className="alert">{alert}</div>
        </Box>
      </Container>
    </div>
  );
}
