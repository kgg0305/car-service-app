import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL + '/extra';
const token = JSON.parse(sessionStorage.getItem('token'));

const checkName = async(name) => {
    try {
        const response = await axios.post(base_url + '/check-name', {
            model_name: name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

const create = async(body) => {
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
        const response = await axios.post(base_url, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const update = async(body) => {
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
        const response = await axios.put(base_url + '/' + body.idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const remove = async(idx) => {
    const response = await axios.get(base_url + '/' + idx);

    var data = 
    {
        ...response.data,
        deleted_at: new Date(),
        deleted_by: token.idx,
        is_deleted: true
    };
    
    try {
        const response = await axios.put(base_url + '/' + idx, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const getList = async(offset, search) => {
    try {
        const response = await axios.post(base_url + '/list/' + offset, search);
        
        return response.data;
    } catch (e) {
        return e;
    }
}

const getOptionList = async() => {
    try {
        const response = await axios.get(base_url + '/option-list');
        
        return response.data;
    } catch (e) {
        return e;
    }
}

const get = async(idx) => {
    try {
        const response = await axios.get(base_url + '/' + idx);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

// const remove = async(idx) => {
//     try {
//         const response = await axios.delete(base_url + '/' + idx);
    
//         return response.data;
//     } catch (e) {
//         return e;
//     }
// }

const download = async() => {
    try {
        const response = await axios.post(base_url + '/download', null,
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

export const extraService = {
    checkName,
    create,
    update,
    getList,
    getOptionList,
    get,
    remove,
    download
};