import React, { useState, useEffect } from 'react';
import BarcodeScanner from './components/BarcodeScanner';
import ImageUploader from './components/ImageUploader';
import ResultCard from './components/ResultCard';
import { healthCheck } from './services/api';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [history, setHistory] = useState([]);

  // Uygulama yüklendiğinde kontrol et
  useEffect(() => {
    checkAPI();
    loadHistory();
    registerServiceWorker();
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('✅ Service Worker registered:', registration);
      } catch (error) {
        console.log('⚠️  Service Worker registration failed:', error);
      }
    }
  };

  const checkAPI = async () => {
    try {
      const status = await healthCheck();
      setApiStatus(status.status === 'healthy' || status.status === 'success');
    } catch (error) {
      console.error('API kontrol hatası:', error);
      setApiStatus(false);
    }
  };

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('scan_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Geçmiş yükleme hatası:', error);
    }
  };

  const saveToHistory = (result) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('tr-TR'),
      product: result.product?.product_name || result.analysis?.product_name || 'Bilinmiyor',
      riskLevel: result.risk_level || result.analysis?.risk_level || 'unknown',
      result
    };
    
    const updated = [newEntry, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem('scan_history', JSON.stringify(updated));
  };

  const handleBarcodeResult = (result) => {
    setResult(result);
    saveToHistory(result);
    setActiveTab('result');
  };

  const handleImageResult = (result) => {
    setResult(result);
    saveToHistory(result);
    setActiveTab('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌾</span>
              <div>
                <h1 className="text-2xl font-bold">Glutensiz Yaşam Rehberi</h1>
                <p className="text-green-100 text-sm">Çölyak ve gluten hassasiyeti için</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              apiStatus ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {apiStatus ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı'}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'home', label: '🏠 Ana Sayfa', icon: '🏠' },
              { id: 'barcode', label: '📊 Barkod', icon: '📊' },
              { id: 'ingredients', label: '📸 İçindekiler', icon: '📸' },
              { id: 'history', label: '📋 Geçmiş', icon: '📋' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-green-600'
                    : 'text-green-100 hover:bg-green-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Ana Sayfa */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Hoş Geldiniz!</h2>
              <p className="text-lg text-gray-700 mb-6">
                Çölyak ve gluten hassasiyeti olan kişiler için market ürünlerinin 
                gluten durumunu barkod tarama veya içerik analizi yoluyla anlık olarak tespit eden 
                AI tabanlı bir uygulamadır.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('barcode')}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  📊 Barkod Tara
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  📸 Malzemeleri Fotoğrafla
                </button>
              </div>
            </div>

            {/* Feragatname */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
              <h3 className="font-bold text-amber-900 mb-2">⚠️ Yasal Uyarı</h3>
              <p className="text-amber-900 text-sm">
                Bu uygulama <strong>danışmanlık amaçlıdır</strong> ve tıbbi tavsiye vermemektedir. 
                Verilen yanıtlar danışma amaçlıdır ve hatalı olabilir. 
                <strong> Kesin karar almadan önce lütfen ürün paketini kontrol edin ve şüphe durumunda üreticiyi arayın.</strong>
              </p>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '📊', title: 'Barkod Tarama', desc: 'Ürün barkodunu okutun' },
                { icon: '📸', title: 'OCR Analizi', desc: 'Malzemeleri fotoğrafla' },
                { icon: '🤖', title: 'AI Risk Analizi', desc: 'Gluten riskini belirle' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-4 text-center">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barkod Tarama */}
        {activeTab === 'barcode' && (
          <div>
            <BarcodeScanner onResult={handleBarcodeResult} />
          </div>
        )}

        {/* İçindekiler Analizi */}
        {activeTab === 'ingredients' && (
          <div>
            <ImageUploader onResult={handleImageResult} />
          </div>
        )}

        {/* Sonuç */}
        {activeTab === 'result' && result && (
          <div>
            <button
              onClick={() => setActiveTab('home')}
              className="mb-4 text-green-600 hover:text-green-700 font-semibold"
            >
              ← Geri
            </button>
            <ResultCard result={result} />
          </div>
        )}

        {/* Geçmiş */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">📋 Tarama Geçmişi</h2>
            
            {history.length === 0 ? (
              <p className="text-gray-600">Henüz tarama yapılmamış</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setResult(entry.result);
                      setActiveTab('result');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {entry.riskLevel === 'safe' ? '🟢' :
                         entry.riskLevel === 'risky' ? '🟡' : '🔴'}
                      </span>
                      <div>
                        <p className="font-semibold">{entry.product}</p>
                        <p className="text-xs text-gray-500">{entry.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-2">© 2026 Glutensiz Yaşam Rehberi</p>
          <p className="text-sm text-gray-400">
            Çölyak hastaları için geliştirilmiş AI-tabanlı ürün analiz sistemi
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
