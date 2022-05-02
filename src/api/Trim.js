import axios from 'axios';

export async function CheckTrimNameAPI(lineup_name) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/trim/check-name', {
            lineup_name: lineup_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateTrimAPI(body) {
    var data = [
        {
            brand_id: body.brand_id,
            group_id: body.group_id,
            model_id: body.model_id,
            lineup_id: body.lineup_id,
            trim_name: body.trim_name,
            gearbox_type: body.gearbox_type,
            price: body.price,
            is_use: body.is_use
        }
    ];

    try {
        const response = await axios.post('http://13.125.168.233:4200/trim', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateTrimAPI(body) {
    var data = {
        brand_id: body.brand_id,
        group_id: body.group_id,
        model_id: body.model_id,
        lineup_id: body.lineup_id,
        trim_name: body.trim_name,
        gearbox_type: body.gearbox_type,
        price: body.price,
        is_use: body.is_use
    };
    
    try {
        const response = await axios.put('http://13.125.168.233:4200/trim/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetTrimListAPI(offset, search) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/trim/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetTrimOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/trim/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetTrimInfoAPI(idx) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/trim/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteTrimInfoAPI(idx) {
    try {
        const response = await axios.delete('http://13.125.168.233:4200/trim/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}