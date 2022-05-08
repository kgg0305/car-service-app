import axios from 'axios';

export async function CheckContentNameAPI(model_name) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/content/check-name', {
            model_name: model_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateContentAPI(body) {
    var data = [
        {
            group_id: body.group_id,
            brand_id: body.brand_id,
            model_name: body.model_name,
            is_new: body.is_new,
            release_date: body.release_date,
            sequence: body.sequence,
            is_use: body.is_use,
            picture_1: body.picture_1,
            picture_2: body.picture_2,
            picture_3: body.picture_3,
            picture_4: body.picture_4,
            picture_5: body.picture_5,
            picture_6: body.picture_6,
            picture_7: body.picture_7,
            picture_8: body.picture_8,
        }
    ];

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/content', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateContentAPI(body) {
    var data = {
        group_id: body.group_id,
        brand_id: body.brand_id,
        model_name: body.model_name,
        is_new: body.is_new,
        release_date: body.release_date,
        sequence: body.sequence,
        is_use: body.is_use,
        picture_1: body.picture_1,
        picture_2: body.picture_2,
        picture_3: body.picture_3,
        picture_4: body.picture_4,
        picture_5: body.picture_5,
        picture_6: body.picture_6,
        picture_7: body.picture_7,
        picture_8: body.picture_8,
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/content/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetContentListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/content/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetContentOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/content/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetContentInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/content/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteContentInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/content/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}