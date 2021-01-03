export const BASE_URL = 'http://localhost:2000/data'

export const handleResponse = async (response) => {
    console.log(response);
    if (response.status === 200 || response.status === 201) {
        return response
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

export const converObjectToArray = (obj) => {
    console.log(obj);
    let array = []
    Object.keys(obj).map((key) => {
        console.log(obj[key]);
        array.push({...obj[key], id: key})
    })
    
    return array
}

export const convertArrayToObject = (array, key) => {
    const initilaValue = {}
    return array.reduce((obj, item) => {
        // console.log(obj);
        console.log([item[key]]);
        let newObj = {
            title: {
                text: item.title.text
            },
            description: item.description,
            img: item.img,
            color: item.color
        }
        return {
            ...obj,
            [item[key]]: newObj
        }
    }, initilaValue)
}