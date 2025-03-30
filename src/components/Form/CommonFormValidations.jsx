import * as yup from "yup";
export const upperLowerCaseRegExp = /[A-Za-z]/;
export const digitRegExp = /(\d)/;
export const specialRegExp = /[!@#%^&*_+]/;
export const phoneRegExp = /^[0-9]{10}$/;
export const CommonFormValidations = {
    first_name: yup
        .string()
        .nullable()
        .trim()
        .required("First name is required")
        .matches(/^[a-zA-Z\s]+$/, "First name can only contain alphabets")
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters"),

    last_name: yup
        .string()
        .nullable()
        .trim()
        .required("Last name is required")
        .matches(/^[a-zA-Z\s]+$/, "Last name can only contain alphabets")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters"),
    shipment_ready_date: yup
        .date()
        .nullable()
        .typeError("Invalid date")
        .required("Shipment Date is required"),
    email: yup
        .string()
        .trim()
        .email("Invalid email format")
        .required("Email is required")
        .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Invalid email format")
        .max(50, "Email cannot exceed 50 characters"),
    otp: yup
        .string()
        .required("Otp is required")
        .min(4, "Otp must be 4 digits"),
    password: yup
        .string()
        .nullable()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password should not exceed 32 characters")
        .matches(/([a-z])/, {
            message: "Atleast one small letter",
            name: "small letter",
            excludeEmptyString: true,
        })
        .matches(/[A-Z]/, "Atleast one capital letter")
        .matches(/(\d)/, "Atleast one number")
        .matches(/(\W)/, "Atleast one special character"),
    phone: yup
        .string()
        .trim()
        .required("Phone is required")
        .matches(phoneRegExp, "Phone number is inavalid"),
    confirm_password: yup
        .string()
        .trim()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),

    fullAddress: {
        state: yup.string().required("State is required"),
        street_address: yup
            .string()
            .trim()
            .required("Street address is required")
            .max(100, "Street address must not exceed 100 characters"),
        city: yup.string().required("City is required"),
        zip_code: yup
            .string()
            .trim()
            .required("Zip code is required")
            .matches(/^\d{5}(-\d{4})?$/, "Zip code must be in a valid format")
            .max(10, "Zip code must not exceed 10 characters"),
        country: yup.string().required("Country is required"),
    },
    freight_booking_reference_number: yup
        .string()
        .trim()
        .required("Freight booking reference number is required")
        .matches(
            /^[a-zA-Z0-9\s]+$/,
            "Freight booking reference can only contain letters and numbers"
        )
        .min(
            2,
            "Freight booking reference number must be at least 2 characters"
        )
        .max(
            50,
            "Freight booking reference number cannot exceed 50 characters"
        ),
    full_address: yup.string().required("Pickup Address is required"),
    supplier_contact_name: yup
        .string()
        .required("Supplier contact name is required")
        .matches(
            /^[a-zA-Z0-9\s]+$/,
            "Suppier contact name can only contain letters and numbers"
        )
        .min(2, "Supplier contact name must be at least 2 characters")
        .max(50, "Supplier contact name cannot exceed 50 characters"),
    warehouse_address: yup
        .string()
        .trim()
        .required("Amazon warehouse Address is required")
        .min(2, "Amazon warehouse Address must be at least 2 characters")
        .max(50, "Amazon warehouse Address cannot exceed 50 characters"),
    supplier_contact_phone: yup
        .string()
        .required("Supplier contact phone number is required")
        .max(
            15,
            "Supplier contact phone number cannot exceed more than 15 digits"
        ),
    product_name: yup
        .string()
        .trim()
        .required("Product name is required")
        .matches(
            /^[a-zA-Z0-9\s]+$/,
            "Product name can only contain letters and numbers"
        )
        .min(2, "Product name must be at least 2 characters")
        .max(50, "Product name cannot exceed 50 characters"),
    productName: yup.string().trim().required("Product name is required"),
    payment: yup
        .string()
        .trim()
        .required("Amount is required")
        .matches(/^[0-9]*$/, "Inavalid amount"),
    quantity: yup
        .string()
        .trim()
        .required("Quantity is required")
        .matches(/^[0-9]*$/, "Inavalid quantity"),
    address: yup.string().trim().required("Address is required"),
    main_competitor_asin: yup
        .string()
        .required("Amazon standard identification number is required"),

    detailed_product_description: yup
        .string()
        .trim()
        .required("Product description is required")
        .min(2, "Product name must be at least 2 characters")
        .max(50, "Product name cannot exceed 50 characters"),
    additional_notes: yup
        .string()
        .trim()
        // .required("Additional Notes is required")
        .min(2, "Additional notes must be at least 2 characters")
        .max(50, "Additional notes cannot exceed 50 characters"),
    pickup_amount: yup.string().trim().required("Amount is required"),
    // fast_amount: yup
    // .string()
    // .trim()
    // .required("Amount is required"),
    fast_amount: yup
        .string()
        .trim()
        .nullable()
        .test(
            "Amount conditional validation",
            "Amount is required",
            (defaultDate, { parent }) => {
                return Boolean(defaultDate) || Boolean(parent?.normal_amount);
            }
        ),
    normal_amount: yup
        .string()
        .trim()
        .nullable()
        .test(
            "Amount conditional validation",
            "Amount is required",
            (defaultDate, { parent }) => {
                return Boolean(defaultDate) || Boolean(parent?.fast_amount);
            }
        ),
    // normal_amount: yup
    // .string()
    // .trim()
    // .required("Amount is required")
};
