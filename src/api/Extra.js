import axios from 'axios';

export async function CheckExtraNameAPI(region) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/extra/check-name', {
            region: region
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateExtraAPI(body) {
    var data = [
        {
            brand_id: body.brand_id,
            group_id: body.group_id,
            model_id: body.model_id,
            region: body.region,
            condition: body.condition,
            fee: body.fee,
            discount: body.discount,
            transfer: body.transfer
        }
    ];

    try {
        const response = await axios.post('http://127.0.0.1:3001/extra', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateExtraAPI(body) {
    var data = {
        brand_id: body.brand_id,
        group_id: body.group_id,
        model_id: body.model_id,
        region: body.region,
        condition: body.condition,
        fee: body.fee,
        discount: body.discount,
        transfer: body.transfer
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:3001/extra/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetExtraListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/extra/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetExtraOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/extra/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetExtraInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/extra/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteExtraInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:3001/extra/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}