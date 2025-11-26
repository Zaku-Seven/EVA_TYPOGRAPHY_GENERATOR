"use client"

import Image from "next/image";
import { useRef, useState } from "react";



export default function Home() {
  const [page, setPage] = useState('generator'); // 'generator', 'about'
  const [mode, setMode] = useState('title');
  const [titleText, setTitleText] = useState('EVANGELION');
  const [subtitleText, setSubtitleText] = useState('Take care of yourself.');
  const [prefixLines, setPrefixLines] = useState('NEON\nGENESIS');
  const [labelText, setLabelText] = useState('FINALE:');
  const [chaosWords, setChaosWords] = useState('人類補完計画\nシンクロ率400%\nATフィールド\nLCL\n使徒\nNERV\nSEELE\n覚醒\nサードインパクト\nEVA-01\n暴走\n心の壁\nおめでとう\nFOURTH CHILDREN\nDEAD SEA SCROLLS\nHUMAN INSTRUMENTALITY');
  const [bgMode, setBgMode] = useState('black'); // 'black', 'white', 'transparent'
  const [textMode, setTextMode] = useState('white'); // 'white', 'red'
  const [redShade, setRedShade] = useState(50); // 0-100 gradient scale
  const [grayShade, setGrayShade] = useState(100); // 0-100 gradient scale (0=black, 100=white)
  const canvasRef = useRef(null);

  const generateChaosPositions = (words: String) => {
    const items = words.split('\n').filter(w => w.trim());
    const positions: any = [];
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
    const weights = ['font-normal', 'font-bold', 'font-black'];

    items.forEach((word, i) => {
      const isLarge = i < 3;
      const sizeIdx = isLarge ? 6 + (i % 3) : Math.floor(Math.random() * 6);
      positions.push({
        text: word,
        size: sizes[sizeIdx],
        weight: weights[Math.floor(Math.random() * weights.length)],
        top: 5 + Math.random() * 85,
        left: 2 + Math.random() * 90,
        rotate: (Math.random() - 0.5) * 20,
        vertical: Math.random() > 0.7,
        opacity: 0.7 + Math.random() * 0.3
      });
    });
    return positions;
  };

  const [chaosPositions, setChaosPositions] = useState(() => generateChaosPositions(chaosWords));

  const regenerateChaos = () => {
    setChaosPositions(generateChaosPositions(chaosWords));
  };

  const downloadSVG = () => {
    const svg = document.getElementById('eva-output');
    if (!svg) return;
    const clone = svg.cloneNode(true);
    const serializer = new XMLSerializer();
    const str = serializer.serializeToString(clone);
    const blob = new Blob([str], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evangelion-typography.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (

    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight">EVANGELION TYPOGRAPHY</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setPage('generator')}
            className={`px-4 py-2 font-bold transition ${page === 'generator' ? 'bg-white text-black' : 'bg-neutral-700 hover:bg-neutral-600'}`}
          >
            GENERATOR
          </button>
          <button
            onClick={() => setPage('about')}
            className={`px-4 py-2 font-bold transition ${page === 'about' ? 'bg-white text-black' : 'bg-neutral-700 hover:bg-neutral-600'}`}
          >
            ABOUT
          </button>
        </div>
      </div>

      {page === 'generator' ? (
        <>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setMode('title')}
              className={`px-4 py-2 font-bold transition ${mode === 'title' ? 'bg-white text-black' : 'bg-neutral-700 hover:bg-neutral-600'}`}
            >
              TITLE CARD
            </button>
            <button
              onClick={() => setMode('chaos')}
              className={`px-4 py-2 font-bold transition ${mode === 'chaos' ? 'bg-white text-black' : 'bg-neutral-700 hover:bg-neutral-600'}`}
            >
              TEXT SPRAY
            </button>
          </div>

          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="flex-1 space-y-3">
              {mode === 'title' ? (
                <>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">PREFIX LINES (one per line)</label>
                    <textarea
                      value={prefixLines}
                      onChange={e => setPrefixLines(e.target.value)}
                      className="w-full bg-neutral-800 p-2 text-sm font-mono"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">MAIN TITLE</label>
                    <input
                      value={titleText}
                      onChange={e => setTitleText(e.target.value)}
                      className="w-full bg-neutral-800 p-2 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">LABEL (e.g. EPISODE:01)</label>
                    <input
                      value={labelText}
                      onChange={e => setLabelText(e.target.value)}
                      className="w-full bg-neutral-800 p-2 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">SUBTITLE</label>
                    <input
                      value={subtitleText}
                      onChange={e => setSubtitleText(e.target.value)}
                      className="w-full bg-neutral-800 p-2 text-sm font-mono"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">WORDS (one per line, first 3 are largest)</label>
                    <textarea
                      value={chaosWords}
                      onChange={e => setChaosWords(e.target.value)}
                      className="w-full bg-neutral-800 p-2 text-sm font-mono"
                      rows={8}
                    />
                  </div>
                  <button
                    onClick={regenerateChaos}
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 font-bold"
                  >
                    REGENERATE LAYOUT
                  </button>
                </>
              )}

              <div className="pt-2">
                <label className="block text-xs text-neutral-400 mb-2">TEXT COLOR</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setTextMode('white')}
                    className={`flex-1 px-3 py-2 text-sm font-bold transition ${textMode === 'white' ? 'bg-neutral-500 ring-2 ring-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  >
                    WHITE
                  </button>
                  <button
                    onClick={() => setTextMode('red')}
                    className={`flex-1 px-3 py-2 text-sm font-bold transition text-red-500 ${textMode === 'red' ? 'bg-neutral-800 ring-2 ring-red-500' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  >
                    RED
                  </button>
                </div>
                {textMode === 'white' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Black</span>
                      <span>White</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={grayShade}
                      onChange={e => setGrayShade(Number(e.target.value))}
                      className="w-full"
                      style={{
                        background: 'linear-gradient(to right, #000000, #ffffff)'
                      }}
                    />
                    <div
                      className="h-6 rounded mt-1"
                      style={{ backgroundColor: `hsl(0, 0%, ${grayShade}%)` }}
                    />
                  </div>
                )}
                {textMode === 'red' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Dark</span>
                      <span>Bright</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={redShade}
                      onChange={e => setRedShade(Number(e.target.value))}
                      className="w-full accent-red-600"
                      style={{
                        background: 'linear-gradient(to right, #450a0a, #7f1d1d, #b91c1c, #dc2626, #ef4444, #f87171)'
                      }}
                    />
                    <div
                      className="h-6 rounded mt-1"
                      style={{ backgroundColor: `hsl(0, ${70 + redShade * 0.2}%, ${15 + redShade * 0.4}%)` }}
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <label className="block text-xs text-neutral-400 mb-2">BACKGROUND PREVIEW</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBgMode('black')}
                    className={`flex-1 px-3 py-2 text-sm font-bold transition ${bgMode === 'black' ? 'bg-black text-white ring-2 ring-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  >
                    BLACK
                  </button>
                  <button
                    onClick={() => setBgMode('white')}
                    className={`flex-1 px-3 py-2 text-sm font-bold transition ${bgMode === 'white' ? 'bg-white text-black ring-2 ring-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  >
                    WHITE
                  </button>
                  <button
                    onClick={() => setBgMode('transparent')}
                    className={`flex-1 px-3 py-2 text-sm font-bold transition ${bgMode === 'transparent' ? 'bg-neutral-500 ring-2 ring-white' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                  >
                    CLEAR
                  </button>
                </div>
              </div>

              <button
                onClick={downloadSVG}
                className="w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 font-bold"
              >
                DOWNLOAD SVG
              </button>
            </div>

            <div className="flex-1">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '16/9',
                  backgroundColor: bgMode === 'black' ? '#000' : bgMode === 'white' ? '#fff' : 'transparent',
                  backgroundImage: bgMode === 'transparent' ? 'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)' : 'none',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              >
                <svg
                  id="eva-output"
                  viewBox="0 0 1920 1080"
                  className="w-full h-full"
                  style={{ fontFamily: "'Times New Roman', 'Noto Serif JP', serif" }}
                >
                  {(() => {
                    const grayColor = `hsl(0, 0%, ${grayShade}%)`;
                    const redColor = `hsl(0, ${70 + redShade * 0.2}%, ${15 + redShade * 0.4}%)`;
                    const textColor = textMode === 'red' ? redColor : grayColor;

                    return mode === 'title' ? (
                      <g>
                        {prefixLines.split('\n').map((line, i) => (
                          <text
                            key={i}
                            x="100"
                            y={200 + i * 120}
                            fill={textColor}
                            fontSize="140"
                            fontWeight="900"
                            letterSpacing="-0.02em"
                            style={{ fontFamily: "'Times New Roman', 'Noto Serif JP', serif" }}
                          >
                            {line.toUpperCase()}
                          </text>
                        ))}
                        <text
                          x="100"
                          y={200 + prefixLines.split('\n').length * 120 + 50}
                          fill={textColor}
                          fontSize="200"
                          fontWeight="900"
                          letterSpacing="-0.02em"
                          style={{ fontFamily: "'Times New Roman', 'Noto Serif JP', serif" }}
                        >
                          {titleText.toUpperCase()}
                        </text>
                        {labelText && (
                          <text
                            x="100"
                            y={200 + prefixLines.split('\n').length * 120 + 180}
                            fill={textColor}
                            fontSize="80"
                            fontWeight="900"
                            style={{ fontFamily: "'Times New Roman', 'Noto Serif JP', serif" }}
                          >
                            {labelText}
                          </text>
                        )}
                        <text
                          x="500"
                          y={200 + prefixLines.split('\n').length * 120 + 280}
                          fill={textColor}
                          fontSize="90"
                          fontStyle="italic"
                          style={{ fontFamily: "'Times New Roman', 'Noto Serif JP', serif" }}
                        >
                          {subtitleText}
                        </text>
                      </g>
                    ) : (
                      <g>
                        {chaosPositions.map((item: any, i: any) => (
                          <text
                            key={i}
                            x={`${item.left}%`}
                            y={`${item.top}%`}
                            fill={textColor}
                            fontSize={item.size === 'text-5xl' ? 100 :
                              item.size === 'text-4xl' ? 80 :
                                item.size === 'text-3xl' ? 60 :
                                  item.size === 'text-2xl' ? 48 :
                                    item.size === 'text-xl' ? 36 :
                                      item.size === 'text-lg' ? 28 :
                                        item.size === 'text-base' ? 22 :
                                          item.size === 'text-sm' ? 18 : 14}
                            fontWeight={item.weight === 'font-black' ? 900 : item.weight === 'font-bold' ? 700 : 400}
                            opacity={item.opacity}
                            transform={`rotate(${item.rotate} ${item.left * 19.2} ${item.top * 10.8})`}
                            writingMode={item.vertical ? 'vertical-rl' : 'horizontal-tb'}
                            style={{ fontFamily: "'Times New Roman', 'Noto Serif JP', serif" }}
                          >
                            {item.text}
                          </text>
                        ))}
                      </g>
                    );
                  })()}
                </svg>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Transparent background • SVG format for overlay use
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto py-8">
          <h2 className="text-4xl font-bold mb-6 text-red-600">ABOUT THIS PROJECT</h2>

          <div className="space-y-6 text-neutral-300">
            <section>
              <h3 className="text-xl font-bold text-white mb-2">THE DEVELOPER</h3>
              <p>
                Hi, I'm <span className="text-white font-bold">[Jayson Dang]</span>,
                a freshman studying <span className="text-white">[CS major]</span> at
                <span className="text-white"> [University of Pittsburgh]</span>.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-2">THE PROJECT</h3>
              <p>
                This Evangelion Typography Generator was built over Thanksgiving break 2025.
                As a fan of the iconic anime series, I wanted to recreate the distinctive
                typography style that makes NGE so visually memorable.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-2">WHAT I LEARNED</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>React fundamentals and functional components</li>
                <li>State management with useState hooks</li>
                <li>SVG generation and manipulation</li>
                <li>Tailwind CSS for rapid styling</li>
                <li>HSL to HEX color conversion</li>
                <li>Deploying web apps with Vercel</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-2">CONNECT</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Zaku-Seven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 transition font-bold"
                >
                  GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/jayson-dang-b1a2bb381/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 transition font-bold"
                >
                  LINKEDIN
                </a>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}