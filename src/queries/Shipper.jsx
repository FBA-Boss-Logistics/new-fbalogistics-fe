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

const fetchAllWarehouseDetail = (id) => {
    const method = "GET";
    const url = `/warehouses/?shipment_id=${id}`;
    console.log("url", url)
    return axios({
        method,
        url,
    });
};

export const fetchAllWarehouseDetailApi = (id) => {
    return useQuery(
        [`FETCH_ALL_WAREHOUSE_DETAIL_INFO_${id}`],
        () => fetchAllWarehouseDetail(id),
        {
            enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
            onSuccess: () => null,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

const CreateWarehouse = (data) => {
    const method = "POST";
    const url = `warehouses/`;
    return axios({ method, url, data });
};

export const useCreateWarehouseQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateWarehouse, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("CREATE_WAREHOUSE");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
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

//Update Package Tracking Number

const UpdatePackageTrackingNumber = (data) => {
   console.log("data", data);
    const method = "PATCH";
    const url = `/update-packages/${data.id}`;
    return axios({ method, url, data });
};

export const UpdatePackageTrackingNumberApi = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdatePackageTrackingNumber, {
        onSuccess: (response) => {
            queryClient.invalidateQueries("FETCH_RECENT_ORDER_INFO");
            HandleSuccessResponse(response);
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

// Update Warehouse Status
const UpdateWarehousebyPatch = (data) => {
    const method = "PATCH";
    const url = `/warehouses/${data.id}/`;
    return axios({ method, url, data });
};
export const UpdateWarehousebyPatchApi = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateWarehousebyPatch, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("FETCH_ALL_WAREHOUSE_DETAIL_INFO");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

// Update Warehouse Tracking Number
const UpdateWarehouseTrackingNumber = (data) => {
    const method = "PATCH";
    const url = `/update-warehouse-tracking/${data.id}`;
    return axios({ method, url, data });
};

export const UpdateWarehouseTrackingNumberApi = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateWarehouseTrackingNumber, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("FETCH_ALL_WAREHOUSE_DETAIL_INFO");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

// Update Warehouse by PATCH
// const updateWarehouseByPatch = (data) => {
//     const method = "PATCH";
//     const url = `/warehouses/${data.id}/`;
//     const headers = data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
//     return axios({ method, url, data, headers });
// };
const updateWarehousePodDocument = ({ id, formData }) => {
    // formData.append("_method", "PATCH");
    return axios.patch(`/warehouses/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateWarehousePodDocumentApi = () => {
    const queryClient = useQueryClient();
    return useMutation(updateWarehousePodDocument, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("FETCH_ALL_WAREHOUSE_DETAIL_INFO");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

// Delete Warehouse Document
const deleteWarehouseDocument = (id) => {
    const method = "DELETE";
    const url = `/warehouses/${id}/delete-pod-document/`;
    return axios({ method, url });
};
export const deleteWarehouseDocumentApi = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteWarehouseDocument, {
        onSuccess: (response) => {
            HandleSuccessResponse(response);
            queryClient.invalidateQueries("FETCH_ALL_WAREHOUSE_DETAIL_INFO");
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

