import Swal from "sweetalert2";

const USER_ID_TOKEN = "LOGIN_TOKEN";
const Functions = {
    IsLogin: () => {
        if (localStorage.getItem(USER_ID_TOKEN)) {
            return true;
        }
        return false;
    },
    Login: (loginPayload) => {
        localStorage.setItem(USER_ID_TOKEN, JSON.stringify(loginPayload));
    },
    Logout: () => {
        localStorage.removeItem(USER_ID_TOKEN);
    },
    GetUserProfile: () => {
        // If exists decrypt the details and return
        // If not exists then return false
        if (localStorage.getItem(USER_ID_TOKEN))
            return JSON.parse(localStorage.getItem(USER_ID_TOKEN));
        return false;
    },
    CheckForHttpErrors: (response) => {
        if (!response) {
            return "Server not responding";
        }
        switch (response.status) {
            case 203:
                return { message: response.data.error }
            case 400:
                return { message: response.data.error }
            case 401:
                return { message: response.data.error }
            case 403:
                return { message: response.Message }
            case 404:
                return { message: response.Message }
            case 408:
                return { message: response.Message }
            case 412:
                return { message: response.data.error }
            case 429:
                return { message: response.Message }
            case 440:
                Functions.Logout();
                window.location.reload();
                return { message: response.data.Message }
            // Request blocked by antivirus
            case 499:
                return { message: response.data.Message }
            case 500:
                return { message: response.Message }
            case 502:
                return { message: response.Message }
            case 503:
                return { message: response.Message }
            case 504:
                return { message: response.Message }
            default:
                return { message: "No response from server." }
        }
    },
    ShowAlert: (type, message, text, isConfirmation = false) => {
        Swal.fire({
            icon: type,
            title: text,
            text: message,
            showConfirmButton: isConfirmation,
            confirmButtonColor: 'primary',
            timer: type === "success" && 6000,
            position: type === "success" ? 'center' : 'center',
        })
    }
}

export default Functions;