import axios from 'axios';

export async function CheckGroupNameAPI(group_name) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/group/check-name', {
            group_name: group_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateGroupAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                brand_id: body.brand_id,
                group_name: body.group_name,
                car_kind_id: body.car_kind_id,
                is_use: body.is_use,
            }
        )
    });

    try {
        const response = await axios.post('http://13.125.168.233:4200/group', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateGroupAPI(body) {
    var data = {
        brand_id: body.brand_id,
        group_name: body.group_name,
        car_kind_id: body.car_kind_id,
        is_use: body.is_use,
    };
    
    try {
        const response = await axios.put('http://13.125.168.233:4200/group/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetGroupListAPI(offset, search) {
    try {
        const response = await axios.post('http://13.125.168.233:4200/group/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetGroupOptionListAPI(offset, search) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/group/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetGroupInfoAPI(idx) {
    try {
        const response = await axios.get('http://13.125.168.233:4200/group/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteGroupInfoAPI(idx) {
    try {
        const response = await axios.delete('http://13.125.168.233:4200/group/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}