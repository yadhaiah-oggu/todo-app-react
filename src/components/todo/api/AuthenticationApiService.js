import { apiClient } from "./ApiClient";

export const executebasicAuthenticationService = 
(token) => apiClient.get(`/basicauth`,{
    headers:{
        Authorization: token
    }
});

export const executeJwtAuthenticationService = 
(username,password) => apiClient.post(`/auth/authenticate`,{username,password});