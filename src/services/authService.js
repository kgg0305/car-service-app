import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL + '/auth';

const login = async(user_id, password) => {
    try {
        const response = await axios.post(base_url + '/login', {
            user_id: user_id,
            password: password,
        });
    
        return response.data;
    } catch (e) {
        return e;
    }
};

export const authService = {
    login
};