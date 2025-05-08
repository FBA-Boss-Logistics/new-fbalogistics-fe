import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { localStorageKeys } from "constants";
import { getLocalStorageItem, setLocalStorageItem } from "hooks";
import { axios } from "service";
import HandleErrorResponse from "utils/HandleErrorResponse";
import HandleSuccessResponse from "utils/HandleSuccessResponse";

const ValidateLoginCredentials = (data) => {
    const method = "POST";
    const url = `auth/login/`;
    return axios({ method, url, data });
};

export const useLoginQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(ValidateLoginCredentials, {
        onSuccess: (response) => {
            const { user, access_token, refresh_token } = response?.data || {};
            queryClient.invalidateQueries(["FETCH_LOGIN_USER_INFO"]);
            setLocalStorageItem(localStorageKeys.AUTH_TOKEN, access_token);
            setLocalStorageItem(localStorageKeys.REFRESH_TOKEN, refresh_token);
            setLocalStorageItem(localStorageKeys.USER_DETAILS, user);
        },
        onError: (error) => console.log("Error in Login", error),
    });
};

//sign up
const ValidateSignUpCredentials = (data) => {
    const method = "POST";
    const url = `auth/register/`;
    return axios({ method, url, data });
};

export const useSignUpQuery = () => {
    // const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(ValidateSignUpCredentials, {
        onSuccess: (response) => {
            const { user, access_token, refresh_token } = response?.data || {};
            queryClient.invalidateQueries(["FETCH_LOGIN_USER_INFO"]);

            setLocalStorageItem(localStorageKeys.AUTH_TOKEN, access_token);
            setLocalStorageItem(localStorageKeys.REFRESH_TOKEN, refresh_token);
            setLocalStorageItem(localStorageKeys.USER_DETAILS, user);
            // navigate(routes.PLAN.pathname);
        },
    });
};

const FetchUserDetail = () => {
    const method = "GET";
    return axios({
        method,
        url: "auth/v1/me/",
    });
};

export const FetchUserDetailApi = () => {
    return useQuery(["FETCH_LOGIN_USER_INFO"], () => FetchUserDetail(), {
        enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
        onSuccess: () => null,
        onError: (error) => {
            console.log("Error occurred while fetching data", error);
        },
    });
};

//sent otp
const ValidateSentOtp = (data) => {
    const method = "POST";
    const url = `auth/send-otp/`;
    return axios({ method, url, data });
};
export const useSendOtpQuery = () => {
    return useMutation(ValidateSentOtp);
};

//sent otp forgot
const ValidateForgotOtp = (data) => {
    const method = "POST";
    const url = `auth/password-init/`;
    return axios({ method, url, data });
};
export const useSendForgotOtpQuery = () => {
    return useMutation(ValidateForgotOtp);
};

//verify otp
const VerifyOtp = (data) => {
    const method = "POST";
    const url = `auth/verify-otp/`;
    return axios({ method, url, data });
};
export const useVerifyOtpQuery = () => {
    return useMutation(VerifyOtp);
};

//set password
const ValidateSetpassword = (data) => {
    const method = "POST";
    const url = `auth/password-reset/`;
    return axios({ method, url, data });
};
export const useSetPasswordQuery = () => {
    return useMutation(ValidateSetpassword);
};

//Refresh token
export const RefreshAccessToken = () => {
    const method = "POST";
    const url = `auth/refresh-token/`;
    const data = {
        refresh: getLocalStorageItem(localStorageKeys.REFRESH_TOKEN),
    };
    return axios({ method, url, data });
};

export const handleRefreshAuthtokens = (response) => {
    const { access_token, refresh_token } = response.data;
    setLocalStorageItem(localStorageKeys.AUTH_TOKEN, access_token);
    setLocalStorageItem(localStorageKeys.REFRESH_TOKEN, refresh_token);
};

// Logout APi
const LogOutApi = () => {
    const data = {
        refresh: getLocalStorageItem(localStorageKeys.REFRESH_TOKEN),
    };

    return axios({ method: "POST", url: `auth/logout/`, data });
};

export const useLogOutApiQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(LogOutApi, {
        onSuccess: () => {
            queryClient.clear();
        },
    });
};

// update profile api
const UpdateProfile = (data) => {
    const method = "PATCH";
    const url = `auth/v1/update-profile/`;
    return axios({
        method,
        url,
        data,
        headers: {
            'Content-Type': 'multipart/form-data', 
        }
    });
};

export const UpdateProfileApi = () => {
    // const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation(UpdateProfile, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries(["FETCH_LOGIN_USER_INFO"]);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

//change password
//Change Password API
const ChangePassword = (data) => {
    const method = "POST";
    const url = `auth/change-password/`;
    return axios({ method, url, data });
};
export const useChangePasswordQuery = () => {
    // const navigate = useNavigate();
    return useMutation(ChangePassword, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            // navigate(routes.ACCOUNTINFO.pathname);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
        // onError: (error) =>
        //   responseToast.toastError(error, 'Error while Changing Password'),
    });
};
