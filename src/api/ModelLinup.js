import axios from 'axios';

export async function CreateModelLineupAPI(bodyList) {
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
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-lineup', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelLineupAPI(body) {
    var data = {
        model_id: body.model_id,
        name: body.name,
        price: body.price,
        detail: body.detail
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/model-lineup/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelLineupListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-lineup/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelLineupOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-lineup/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelLineupInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-lineup/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelLineupInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/model-lineup/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}