import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PARTY_DATE = new Date("2026-05-12T17:00:00");

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = PARTY_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CONFETTI_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF922B", "#CC5DE8", "#F06595"];

const confettiPieces = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${(i * 2.86) % 100}%`,
  delay: `${(i * 0.17) % 5}s`,
  duration: `${3 + (i * 0.13) % 4}s`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  width: `${6 + (i * 0.23) % 8}px`,
  height: `${10 + (i * 0.31) % 10}px`,
  round: i % 2 === 0,
  rotate: `${(i * 37) % 360}deg`,
}));

export default function Index() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="invite-root">
      <div className="confetti-container" aria-hidden="true">
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className="confetti-piece"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              background: p.color,
              width: p.width,
              height: p.height,
              borderRadius: p.round ? "50%" : "2px",
              transform: `rotate(${p.rotate})`,
            }}
          />
        ))}
      </div>

      <div className="invite-hero">
        <div className="invite-emoji-row">🎂 🎉 🥳 🎈 🎁</div>
        <h1 className="invite-title">Приходи на мой<br />День Рождения!</h1>
        <p className="invite-subtitle">Будет весело, вкусно и незабываемо!</p>
      </div>

      <div className="invite-img-wrap">
        <img
          src="https://cdn.poehali.dev/projects/b7d4c64f-a67a-43a9-8922-4a353f8a12b1/files/8e747085-b298-45e1-9a7f-e37ad06f9ea3.jpg"
          alt="Праздник"
          className="invite-img"
        />
      </div>

      <div className="invite-cards-grid">
        <div className="invite-card card-date">
          <div className="card-icon">📅</div>
          <div className="card-label">Дата</div>
          <div className="card-value">12 мая 2026</div>
          <div className="card-sub">Вторник</div>
        </div>
        <div className="invite-card card-time">
          <div className="card-icon">🕕</div>
          <div className="card-label">Время</div>
          <div className="card-value">17:00</div>
          <div className="card-sub">не опаздывай!</div>
        </div>
      </div>

      <div className="invite-card card-place">
        <div className="card-icon">📍</div>
        <div className="card-label">Место</div>
        <div className="card-value place-name">Тики Вики</div>
        <div className="card-sub place-addr">ТЦ «Республика», Казань</div>
      </div>

      <div className="timer-section">
        <div className="timer-title">⏳ До праздника осталось</div>
        <div className="timer-row">
          <div className="timer-block">
            <div className="timer-num">{pad(timeLeft.days)}</div>
            <div className="timer-lbl">дней</div>
          </div>
          <div className="timer-sep">:</div>
          <div className="timer-block">
            <div className="timer-num">{pad(timeLeft.hours)}</div>
            <div className="timer-lbl">часов</div>
          </div>
          <div className="timer-sep">:</div>
          <div className="timer-block">
            <div className="timer-num">{pad(timeLeft.minutes)}</div>
            <div className="timer-lbl">минут</div>
          </div>
          <div className="timer-sep">:</div>
          <div className="timer-block">
            <div className="timer-num">{pad(timeLeft.seconds)}</div>
            <div className="timer-lbl">секунд</div>
          </div>
        </div>
      </div>

      <div className="invite-contacts">
        <div className="contacts-title">✉️ По всем вопросам</div>
        <div className="contacts-row">
          <a href="tel:+79625522308" className="contact-btn phone-btn">
            <span className="contact-icon">📞</span>
            <span>+7 962 552-23-08</span>
          </a>
          <a href="https://t.me/lovsnes" target="_blank" rel="noopener noreferrer" className="contact-btn tg-btn">
            <span className="contact-icon">✈️</span>
            <span>@lovsnes</span>
          </a>
        </div>
      </div>

      <div className="invite-footer">
        <div className="footer-emoji">🎊 🎈 🎂 🎈 🎊</div>
        <p>Жду тебя с нетерпением!</p>
      </div>
    </div>
  );
}