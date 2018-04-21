import { requestPromise } from './helper/requestPromise';
import { CONFIG } from '../config/github';
 
export const authenticate = async (callback, errorHandler) => {

    const options = {
        method: 'GET',
        uri: `https://github.com/login/oauth/authorize?client_id=${CONFIG.client_id}`,
        json: true,
    };
    requestPromise(options, callback, errorHandler);
};

// export const postMessages = async (namespaceId, payload, callback, errorHandler) => {
//     const token = await googleAuthManager
//         .getToken()
//         .then(t => t)
//         .catch(err => {
//             throw err;
//         });

//     const options = {
//         method: 'POST',
//         uri: `${API.OEM}/oem-message/message`,
//         body: payload,
//         json: true,
//         headers: {
//             'X-CM-Namespace': namespaceId,
//             Authorization: 'Bearer ' + token
//         }
//     };
//     requestPromise(options, callback, errorHandler);
// };

// export const postTestMessages = async (namespaceId, payload, email, callback, errorHandler) => {
//     const token = await googleAuthManager
//         .getToken()
//         .then(t => t)
//         .catch(err => {
//             throw err;
//         });

//     const options = {
//         method: 'POST',
//         uri: `${API.OEM}/oem-message/testmessage?email=${email}`,
//         body: payload,
//         json: true,
//         headers: {
//             'X-CM-Namespace': namespaceId,
//             Authorization: 'Bearer ' + token
//         }
//     };
//     requestPromise(options, callback, errorHandler);
// };

// export const getRecipientFilters = async (namespaceId, payload, callback, errorHandler) => {
//     const token = await googleAuthManager
//         .getToken()
//         .then(t => t)
//         .catch(err => {
//             throw err;
//         });

//     const options = {
//         method: 'POST',
//         uri: `${API.OEM}/oem-message/recipientfilter`,
//         body: payload,
//         json: true,
//         headers: {
//             'X-CM-Namespace': namespaceId,
//             Authorization: 'Bearer ' + token
//         }
//     };
//     requestPromise(options, callback, errorHandler);
// };