import axios from 'axios';
import { CreateFileAPI } from './File';

export async function CheckCountNameAPI(brandName) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/count/check-name', {
            brand_name: brandName
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateCountAPI(body) {
    const date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
    var data = [
        {
            reg_date: date,
            brand_id: body.brand_id,
            rent_request: body.rent_request,
            rent_admin: body.rent_admin,
            new_request: body.new_request,
            new_admin: body.new_admin
        }
    ];

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/count', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateCountAPI(body) {
    const date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
    var data = 
    {
        reg_date: date,
        brand_id: body.brand_id,
        rent_request: body.rent_request,
        rent_admin: body.rent_admin,
        new_request: body.new_request,
        new_admin: body.new_admin
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/count/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/count/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/count/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/count/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountInfoByDateAPI(date) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/count/info-by-date/' + date);

        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteCountInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/count/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}