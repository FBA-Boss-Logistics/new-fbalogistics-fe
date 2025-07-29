import Landing from "pages/Landing";
import LandingNew from "pages/Landing/new";
import LandingNewRebrand from "pages/Landing/new/partials/new";
import Dashboard from "pages/Shipper/Dashboard";
import Playground from "pages/Playground";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Quotes from "pages/Quotes";

import ContactUs from "pages/Shipper/Contact";
import Orders from "pages/Shipper/Dashboard/Orders";

import OrderStatus from "pages/Shipper/Dashboard/OrderStatus";
import PastOrderStatus from "pages/Shipper/Dashboard/PastOrderStatus";
import ShipmentHistoryStatus from "pages/Shipper/Dashboard/ShipmentHistoryStatus";
import PastOrders from "pages/Shipper/Dashboard/PastOrder";
import ShipmentHistory from "pages/Shipper/Dashboard/ShipmentHistory";
import AnnouncementShipper from "pages/Shipper/Dashboard/Announcement";
import Booking from "pages/Seller/Booking";
import Home from "pages/Seller/Home";
import Default from "pages/Default";

import ShipperProfile from "pages/Shipper/Dashboard/Profile";
import SellerProfile from "pages/Seller/Profile";
import RecentOrderBooking from "pages/Seller/Booking/RecentOrder";
import PastOrderBooking from "pages/Seller/Booking/PastOrder";
import MyBookingStatus from "pages/Seller/Dashboard/MyBookingStatus";
import SellerOrderStatus from "pages/Seller/Booking/SellerOrderStatus";
import SellerRecentOrderStatus from "pages/Seller/Dashboard/RecentOrderStatus";
import CancelledOrders from "pages/Seller/Booking/CancelledOrders";
import PendingOrders from "pages/Seller/Booking/PendingOrders";
import SampleShipment from "pages/Seller/Booking/SampleShipment";
import Annoucement from "pages/Seller/Announcement";
import AnnouncementShipperDetail from "pages/Shipper/Dashboard/Announcement/AnnouncementDetail";
import SampleShipmentTable from "pages/Shipper/Dashboard/SampleShipments";
import NewDashboard from "pages/Shipper/Dashboard/New";
import SellerDashboard from '../pages/Seller/Dashboard/index';
import AnnouncementDetail from "pages/Seller/Announcement/Detail";
import SignInNew from "pages/Landing/new/SignIn";
import SignUpNew from "pages/Landing/new/SignUp";
import Calculator from "pages/Seller/Calculator";
import AverageCost from "pages/AverageCost";

const RouteConstants = {
    HOME: "/",
    SHIPPERSIGNUP: "/shipper/signup",
    PLAYGROUND: "/playground",
    SHIPPERLOGIN: "/shipper/login",
    SHIPPERCONTACT: "/shipper/contact",
    SHIPPERDASHBOARD: "/shipper/dashboard",
    SHIPPERPROFILE: "/shipper/profile",
    BOOKING: "/booking",
    SELLERHOME: "/home",
    SELLERPROFILE: "/seller/profile",
    // testing
    NEWSHIPPERDASHBOARD: "/shipper/dashboard/new",


};

export const routes = {
    HOME: {
        pathname: "/",
        title: "Home",
        isPublic: true,
        element: LandingNew,
    },
    REBRAND: {
        pathname: "/rebrand",
        title: "Home",
        isPublic: true,
        element: LandingNewRebrand,
    },
    SHIPPERDASHBOARD: {
        pathname: "/shipper/dashboard",
        title: "Dashboard",
        isPublic: false,

        element: Dashboard,
    },
    LOGIN:{
        pathname: "/login",
        title: "Login",
        isPublic: true,
        element: SignInNew,
    },
    SIGNUP:{
        pathname: "/signup",
        title: "Sign up",
        isPublic: true,
        element: SignUpNew,
    },
    NEWSHIPPERDASHBOARD: {
        pathname: "/shipper/dashboard/new",
        title: "Dashboard",
        isPublic: false,
        element: NewDashboard,
    },
    PLAYGROUND: {
        pathname: "/playground",
        title: "Playground",
        isPublic: true,
        element: Playground,
    },
    SHIPPERSIGNUP: {
        pathname: "/shipper/signup",
        title: "Sign up",
        isPublic: true,
        element: SignUp,
    },
    SHIPPERLOGIN: {
        pathname: "/shipper/login",
        title: "Sign in",
        isPublic: true,
        element: SignIn,
    },
    QUOTES: {
        pathname: "/quotes",
        title: "quotes",
        isPublic: false,
        element: Quotes,
    },
    SHIPPERCONTACT: {
        pathname: "/shipper/bid/:id",
        title: "Contact",
        isPublic: false,
        element: ContactUs,
    },
    SHIPPERORDERS: {
        pathname: "/shipper/dashboard/orders",
        title: "Orders",
        isPublic: false,
        element: Orders,
    },
    SHIPPERPROFILE: {
        pathname: "shipper/profile",
        title: "Profile",
        isPublic: false,
        element: ShipperProfile,
    },
    SHIPPERPASTORDERS: {
        pathname: "/shipper/dashboard/orders/pastorders",
        title: "Past Orders",
        isPublic: false,
        element: PastOrders,
    },
    SHIPPERSHIPMENTHISTORY: {
        pathname: "/shipper/dashboard/orders/shipment-histories",
        title: "Shipment Histories",
        isPublic: false,
        element: ShipmentHistory,
    },
    SHIPPERSAMPLESHIPMENT: {
        pathname: "/shipper/dashboard/orders/sample-shipments",
        title: "Sample Shipment",
        isPublic: false,
        element: SampleShipmentTable,
    },
    SHIPPERORDERSTATUS: {
        pathname: "/shipper/dashboard/orders/status/:id",
        title: "Order Status",
        isPublic: false,
        element: OrderStatus,
    },
    SHIPPERPASTORDERSTATUS: {
        pathname: "/shipper/dashboard/orders/pastorders/status/:id",
        title: "Past Order Status",
        isPublic: false,
        element: PastOrderStatus,
    },
    SHIPPERSHIPMENTHISTORYSTATUS: {
        pathname: "/shipper/dashboard/orders/shipmenthistories/status/:id",
        title: "Shipment History Status",
        isPublic: false,
        element: ShipmentHistoryStatus,
    },
    ANNOUNCEMENT_SHIPPER: {
        pathname: "/shipper/dashboard/announcement",
        title: "Shipper Announcement",
        isPublic: false,
        element: AnnouncementShipper,
    },
    ANNOUNCEMENT_SHIPPER_DETAIL: {
        pathname: "/shipper/dashboard/announcement/:id",
        title: "Shipper Announcement Detail",
        isPublic: false,
        element: AnnouncementShipperDetail,
    },
    AVERAGECOST: {
        pathname: "/average-cost",
        title: "Average Cost",
        isPublic: false,
        element: AverageCost,
    },
    DEFAULT: {
        pathname: "/dashboard/orders/default",
        title: "Default",
        isPublic: true,
        element: Default,
    },
    BOOKING: {
        pathname: "/seller/booking",
        title: "seller booking",
        isPublic: false,
        element: Booking,
    },
    SELLERDASHBOARD: {
        pathname: "/seller/dashboard",
        title: "seller dashboard",
        isPublic: false,
        element: SellerDashboard,
    },
    SELLERBOOKINGSTATUS: {
        pathname: "/seller/booking/status",
        title: "seller booking status",
        isPublic: false,
        element: MyBookingStatus,
    },
    SELLERRECENTORDERBOOKING: {
        pathname: "/seller/booking/recentorders",
        title: "recent order",
        isPublic: false,
        element: RecentOrderBooking,
    },
    SELLERCANCELLEDORDERBOOKING: {
        pathname: "/seller/booking/cancelledorders",
        title: "cancelled order",
        isPublic: false,
        element: CancelledOrders,
    },
    SELLERSAMPLESHIPMENT: {
        pathname: "/seller/booking/sampleshipments",
        title: "sample shipment",
        isPublic: false,
        element: SampleShipment,
    },
    SELLERCALCULATOR: {
        pathname: "/seller/booking/calculator",
        title: "calculator",
        isPublic: false,
        element: Calculator,
    },
    SELLERPENDINGORDERBOOKING: {
        pathname: "/seller/booking/pendingorders",
        title: "pending order",
        isPublic: false,
        element: PendingOrders,
    },
    SELLERPASTORDERBOOKING: {
        pathname: "/seller/booking/pastorders",
        title: "past order",
        isPublic: false,
        element: PastOrderBooking,
    },
    SELLERHOME: {
        pathname: "/seller/home",
        title: "seller home",
        isPublic: false,
        element: Home,
    },
    SELLERPROFILE: {
        pathname: "seller/profile",
        title: "Profile",
        isPublic: false,
        element: SellerProfile,
    },
    SELLERSIGNUP: {
        pathname: "/seller/signup",
        title: "Sign up",
        isPublic: true,
        element: SignUp,
    },
    SELLERLOGIN: {
        pathname: "/seller/login",
        title: "Sign in",
        isPublic: true,
        element: SignIn,
    },
    SELLERRECENTORDERSTATUS: {
        pathname: "/seller/booking/recentorderstatus/:id",
        title: "Recent Order Status",
        isPublic: false,
        element: SellerRecentOrderStatus,
    },
    SELLERORDERSTATUS: {
        pathname: "/seller/booking/order/status/:id",
        title: "seller Order Status",
        isPublic: false,
        element: SellerOrderStatus,
    },
    ANNOUNCEMENT: {
        pathname: "/seller/announcement",
        title: "Seller Announcement",
        isPublic: false,
        element: Annoucement,
    },
    ANNOUNCEMENT_DETAIL: {
        pathname: "/seller/announcement/:id",
        title: "Seller Announcement Detail",
        isPublic: false,
        element: AnnouncementDetail,
    },
};

export const DashboardLinks = [
    // {
    //     name: "Dashboard",
    //     icon: DashboardIcon,
    //     subList: [],
    //     isCollapsed: false,
    //     // redirectLink: routes.SHIPPERDASHBOARD.pathname,
    //     redirectLink: "",
    // },
    // {
    //     name: "Product Research",
    //     icon: ProductResearchIcon,
    //     subList: [
    //         // {
    //         //     name: "Black Box",
    //         //     redirectLink: "",
    //         // },
    //     ],
    //     isCollapsed: false,
    //     redirectLink: "/product-research/products/",
    // },
    // {
    //     name: "Keyword Research",
    //     icon: KeywordResearch,
    //     subList: [],
    //     isCollapsed: false,
    //     redirectLink: "",
    // },
    // {
    //     name: "Academy",
    //     icon: AcademyIcon,
    //     subList: [],
    //     isCollapsed: false,
    //     redirectLink: routes.ACADEMY.pathname,
    // },
    // {
    //     name: "Help and Support",
    //     icon: HelpAndSupport,
    //     subList: [
    //         {
    //             name: "Raise Support Ticket",
    //             redirectLink: routes.SUPPORT_TICKET.pathname,
    //         },
    //         {
    //             name: "Phone & Email",
    //             redirectLink: routes.SUPPORT_EMAIL.pathname,
    //         },
    //     ],
    //     isCollapsed: true,
    //     redirectLink: "",
    // },
];

export const ProfileLinks = [
    // {
    //     name: "Connect to Amazon Account",
    //     icon: AddIcon,
    //     redirectLink: "",
    // },
    // {
    //     name: "All Settings",
    //     icon: AllSettings,
    //     redirectLink: routes.SETTINGS.pathname,
    // },
    // {
    //     name: "Subscription",
    //     icon: Subscription,
    //     redirectLink: routes.SUBSCRIPTION.pathname,
    // },
    // {
    //     name: "Academy",
    //     icon: AmazonSettings,
    //     redirectLink: routes.ACADEMY.pathname,
    // },
    // {
    //     name: "Help and Support",
    //     icon: BillingInfo,
    //     redirectLink: routes.SUPPORT_TICKET.pathname,
    // },
];

export const AllSettingLinks = [
    // {
    //     name: "Account Information",
    //     description: "Manage your account and permissions",
    //     icon: AccountInfoIcon,
    //     redirectLink: routes.ACCOUNTINFO.pathname,
    // },
    // {
    //     name: "Billing Information",
    //     description: "Manage your billing information and your invoices",
    //     icon: BillingInfoIcon,
    //     redirectLink: routes.BILLING.pathname,
    // },
    // {
    //     name: "Subscriptions",
    //     description: "Manage and update your FBA subscriptions",
    //     icon: SubscriptionIcon,
    //     redirectLink: routes.SUBSCRIPTION.pathname,
    // },
    // {
    //     name: "Email Settings",
    //     description: "Manage email notifications",
    //     icon: EmailSettingsIcon,
    //     redirectLink: "",
    // },
    // {
    //     name: "Amazon Settings",
    //     description: "Manage your amazon seller central account information",
    //     icon: AmazonSettingsIcon,
    //     redirectLink: "",
    // },
];

export const routeConstants = Object.assign(
    {},
    ...Object.keys(routes).map((routeKey) => ({
        [routeKey]: routes[routeKey].pathname,
    }))
);

export const pageDetails = (pathname) =>
    Object.values(routes).find((routeObj) => {
        return routeObj.pathname === pathname;
    });
export const commonDescription = "FBA Boss Logistics";
export default RouteConstants;

// Object.key(routeKey).find(routePath => routePath.includes(pathname.replaceAll(/[0-9]/g,'')))
