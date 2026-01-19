/* Risk Seviyesi Renkleri ve Konfigürasyonu */

export const RISK_LEVELS = {
  safe: {
    label: 'Güvenli',
    emoji: '🟢',
    color: 'bg-green-100 border-green-300 text-green-800',
    bgColor: 'bg-green-500',
    recommendation: 'Bu ürün gluten içermediği görülmektedir. Fakat yine de üretici bilgilerini kontrol etmeniz önerilir.',
  },
  risky: {
    label: 'Riskli',
    emoji: '🟡',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    bgColor: 'bg-yellow-500',
    recommendation: 'Çapraz bulaş riski olabilir. Eğer çölyak hastasıysanız, üreticiyi arayarak detaylı bilgi alınız.',
  },
  dangerous: {
    label: 'Tehlikeli',
    emoji: '🔴',
    color: 'bg-red-100 border-red-300 text-red-800',
    bgColor: 'bg-red-500',
    recommendation: 'Bu ürün gluten içermektedir ve RISKLIDIR. Çölyak hastası olarak tüketmeyiniz.',
  },
  unknown: {
    label: 'Bilinmiyor',
    emoji: '⚪',
    color: 'bg-gray-100 border-gray-300 text-gray-800',
    bgColor: 'bg-gray-500',
    recommendation: 'Risk durumu belirlenememiştir. Lütfen üreticiyi arayınız.',
  },
};

export const getRiskConfig = (riskLevel) => {
  return RISK_LEVELS[riskLevel] || RISK_LEVELS.unknown;
};
