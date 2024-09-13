import axios from "axios";
import { del, get, post, put } from "./api_Lists";
//import * as url from "./url_Lists";

const apiUrl = import.meta.env.VITE_BASE_API_URL;
const GET_DOCUMENT_TYPE = "document_type/listgrid";
const ADD_DOCUMENT_TYPE = "document_type/insertgrid";
const UPDATE_DOCUMENT_TYPE = "document_type/updategrid";
const DELETE_DOCUMENT_TYPE = "document_type/deletegrid";
// get Projects
export const getDocumentType = async () => {
  try {
    const response = await post(apiUrl+GET_DOCUMENT_TYPE);
    return response;
  } catch (error) {
    console.log(error); // Handle any errors
  }
};
// add Projects
export const addDocumentType = async (objectName) => {
  try {
    const response = await axios.post(
      `${apiUrl}`+ADD_DOCUMENT_TYPE,
      objectName,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update grid:", error);
    throw error;
  }
};
// update objectNames
export const updateDocumentType = (objectName) =>
  post(`${apiUrl}`+UPDATE_DOCUMENT_TYPE +`?pdt_id=${objectName?.pdt_id}`, objectName);

// delete objectNames
export const deleteDocumentType = (objectName) =>
  // post(`${url.DELETE_ORDER}?pdt_id=${order?.pdt_id}`);
  post(`${apiUrl}`+DELETE_DOCUMENT_TYPE+`?pdt_id=${objectName}`);


