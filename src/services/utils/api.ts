import { checkResponse } from "../../api";
import { API_URL } from "../../utils/config";

// Функция setCookie
export function setCookie(name: string, value: string, props: { [key: string]: string | number | Date | boolean } = {}) {
    console.log(props);
    props = {
        path: '/',
        ...props
    };
    let exp = props.expires;

    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }

    if (exp && exp instanceof Date) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

// Функция deleteCookie
export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

// Функция getCookie
export function getCookie(name: string) {
    const matches = document.cookie.match(
        // eslint-disable-next-line no-useless-escape
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция fetchWithRefresh
export const refreshToken = (): any => {
    return fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse)
}

// Функция fetchWithRefresh
export const fetchWithRefresh = async<T>(
    url: string,
    options: RequestInit
): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err?.message === 'jwt expired') {
            const refreshData = await refreshToken();

            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            setCookie('accessToken', refreshData.accessToken);

            if (!options.headers) {
                options.headers = new Headers()
            } (options.headers as Headers).append(
                'Authorization',
                refreshData.accessToken
            )

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}