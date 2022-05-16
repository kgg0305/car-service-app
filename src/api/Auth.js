import axios from 'axios';

export async function LoginUser(body) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', {
            user_id: body.user_id,
            password: body.password,
        });
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function CreateAuthAPI(bodyList) {
    
    var data = [];

    for (let i = 0; i < bodyList.length; i++) {
        const body = bodyList[i];
        
        data.push(
            {
                type_id: body.type_id,
                group_id: body.group_id,
                name: body.name,
                user_id: body.user_id,
                phone: body.phone,
                email: body.email,
                password: body.password
            }
        );
    }

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/auth', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateAuthAPI(body) {

    var data = 
    {
        type_id: body.type_id,
        group_id: body.group_id,
        name: body.name,
        user_id: body.user_id,
        phone: body.phone,
        email: body.email,
        password: body.password
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/auth/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetAuthListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetAuthOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/auth/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetAuthInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/auth/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteAuthInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/auth/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}