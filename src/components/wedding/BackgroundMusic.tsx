import { useSyncExternalStore } from "react";
import { Music, VolumeX } from "lucide-react";
import { BACKGROUND_MUSIC, MUSIC_VOLUME } from "@/config/music";

// Single shared audio instance (prevents duplicates).
let audio: HTMLAudioElement | null = null;
let playing = false;
let fadeTimer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function getAudio() {
  if (!audio) {
    audio = new Audio(BACKGROUND_MUSIC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
  }
  return audio;
}

function fadeTo(target: number, done?: () => void) {
  const a = getAudio();
  if (fadeTimer) clearInterval(fadeTimer);
  fadeTimer = setInterval(() => {
    const next = a.volume + (target > a.volume ? 0.05 : -0.05);
    if (Math.abs(target - a.volume) <= 0.05) {
      a.volume = target;
      if (fadeTimer) clearInterval(fadeTimer);
      fadeTimer = null;
      done?.();
    } else a.volume = Math.min(1, Math.max(0, next));
  }, 50);
}

/** Call from a click handler (user gesture) so mobile browsers allow playback. */
export function playMusic() {
  const a = getAudio();
  a.play()
    .then(() => {
      playing = true;
      emit();
      fadeTo(MUSIC_VOLUME);
    })
    .catch(() => {
      playing = false;
      emit();
    });
}

export function pauseMusic() {
  playing = false;
  emit();
  fadeTo(0, () => audio?.pause());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function MusicButton() {
  const isPlaying = useSyncExternalStore(subscribe, () => playing, () => false);
  return (
    <button
      type="button"
      onClick={() => (isPlaying ? pauseMusic() : playMusic())}
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-rose-gradient text-primary-foreground shadow-soft active:scale-95 transition-transform"
    >
      {isPlaying ? <Music className="h-5 w-5 animate-spin [animation-duration:4s]" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
