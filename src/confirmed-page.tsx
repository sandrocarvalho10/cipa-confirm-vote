import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import confirmaUrna from './assets/confirma-urna.mp3'

export default function ConfirmedPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [searchParams,] = useSearchParams();

  // Query params opcionais
  const redirectUrl = searchParams.get("to") || process.env.REACT_PUBLIC_ZOHO_SURVEY || "/";
  const delay = Number(searchParams.get("delay")) || 15;

  const [countdown, setCountdown] = useState(delay);
  const [started, setStarted] = useState(false);

  const onConfirmVote = useCallback(() => {
    setStarted(true);
    // toca o som da urna
    audioRef.current?.load();
    audioRef.current?.play().catch(() => console.warn("Autoplay bloqueado."));
  }, []);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = redirectUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, redirectUrl]);




  return (

    <div
      className="w-full h-screen flex items-center justify-center text-white"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      }}
    >
      <div className="relative text-center max-w-lg w-[90%] p-10 rounded-2xl border border-white/20 backdrop-blur-lg shadow-2xl bg-white/10 animate-[slideIn_0.8s_ease-out]">
        <div className="text-8xl mb-6 animate-[bounce_2s_infinite]">🗳️</div>

        <h1 className="text-4xl font-bold mb-4">Obrigado!</h1>

        <p className="text-lg leading-relaxed mb-6">
          Sua votação foi registrada com sucesso.
          <br />
          Agradecemos sua participação no processo democrático!
        </p>

        {!started ? (
          <button
            type="button"
            onClick={() => onConfirmVote()}
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full text-white font-semibold shadow-lg"
          >
            CONFIRMAR VOTO
          </button>
        ) : (
          <>
            <div className="text-sm bg-white/20 px-4 py-2 rounded-full inline-block mt-4">
              Redirecionando em {countdown} segundos...
            </div>

            <div className="w-full h-2 bg-white/30 rounded-full mt-5 overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / delay) * 100}%` }}
              />
            </div>
          </>
        )}
        <audio src={confirmaUrna} className="opacity-0" autoPlay ref={audioRef}></audio>

      </div>
    </div>
  );
}