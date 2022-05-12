import axios from 'axios';

export async function CreateModelColorAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                model_id: body.model_id,
                name: body.name,
                price: body.price
            }
        )
    });

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-color', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelColorAPI(body) {
    var data = {
        model_id: body.model_id,
        name: body.name,
        price: body.price
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/model-color/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelColorListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/model-color/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelColorOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-color/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelColorInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/model-color/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelColorInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/model-color/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}