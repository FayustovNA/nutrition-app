// Вспомогательная функция для обработки полученного ответа с сервера
export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok
        ? res.json()
        : res
            .json()
            .then((err) => Promise.reject({ ...err, statusCode: res.status }));
}


export const apiRequest = <T>(
    url: string,
    options: RequestInit
): Promise<T> => {
    return fetch(url, options)
        .then((res) => checkResponse<T>(res));
}