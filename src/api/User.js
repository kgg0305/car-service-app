import axios from 'axios';
import { CreateFileAPI } from './File';

export async function CheckUserNameAPI(brandName) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/user/check-name', {
            brand_name: brandName
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateUserAPI(bodyList) {
    
    var data = [];

    for (let i = 0; i < bodyList.length; i++) {
        const body = bodyList[i];
        const file = await CreateFileAPI('brand', 'logo', body.logo);

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
                logo: file.filename,
                is_delete: 0,
                reg_date: new Date(),
                up_date: new Date(),
            }
        );
    }

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/user', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateUserAPI(body) {
    const file = await CreateFileAPI('brand', 'logo', body.logo);

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
        logo: file.filename,
        is_delete: 0,
        up_date: new Date(),
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/user/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetUserListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/user/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetUserOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/user/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetUserInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/user/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteUserInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/user/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}