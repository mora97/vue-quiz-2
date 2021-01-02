export const BASE_URL = 'http://localhost:2000/data'

export const handleResponse = async (response) => {
    if (response.status === 200 || response.status === 201) {
        console.log('success');
        console.log(response);
        return response.data
    } else {
        const err = await response.text()
        console.log(err);
        throw new Error(err)
    }
}

export const handleError = async (error) => {
    console.log(error.response);

    return error.response
}