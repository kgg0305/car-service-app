import axios from 'axios';

export async function CheckLineupNameAPI(lineup_name) {
    try {
        const response = await axios.post('http://127.0.0.1:4200/lineup/check-name', {
            lineup_name: lineup_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateLineupAPI(body) {
    var data = [
        {
            brand_id: body.brand_id,
            group_id: body.group_id,
            model_id: body.model_id,
            model_lineup_ids: body.model_lineup_ids,
            model_color_ids: body.model_color_ids,
            lineup_name: body.lineup_name,
            fule_kind: body.fule_kind,
            year_type: body.year_type,
            is_use: body.is_use,
            is_use_lineup: body.is_use_lineup,
            is_use_color: body.is_use_color
        }
    ];

    try {
        const response = await axios.post('http://127.0.0.1:4200/lineup', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateLineupAPI(body) {
    var data = {
        brand_id: body.brand_id,
        group_id: body.group_id,
        model_id: body.model_id,
        model_lineup_ids: body.model_lineup_ids,
        model_color_ids: body.model_color_ids,
        lineup_name: body.lineup_name,
        fule_kind: body.fule_kind,
        year_type: body.year_type,
        is_use: body.is_use,
        is_use_lineup: body.is_use_lineup,
        is_use_color: body.is_use_color
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:4200/lineup/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetLineupListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:4200/lineup/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetLineupOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:4200/lineup/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetLineupInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:4200/lineup/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteLineupInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:4200/lineup/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}