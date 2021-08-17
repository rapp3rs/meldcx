import React from "react";
import { shallow } from "enzyme";
import Login from "./components/LogIn";

describe("Login component tests", () => {
    const wrapper = shallow(<Login />);

    it("should have a btn component", () => {
        //There should be only one button
        expect(wrapper.find("button#login")).toHaveLength(0);
    });

    it("should have input for email and password", () => {
        //Email and password input field should be present
        expect(wrapper.find("input#email")).toHaveLength(0);
        expect(wrapper.find("input#password")).toHaveLength(0);
    });
});
