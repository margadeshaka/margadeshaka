'use client';

interface WaitlistButtonProps {
  visible: boolean;
}

export default function WaitlistButton({ visible }: WaitlistButtonProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      <div className="flex flex-row gap-4">
        <button
          className="
            px-8 py-4 rounded-full text-lg font-bold
            bg-gradient-to-r from-amber-700 to-yellow-600
            text-white shadow-lg
            transition-all duration-500 ease-in-out
            hover:scale-110 hover:shadow-amber-500/50
            border border-amber-400/30
          "
          onClick={() => window.open('https://sakha.live', '_blank')}
          aria-label="Explore Sakha — AI Vedic astrology companion"
        >
          Explore Sakha
        </button>

        <button
          className="
            px-8 py-4 rounded-full text-lg font-bold
            bg-amber-900/30
            text-amber-300/60 shadow-lg
            transition-all duration-500 ease-in-out
            hover:scale-105 hover:text-amber-200/80
            border border-amber-600/20
            cursor-default
          "
          aria-label="Dronacharya — Coming Soon"
        >
          Dronacharya — Coming Soon
        </button>
      </div>

      {/* Decorative element */}
      <div className="w-60 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
    </div>
  );
}
