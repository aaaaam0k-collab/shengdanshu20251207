import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { TreeState } from './types';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.CHAOS);

  const handleClick = () => {
    setTreeState((prev) => {
      switch (prev) {
        case TreeState.CHAOS: return TreeState.FORMED;
        case TreeState.FORMED: return TreeState.WORD;
        case TreeState.WORD: return TreeState.CHAOS;
        default: return TreeState.CHAOS;
      }
    });
  };

  return (
    <div 
      className="w-full h-screen relative bg-gray-900 overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Scene state={treeState} />
      </div>

      {/* Styles for custom animation */}
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .text-shine {
          background: linear-gradient(
            to right, 
            #fde047 20%, 
            #fff 40%, 
            #fff 60%, 
            #fde047 80%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 3s linear infinite;
        }
      `}</style>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16">
        
        {/* Header - Smaller Size + Shine Effect */}
        <header className="flex flex-col items-center justify-center text-center animate-fade-in-down mt-8">
          <div className="relative border-b border-yellow-400/50 pb-2 mb-4 px-4 backdrop-blur-sm bg-black/10 rounded-lg inline-block">
             <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-widest uppercase whitespace-nowrap text-shine drop-shadow-md">
              Merry Christmas
             </h1>
             <div className="absolute -bottom-5 right-0 text-[10px] md:text-xs text-yellow-400/70 font-sans tracking-[0.2em] font-light">
               CHRISTMAS TREE BY M0K
             </div>
          </div>
        </header>

        {/* Footer / Instructions */}
        <footer className="flex flex-col items-center justify-end gap-2 w-full pb-8">
           <div className="text-yellow-100/80 font-serif text-lg tracking-widest uppercase animate-pulse drop-shadow-lg">
            Click to Transform
          </div>
          <div className="text-emerald-400/60 text-xs font-sans tracking-widest uppercase text-center">
            Interactive WebGL Experience
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
