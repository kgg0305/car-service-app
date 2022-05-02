import axios from 'axios';

export async function CheckDiscountKindNameAPI(kind_name) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/discount-kind/check-name', {
            kind_name: kind_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateDiscountKindAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        body.kindBodyList.map(kindBody => {
            data.push(
                {
                    brand_id: body.brand_id,
                    kind_name: kindBody.kind_name,
                    kind_detail: kindBody.kind_detail,
                    s_date: kindBody.s_date,
                    e_date: kindBody.e_date
                }
            )
        })
    });

    try {
        const response = await axios.post('http://13.125.168.233:4200/discount-kind', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateDiscountKindAPI(body) {
    var data = {
        brand_id: body.brand_id,
        kind_name: body.kind_name,
        kind_detail: body.kind_detail,
        s_date: body.s_date,
        e_date: body.e_date
    };
    
    try {
        const response = await axios.put('http://13.125.168.233:4200/discount-kind/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetDiscountKindListAPI(offset, search) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/discount-kind/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetDiscountKindOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/discount-kind/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetDiscountKindInfoAPI(idx) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/discount-kind/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteDiscountKindInfoAPI(idx) {
    try {
        const response = await axios.delete('http://13.125.168.233:4200/discount-kind/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}