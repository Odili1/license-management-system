import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UAParser } from 'ua-parser-js';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getClientInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();

    return {
        browser: `${result.browser.name} ${result.browser.version}`,
        os: `${result.os.name} ${result.os.version}`,
        device: result.device.model || "Desktop",
        platform: result.device.type || "Desktop",
    }
}

export const getIpAndLocation = async () => {
    const locRes = await fetch("https://ipapi.co/json/");
    const locationData = await locRes.json();

    return {
        ip: locationData.ip,
        network: locationData.network,
        city: locationData.city,
        country_name: locationData.country_name,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        org: locationData.org,
        location: `${locationData.city}, ${locationData.region}, ${locationData.country_name}`,
    };
}