import axios from 'axios';

export async function CreateFileAPI(type, name, file) {
    var formData = new FormData();
    formData.append(name, file);
    
    try {
        const response = await axios.post('http://127.0.0.1:4200/file/' + type, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    
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
        const response = await axios.put('http://127.0.0.1:4200/file/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteBrandInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:4200/file/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}