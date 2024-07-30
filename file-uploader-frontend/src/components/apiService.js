import axios from 'axios';

const API_BASE_URL = 'http://localhost:10000';

export const uploadFiles = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData);
        return response.data;
    } catch (error) {
        throw new Error('Error uploading files');
    }
};

export const downloadFiles = async (uniqueCode) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/download`, { uniqueCode }, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw new Error('Invalid code');
    }
};
