import { requestPromise } from './helper/requestPromise';
import { CONFIG } from '../config/github';

export const authenticate = async (callback, errorHandler) => {
    const options = {
        method: 'GET',
        // uri: `https://github.com/login/oauth/authorize?client_id=${CONFIG.client_id}&scope=user%20repo%20repo_deployment%20admin:repo_hook%20admin:org_hook`,
        uri: `https://github.com/login/oauth/authorize?client_id=${CONFIG.client_id}&scope=admin`,
        json: true,
    };
    requestPromise(options, callback, errorHandler);
};

export const postToken = async (payload, callback, errorHandler) => {
    const options = {
        method: 'POST',
        uri: `https://github.com/login/oauth/access_token`,
        body: payload,
        json: true,
    };
    requestPromise(options, callback, errorHandler);
};



export const getRepos = async (token, callback, errorHandler) => {
    const options = {
        method: 'GET',
        uri: `https://api.github.com/user/repos`,
        json: true,
        headers: {
            'User-Agent': 'changeLog',
            'Authorization': 'token ' + token
        }
    };
    requestPromise(options, callback, errorHandler);
};

export const createWebhook = async (owner, repo, payload, token, callback, errorHandler) => {
    console.log(`https://api.github.com/repos/${owner}/${repo}/hooks`);

    const options = {
        method: 'POST',
        uri: `https://api.github.com/repos/${owner}/${repo}/hooks`,
        json: true,
        headers: {
            'User-Agent': 'changeLog',
            'Authorization': 'token ' + token
        }
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