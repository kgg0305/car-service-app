import axios from 'axios';

export async function CreateModelGalleryAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                order: body.order,
                model_id: body.model_id,
                picture: body.picture,
                created_date: body.created_date
            }
        )
    });

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-gallery', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelGalleryAPI(body) {
    var data = {
        order: body.order,
        model_id: body.model_id,
        picture: body.picture,
        created_date: body.created_date
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/model-gallery/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelGalleryListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-gallery/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelGalleryOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-gallery/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelGalleryInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-gallery/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelGalleryInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/model-gallery/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}