import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL + '/quotation';
const token = JSON.parse(sessionStorage.getItem('token'));

const checkName = async(name) => {
    try {
        const response = await axios.post(base_url + '/check-name', {
            group_name: name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

const create = async(bodyList) => {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                purchase_path: body.purchase_path,
                purchase_method: body.purchase_method,
                reg_date: body.reg_date,
                client_name: body.client_name,
                client_phone: body.client_phone,
                brand_id: body.brand_id,
                model_id: body.model_id,
                lineup_id: body.lineup_id,
                car_kind_id: body.car_kind_id,
                trim_id: body.trim_id,
                is_business: body.is_business,
                is_contract: body.is_contract,
                contract_date: body.contract_date,
                is_release: body.is_release,
                release_date: body.release_date,
                is_close: body.is_close,
                note: body.note,
                assign_to: body.assign_to
            }
        )
    });

    try {
        const response = await axios.post(base_url, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const update = async(body) => {
    var data = {
        purchase_path: body.purchase_path,
        purchase_method: body.purchase_method,
        reg_date: body.reg_date,
        client_name: body.client_name,
        client_phone: body.client_phone,
        brand_id: body.brand_id,
        model_id: body.model_id,
        lineup_id: body.lineup_id,
        car_kind_id: body.car_kind_id,
        trim_id: body.trim_id,
        is_business: body.is_business,
        is_contract: body.is_contract,
        contract_date: body.contract_date,
        is_release: body.is_release,
        release_date: body.release_date,
        is_close: body.is_close,
        note: body.note,
        assign_to: body.assign_to
    };
    
    try {
        const response = await axios.put(base_url + '/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const remove = async(idx) => {
    const response = await axios.get(base_url + '/' + idx);

    var data = 
    {
        ...response.data,
        deleted_at: new Date(),
        deleted_by: token.idx,
        is_deleted: true
    };
    
    try {
        const response = await axios.put(base_url + '/' + idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const getList = async(offset, search) => {
    try {
        const response = await axios.post(base_url + '/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

const getOptionList = async() => {
    try {
        const response = await axios.get(base_url + '/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

const get = async(idx) => {
    try {
        const response = await axios.get(base_url + '/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

// const remove = async(idx) => {
//     try {
//         const response = await axios.delete(base_url + '/' + idx);
    
//         return response.data;
//     } catch (e) {
//         return e;
//     }
// }

export const quotationService = {
    checkName,
    create,
    update,
    getList,
    getOptionList,
    get,
    remove
};