import axios from 'axios';

export async function CheckCountSettingNameAPI(group_name) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/count-setting/check-name', {
            group_name: group_name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateCountSettingAPI(bodyList) {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                rent_min: body.rent_min,
                rent_max: body.rent_max,
                new_min: body.new_min,
                new_max: body.new_max,
                hour: body.hour,
            }
        )
    });

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/count-setting', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateCountSettingAPI(body) {
    var data = {
        rent_min: body.rent_min,
        rent_max: body.rent_max,
        new_min: body.new_min,
        new_max: body.new_max,
        hour: body.hour,
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/count-setting/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountSettingListAPI() {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/count-setting/list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountSettingOptionListAPI() {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/count-setting/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetCountSettingInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/count-setting/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteCountSettingInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/count-setting/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}