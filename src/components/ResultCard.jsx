import React from 'react';
import { getRiskConfig } from '../utils/riskConfig';

export default function ResultCard({ result, loading = false }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!result) return null;

  const riskLevel = result.analysis?.risk_level || result.risk_level || 'unknown';
  const config = getRiskConfig(riskLevel);
  
  const explanation = result.analysis?.explanation || result.explanation || 'Bilgi yüklenemedi';
  const recommendations = result.analysis?.recommendations || [];
  const detectedIngredients = result.analysis?.detected_ingredients || [];

  return (
    <div className={`rounded-lg shadow-lg p-6 mb-6 border-l-4 ${config.color}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-4xl">{config.emoji}</span>
          <h2 className="text-2xl font-bold">{config.label}</h2>
        </div>
        {result.analysis?.risk_score && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Risk Puanı</p>
            <p className="text-2xl font-bold">
              {Math.round(result.analysis.risk_score * 100)}%
            </p>
          </div>
        )}
      </div>

      {/* Açıklama */}
      <p className="text-lg mb-4">{explanation}</p>

      {/* Tespit Edilen Malzemeler */}
      {detectedIngredients.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Tespit Edilen Malzemeler:</h3>
          <div className="space-y-2">
            {detectedIngredients.map((ing, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-sm ${
                  ing.risk_level === 'dangerous'
                    ? 'bg-red-100 text-red-800'
                    : ing.risk_level === 'risky'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <span className="font-semibold">{ing.ingredient}</span>
                {ing.reason && <span className="ml-2 text-xs">- {ing.reason}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tavsiyeleri */}
      {recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-bold mb-2 text-blue-900">Öneriler:</h3>
          <ul className="space-y-1">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-blue-900">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Güven Skoru */}
      {result.analysis?.confidence_score && (
        <div className="mt-4 text-xs text-gray-600">
          Analiz Güveni: %{(result.analysis.confidence_score * 100).toFixed(1)}
        </div>
      )}

      {/* Feragatname */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
        <p>
          <strong>⚠️ Uyarı:</strong> Bu uygulama danışmanlık amaçlıdır. Kesin karar
          almadan önce ürün paketini kontrol edin ve şüphe durumunda üreticiyi arayın.
        </p>
      </div>
    </div>
  );
}
