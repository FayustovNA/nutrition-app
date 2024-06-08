// Проверка ответа
export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))
}

// Запрос
export const apiRequest = <T>(
    url: string,
    options: RequestInit
): Promise<T> => {
    return fetch(url, options)
        .then((res) => checkResponse<T>(res));
}