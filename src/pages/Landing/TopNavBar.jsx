import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import BorderButton from "components/BorderButton";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";
import logo from "assets/svg/FBALogo.svg";
import fbaLogo from "assets/svg/FBALogo.svg";

import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

const TopNavBar = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [logInOpen, setLogInOpen] = useState(false);

    const handleSignUpClick = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setLogInOpen(false);
    };

    const handleSignInClick = () => {
        setLogInOpen(true);
    };

    return (
        <div className="flex">
            <div className="bg-primary-500 w-6"></div>
            <div className="w-[calc(100%_-_24px)] flex justify-between py-5 px-32">
                <img width="150px" src={fbaLogo} alt="logo" />

                <div className="flex items-center gap-4">
                    <div>
                        <Button
                            onClick={handleSignUpClick}
                            size="large"
                            variant="ghost"
                        >
                            Sign up
                        </Button>
                    </div>

                    <div>
                        <BorderButton
                            onClick={handleSignInClick}
                            size="large"
                            variant="contained-outlined"
                        >
                            Log in
                        </BorderButton>
                    </div>
                </div>
            </div>

            <SignUpModal open={open} handleClose={handleCloseModal} />
            <SignInModal open={logInOpen} handleClose={handleCloseModal} />
        </div>
    );
};

export default TopNavBar;
