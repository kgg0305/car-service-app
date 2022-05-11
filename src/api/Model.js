import axios from 'axios';

export async function CheckModelNameAPI(model_name) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model/check-name', {
            model_name: model_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateModelAPI(body) {
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
            created_date: body.created_date,
        }
    ];

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelAPI(body) {
    console.log(body)
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
        created_date: body.created_date,
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/model/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/model/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}