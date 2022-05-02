import axios from 'axios';

export async function CheckBrandNameAPI(brandName) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/brand/check-name', {
            brand_name: brandName
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateBrandAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                brand_name: body.brand_name,
                sequence: body.sequence,
                nation: body.nation,
                is_use: body.is_use,
                is_income: body.is_income,
                public_uri: body.public_uri,
                room_uri: body.room_uri,
                service_uri: body.service_uri,
                deposit_uri: body.deposit_uri,
                logo: 'logo.png',
                is_delete: 0,
                reg_date: new Date(),
                up_date: new Date(),
            }
        )
    });

    try {
        const response = await axios.post('http://127.0.0.1:3001/brand', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateBrandAPI(body) {
    var data = 
    {
        brand_name: body.brand_name,
        sequence: body.sequence,
        nation: body.nation,
        is_use: body.is_use,
        is_income: body.is_income,
        public_uri: body.public_uri,
        room_uri: body.room_uri,
        service_uri: body.service_uri,
        deposit_uri: body.deposit_uri,
        logo: body.logo,
        is_delete: 0,
        up_date: new Date(),
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:3001/brand/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetBrandListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/brand/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetBrandOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/brand/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetBrandInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/brand/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteBrandInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:3001/brand/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}