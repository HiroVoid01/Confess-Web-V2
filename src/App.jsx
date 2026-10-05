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
  const [generatedLink, setGeneratedLink] = useState('');

  const generate = () => {
    const params = new URLSearchParams();
    params.set('gender', gender);
    params.set('color', color);
    params.set('name', name);
    params.set('song', song);
    params.set('wa', wa);
    setGeneratedLink(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Web Confess Builder 💖</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pilih Karakter (Gambar)</label>
            <select className="mt-1 w-full border rounded-md p-2" value={gender} onChange={e => setGender(e.target.value)}>
              <option value="cewe">Karakter Imut/Cewek</option>
              <option value="cowo">Karakter Lucu/Cowok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Warna Background (Theme)</label>
            <input type="color" className="mt-1 w-full h-10 border rounded-md p-1 cursor-pointer" value={color} onChange={e => setColor(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Target / Gebetan</label>
            <input type="text" className="mt-1 w-full border rounded-md p-2" placeholder="Contoh: Budi" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link Lagu (URL MP3 / Catbox)</label>
            <input type="text" className="mt-1 w-full border rounded-md p-2" placeholder="https://files.catbox.moe/xxxx.mp3" value={song} onChange={e => setSong(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor WhatsApp Kamu</label>
            <input type="text" className="mt-1 w-full border rounded-md p-2" placeholder="628123456789" value={wa} onChange={e => setWa(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">Ganti angka 0 di depan dengan 62 (contoh: 62812...)</p>
          </div>

          <button onClick={generate} className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition">
            Buat Link Confess!
          </button>

          {generatedLink && (
            <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-md">
              <p className="text-sm text-pink-800 mb-2 font-semibold">Berhasil! Ini link yang bisa kamu kirim:</p>
              <input type="text" readOnly value={generatedLink} className="w-full text-xs p-2 border rounded bg-white mb-2 text-gray-600 focus:outline-none" />
              <button onClick={copyLink} className="w-full bg-green-500 text-white text-sm py-2 rounded hover:bg-green-600 font-semibold shadow">Copy Link</button>
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
  
  const [isOpen, setIsOpen] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ top: 0, left: 0 });
  const [isAbsolute, setIsAbsolute] = useState(false);
  const audioRef = useRef(null);

  const openConfess = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay prevented', err));
    }
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

  if (!isOpen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4" style={{ backgroundColor: color }}>
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
        
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Hai, {name}! ✨</h2>
        <p className="text-gray-600 mb-8 font-medium text-lg">
          Sebenernya aku udah lama merhatiin kamu...<br/>
          Kamu mau nggak jadi pacarku? 🥺👉👈
        </p>
        
        <div className="flex justify-center items-center gap-6 relative h-16">
          <button onClick={accept} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-110 z-20 text-lg">
            Mau! ❤️
          </button>
          
          <button 
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={isAbsolute ? { position: 'fixed', top: noBtnPos.top, left: noBtnPos.left, zIndex: 50 } : {}}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 text-lg"
          >
            Nggak
          </button>
        </div>
      </div>
    </div>
  );
}