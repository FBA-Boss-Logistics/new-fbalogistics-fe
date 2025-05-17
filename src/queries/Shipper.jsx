import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "service";
import HandleErrorResponse from "utils/HandleErrorResponse";
import HandleSuccessResponse from "utils/HandleSuccessResponse";
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

//list all shipments

const FetchShipmentDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/shipper/shipments/`, {
        ...data?.shipmentListPagination,
        shipment_ready_date: data?.initialShipmentDate,
    });
    return axios({
        method,
        url,
    });
};

export const FetchShipmentDetailApi = (payload) => {
    const queryClient = useQueryClient();

    return useQuery(
        ["FETCH_SHIPMENT_INFO", payload],
        () => FetchShipmentDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => {
                //queryClient.invalidateQueries("FETCH_SHIPMENT_INFO");
            },
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//fetch recent order detail

const FetchRecentOrderDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/shipper/recent-orders/`, {
        ...data?.recentOrderListPagination,
    });
    return axios({
        method,
        url,
    });
};

export const FetchRecentOrderDetailApi = (payload) => {
    return useQuery(
        ["FETCH_RECENT_ORDER_INFO", payload],
        () => FetchRecentOrderDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            staleTime:0,
            cacheTime:0,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//fetch past order detail
const FetchPastOrderDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/shipper/past-orders/`, {
        ...data?.pastOrderListPagination,
    });

    return axios({
        method,
        url,
    });
};

export const FetchPastOrderDetailApi = (payload) => {
    return useQuery(
        ["FETCH_PAST_ORDER_INFO", payload],
        () => FetchPastOrderDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

// getting shipment history data
const fetchShimpentHistoryDetail = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/shipper/quotation-history`, {
        ...data?.pastOrderListPagination,
    });

    return axios({
        method,
        url,
    });
};

export const FetchShipmentHistoryDetailApi = (payload) => {
    return useQuery(
        ["FETCH_SHIPMENT_HISTORY_INFO", payload],
        () => fetchShimpentHistoryDetail(payload),
        {
            enabled: Boolean(payload),
            onSuccess: (data) => null,
            onError: (error) => null,
        }
    );
};

//Change Data

const UpdateRecentOrderDetail = (recentOrderData) => {
    const { data, id } = recentOrderData.payload;
    const method = "PATCH";
    const url = `/shipments/${id}/`;
    return axios({
        method,
        url,
        data,
    });
};

export const UpdateRecentOrderDetailApi = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateRecentOrderDetail, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("FETCH_PAST_ORDER_INFO");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

const FetchAllSampleShipmentOrderDetail = (id) => {
    const method = "GET";
    const url = `/sample-shipments/${id}/`;
    return axios({
        method,
        url,
    });
};

export const FetchAllSampleShipmentsApi = (id) => {
    return useQuery(
        [`FETCH_SAMPLE_RECENT_ORDER_INFO`, id],
        () => FetchAllSampleShipmentOrderDetail(id),
        {
            enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
            onSuccess: null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//unique id for shipment

const FetchAllShipmentOrderDetail = (id) => {
    const method = "GET";
    const url = `/shipments/${id}/`;
    return axios({
        method,
        url,
    });
};

export const FetchAllShipmentOrderDetailApi = (id) => {
    return useQuery(
        [`FETCH_RECENT_ORDER_INFO_${id}`],
        () => FetchAllShipmentOrderDetail(id),
        {
            enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//PATCH Shipment Status update

const UpdateShipmentStatus = (updateShipmentData) => {
    const { data, id } = updateShipmentData.payload;

    const method = "PATCH";
    const url = `/shipment-status-update/${id}/`;
    return axios({
        method,
        url,
        data,
    });
};

export const UpdateShipmentStatusApi = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateShipmentStatus, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("UPDATE_SHIPMENT_STATUS");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

// Quotation - Post Req

const CreateQuotation = (data) => {
    const method = "POST";
    const url = `/shipper/quotation/`;
    return axios({ method, url, data });
};
export const useCreateQuotationQuery = () => {
    return useMutation(CreateQuotation, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

function patchStatusUpdate(id, data) {
    return axios({
        method: "PATCH",
        url: "/status-update/" + id+"/",
        data,
    });
}

export function usePatchStatusUpdate() {
    return useMutation({
        mutationFn: (payload) => patchStatusUpdate(payload?.id, payload?.data),
    });
}


function createAnnouncement(data) {
    return axios({
        method: "POST",
        url: "/v1/announcement/",
        data,
    });
}

export function useCreateAnnouncement() {
    return useMutation({
        mutationFn: (payload) => createAnnouncement(payload),
        onSuccess: (response) => {
            HandleSuccessResponse(response);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
}

const fetchAnnouncementsListData = (data) => {
    const method = "GET";
    let url = appendQueryParams(`/v1/announcement/`, {
        ...data?.announcementListPagination,
    });

    return axios({
        method,
        url,
    });
};

export const fetchAnnouncementDetailApi = (payload) => {
    return useQuery(
        ["FETCH_ANNOUNCEMENT_LIST_DATA", payload],
        () => fetchAnnouncementsListData(payload),
        {
            staleTime:0,
            cacheTime:0,
            enabled: Boolean(payload),
            onSuccess: (data) => null,
            onError: (error) => null,
        }
    );
};

const fetchAnnouncementDetail = (id) => {
    const method = "GET";
    const url = `/v1/announcement/${id}/`;
    return axios({
        method,
        url,
    });
};

export const FetchAnnouncementDetailDataApi = (id) => {
    return useQuery(
        [`FETCH_ANNOUNCEMENT_DETAIL_DATA_${id}`],
        () => fetchAnnouncementDetail(id),
        {
            enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

