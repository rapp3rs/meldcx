import { useEffect } from "react";

import { useDeviceState, getDevices, clearDevices } from "../store/DevicesStore";
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import round from '../round.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ff7043"
    },
    main: {
        marginTop: "auto",
        marginBottom: "auto",
    },
    devices: {
        color: "white"
    }
}));

const Homepage = () => {
    const deviceState = useDeviceState();
    const classes = useStyles();
    
    useEffect(() => {
        const interval = setInterval(() => {
            clearDevices();
            getDevices();            
        }, 5000);
        
        return () => clearInterval(interval);
    });

    const revolvingImages = (count) => {
        let tmpDuration = (15/count)*-1;
    
        let duration = [];
        for (let i = 1; i <= count; i++) {
            duration.push((i*tmpDuration) + 's');
        }
    
        return (
            duration.map((value) => (                                        
                <div key={value} className="item" style={{animationDelay: value}}>
                    <img alt="test" style={{height: "64px", width: "64px"}} src={round} />
                </div>
            ))
        );
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <div className="center">
                            <Typography variant="h3" component="h3" align="center" className={classes.devices}>
                                {
                                    deviceState.devices.length === 0 
                                        ? <CircularProgress disableShrink /> 
                                        : <>
                                            { deviceState.devices.length }
                                            <Typography align="center" className={classes.devices}>
                                                Devices<br/>Online
                                            </Typography>
                                        </>
                                }                                
                            </Typography>
                            {revolvingImages(deviceState.devices.length)}                            
                        </div>                
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};
export default Homepage;
