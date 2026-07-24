import { ClientInfo, ClientIpandLocation } from "@/src/lib/types";
import { apiCLient } from "./apiClient";

export interface IClientMetadata extends ClientInfo, ClientIpandLocation { }

export interface ILoginResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        user: {
            name: string;
            email: string;
            role: string;
            entityDetails: {
                userType: string;
                id: string;
            };
        };
        accessToken: string;
        expiresAt: string;
        expiresIn: string;
        refreshToken: string;
    };
    timestamp: string;
    path: string;
}

export interface IRefreshResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        token: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: string;
        expiresAt: string;
    };
    timestamp: string;
    path: string;
}


export async function login(email: string, password: string, clientMetadata?: IClientMetadata): Promise<ILoginResponse> {
    return apiCLient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            clientMetadata
        })
    })
}


export async function logout(accessToken: string, refreshToken: string): Promise<void> {
    apiCLient("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).catch((error) => {
        console.error("Logout API call failed:", error)
    })
}


export async function refresh(accessToken: string, refreshToken: string): Promise<IRefreshResponse> {
    return apiCLient<IRefreshResponse>("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export async function resetPassword(token: string, email: string, newPassword: string, confirmPassword: string): Promise<void> {
    return apiCLient("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, email, newPassword, confirmPassword }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}