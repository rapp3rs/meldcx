import { logout, notify } from "../store/AuthStore";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor: "#d76845"
    },
}));

const Footer = () => {
    const classes = useStyles();

    const handleNotify = async (event) => {
        event.preventDefault();
        const result = await notify();

        alert(result);
    };
    
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >
                    <Grid item>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleNotify}
                        >
                            Notify
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};
export default Footer;
