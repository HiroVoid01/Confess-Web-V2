import React, { useState, useRef } from 'react';

export default function App() {
  const [urlParams, setUrlParams] = useState(new URLSearchParams(window.location.search));
  const isViewer = urlParams.has('name');

  if (isViewer) {
    return <Viewer urlParams={urlParams} />;
  }
  return <Builder />;
}

function Builder() {
  const [gender, setGender] = useState('cewe');
  const [color, setColor] = useState('#ff69b4');
  const [name, setName] = useState('');
  const [song, setSong] = useState('');
  const [wa, setWa] = useState('');
  
  // Custom messages state
  const [p1, setP1] = useState('Sebenernya aku udah lama merhatiin kamu...');
  const [p2, setP2] = useState('Tiap ngobrol sama kamu, rasanya nyaman banget dan bikin aku seneng terus.');
  const [p3, setP3] = useState('Kamu mau nggak jadi pacarku? 🥺👉👈');
  
  const [generatedLink, setGeneratedLink] = useState('');

  const generate = () => {
    const params = new URLSearchParams();
    params.set('gender', gender);
    params.set('color', color);
    params.set('name', name);
    params.set('song', song);
    params.set('wa', wa);
    params.set('p1', p1);
    params.set('p2', p2);
    params.set('p3', p3);
    setGeneratedLink(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-10 font-sans">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Web Confess Builder 💖</h1>
        
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Karakter</label>
                <select className="mt-1 w-full border border-gray-300 rounded-md p-2" value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="cewe">Cewek/Imut</option>
                  <option value="cowo">Cowok/Lucu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Warna Background</label>
                <input type="color" className="mt-1 w-full h-10 border border-gray-300 rounded-md p-1 cursor-pointer" value={color} onChange={e => setColor(e.target.value)} />
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Target</label>
            <input type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" placeholder="Contoh: Seren" value={name} onChange={e => setName(e.target.value)} />
          </div>

          {/* Kotak Custom Kata-kata */}
          <div className="p-4 bg-pink-50/50 border border-pink-100 rounded-lg space-y-3">
            <h3 className="font-bold text-pink-800 text-sm mb-1">📝 Custom Kata-kata (Biar agak dramatis)</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Halaman 1 (Pembuka)</label>
              <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-pink-500 focus:border-pink-500" rows="2" value={p1} onChange={e => setP1(e.target.value)}></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Halaman 2 (Lanjutan)</label>
              <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-pink-500 focus:border-pink-500" rows="2" value={p2} onChange={e => setP2(e.target.value)}></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Halaman 3 (Pertanyaan Inti)</label>
              <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-pink-500 focus:border-pink-500" rows="2" value={p3} onChange={e => setP3(e.target.value)}></textarea>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link Lagu (URL MP3)</label>
            <input type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" placeholder="https://files.catbox.moe/xxxx.mp3" value={song} onChange={e => setSong(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor WhatsApp Kamu</label>
            <input type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" placeholder="628123456789" value={wa} onChange={e => setWa(e.target.value)} />
          </div>

          <button onClick={generate} className="w-full bg-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-600 transition shadow-md mt-2">
            Buat Link Confess!
          </button>

          {generatedLink && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 mb-2 font-bold">🎉 Berhasil! Copy link ini:</p>
              <input type="text" readOnly value={generatedLink} className="w-full text-xs p-3 border border-green-300 rounded bg-white mb-3 text-gray-600 focus:outline-none" />
              <button onClick={copyLink} className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 font-semibold shadow">Copy Link</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Viewer({ urlParams }) {
  const gender = urlParams.get('gender') || 'cewe';
  const color = urlParams.get('color') || '#ff69b4';
  const name = urlParams.get('name') || 'Kamu';
  const song = urlParams.get('song') || '';
  const wa = urlParams.get('wa') || '';
  
  const p1 = urlParams.get('p1') || 'Sebenernya aku udah lama merhatiin kamu...';
  const p2 = urlParams.get('p2') || 'Tiap ngobrol sama kamu, rasanya nyaman banget dan bikin aku seneng terus.';
  const p3 = urlParams.get('p3') || 'Kamu mau nggak jadi pacarku? 🥺👉👈';
  
  const [step, setStep] = useState(0); 
  const [noBtnPos, setNoBtnPos] = useState({ top: 0, left: 0 });
  const [isAbsolute, setIsAbsolute] = useState(false);
  const audioRef = useRef(null);

  const openConfess = () => {
    setStep(1);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay prevented', err));
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleNoHover = () => {
    setIsAbsolute(true);
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoBtnPos({ left: x, top: y });
  };

  const accept = () => {
    window.location.href = `https://wa.me/${wa}?text=Hai,%20aku%20terima%20confess%20kamu!%20%E2%9D%A4%EF%B8%8F`;
  };

  const gifUrl = gender === 'cewe' 
    ? "https://media.tenor.com/ef39678c183cf93f9c6d3df3e481b7a2/tenor.gif" 
    : "https://media.tenor.com/mD2I3E8c-wEAAAAi/bear-hug.gif";

  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 transition-all duration-1000" style={{ backgroundColor: color }}>
        <h1 className="text-3xl md:text-5xl font-bold mb-8 animate-bounce text-center drop-shadow-md">Ada pesan rahasia buat {name}! 💌</h1>
        <button onClick={openConfess} className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-110 transition transform">
          Buka Suratnya
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-1000" style={{ backgroundColor: color }}>
      {song && <audio ref={audioRef} src={song} loop />}
      
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center z-10 border-4 border-white/20">
        <img 
          src={gifUrl} 
          alt="cute gif" 
          className="w-40 h-40 mx-auto mb-6 rounded-2xl object-cover shadow-md pointer-events-none"
        />
        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Hai, {name}! ✨</h2>
        
        <div className="min-h-[100px] flex items-center justify-center mb-8">
          {step === 1 && <p className="text-gray-700 font-medium text-lg leading-relaxed animate-pulse">{p1}</p>}
          {step === 2 && <p className="text-gray-700 font-medium text-lg leading-relaxed animate-pulse">{p2}</p>}
          {step === 3 && <p className="text-gray-700 font-medium text-lg leading-relaxed">{p3}</p>}
        </div>
        
        <div className="flex justify-center items-center gap-4 relative h-16 w-full">
          {step < 3 ? (
            <button onClick={nextStep} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 z-20 text-lg w-full">
              Lanjut ➡️
            </button>
          ) : (
            <>
              <button onClick={accept} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-110 z-20 text-lg w-full">
                Mau! ❤️
              </button>
              
              <button 
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={isAbsolute ? { position: 'fixed', top: noBtnPos.top, left: noBtnPos.left, zIndex: 50 } : {}}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 text-lg w-full"
              >
                Nggak
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
