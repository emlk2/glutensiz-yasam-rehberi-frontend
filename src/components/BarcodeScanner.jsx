import React, { useState } from 'react';
import { scanBarcode } from '../services/api';

export default function BarcodeScanner({ onResult }) {
  const [barcode, setBarcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    
    if (!barcode.trim()) {
      setError('Lütfen bir barkod girin');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await scanBarcode(barcode);
      onResult(result);
      setBarcode('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Tarama başarısız');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">🔍 Barkod Tara</h2>
      
      <form onSubmit={handleScan} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Barkod Numarası
          </label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Örn: 8696000000001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            8-14 karakterli barkod kodu girin
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {loading ? 'Taranıyor...' : 'Ara'}
        </button>
      </form>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
        <p>💡 İpucu: Kameranlı cihazlarda kamera uygulamasından QR/Barkod okuyucuyu kullanabilirsiniz.</p>
      </div>
    </div>
  );
}
