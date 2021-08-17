import { createState, useState } from "@hookstate/core";
import { Persistence } from '@hookstate/persistence';
import { getDevices, clearDevices } from "./DevicesStore";
import axios from 'axios';

const initialState = {
    isLoggedIn: false,
    token: '',
    email: ''
};

const authState = createState(initialState);

export const login = async (email, password) => {    
    const baseUrl = "http://35.201.2.209:8000/";
    const data = { email: email, password: password };

    const headers = {
        "Content-Type": "application/json",
    };

    const result = await axios
        .post(baseUrl + "login", data, { headers })
        .then((response) => {
            authState.set({
                ...initialState,
                token: response.data,
                isLoggedIn: true,
                email: email
            });

            getDevices();
            return true;
        })
        .catch((error) => {
            console.error("There was an error!", error);
            return false;
        });

    return result;
};

export const notify = async () => {    
    const baseUrl = "http://35.201.2.209:8000/";

    const data = { 
        name: "Ralp Joseph Mascarinas", 
        email: "jadfreak@yahoo.com",
        repoUrl: "https://github.com/rapp3rs/meldcx", 
        message: "It's better late than never. Booyah!" 
    };

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('auth')).token
    };

    const result = await axios
        .post(baseUrl + "notify", data, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("There was an error!", error);
            return "There was an error!";
        });

    return result;
};

export const logout = () => {
    authState.set(initialState);
    clearDevices();
};

// create react hook for consuming
export const useAuthState = () => {
    const state = useState(authState);
    state.attach(Persistence('auth'));

    return state;
};
