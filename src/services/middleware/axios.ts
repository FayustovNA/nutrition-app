// import axios from 'axios';

// // Function to get the access token
// function getAccessToken(): string {
//     // Your logic to get the access token
//     return 'your-access-token';
// }

// // Function to refresh the access token
// async function refreshToken(): Promise<string> {
//     // Your logic to refresh the token, e.g., making an API call
//     const response = await axios.post('/auth/refresh-token', {
//         // Include necessary data for refreshing the token
//     });
//     const newAccessToken = response.data.accessToken;
//     // Store the new access token as needed
//     return newAccessToken;
// }

// // Axios request interceptor
// axios.interceptors.request.use(
//     async (config) => {
//         let token = getAccessToken();
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Axios response interceptor
// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const newAccessToken = await refreshToken();
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axios(originalRequest);
//             } catch (err) {
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );