import axios from 'axios';

export async function CreateModelTrimAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                model_id: body.model_id,
                trim_name: body.trim_name,
                trim_price: body.trim_price,
                trim_detail: body.trim_detail
            }
        )
    });

    try {
        const response = await axios.post('http://13.125.168.233:4200/model-trim', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelTrimAPI(body) {
    var data = {
        model_id: body.model_id,
        trim_name: body.trim_name,
        trim_price: body.trim_price,
        trim_detail: body.trim_detail
    };
    
    try {
        const response = await axios.put('http://13.125.168.233:4200/model-trim/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelTrimListAPI(offset, search) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/model-trim/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelTrimOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/model-trim/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelTrimInfoAPI(idx) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/model-trim/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelTrimInfoAPI(idx) {
    try {
        const response = await axios.delete('http://13.125.168.233:4200/model-trim/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}