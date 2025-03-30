import ProfileIcon from "components/AppLayout/ProfileIcon";
import fbaLogo from "assets/svg/FBALogo.svg";

import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";

const TopNavBar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center align-middle px-8 border-natural-100">
            <div
                className="cursor-pointer"
                onClick={() => navigate(routes.SELLERHOME.pathname)}
            >
                <img width="150px" src={fbaLogo} alt="logo" />
            </div>

            <div>
                <ProfileIcon />
            </div>
        </div>
    );
};

export default TopNavBar;
