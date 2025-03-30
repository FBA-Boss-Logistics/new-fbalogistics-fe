import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProfileIcon from "components/AppLayout/ProfileIcon";
import fbaLogo from "assets/svg/FBALogo.svg";

import { routes } from "routes/RouteConstants";
import { useNavigate } from "react-router-dom";

const navbarOptions = [
    {
        route: "/seller/booking",
        label: "Home",
    },
    {
        route: "/seller/announcement",
        label: "Announcement",
    },
];

const SellerTopNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Helper function to check if the current location matches the given path

    return (
        <div className="flex justify-between items-center px-8">
            <div
                className="cursor-pointer"
                onClick={() => navigate(routes.BOOKING.pathname)}
            >
                <img width="150px" src={fbaLogo} alt="logo" />
            </div>

            <div className="flex items-center min-w-[543px] justify-between">
                <div className="flex gap-6">
                    {navbarOptions?.map((option, index) => (
                        <Typography
                            key={index}
                            onClick={() => navigate(option?.route)}
                            className={`w-29 cursor-pointer flex justify-center ${
                                option?.route === location?.pathname
                                    ? "text-primary-600 border-primary-600"
                                    : "text-[#000000] border-[#00000000]"
                            }    border-solid border-x-0 border-t-0`}
                            fontWeight={500}
                            color="natural.800"
                            fontSize={18}
                        >
                            {option?.label}
                        </Typography>
                    ))}
                </div>
                <div>
                    <ProfileIcon />
                </div>
            </div>
        </div>
    );
};

export default SellerTopNav;
