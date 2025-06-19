import { API_KEY, TIMEOUT_SEC } from "./config";
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
      fetch(`${url}key=${API_KEY}`),
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

export const postJSON = async (url, payload) => {
  console.log(payload, JSON.stringify(payload));
  try {
    let response = await Promise.race([
      fetch(`${url}key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    if (!response.ok)
      throw new Error(
        `${response.status} ${
          response.statusText ||
          "We could not fetch this recipe. try anothe one!"
        }`
      );
    let data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const showToast = (toastMessage, toastType = "error") => {
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
      backgroundColor: `${toastType === "error" ? "#f08080" : "#8fd400"}`,
      border: `1px solid ${toastType === "error" ? "#d40000" : "#4f7942"}`,
      color: "black",
      padding: "1rem 1.5rem",
      fontSize: "1.75rem",
    },
  }).showToast();
};
