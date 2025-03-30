import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "service";
import HandleErrorResponse from "utils/HandleErrorResponse";
import HandleSuccessResponse from "utils/HandleSuccessResponse";
import { useNavigate, useLocation } from "react-router-dom";

export const appendQueryParams = (url, data) => {
    let resp = url + "?";
    if (data)
        Object.keys(data).forEach((key) => {
            // eslint-disable-next-line no-extra-boolean-cast
            if (Boolean(data[key])) {
                resp += `${key}=${
                    typeof data[key] === "string"
                        ? data[key]?.replaceAll("&", "%26")
                        : data[key]
                }&`;
            }
        });
    return resp;
};

const FetchSellerHomeDetail = () => {
    const method = "GET";
    return axios({
        method,
        url: "/seller/home/",
    });
};

export const FetchSellerHomeDetailApi = () => {
    return useQuery(["FETCH_SELLER_HOME_INFO"], () => FetchSellerHomeDetail(), {
        enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
        onSuccess: () => null,
        onError: (error) => {
            console.log("Error occurred while fetching data", error);
        },
    });
};

const FetchSellerShipmentDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/seller/shipments/`, {
        ...data?.sellerShipmentListPagination,
        shipment_ready_date: data?.initialDate,
    });

    return axios({
        method,
        url,
    });
};
const fetchSellerShipmentNotifications = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/chat/notifications/`, {
        ...data?.sellerShipmentListPagination,
        shipment_ready_date: data?.initialDate,
    });

    return axios({
        method,
        url,
    });
};

export const FetchSellerShipmentDetailApi = (payload) => {
    return useQuery(
        ["FETCH_SELLER_SHIPMENT_INFO", payload],
        () => FetchSellerShipmentDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            cacheTime: 0,
            staleTime: 0,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};
export const fetchSellerShipmentNotificationsApi = (payload) => {
    return useQuery(
        ["FETCH_SELLER_SHIPMENT_NOTIFICATOINS", payload],
        () => fetchSellerShipmentNotifications(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//
const FetchSellerPendingShipmentDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/seller/pending-shipments/`, {
        ...data?.sellerShipmentListPagination,
        shipment_ready_date: data?.initialDate,
    });

    return axios({
        method,
        url,
    });
};

export const FetchSellerPendingShipmentDetailApi = (payload) => {
    return useQuery(
        ["FETCH_SELLER_PENDINGS_SHIPMENT_INFO", payload],
        () => FetchSellerPendingShipmentDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};
//
const FetchSellerRecentOrderDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/seller/recent-orders/`, {
        ...(data?.sellerRecentShipmentPagination ||
            data?.sellerHomeRecentOrderPagination),
        shipment_ready_date:
            data?.initialDate || data?.initialsellerHomeRecentOrderDate,
    });

    return axios({
        method,
        url,
    });
};

export const FetchSellerRecentOrderDetailApi = (payload) => {
    return useQuery(
        ["FETCH_SELLER_RECENT_ORDER_INFO", payload],
        () => FetchSellerRecentOrderDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

const FetchSellerPastOrderDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/seller/past-orders/`, {
        ...data?.sellerPastShipmentListPagination,
        shipment_ready_date: data?.initialDate,
    });
    return axios({
        method,
        url,
    });
};

export const FetchSellerPastOrderDetailApi = (payload) => {
    return useQuery(
        ["FETCH_SELLER_PAST_ORDER_INFO", payload],
        () => FetchSellerPastOrderDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

function postSampleShipmentDetail(data) {
    return axios({
        method: "POST",
        url: "/sample-shipments/",
        data,
    });
}

export function usePostSampleShipmentDetail() {
    return useMutation({
        mutationFn: (data) => postSampleShipmentDetail(data),
    });
}

// sample shipment

const FetchSampleShipmentDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/sample-shipments/`, {
        ...data?.sellerShipmentPagination,
        created_at: data?.initialDate,
    });
    return axios({
        method,
        url,
    });
};

export const FetchSampleShipmentDetailApi = (payload) => {
    return useQuery(
        ["FETCH_SAMPLE_SHIPMENTS", payload],
        () => FetchSampleShipmentDetail(payload),
        {
            staleTime:0,
            cacheTime:0,
            enabled: Boolean(payload),
            onSuccess: null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

const FetchSellerCancelledOrderDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/seller/cancelled-shipments/`, {
        ...data?.sellerShipmentPagination,
        shipment_ready_date: data?.initialDate,
    });
    return axios({
        method,
        url,
    });
};

export const FetchSellerCancelledOrderDetailApi = (payload) => {
    const queryClient = useQueryClient();
    return useQuery(
        ["FETCH_SELLER_CANCELLED_ORDER_INFO", payload],
        () => FetchSellerCancelledOrderDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => {
                queryClient.invalidateQueries(["FETCH_CANCELLED_ORDER_INFO"]);
            },
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

const CreateShipment = (data) => {
    const method = "POST";
    const url = `shipments/`;
    return axios({ method, url, data });
};
export const useCreateShipmentQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateShipment, {
        onSuccess: () => {
            queryClient.invalidateQueries(["FETCH_LOGIN_USER_INFO"]);
        },
        onError: (error) => console.log("Error in Login", error),
    });
};

// Quotation data

const FetchQuotationDetail = (body) => {
    const method = "GET";
    return axios({
        method,
        url: `/quotations/?shipment_id=${body?.id}`,
    });
};

export const FetchQuotationDetailApi = (payload) => {
    return useQuery(
        [`QUOTATION`, payload],
        () => FetchQuotationDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//update status

const UpdateQuotationStatusDetail = (userStatusData) => {
    const data = userStatusData.payload;
    const method = "PATCH";
    const url = `/quotations/${data.user_id}/`;
    return axios({
        method,
        url,
        data,
    });
};

export const UpdateQuotationStatusDetailApi = () => {
    const queryClient = useQueryClient();

    return useMutation(UpdateQuotationStatusDetail, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries(["UPDATE_QUOTATION_STATUS"]);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

//accept or deny qutation on a shipment
const handleAcceptDeclineClickNavigation = (navigate, response) => {
    if (response?.status == "success" && response?.data?.is_accepted) {
        navigate("/seller/booking/pendingorders", { replace: true });
    } else if (
        response?.status == "success" &&
        response?.data?.is_accepted === false
    ) {
        navigate("/seller/booking/pendingorders", { replace: true });
    }
};

const UpdateQuotationStatus = (userStatusData) => {
    const id = userStatusData?.payload?.quotationId;
    const data = userStatusData?.payload?.data;
    const method = "PATCH";
    const url = `/quotations/${id}/`;
    return axios({
        method,
        url,
        data,
    });
};

export const UpdateQuotationStatusApi = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateQuotationStatus, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries([
                "FETCH_SELLER_PENDINGS_SHIPMENT_INFO",
            ]);
            queryClient.invalidateQueries(["FETCH_SELLER_RECENT_ORDER_INFO"]);
            queryClient.invalidateQueries([
                "FETCH_SELLER_CANCELLED_ORDER_INFO",
            ]);
            queryClient.invalidateQueries(["FETCH_SELLER_SHIPMENT_INFO"]);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};
