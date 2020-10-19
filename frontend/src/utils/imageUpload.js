import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export default async (formData) => {
  try {
    const { data } = await axios.post('/api/uploads/', formData, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
