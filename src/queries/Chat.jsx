import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "service";
import HandleErrorResponse from "utils/HandleErrorResponse";

//Create message
const CreateMessage = (createMessageData) => {
    const data = createMessageData.payload;

    const method = "POST";
    const url = "/chat/create-message/";
    return axios({
        method,
        url,
        data,
    });
};

export const CreateMessageApi = () => {
    const queryClient = useQueryClient();
    return useMutation(CreateMessage, {
        onSuccess: () => {
            queryClient.invalidateQueries("CREATE_MESSAGE");
        },
        onError: (response) => {
            HandleErrorResponse(response);
        },
    });
};

//Fetch all messages

const FetchMessageList = () => {
    const method = "GET";
    return axios({
        method,
        url: "/chat/list-message/",
    });
};

export const FetchMessageListApi = () => {
    return useQuery(["FETCH_MESSAGE_LIST"], () => FetchMessageList(), {
        enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
        onSuccess: () => null,
        onError: (error) => {
            console.log("Error occurred while fetching data", error);
        },
    });
};

//Fetch Messages by id

const FetchShipmentMessageList = (shipment_id) => {
    const method = "GET";
    const url = `/chat/messages/${shipment_id}/`;
    return axios({
        method,
        url,
    });
};

export const FetchShipmentMessageListApi = (shipment_id) => {
    return useQuery(
        [`FETCH_SHIPMENT_MESSAGE_LIST_${shipment_id}`],
        () => FetchShipmentMessageList(shipment_id),
        {
            enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
            onSuccess: () => null,
            cacheTime: 0,
            staleTime: 0,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

//upload file

const uploadFile = (data) => {
    const method = "POST";
    const url = `/chat/attachment/`;
    return axios({
        method,
        url,
        data,
        headers: {
            "content-type": "multipart/form-data",
        },
    });
};

export const useUploadFile = () => {
    return useMutation(uploadFile, {
        onSuccess: () => null,
        onError: (error) => {
            console.log("Error occurred while fetching data", error);
        },
    });
};
const downloadFile = (id) => {
    const method = "GET";
    const url = `/chat/attachment/${id}/`;
    return axios({
        method,
        url,
    });
};

export const useDownloadFile = () => {
    return useMutation(downloadFile);
};

const FetchSampleShipmentMessageList = (shipment_id) => {
    const method = "GET";
    const url = `/chat/sample-shipment-messages/${shipment_id}/`;
    return axios({
        method,
        url,
    });
};

export const FetchSampleShipmentMessageListApi = (shipment_id) => {
    return useQuery(
        [`FETCH_SAMPLE_SHIPMENT_MESSAGE_LIST_${shipment_id}`],
        () => FetchSampleShipmentMessageList(shipment_id),
        {
            enabled: Boolean(localStorage.getItem("AUTH_TOKEN")),
            onSuccess: () => null,
            cacheTime:0,
            staleTime:0,
            onError: (error) => {
                console.log("Error occurred while fetching data", error);
            },
        }
    );
};

function postShipmentCreateMessage(data) {
    return axios({
        method: "POST",
        url: "/chat/shipment-create-message/",
        data,
    });
}

export function usePostShipmentCreateMessage() {
    return useMutation({
        mutationFn: (data) => postShipmentCreateMessage(data),
    });
}
