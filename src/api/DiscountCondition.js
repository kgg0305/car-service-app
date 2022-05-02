import axios from 'axios';

export async function CheckDiscountConditionNameAPI(kind_name) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/discount-condition/check-name', {
            kind_name: kind_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateDiscountConditionAPI(startedIndex, bodyList) {
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
                        price_unit: conditionBody.price_unit
                    }
                );
            });
            countKindBody++;
        });
    });

    try {
        const response = await axios.post('http://127.0.0.1:3001/discount-condition', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateDiscountConditionAPI(body) {
    var data = {
        brand_id: body.brand_id,
        kind_name: body.kind_name,
        kind_detail: body.kind_detail,
        s_date: body.s_date,
        e_date: body.e_date
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:3001/discount-condition/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetDiscountConditionListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/discount-condition/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetDiscountConditionOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/discount-condition/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetDiscountConditionInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/discount-condition/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteDiscountConditionInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:3001/discount-condition/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}