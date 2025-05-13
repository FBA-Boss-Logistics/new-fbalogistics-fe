import { createTheme, responsiveFontSizes } from "@mui/material/styles";

/**
 * Theme
 */
const commonTheme = createTheme({
    breakpoints: {
        xs: "0px",
        sm: "600px",
        md: "900px",
        lg: "1200px",
        xl: "1536px",
    },
    palette: {
        primary: {
            main: "#BB9337",
            contrastText: "#FFF",
            light: "#BB9337",
            dark: "#E9B744",
            10: "#050301",
            50: "#FDF8EC",
            100: "#FDF8EC",
            200: "#FBF1DA",
            300: "#F6E2B4",
            400: "#EDC569",
            500: "#E9B744",
            600: "#BB9337",
            700: "#8E6F29",
            800: "#493915",
            900: "#33270E",
        },
        secondary: {
            main: "#8E6F29",
            contrastText: "#107569",
            25: "#EBF1FF",
            50: "#8497BE",
            100: "#7789AD",
            200: "#5E6D8C",
            300: "#44506A",
            400: "#2B3449",
            500: "#111827",
            600: "#0E131F",
            700: "#0A0E17",
            800: "#070A10",
            900: "#030508",
        },
        natural: {
            main: "#374151",
            contrastText: "#6B7280",
            dark: '#7789AD',
            25:'#FCFCFD',
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#374151",
            800: "#1F2937",
            900: "#111827",
        },
        fbBlue:{
            '50': '#E3ECFF',
            '100': '#C2D4F2',
            '200': '#A1BCE5',
            '300': '#7FA4D8',
            '400': '#5E8CCA',
            '500': '#3D74BD',
            '600': '#2F5C9A',
            '700': '#213E7B', 
        },

        success: {
            50: "#F6FEF9",
            100: "#ECFDF3",
            200: "#D1FADF",
            300: "#6CE9A6",
            400: "#32D583",
            500: "#12B76A",
            600: "#039855",
            700: "#027A48",
            800: "#05603A",
            900: "#054F31",
        },
        warning: {
            50: "#FFFAEB",
            100: "#FEF0C7",
            200: "#FEDF89",
            300: "#FEC84B",
            400: "#FDB022",
            500: "#F79009",
            600: "#DC6803",
            700: "#B54708",
            800: "#93370D",
            900: "#7A2E0E",
        },
        error: {
            50: "#FEF3F2",
            100: "#FEE4E2",
            200: "#FECDCA",
            300: "#FDA29B",
            400: "#F97066",
            500: "#F04438",
            600: "#D92D20",
            700: "#B42318",
            800: "#912018",
            900: "#7A271A",
        },
    },
    typography: {
        fontFamily: {
            h6: 'Inter',
            h3: 'Sora'
        }
    },
    components: {
        // MuiTypography: {
        //     styleOverrides: {
        //         h1: {
        //             "&.MuiTypography-gutterBottom": {
        //                 marginBottom: 32,
        //             },
        //         },
        //         gutterBottom: {
        //             marginBottom: 8, //default e.g. body1/paragraphs
        //         },
        //     },
        // },
        MuiButton: {
            defaultProps: {
                variant: "contained",
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    minWidth: "77px",
                    fontSize: "16px",
                    fontWeight: 500,
                    fontFamily: "inter",
                },
                outlined: {
                    border: "1px solid #E5E7EB", 
                    color: "#111827",
                    boxShadow: "0px 1px 3px 0px #00000014",
                    borderRadius: "100px",
                    "&:hover": {
                        background: "#fff",
                        border: "1px solid #CCCCCC",
                    },
                  
                },
                contained: {
                    textTransform: "capitalize",
                    // "&:hover": (props) => {
                    //     return {
                    //         borderStyle: "double",
                    //         borderColor:"black",
                    //         border:"2px"
                    //     };
                    // },
                    boxShadow: "0px 1px 3px 0px #00000014",
                    borderRadius: "50px",


                },
            },
            variants: [
                {
                    props: { variant: "dashboard-variant-2" }, // color/bg not working
                    style: {
                        borderRadius: "8px",
                        padding: "8px 10px",
                        justifyContent:"left",
                        background: "#222B3E",
                        border: "1px solid #667085",
                        "&:hover": {
                            // color: "white",
                            background: "#7789AD",
                            border: "1px solid #50A1EB",
                        },
                    },
                },
                {
                    props: { variant: "dashboard-variant-1" }, // color/bg not working
                    style: {
                        borderRadius: "8px",
                        padding: "8px 10px",
                        justifyContent:"left",
                        background: "#7789AD",
                        border: "1px solid #50A1EB",
                        "&:hover": {
                            // color: "white",
                            background: "#7789AD",
                            border: "1px solid #50A1EB",
                        },
                        
                    },
                },
                {
                    props: { variant: "contained-outlined" },
                    style: ({ theme }) => ({
                        background: theme.palette.primary.main,
                        color: "#FFFFFF",
                        fontWeight: "medium",
                        fontSize: "18px",
                        borderRadius: "50px",
                        boxShadow: "0px 1px 3px 0px #00000014",
                        border: `1px solid ${theme.palette.secondary.main}`,
                        minWidth: '127px',

                        "&:hover": {
                            border: `1px solid ${theme.palette.primary[500]}`,
                            background: theme.palette.primary[500],
                        },
                    }),
                },
                {
                    props: { variant: "ghost" },
                    style: ({ theme }) => ({
                        // background: "#3662E9!important",
                        color: theme.palette.primary[500],
                        borderRadius: "50px",
                        fontWeight: "medium",
                        fontSize: "18px",
                        minWidth: '127px',
                    }),
                },
                {
                    props: { variant: "ghost-outlined" },
                    style: ({ theme }) => ({
                        background: theme.palette.natural[50],
                        color: theme.palette.primary[500],
                        fontWeight: "medium",
                        fontSize: "18px",
                        borderRadius: "50px",
                        boxShadow: "0px 1px 3px 0px #00000014",
                        border: `1px solid ${theme.palette.primary[500]}`,
                        minWidth: '184px',

                       
                    }),
                },
                {
                    props: { variant: "secondary-outlined" },
                    style: ({ theme }) => ({
                        background: theme.palette.natural[100],
                        color: theme.palette.natural[900],
                        fontWeight: "medium",
                        fontSize: "18px",
                        borderRadius: "50px",
                        boxShadow: "0px 1px 3px 0px #00000014",
                        border: `1px solid ${theme.palette.natural[200]}`,
                        minWidth: '127px',

                        "&:hover": {
                            border: `1px solid ${theme.palette.primary[500]}`,
                            background: theme.palette.natural[100],
                        },
                    }),
                },
                {
                    props: { variant: "natural-200" },
                    style: {
                        background: "#E5E7EB",
                        color: "#030508",
                        borderRadius: "30px",
                        minWidth: "151px"
                    },
                },
                // {
                //     props: { variant: "transparentOutlined" }, // color/bg not working
                //     style: {
                //         background: "transparent!important",
                //         color: "#000",
                //         border: "1px solid #000",
                //     },
                // },
                // {
                //     props: { variant: "roundedOutlined" }, // color/bg not working
                //     style: {
                //         borderRadius: "21px",
                //         padding: "6px 16px",
                //         // background: "#50A1EB",
                //         border: "1px solid #667085",
                //         "&:hover": {
                //             // color: "white",
                //             background: "#E9F3FD",
                //             border: "1px solid #50A1EB",
                //         },
                //     },
                // },
            ],
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: "8px !important",
                    border: "0px solid #E4E4E7 !important",
                    "& input": {
                        padding: "6px 16px",
                    },
                    ".Mui-disabled": {
                        borderRadius: "8px !important",
                        backgroundColor: "#E4E4E7", // Add your desired background color for the disabled state here
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
              
            },
        },
        MuiInputLabel: {
            styleOverrides: {
              
            },
        },

        // MuiAutocomplete: {
        //     styleOverrides: {
        //         // option: {
        //         //     '&[aria-selected="true"]': {
        //         //         backgroundColor: "red",
        //         //     },

        //         //     "&:hover": {
        //         //         backgroundColor: "red",
        //         //     },
        //         //     backgroundColor: "black",
        //         // },
        //         input: {
        //             padding: "50px", // Add your desired padding value here
        //         },
        //     },
        // },

        MuiTab: {
            styleOverrides: {
                root: {
                    // color: "#FFFFFF !important",
                    // padding: "2px 48px",
                    // fontSize: "16px",
                    // fontFamily: "heebo",
                    // fontWeight: 400,
                    // border: "1px solid #712FFF",
                    // "&.Mui-selected": {
                    //     backgroundColor: "#712FFF",
                    //     color: "#FFFFFF !important",
                    //     borderBottom: "none!important",
                    // },
                    // "& .MuiTabs-indicator": {
                    //     display: "none !important",
                    // },
                    // "&:hover": {
                    //     backgroundColor: "#712FFF",
                    //     color: "#FFFFFF !important",
                    // },
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    // boxShadow:
                    //     "0px 20px 24px -4px rgba(16, 24, 40, 0.02), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
                    // marginBottom: "36px",
                    // borderRadius: "15px",
                    // "&:not(:last-child)": {
                    //     borderRadius: "15px",
                    // },
                    // "&:last-child": {
                    //     borderRadius: "15px",
                    // },
                    // "&::before": {
                    //     display: "none", // Remove the line on top of the Accordion
                    // },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    // flexDirection: "row-reverse",
                    // expandIcon: {
                    //     marginRight: "4rem!important", // Add spacing between icon and content (adjust as needed)
                    // },
                    // "&$expanded": {
                    //     // Customize the styles when the Accordion is expanded
                    //     marginRight: "4rem!important",
                    // },
                    // "& $expandedIconWrapper": {
                    //     marginRight: "32px!important",
                    // },
                    // "& .MuiAccordionSummary-expandIcon": {
                    //     color: "red!important", // Set the color to your desired value
                    // },
                },
            },
        },
          MuiDrawer: {
            styleOverrides: {
                root: {
                    marginRight: "-48px",
                    
                    
                },
            },
        },
    },
});

// Do your common overrides here
/**
 * Typography - body1
 */
// commonTheme.typography.body1.fontSize = "0.8rem";
// commonTheme.typography.body1.color = commonTheme.palette.text.primary;

/**
 * Typography - caption
 */
commonTheme.typography.caption.color = commonTheme.palette.text.hint;
/**
 *  ** THIS SHOULD BE LAST **
 * Root Theme
 */
const rootTheme = responsiveFontSizes(commonTheme);

export default rootTheme;
