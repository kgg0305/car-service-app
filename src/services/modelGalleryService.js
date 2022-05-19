import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL + '/model-gallery';
const token = JSON.parse(sessionStorage.getItem('token'));

const checkName = async(name) => {
    try {
        const response = await axios.post(base_url + '/check-name', {
            group_name: name
        });
    
        return response.data.exist;
    } catch (e) {
        return e;
    }
}

const create = async(bodyList) => {
    var data = [];
    bodyList.map(body => {
        data.push(
            {
                order: body.order,
                model_id: body.model_id,
                picture: body.picture,

                created_at: new Date(),
                created_by: token.idx,
                updated_at: new Date(),
                updated_by: token.idx,
                is_deleted: false
            }
        )
    });

    try {
        const response = await axios.post(base_url, data);
    
        return response.data;
    } catch (e) {
        return e;
    }
}

const update = async(body) => {
    var data = {
        order: body.order,
        model_id: body.model_id,
        picture: body.picture,

        created_at: body.created_at,
        created_by: body.created_by,
        updated_at: new Date(),
        updated_by: token.idx,
        is_deleted: body.is_deleted
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

export const modelGalleryService = {
    checkName,
    create,
    update,
    getList,
    getOptionList,
    get,
    remove
};