import axios from 'axios';

export async function CheckExtraNameAPI(region) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/extra/check-name', {
            region: region
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

export async function CreateExtraAPI(body) {
    var data = [
        {
            brand_id: body.brand_id,
            group_id: body.group_id,
            model_id: body.model_id,
            region: body.region,
            condition: body.condition,
            fee: body.fee,
            discount: body.discount,
            transfer: body.transfer
        }
    ];

    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/extra', data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function UpdateExtraAPI(body) {
    var data = {
        brand_id: body.brand_id,
        group_id: body.group_id,
        model_id: body.model_id,
        region: body.region,
        condition: body.condition,
        fee: body.fee,
        discount: body.discount,
        transfer: body.transfer
    };
    
    try {
        const response = await axios.put(process.env.REACT_APP_API_URL + '/extra/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetExtraListAPI(offset, search) {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/extra/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetExtraOptionListAPI(offset, search) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/extra/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function GetExtraInfoAPI(idx) {
    try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/extra/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DeleteExtraInfoAPI(idx) {
    try {
        const response = await axios.delete(process.env.REACT_APP_API_URL + '/extra/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

export async function DownloadExtraFileAPI() {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/extra/download', null,
            {
                headers:
                {
                    'Content-Disposition': "attachment; filename=template.xlsx",
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                responseType: 'arraybuffer',
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '취득세.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch((error) => console.log(error));
    } catch (e) {
        return e;
    }
}