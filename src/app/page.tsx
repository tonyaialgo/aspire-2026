"use client";

import { useState } from "react";

type DayKey = "6" | "7" | "8" | "9" | "10";

interface RestaurantInfo {
  name: string;
  name_en?: string;
  cuisine: string;
  address: string;
  phone?: string;
  hours?: string;
  priceRange?: string;
  highlights?: string[];
  mapUrl?: string;
  bookingUrl?: string;
  website?: string;
}

interface HospitalInfo {
  name: string;
  name_en: string;
  address: string;
  phone?: string;
  description: string;
  highlights?: string[];
  mapUrl?: string;
  website?: string;
}

interface AttractionInfo {
  name: string;
  name_en: string;
  description: string;
  highlights?: string[];
  address?: string;
  ticketInfo?: string;
  suggestedDuration?: string;
  imageUrl?: string;
  mapUrl?: string;
}

interface ScheduleItem {
  time: string;
  event: string;
  type: "aspire" | "merck" | "meal" | "break" | "transport" | "social" | "info" | "hospital" | "attraction";
  restaurant?: RestaurantInfo;
  hospital?: HospitalInfo;
  attraction?: AttractionInfo;
}

const restaurants: Record<string, RestaurantInfo> = {
  "xiao-diaoli": {
    name: "小吊梨湯",
    name_en: "Xiao Diao Li Tang",
    cuisine: "北京菜 · 烤鴨",
    address: "北京市朝陽區廣渠路36號院6號樓",
    phone: "+86-10-87766877",
    hours: "10:30-22:00",
    priceRange: "¥¥",
    highlights: ["北京烤鴨", "老北京炸醬麵", "小吊梨湯", "驢打滾"],
    mapUrl: "https://maps.google.com/?q=小吊梨湯+北京",
    website: "https://www.xiaodiaoli.com"
  },
  "houhai16": {
    name: "后海16号",
    name_en: "Houhai No.16",
    cuisine: "北京私房菜",
    address: "北京市西城區后海北沿16號",
    phone: "+86-10-64019916",
    hours: "11:00-14:00, 17:00-22:00",
    priceRange: "¥¥¥",
    highlights: ["胡同私房菜", "老北京味道", "環境幽靜", "預約制"],
    mapUrl: "https://maps.google.com/?q=后海16号+北京",
    website: "https://www.houhai16.com"
  }
};

const hospital: HospitalInfo = {
  name: "北京大學人民醫院",
  name_en: "Peking University People's Hospital",
  address: "北京市西城區西直門南大街11號",
  phone: "+86-10-88326666",
  description: "北京大學人民醫院是中國著名的三級甲等醫院，擁有先進的輔助生殖技術中心。醫院在生殖醫學領域處於國際領先地位，特別是體外受精-胚胎移植技術。",
  highlights: [
    "三級甲等綜合醫院",
    "輔助生殖技術中心",
    "國際領先的生殖醫學技術",
    "專業的醫療團隊"
  ],
  mapUrl: "https://maps.google.com/?q=北京大学人民医院",
  website: "https://www.pkuph.cn"
};

const attractions: Record<string, AttractionInfo> = {
  "tiantan": {
    name: "天壇",
    name_en: "Temple of Heaven",
    description: "天壇是明清兩代皇帝祭天祈穀的神聖場所，佔地約273萬平方米，是中國現存最大的古代祭祀建築群。1998年被列入世界文化遺產名錄。",
    highlights: ["祈年殿", "回音壁", "圜丘", "丹陛橋"],
    address: "北京市東城區天壇東路甲1號",
    ticketInfo: "門票：旺季15元，淡季10元，建議提前網上預訂",
    suggestedDuration: "建議遊覽時間：2-3小時",
    imageUrl: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=800",
    mapUrl: "https://maps.google.com/?q=天壇+北京"
  },
  "hutong": {
    name: "胡同",
    name_en: "Beijing Hutongs",
    description: "胡同是北京老城區的傳統小巷，見證了老北京的生活文化。胡同遊是深入了解北京傳統生活的最佳方式，可以騎三輪車穿梭於狹窄的巷弄之間。",
    highlights: ["什剎海胡同", "南鑼鼓巷", "東四胡同", "三輪車遊覽"],
    address: "北京市西城區什剎海地區",
    ticketInfo: "三輪車遊胡同：約100-200元/小時，建議透過導遊預訂",
    suggestedDuration: "建議遊覽時間：2-3小時",
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
    mapUrl: "https://maps.google.com/?q=什剎海胡同+北京"
  },
  "qianmen": {
    name: "前門大街",
    name_en: "Qianmen Street",
    description: "前門大街是北京最著名的商業街之一，保留了民國時期的建築風貌。這裡匯聚了众多老字號店鋪，如全聚德烤鴨店、同仁堂藥店等。",
    highlights: ["全聚德烤鴨", "同仁堂", "老北京布鞋", "兔兒爺泥塑"],
    address: "北京市東城區前門大街",
    ticketInfo: "免費參觀，店鋪消費自理，建議晚上前往更能感受氛圍",
    suggestedDuration: "建議遊覽時間：1-2小時",
    imageUrl: "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800",
    mapUrl: "https://maps.google.com/?q=前門大街+北京"
  }
};

const schedule: Record<DayKey, ScheduleItem[]> = {
  "6": [
    { time: "全天", event: "ASPIRE 2026 報到及準備", type: "info" },
    { time: "10:45-12:15", event: "MERCK Symposium - Journeying the Silk Road of Reproductive Care", type: "merck" },
  ],
  "7": [
    { time: "07:00-17:00", event: "ASPIRE Program 全日會議", type: "aspire" },
    { time: "12:00-13:30", event: "午餐：小吊梨汤 · 北京菜 · 烤鸭", type: "meal", restaurant: restaurants["xiao-diaoli"] },
    { time: "下午", event: "MTE Symposium · Speaker Q&A · Afternoon Tea Break", type: "aspire" },
    { time: "晚上", event: "MERCK Dinner (nearby hotel)", type: "merck" },
  ],
  "8": [
    { time: "09:00-12:00", event: "自由活動 / 城市探索", type: "info" },
    { time: "12:00-13:30", event: "午餐時間", type: "meal" },
    { time: "16:30-18:30", event: "醫院參觀：北京大學人民醫院", type: "hospital", hospital: hospital },
    { time: "晚上", event: "MERCK Dinner", type: "merck" },
    { time: "晚上", event: "ASPIRE Opening & Awards Ceremony", type: "aspire" },
  ],
  "9": [
    { time: "07:30-11:40", event: "ASPIRE Program", type: "aspire" },
    { time: "上午", event: "MTE FFW Morning Tea Break", type: "break" },
    { time: "上午", event: "MTE LH-Chinese Speaker Session", type: "aspire" },
    { time: "12:00-13:30", event: "午餐時間 (with Dr Fatemi)", type: "meal" },
    { time: "晚上", event: "晚餐：后海16号 · 北京私房菜", type: "meal", restaurant: restaurants["houhai16"] },
  ],
  "10": [
    { time: "07:30-11:40", event: "ASPIRE Program", type: "aspire" },
    { time: "11:45-12:15", event: "ASPIRE Awards & Closing Ceremony", type: "aspire" },
    { time: "12:15後", event: "MERCK Fertility Counts · 行程結束", type: "info" },
  ],
};

const dayLabels: Record<DayKey, string> = {
  "6": "5月6日 (三)",
  "7": "5月7日 (四)",
  "8": "5月8日 (五)",
  "9": "5月9日 (六)",
  "10": "5月10日 (日)",
};

const typeColors: Record<ScheduleItem["type"], string> = {
  aspire: "bg-blue-100 border-blue-300 text-blue-800",
  merck: "bg-purple-100 border-purple-300 text-purple-800",
  meal: "bg-amber-100 border-amber-300 text-amber-800",
  break: "bg-pink-100 border-pink-300 text-pink-800",
  transport: "bg-sky-100 border-sky-300 text-sky-800",
  social: "bg-green-100 border-green-300 text-green-800",
  info: "bg-gray-100 border-gray-300 text-gray-700",
  hospital: "bg-red-100 border-red-300 text-red-800",
  attraction: "bg-orange-100 border-orange-300 text-orange-800",
};

const typeLabels: Record<ScheduleItem["type"], string> = {
  aspire: "ASPIRE",
  merck: "MERCK",
  meal: "用餐",
  break: "休息",
  transport: "交通",
  social: "社交",
  info: "資訊",
  hospital: "醫院參觀",
  attraction: "景點",
};

export default function Home() {
  const [activeDay, setActiveDay] = useState<DayKey>("6");
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantInfo | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<AttractionInfo | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=1200')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-sm mb-4">
            2026年5月6-10日
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            ASPIRE 2026
          </h1>
          <p className="text-xl text-blue-200 mb-2">Beijing · China</p>
          <p className="text-lg text-white/70">中國北京 · 中國國家會議中心</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">
              🏨 中國國家會議中心酒店
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">
              📅 5月6-10日
            </span>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">🏨</div>
            <div className="text-xs text-gray-500">入住</div>
            <div className="text-sm font-medium">14:00</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🍳</div>
            <div className="text-xs text-gray-500">早餐</div>
            <div className="text-sm font-medium">06:30-10:30</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">📤</div>
            <div className="text-xs text-gray-500">退房</div>
            <div className="text-sm font-medium">12:00</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">☎️</div>
            <div className="text-xs text-gray-500">酒店電話</div>
            <div className="text-sm font-medium">+86-10-84372008</div>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {(Object.keys(schedule) as DayKey[]).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all ${
                activeDay === day
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {dayLabels[day]}
            </button>
          ))}
        </div>

        {/* Schedule */}
        <div className="mt-6 space-y-3">
          {schedule[activeDay].map((item, i) => (
            <div
              key={i}
              className={`flex gap-4 p-4 rounded-xl border ${typeColors[item.type]} bg-white/95 backdrop-blur`}
            >
              <div className="flex-shrink-0 font-mono text-sm font-semibold text-gray-600 pt-0.5 min-w-[90px]">
                {item.time}
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  {item.restaurant && (
                    <button
                      onClick={() => setSelectedRestaurant(item.restaurant!)}
                      className="text-left hover:text-blue-600 underline underline-offset-2"
                    >
                      {item.event}
                    </button>
                  )}
                  {item.hospital && (
                    <button
                      onClick={() => setSelectedHospital(item.hospital!)}
                      className="text-left hover:text-red-600 underline underline-offset-2"
                    >
                      {item.event}
                    </button>
                  )}
                  {!item.restaurant && !item.hospital && (
                    item.event
                  )}
                </div>
                <div className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                  item.type === "aspire" ? "bg-blue-100 text-blue-700" :
                  item.type === "merck" ? "bg-purple-100 text-purple-700" :
                  item.type === "meal" ? "bg-amber-100 text-amber-700" :
                  item.type === "hospital" ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {typeLabels[item.type]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">🏨 酒店資訊</h2>
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            中國國家會議中心酒店
          </h3>
          <p className="text-gray-600 mb-3">
            The China National Convention Center Hotel
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📍 Building 1, No. 8 Yard, Beichen West Road<br/>
               <span className="ml-5">Chaoyang District, Beijing, 100105, China</span></p>
            <p>📞 +86-10-84372008</p>
            <p>🕐 入住 14:00 · 退房 12:00 · 早餐 06:30-10:30</p>
          </div>
          <a
            href="https://maps.google.com/?q=China+National+Convention+Center+Hotel+Beijing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
          >
            📍 在地圖中查看
          </a>
        </div>
      </div>

      {/* Beijing Attractions */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">🏛️ 北京景點推薦</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.values(attractions) as AttractionInfo[]).map((attraction) => (
            <button
              key={attraction.name}
              onClick={() => setSelectedAttraction(attraction)}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition text-left"
            >
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${attraction.imageUrl})` }} />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{attraction.name}</h3>
                <p className="text-xs text-gray-500">{attraction.name_en}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{attraction.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Apps */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h2 className="text-2xl font-bold text-white mb-4">📱 推薦下載 App</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: "Google 地圖", icon: "🗺️", desc: "導航、交通、公眾交通", ios: "https://apps.apple.com/hk/app/google-maps/id585027354", android: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps" },
            { name: "OpenRice", icon: "🍔", desc: "香港餐廳評論、訂座", ios: "https://apps.apple.com/hk/app/openrice/id oddid", android: "https://play.google.com/store/apps/details?id=com.openrice.android" },
            { name: "Uber", icon: "🚗", desc: "叫車服務", ios: "https://apps.apple.com/hk/app/uber/id368677368", android: "https://play.google.com/store/apps/details?id=com.ubercab" },
            { name: "支付寶", icon: "💳", desc: "數字錢包、行動支付", ios: "https://apps.apple.com/cn/app/id333206289", android: "https://global.alipay.com" },
            { name: "微信", icon: "💬", desc: "通訊、支付", ios: "https://apps.apple.com/cn/app/id414478124", android: "https://www.wechat.com/en/download.html" },
            { name: "TripAdvisor", icon: "⭐", desc: "旅遊評論、餐廳推薦", ios: "https://apps.apple.com/hk/app/tripadvisor/id284876795", android: "https://play.google.com/store/apps/details?id=com.tripadvisor.android" },
          ].map((app) => (
            <div key={app.name} className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">{app.icon}</div>
              <div className="font-medium text-gray-800">{app.name}</div>
              <div className="text-xs text-gray-500 mt-1">{app.desc}</div>
              <div className="mt-3 flex justify-center gap-3">
                <a href={app.ios} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 bg-black text-white rounded-lg text-xs hover:bg-gray-800 transition">
                  <span></span> App Store
                </a>
                <a href={app.android} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition">
                  <span>▶</span> Google Play
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h2 className="text-2xl font-bold text-white mb-4">📞 聯絡資訊</h2>
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🏨</span>
              <div>
                <h3 className="font-bold text-gray-800">中國國家會議中心酒店</h3>
                <p className="text-sm text-gray-600">電話：+86-10-84372008</p>
                <p className="text-sm text-gray-600">地址：Building 1, No. 8 Yard, Beichen West Road, Chaoyang District, Beijing</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🏥</span>
              <div>
                <h3 className="font-bold text-gray-800">北京大學人民醫院</h3>
                <p className="text-sm text-gray-600">電話：+86-10-88326666</p>
                <p className="text-sm text-gray-600">地址：北京市西城區西直門南大街11號</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🚗</span>
              <div>
                <h3 className="font-bold text-gray-800">大會交通安排</h3>
                <p className="text-sm text-gray-600">大會將安排穿梭巴士來往酒店與會議場地</p>
                <p className="text-sm text-gray-600">醫院參觀當日亦安排接送服務</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Map */}
      <div className="max-w-4xl mx-auto px-4 mt-6 mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">📍 場地位置</h2>
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-video relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6!2d116.407!3d39.905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU0JzE3LjYiTiAxMTbCsDI0JzI1LjYiRQ!5e0!3m2!1sen!2scn!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
          <div className="p-4">
            <p className="font-medium text-gray-800">中國國家會議中心</p>
            <p className="text-sm text-gray-500">北京朝陽區北辰西路8號院1號樓</p>
          </div>
        </div>
      </div>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedRestaurant.name}</h3>
                  {selectedRestaurant.name_en && (
                    <p className="text-sm text-gray-500">{selectedRestaurant.name_en}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedRestaurant(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">🍽️</span>
                  <div>
                    <div className="font-medium text-gray-700">菜系</div>
                    <div className="text-gray-600">{selectedRestaurant.cuisine}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <div className="font-medium text-gray-700">地址</div>
                    <div className="text-gray-600">{selectedRestaurant.address}</div>
                  </div>
                </div>
                
                {selectedRestaurant.phone && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">☎️</span>
                    <div>
                      <div className="font-medium text-gray-700">電話</div>
                      <div className="text-gray-600">{selectedRestaurant.phone}</div>
                    </div>
                  </div>
                )}
                
                {selectedRestaurant.hours && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🕐</span>
                    <div>
                      <div className="font-medium text-gray-700">營業時間</div>
                      <div className="text-gray-600">{selectedRestaurant.hours}</div>
                    </div>
                  </div>
                )}
                
                {selectedRestaurant.priceRange && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">💰</span>
                    <div>
                      <div className="font-medium text-gray-700">人均</div>
                      <div className="text-gray-600">{selectedRestaurant.priceRange}</div>
                    </div>
                  </div>
                )}
                
                {selectedRestaurant.highlights && selectedRestaurant.highlights.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⭐</span>
                    <div>
                      <div className="font-medium text-gray-700">推薦菜式</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedRestaurant.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-5 flex flex-col gap-2">
                {selectedRestaurant.mapUrl && (
                  <a
                    href={selectedRestaurant.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
                  >
                    📍 在地圖中查看
                  </a>
                )}
                {selectedRestaurant.website && (
                  <a
                    href={selectedRestaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition"
                  >
                    🌐 官方網站
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Detail Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedHospital.name}</h3>
                  <p className="text-sm text-gray-500">{selectedHospital.name_en}</p>
                </div>
                <button
                  onClick={() => setSelectedHospital(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <div className="font-medium text-gray-700">簡介</div>
                    <div className="text-gray-600 leading-relaxed">{selectedHospital.description}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <div className="font-medium text-gray-700">地址</div>
                    <div className="text-gray-600">{selectedHospital.address}</div>
                  </div>
                </div>
                
                {selectedHospital.phone && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">☎️</span>
                    <div>
                      <div className="font-medium text-gray-700">電話</div>
                      <div className="text-gray-600">{selectedHospital.phone}</div>
                    </div>
                  </div>
                )}
                
                {selectedHospital.highlights && selectedHospital.highlights.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⭐</span>
                    <div>
                      <div className="font-medium text-gray-700">特色</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedHospital.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-5 flex flex-col gap-2">
                {selectedHospital.mapUrl && (
                  <a
                    href={selectedHospital.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
                  >
                    📍 在地圖中查看
                  </a>
                )}
                {selectedHospital.website && (
                  <a
                    href={selectedHospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition"
                  >
                    🌐 官方網站
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attraction Detail Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedAttraction.name}</h3>
                  <p className="text-sm text-gray-500">{selectedAttraction.name_en}</p>
                </div>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              {selectedAttraction.imageUrl && (
                <div className="rounded-xl overflow-hidden mb-4">
                  <img src={selectedAttraction.imageUrl} alt={selectedAttraction.name} className="w-full h-48 object-cover" />
                </div>
              )}
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <div className="font-medium text-gray-700">簡介</div>
                    <div className="text-gray-600 leading-relaxed">{selectedAttraction.description}</div>
                  </div>
                </div>
                
                {selectedAttraction.highlights && selectedAttraction.highlights.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⭐</span>
                    <div>
                      <div className="font-medium text-gray-700">必看景點</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedAttraction.highlights.map((h, i) => (
                          <span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedAttraction.address && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📍</span>
                    <div>
                      <div className="font-medium text-gray-700">地址</div>
                      <div className="text-gray-600">{selectedAttraction.address}</div>
                    </div>
                  </div>
                )}
                
                {selectedAttraction.ticketInfo && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🎫</span>
                    <div>
                      <div className="font-medium text-gray-700">門票資訊</div>
                      <div className="text-gray-600">{selectedAttraction.ticketInfo}</div>
                    </div>
                  </div>
                )}
                
                {selectedAttraction.suggestedDuration && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⏱️</span>
                    <div>
                      <div className="font-medium text-gray-700">建議遊覽時間</div>
                      <div className="text-gray-600">{selectedAttraction.suggestedDuration}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-5 flex flex-col gap-2">
                {selectedAttraction.mapUrl && (
                  <a
                    href={selectedAttraction.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
                  >
                    📍 在地圖中查看
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8 text-white/50 text-sm">
        ASPIRE 2026 · Beijing · 5-10 May 2026
      </div>
    </div>
  );
}
