import React, { useState } from 'react';
import { analyzeIngredients } from '../services/api';

export default function ImageUploader({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    // Dosya türü kontrolü
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Lütfen JPG veya PNG dosyası seçin');
      return;
    }

    // Boyut kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya 5MB\'dan küçük olmalıdır');
      return;
    }

    // Önizleme göster
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeIngredients(file);
      onResult(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analiz başarısız');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">📸 İçindekiler Analizi</h2>

      <div className="space-y-4">
        {/* Dosya Yükleme Alanı */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition cursor-pointer">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageUpload}
            disabled={loading}
            className="hidden"
            id="image-input"
          />
          <label
            htmlFor="image-input"
            className="cursor-pointer block"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v4a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32 0h-2.5a1.5 1.5 0 00-1.5 1.5v1a1.5 1.5 0 001.5 1.5H32"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-green-600">Fotoğraf Yükleyin</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG veya PNG, max 5MB
            </p>
          </label>
        </div>

        {/* Önizleme */}
        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto rounded-lg max-h-64 object-cover"
            />
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* Hata Mesajı */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Yükleniyor */}
        {loading && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            OCR ve AI analiz yapılıyor... Lütfen bekleyin.
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
        <p>💡 İpucu: İçindekiler bölümünün açık, net bir fotoğrafını çekiniz.</p>
      </div>
    </div>
  );
}
