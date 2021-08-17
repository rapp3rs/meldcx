import { useEffect } from "react";
import { useState } from "@hookstate/core";
import { useHistory } from "react-router-dom";
import { login, useAuthState } from "../store/AuthStore";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        border: "1px #000000 solid",
        padding: "20px",
        boxShadow: "10px 10px 0px 0px rgb(27, 35, 39)",
        backgroundColor: "white"
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
    text: {
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    }
}));

const Login = () => {
    const history = useHistory();
    const authState = useAuthState();
    const email = useState("");
    const password = useState("");
    const classes = useStyles();
    let result = "";
    
    useEffect(() => {
        if (authState.isLoggedIn.value) {
            history.replace("/");
        }
    });

    const handleLogin = async (event) => {
        event.preventDefault();
        result = await login(email.get(), password.get());

        if(!result) {
            alert("Incorrect Password");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Login
                </Typography>
                <form className={classes.form} onSubmit={handleLogin}>
                    <TextField
                        className = {classes.text}
                        placeholder="Email Address"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            )
                        }}
                        value={email.get()}
                        onChange={(e) => email.set(e.target.value)}
                    />
                    <TextField
                        className = {classes.text}
                        placeholder="Password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NewReleasesIcon />
                                </InputAdornment>
                            )
                        }}
                        value={password.get()}
                        onChange={(e) => password.set(e.target.value)}
                    />
                    <Typography align="center" component="h1" variant="h3">
                        <Button
                            id="login"
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            LOGIN
                        </Button>
                    </Typography>
                    
                </form>
            </div>
        </Container>
    );
};

export default Login;
