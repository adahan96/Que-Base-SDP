import axios from 'axios';
// import jwt_decode from 'jwt-decode';

import getHeaders from '../utils/getHeaders';

/***
 *  Handling User services
 */

const USERS_API_URL = "http://localhost:8000/users";     // TODO: This should be handled by 'setupProxy'

/**
 *  [POST]
 */

const getUser = (id) => {

    // Preparing the request URL
    let requestURL = `${USERS_API_URL}/getUser`;

    if (id && typeof(id) === 'string')
        requestURL += `?id=${id}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    // Sending GET request
    return axios({
        method: 'get',
        headers: headers,
        url: requestURL
    })
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [POST]
 */

const updateUser = (data) => {

    // Preparing the request URL
    let requestURL = `${USERS_API_URL}/updateUser`;
    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    // Sending POST request
    return axios({
        method: 'post',
        headers: headers,
        url: requestURL,
        data: data
    })
        .then(response => {

            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [GET]
 */

const getFriends = (page = null, id) => {

    let requestURL = `${USERS_API_URL}/friends`;

    if (id && typeof(id) === 'string')
        requestURL += `?id=${id}`;

    if (page && typeof(page) === 'number')
        requestURL += `&page=${page}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    return axios({
        method: 'get',
        headers: headers,
        url: requestURL
    })
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [GET]
 */

const getWaitList = (page = null, id) => {

    let requestURL = `${USERS_API_URL}/waitlist`;

    if (id && typeof(id) === 'string')
        requestURL += `?id=${id}`;

    if (page && typeof(page) === 'number')
        requestURL += `&page=${page}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    return axios({
        method: 'get',
        headers: headers,
        url: requestURL
    })
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [GET]
 */

const getFavoriteQuestions = (page = null, id) => {

    let requestURL = `${USERS_API_URL}/favoriteQuestions`;

    if (id && typeof(id) === 'string')
        requestURL += `?id=${id}`;

    if (page && typeof(page) === 'number')
        requestURL += `&page=${page}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    return axios({
        method: 'get',
        headers: headers,
        url: requestURL
    })
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [GET]
 */

const searchUsers = (page = null, username) => {

    let requestURL = `${USERS_API_URL}/searchUser`;

    if (username && typeof(username) === 'string')
        requestURL += `?username=${username}`;

    if (page && typeof(page) === 'number')
        requestURL += `&page=${page}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    return axios({
        method: 'get',
        headers: headers,
        url: requestURL
    })
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [POST]
 */

const acceptFriendRequest = (id) => {

    // Preparing the request URL
    let requestURL = `${USERS_API_URL}/acceptFriend`;

    if (id && typeof(id) === 'string')
        requestURL += `?id=${id}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    // Sending POST request
    return axios({
        method: 'post',
        headers: headers,
        url: requestURL
    })
        .then(response => {

            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  [POST]
 */

const sendFriendRequest = (id) => {

    // Preparing the request URL
    let requestURL = `${USERS_API_URL}/addFriend`;

    if (id && typeof(id) === 'string')
        requestURL += `?id=${id}`;

    // Headers
    const headers = {...{'Content-Type': 'application/json'}, ...getHeaders.auth()};

    // Sending POST request
    return axios({
        method: 'post',
        headers: headers,
        url: requestURL
    })
        .then(response => {

            return response.data;
        })
        .catch(err => console.log(err));
};

/**
 *  Exporting the services
 */

export default {
    getUser: getUser,
    updateUser: updateUser,
    getFriends: getFriends,
    getWaitList: getWaitList,
    getFavoriteQuestions: getFavoriteQuestions,
    searchUsers: searchUsers,
    acceptFriendRequest: acceptFriendRequest,
    sendFriendRequest: sendFriendRequest
};
