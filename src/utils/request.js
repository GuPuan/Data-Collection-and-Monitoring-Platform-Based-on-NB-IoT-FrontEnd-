import axios from 'axios'

// Create an axios instance with a base URL and a timeout setting
const request = axios.create({
    baseURL: 'http://localhost:9090',  // Base URL for all requests
    timeout: 5000  // Timeout set to 5000 milliseconds (5 seconds)
})

// Request interceptor
request.interceptors.request.use(config => {
    // Set content type header to JSON for all outgoing requests
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // You can add additional headers here, such as a token for authorization
    // config.headers['token'] = user.token;  // Set authorization token

    return config  // Return the modified config object
}, error => {
    // Handle any errors that occur before the request is sent
    return Promise.reject(error)  // Reject the promise with the error
});

// Response interceptor
request.interceptors.response.use(
    response => {
        let res = response.data;  // Extract the data from the response

        // If the response type is 'blob' (e.g., a file download), return the response directly
        if (response.config.responseType === 'blob') {
            return res
        }

        // If the response is a string, try to parse it as JSON
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res  // Parse only if the string is not empty
        }

        return res;  // Return the parsed response data
    },
    error => {
        console.log('err' + error)  // Log the error for debugging purposes
        return Promise.reject(error)  // Reject the promise with the error
    }
)

export default request  // Export the axios instance for use in other parts of the application
