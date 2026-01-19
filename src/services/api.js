import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Barkod tarama
export const scanBarcode = async (barcode) => {
  try {
    const response = await api.post('/api/v1/scan/barcode', { barcode });
    return response.data;
  } catch (error) {
    console.error('Barkod tarama hatası:', error);
    throw error;
  }
};

// İçindekiler analizi (görüntü)
export const analyzeIngredients = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post('/api/v1/analyze/ingredients', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Görüntü analizi hatası:', error);
    throw error;
  }
};

// Metin analizi
export const analyzeText = async (text) => {
  try {
    const response = await api.post('/api/v1/analyze/text', null, {
      params: { text },
    });
    return response.data;
  } catch (error) {
    console.error('Metin analizi hatası:', error);
    throw error;
  }
};

// Ürün arama
export const searchProducts = async (query, limit = 10) => {
  try {
    const response = await api.get('/api/v1/products/search', {
      params: { q: query, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Ürün arama hatası:', error);
    throw error;
  }
};

// Sağlık kontrolü
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Sağlık kontrolü hatası:', error);
    throw error;
  }
};

export default api;
