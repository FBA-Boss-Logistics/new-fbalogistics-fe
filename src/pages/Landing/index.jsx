import { Typography } from "@mui/material";
import TopNavBar from "./TopNavBar";
import { Icons } from "assets/Icons";
import MapImageBg from "assets/images/MapImage.svg";
import CloudImageBg from "assets/images/cloud.svg";
import NoteImageBg from "assets/images/Notes.svg";
import DashboardLogo from "assets/images/DashboardLogo.svg";
import AcceptLogo from "assets/images/AcceptLogo.svg";
import CustomerSupportLogo from "assets/images/CustomerSupportLogo.svg";
import WarehouseLogo from "assets/images/WarehouseLogo.svg";
import BackgroundLines from "assets/images/BackgroundLines.svg";
import PlaneImage from "assets/images/Plane.svg";
import TruckLogo from "assets/images/Truck.svg";
import BorderButton from "components/BorderButton";
import { useNavigate } from "react-router-dom";
import { routes } from "routes/RouteConstants";

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full">
            <div className="bg-[#fff] fixed top-0 left-0 right-0 z-[999]">
                <TopNavBar />
            </div>

            <div className="flex w-full mt-20">
                <div className="bg-primary-500 w-6"></div>
                <div
                    className="w-[calc(100%_-_24px)] flex justify-between py-5 px-32 bg-[#e9b7440d] h-[calc(100vh_-_80px)]"
                    style={{
                        backgroundImage: `url(${MapImageBg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="flex gap-4 h-full justify-between w-full custom_span">
                        <div className="pt-28">
                            <div className="pb-4">{Icons.SIMPLIFIED}</div>

                            <Typography
                                fontFamily="Sora"
                                fontSize={28}
                                color="natural.900"
                                fontWeight={700}
                            >
                                Logistics for Amazon FBA Sellers!
                            </Typography>

                            <Typography
                                className="pt-4 pb-8 max-w-[585px]"
                                fontSize={18}
                                fontWeight={400}
                                color="natural.600"
                            >
                                Let shipping agents compete for your business
                                and get the best deals for your product
                                deliveries.
                            </Typography>

                            <div className="max-w-[220px]">
                                <BorderButton
                                    size="large"
                                    variant="contained-outlined"
                                    onClick={() =>
                                        navigate(routes.SELLERSIGNUP.pathname)
                                    }
                                >
                                    Book your shipment
                                </BorderButton>
                            </div>
                        </div>
                        {/* h-[529px] */}
                        <div className="h-[730px] relative">
                            <div className="h-[529px] object">
                                <img src={PlaneImage} alt="plane moving" />
                            </div>

                            <div className="absolute bottom-24 -left-64">
                                <img
                                    src={CloudImageBg}
                                    alt="cloud background"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" flex w-full justify-center ">
                <div
                    className="w-[1200px]"
                    style={{
                        backgroundImage: `url(${BackgroundLines})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "inherit",
                        backgroundPosition: "center",
                        backgroundPositionX: "4rem",
                        backgroundPositionY: "12rem",
                    }}
                >
                    <div className="mt-20">
                        <Typography
                            fontSize={52}
                            fontWeight={600}
                            color="natural.800"
                            fontFamily="Sora"
                        >
                            How it{" "}
                            <span className="text-primary-600"> Works?</span>
                        </Typography>

                        <Typography
                            color="natural.500"
                            fontSize={18}
                            fontWeight={400}
                        >
                            Your Shipping Solution, Simplified
                        </Typography>
                    </div>

                    <div className="mt-[91px] flex justify-between">
                        <div>
                            <img src={NoteImageBg} alt="note book" />
                            <Typography
                                className="pt-4 w-56"
                                variant="h6"
                                color="natural.900"
                                fontWeight={600}
                                fontFamily="Sora"
                            >
                                <span className="text-primary-600">Start</span>{" "}
                                By Filling Out A Simple Form
                            </Typography>
                            <Typography
                                className="w-80 pt-2"
                                variant="body2"
                                fontWeight={400}
                                color="natural.700"
                            >
                                Fill in the details of your product, including
                                pickup location, delivery destination, size,
                                number of cartons.etc
                            </Typography>
                        </div>

                        <div className="pr-14 pt-4">
                            <img src={DashboardLogo} alt="dashboard icon" />
                            <Typography
                                className="pt-4 w-56"
                                variant="h6"
                                color="natural.900"
                                fontWeight={600}
                                fontFamily="Sora"
                            >
                                Place Bids Through A{" "}
                                <span className="text-primary-600">
                                    Simple Dashboard{" "}
                                </span>
                            </Typography>
                            <Typography
                                className="w-80 pt-2"
                                variant="body2"
                                fontWeight={400}
                                color="natural.700"
                            >
                                Let Shipping Agents Bid On Your Shipping Needs.
                            </Typography>
                        </div>
                    </div>

                    <div className="mt-44 flex justify-between">
                        <div className="ml-28 relative">
                            <img src={AcceptLogo} alt="Accept delivery icon" />
                            <Typography
                                className="pt-4 w-56"
                                variant="h6"
                                color="natural.900"
                                fontWeight={600}
                                fontFamily="Sora"
                            >
                                {" "}
                                Accept or{" "}
                                <span className="text-error-600">
                                    Deny
                                </span>{" "}
                            </Typography>
                            <Typography
                                className="w-80 pt-2"
                                variant="body2"
                                fontWeight={400}
                                color="natural.700"
                            >
                                Our intelligent platform auto-generates the best
                                bid for your needs. Will you accept and seize
                                the day, or deny if it doesn’t fit your
                                expectations? Your shipping, your choice.
                            </Typography>

                            <div className="absolute -top-8 -right-52">
                                <img src={TruckLogo} alt="truck logo" />
                            </div>
                        </div>

                        <div className="mt-24">
                            <img
                                src={CustomerSupportLogo}
                                alt="dashboard icon"
                            />
                            <Typography
                                className="pt-4 w-56"
                                variant="h6"
                                color="natural.900"
                                fontWeight={600}
                                fontFamily="Sora"
                            >
                                Clear{" "}
                                <span className="text-primary-600">
                                    Communication
                                </span>
                            </Typography>
                            <Typography
                                className="w-80 pt-2"
                                variant="body2"
                                fontWeight={400}
                                color="natural.700"
                            >
                                After accepting a bid, it’s important to have
                                clear and efficient communication with your
                                chosen shipping agent. That’s why we offer a
                                built-in comment feature over the accepted
                                orders.
                            </Typography>
                        </div>
                    </div>

                    <div className="mb-20">
                        <img src={WarehouseLogo} alt="Warehouse icon" />
                        <Typography
                            className="pt-4 w-80"
                            variant="h6"
                            color="natural.900"
                            fontWeight={600}
                            fontFamily="Sora"
                        >
                            Shipment Delivered to{" "}
                            <span className="text-primary-600">
                                Amazon Warehouses
                            </span>
                        </Typography>
                        <Typography
                            className="w-80 pt-2"
                            variant="body2"
                            fontWeight={400}
                            color="natural.700"
                        >
                            Once you’ve selected your preferred shipping agent
                            and agreed on the shipping details, sit back and
                            relax. The selected shipping agent will pick up your
                            products from the designated location and deliver
                            them safely to the specified Amazon warehouses.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
