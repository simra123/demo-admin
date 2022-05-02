const axios = require("axios");
const { Functions } = require(".");

export const BaseURL = 'https://massi-bucket.s3.amazonaws.com/'

// Connection strings
// const connectionString = 'http://localhost:5000/api/v2'
const connectionString = 'https://event-massi.herokuapp.com/api/v2'

// const GetHeader = () => {
//     return {
//         Authorization: `Bearer ${ Functions.GetUserProfile()?.profile?.access_token }`
//     }
// }

const Response = {
    GetMethod: (relativeUrl) => {
        const url = connectionString + relativeUrl;
        return new Promise((resolve, reject) => {
            axios.get(url).then(function (response) {
                // 203 === NON-AUTHORITATIVE INFORMATION
                if (response.status === 203)
                    reject(Functions.CheckForHttpErrors(response))
                // handle success
                resolve(response.data);
            }).catch(function (error) {
                // handle error
                //  reject(Functions.CheckForHttpErrors(error.response));
                console.log(error)
            });
        })

    },

    PostMethod: (relativeUrl, obj) => {
        const url = connectionString + relativeUrl;

        return new Promise((resolve, reject) => {
            axios.post(url, obj).then(function (response) {
                // 203 === NON-AUTHORITATIVE INFORMATION
                if (response.status === 203)
                    reject(Functions.CheckForHttpErrors(response))
                // handle success
                resolve(response.data);
            }).catch(function (error) {
                // handle error
                //    reject(Functions.CheckForHttpErrors(error.response));
                reject(error.response.data.error)
                console.log(error.response.status)
            });
        });
    },

    PostFile: (relativeUrl, formData) => {
        const url = connectionString + relativeUrl;

        return new Promise((resolve, reject) => {
            axios.post(url, formData).then(function (response) {
                // 203 === NON-AUTHORITATIVE INFORMATION
                if (response.status === 203)
                    reject(Functions.CheckForHttpErrors(response))
                // handle success
                resolve(response.data);
            }).catch(function (error) {
                reject(error.response.data.error)
                console.log(error.response.status)
            });
        });
    }
}


export default Response;