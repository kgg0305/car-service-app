import axios from 'axios';

export async function CreateModelTrimAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                model_id: body.model_id,
                name: body.name,
                price: body.price,
                detail: body.detail
            }
        )
    });

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-trim', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelTrimAPI(body) {
    var data = {
        model_id: body.model_id,
        name: body.name,
        price: body.price,
        detail: body.detail
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/model-trim/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelTrimListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-trim/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelTrimOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-trim/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelTrimInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-trim/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelTrimInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/model-trim/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}