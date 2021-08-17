import { createState, useState } from "@hookstate/core";
import { Persistence } from '@hookstate/persistence';
import axios from 'axios';

const initialState = {
    devices: []
};

const deviceState = createState(initialState);

export const getDevices = async () => {
    const baseUrl = "http://35.201.2.209:8000/";

    await axios
        .get(baseUrl + "devices")
        .then((response) => {
            deviceState.set({
                ...initialState,
                devices: response.data.devices
            });
        })
        .catch((error) => {
            console.error("There was an error!", error);
        });
};

export const clearDevices = () => {
    deviceState.set(initialState);
};

// create react hook for consuming
export const useDeviceState = () => {
    const state = useState(deviceState);
    state.attach(Persistence('devices'));

    return state;
};
