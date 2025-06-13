import { API_URL, TIMEOUT_SEC } from "./config";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    let response = await Promise.race([
      fetch(`${url}key=8b0ababc-fcc7-47ee-84ed-dcd1f8d52bea`),
      timeout(TIMEOUT_SEC),
    ]);
    if (!response.ok)
      throw new Error(
        `${response.status} ${
          response.statusText ||
          "We could not fetch this recipe. try anothe one!"
        }`
      );
    let { data } = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const showToast = (toastMessage, toastType) => {
  Toastify({
    text: toastMessage,
    duration: 20000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "none",
      backgroundColor: "#f08080",
      border: "1px solid #d40000",
      color: "black",
      padding: "1rem 1.5rem",
      fontSize: "1.75rem",
    },
  }).showToast();
};
