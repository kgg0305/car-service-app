import axios from 'axios';

export async function CheckCarKindNameAPI(kind_name) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/car-kind/check-name', {
            kind_name: kind_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateCarKindAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                kind_name: body.kind_name,
            }
        )
    });

    try {
        const response = await axios.post('http://127.0.0.1:3001/car-kind', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateCarKindAPI(body) {
    var data = {
        kind_name: body.kind_name,
    };
    
    try {
        const response = await axios.put('http://127.0.0.1:3001/car-kind/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCarKindListAPI(offset, search) {
    try {
        const response = await axios.post('http://127.0.0.1:3001/car-kind/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCarKindOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/car-kind/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCarKindInfoAPI(idx) {
    try {
        const response = await axios.get('http://127.0.0.1:3001/car-kind/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteCarKindInfoAPI(idx) {
    try {
        const response = await axios.delete('http://127.0.0.1:3001/car-kind/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}