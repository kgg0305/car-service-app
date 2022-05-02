import axios from 'axios';

export async function CreateModelColorAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                model_id: body.model_id,
                color_name: body.color_name,
                color_price: body.color_price
            }
        )
    });

    try {
        const response = await axios.post('http://127.0.0.1:3001/model-color', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelColorAPI(body) {
    var data = {
        model_id: body.model_id,
        color_name: body.color_name,
        color_price: body.color_price
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:3001/model-color/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelColorListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/model-color/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelColorOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/model-color/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelColorInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/model-color/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelColorInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:3001/model-color/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}