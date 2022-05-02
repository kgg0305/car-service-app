import axios from 'axios';

export async function CreateModelLineupAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                model_id: body.model_id,
                lineup_name: body.lineup_name,
                lineup_price: body.lineup_price,
                lineup_detail: body.lineup_detail
            }
        )
    });

    try {
        const response = await axios.post('http://127.0.0.1:3001/model-lineup', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateModelLineupAPI(body) {
    var data = {
        model_id: body.model_id,
        lineup_name: body.lineup_name,
        lineup_price: body.lineup_price,
        lineup_detail: body.lineup_detail
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:3001/model-lineup/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelLineupListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/model-lineup/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelLineupOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/model-lineup/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetModelLineupInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/model-lineup/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteModelLineupInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:3001/model-lineup/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}