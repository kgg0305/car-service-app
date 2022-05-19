import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL + '/discount-condition';
const token = JSON.parse(sessionStorage.getItem('token'));

const checkName = async(name) => {
    try {
        const response = await axios.post(base_url + '/check-name', {
            condition_name: name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

const create = async(startedIndex, bodyList) => {
    var data = [];
    var countKindBody = 0;
    bodyList.map(body => {
        body.kindBodyList.map(kindBody => {
            kindBody.conditionBodyList.map(conditionBody => {
                data.push(
                    {
                        discount_kind_id: startedIndex + countKindBody,
                        condition_name: conditionBody.condition_name,
                        discount_price: conditionBody.discount_price,
                        price_unit: conditionBody.price_unit,
                
                        created_at: new Date(),
                        created_by: token.idx,
                        updated_at: new Date(),
                        updated_by: token.idx,
                        is_deleted: false
                    }
                );
            });
            countKindBody++;
        });
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
        discount_kind_id: body.discount_kind_id,
        condition_name: body.condition_name,
        discount_price: body.discount_price,
        price_unit: body.price_unit,

        created_at: body.created_at,
        created_by: body.created_by,
        updated_at: new Date(),
        updated_by: token.idx,
        is_deleted: body.is_deleted
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

export const discountConditionService = {
    checkName,
    create,
    update,
    getList,
    getOptionList,
    get,
    remove
};