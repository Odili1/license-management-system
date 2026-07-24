import { customToast } from "@/src/components/custom-toast";
import { useAuthStore } from "@/src/store/authStore";


interface apiClientOptions extends RequestInit {
    params?: Record<string, string | number | boolean>,
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiCLient<T>(endpoint: string, options: apiClientOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = new URL(endpoint, API_BASE_URL);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    const accessToken = useAuthStore.getState().accessToken;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                headers[key] = String(value);
            }
        });
    }

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }


    try {
        const response = await fetch(url.toString(), {
            ...fetchOptions,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status == 401) {
                console.warn('401 Unauthorized - Session invalidated')

                // Clear auth State
                useAuthStore.getState().logout();

                // Show logout message
                customToast.error('Your session has expired. Please login again to continue')

                // Redirect to login page - but prevent recursive redirect
                setTimeout(() => {
                    if (endpoint.includes('/auth')) {
                        throw new Error(data.message)
                    }

                    window.location.href = '/';
                }, 2000)

                throw {
                    response: {
                        data: {
                            message: 'Session Expired - please login again',
                            statusCode: 401,
                        }
                    }
                }
            }

            throw {
                response: {
                    data,
                },
            }
        }

        return data;
    } catch (error) {
        console.error('API Client Error:', error);
        throw error;
    }
}

