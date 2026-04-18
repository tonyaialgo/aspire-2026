"use client";

import { useState } from "react";

type DayKey = "6" | "7" | "8" | "9" | "10";

interface ScheduleItem {
  time: string;
  event: string;
  type: "aspire" | "merck" | "meal" | "break" | "transport" | "social" | "info";
}

const schedule: Record<DayKey, ScheduleItem[]> = {
  "6": [
    { time: "全天", event: "ASPIRE 2026 報到及準備", type: "info" },
    { time: "10:45-12:15", event: "MERCK Symposium - Journeying the Silk Road of Reproductive Care", type: "merck" },
  ],
  "7": [
    { time: "07:00-17:00", event: "ASPIRE Program 全日會議", type: "aspire" },
    { time: "12:00-13:30", event: "午餐：小吊梨汤 · 北京菜 · 烤鸭", type: "meal" },
    { time: "下午", event: "MTE Symposium · Speaker Q&A · Afternoon Tea Break", type: "aspire" },
    { time: "晚上", event: "MERCK Dinner (nearby hotel)", type: "merck" },
  ],
  "8": [
    { time: "09:00-12:00", event: "自由活動 / 城市探索", type: "info" },
    { time: "12:00-13:30", event: "午餐時間", type: "meal" },
    { time: "16:30-18:30", event: "醫院參觀：北京大學人民醫院", type: "info" },
    { time: "晚上", event: "MERCK Dinner", type: "merck" },
    { time: "晚上", event: "ASPIRE Opening & Awards Ceremony", type: "aspire" },
  ],
  "9": [
    { time: "07:30-11:40", event: "ASPIRE Program", type: "aspire" },
    { time: "上午", event: "MTE FFW Morning Tea Break", type: "break" },
    { time: "上午", event: "MTE LH-Chinese Speaker Session", type: "aspire" },
    { time: "12:00-13:30", event: "午餐時間 (with Dr Fatemi)", type: "meal" },
    { time: "晚上", event: "晚餐：后海16号 · 北京私房菜", type: "meal" },
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
};

const typeLabels: Record<ScheduleItem["type"], string> = {
  aspire: "ASPIRE",
  merck: "MERCK",
  meal: "用餐",
  break: "休息",
  transport: "交通",
  social: "社交",
  info: "資訊",
};

export default function Home() {
  const [activeDay, setActiveDay] = useState<DayKey>("6");
  const [showApps, setShowApps] = useState(false);

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
                <div className="font-medium">{item.event}</div>
                <div className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                  item.type === "aspire" ? "bg-blue-100 text-blue-700" :
                  item.type === "merck" ? "bg-purple-100 text-purple-700" :
                  item.type === "meal" ? "bg-amber-100 text-amber-700" :
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

      {/* Recommended Apps */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h2 className="text-2xl font-bold text-white mb-4">📱 推薦下載 App</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { 
              name: "高德地圖", 
              icon: "🗺️", 
              desc: "導航、交通、公眾交通",
              ios: "https://apps.apple.com/cn/app/id461703208",
              android: "https://www.amap.com/download",
              universal: "https://www.amap.com/download"
            },
            { 
              name: "美團", 
              icon: "🍔", 
              desc: "美食外賣、餐廳預訂",
              ios: "https://apps.apple.com/cn/app/id426889299",
              android: "https://android.meituan.com",
              universal: "https://www.meituan.com/app"
            },
            { 
              name: "滴滴出行", 
              icon: "🚗", 
              desc: "叫車服務",
              ios: "https://apps.apple.com/cn/app/id555239144",
              android: "https://www.didiglobal.com",
              universal: "https://www.didiglobal.com"
            },
            { 
              name: "支付寶", 
              icon: "💳", 
              desc: "數字錢包、行動支付",
              ios: "https://apps.apple.com/cn/app/id333206289",
              android: "https://global.alipay.com",
              universal: "https://global.alipay.com"
            },
            { 
              name: "微信", 
              icon: "💬", 
              desc: "通訊、支付",
              ios: "https://apps.apple.com/cn/app/id414478124",
              android: "https://www.wechat.com/en/download.html",
              universal: "https://www.wechat.com/en/download.html"
            },
            { 
              name: "大眾點評", 
              icon: "⭐", 
              desc: "餐廳評論、優惠",
              ios: "https://apps.apple.com/cn/app/id453196028",
              android: "https://www.dianping.com/download",
              universal: "https://www.dianping.com/download"
            },
          ].map((app) => {
            // Detect if iOS or Android for smart redirect
            const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
            const downloadUrl = isIOS ? (app.ios || app.universal) : (app.android || app.universal);
            return (
              <a
                key={app.name}
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 text-center hover:bg-gray-50 hover:scale-105 transition-all cursor-pointer active:scale-95"
              >
                <div className="text-3xl mb-2">{app.icon}</div>
                <div className="font-medium text-gray-800">{app.name}</div>
                <div className="text-xs text-gray-500 mt-1">{app.desc}</div>
                <div className="mt-2 text-xs text-blue-500 font-medium">下載 →</div>
              </a>
            );
          })}
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

      {/* Footer */}
      <div className="text-center py-8 text-white/50 text-sm">
        ASPIRE 2026 · Beijing · 5-10 May 2026
      </div>
    </div>
  );
}
