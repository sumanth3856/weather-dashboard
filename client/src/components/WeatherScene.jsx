import React, { useMemo } from 'react';
import '../styles/weatherScene.css';

const getSceneConfig = (conditionId, isDay, tempC) => {
    if (conditionId >= 200 && conditionId < 300) return { type: 'storm',        sky: 'sky-storm' };
    if (conditionId >= 300 && conditionId < 400) return { type: 'drizzle',      sky: 'sky-drizzle' };
    if (conditionId >= 500 && conditionId < 600) return { type: 'rain',         sky: 'sky-rain' };
    if (conditionId >= 600 && conditionId < 700) return { type: 'snow',         sky: 'sky-snow' };
    if (conditionId >= 700 && conditionId < 800) return { type: 'fog',          sky: 'sky-fog' };
    if (conditionId === 800) {
        if (!isDay)        return { type: 'clear-night', sky: 'sky-clear-night' };
        if (tempC >= 36)   return { type: 'hot-day',     sky: 'sky-hot-day' };
        return               { type: 'clear-day',   sky: 'sky-clear-day' };
    }
    if (conditionId >= 801 && conditionId <= 804) {
        return isDay
            ? { type: 'cloudy-day',   sky: 'sky-cloudy' }
            : { type: 'cloudy-night', sky: 'sky-clear-night' };
    }
    return { type: 'clear-day', sky: 'sky-clear-day' };
};

/* ── Sun with lens flare and glow layers ── */
const SunScene = ({ isHot }) => {
    const size = isHot ? 68 : 54;
    const r1 = size + 22, r2 = size + 46;
    return (
        <>
            {/* Horizon atmospheric haze */}
            <div className="sky-glow" style={{
                height: 80,
                background: isHot
                    ? 'linear-gradient(to top, rgba(234,88,12,0.55), transparent)'
                    : 'linear-gradient(to top, rgba(254,243,199,0.4), transparent)',
            }} />
            {/* Sun halo rings */}
            <div className="sun-rays" style={{ width: r2, height: r2, top: 18 - (r2 - size) / 2, right: 24 - (r2 - size) / 2, animationDelay: '1.5s' }} />
            <div className="sun-rays" style={{ width: r1, height: r1, top: 18 - (r1 - size) / 2, right: 24 - (r1 - size) / 2 }} />
            {/* Sun body */}
            <div className="sun" style={{ width: size, height: size, top: 18, right: 24 }} />
            {/* Lens flare streaks */}
            <div className="sun-flare" style={{ width: 90, top: 44, right: 58, animationDelay: '0s' }} />
            <div className="sun-flare" style={{ width: 50, top: 52, right: 40, opacity: 0.4, animationDelay: '2s' }} />
        </>
    );
};

/* ── Stars + optional shooting star ── */
const StarField = ({ count = 18, withShooting = false }) => {
    const stars = useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100, y: Math.random() * 70,
        size: Math.random() * 2 + 0.8,
        delay: Math.random() * 5, duration: Math.random() * 2.5 + 1.5,
    })), [count]);

    return (
        <div className="star-field">
            {stars.map(s => (
                <div key={s.id} className="star" style={{
                    left: `${s.x}%`, top: `${s.y}%`,
                    width: s.size, height: s.size,
                    animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s`,
                }} />
            ))}
            {withShooting && (
                <div className="shooting-star" style={{ width: 80, top: '18%', left: '15%', animationDuration: '6s', animationDelay: '2s' }} />
            )}
        </div>
    );
};

/* ── Moon with inner crater shading ── */
const MoonScene = () => (
    <>
        <StarField count={26} withShooting />
        {/* Moon body */}
        <div className="moon" style={{ width: 52, height: 52, top: 16, right: 28 }}>
            {/* Crater spots */}
            <div style={{ position:'absolute', width:10, height:10, borderRadius:'50%', background:'rgba(0,0,0,0.1)', top:26, left:14 }} />
            <div style={{ position:'absolute', width:6, height:6, borderRadius:'50%', background:'rgba(0,0,0,0.07)', top:14, left:30 }} />
            <div style={{ position:'absolute', width:4, height:4, borderRadius:'50%', background:'rgba(0,0,0,0.06)', top:34, left:32 }} />
        </div>
        {/* Moonlight horizon glow */}
        <div className="sky-glow" style={{ height:60, background:'linear-gradient(to top, rgba(99,102,241,0.18), transparent)' }} />
    </>
);

/* ── Cloud shape — layered bumps for depth ── */
const CloudShape = ({ style, shade = 'rgba(255,255,255,0.92)', blur = '0.5px' }) => {
    const bg = shade;
    return (
        <div className="cloud" style={{ background: bg, filter: `blur(${blur})`, ...style }}>
            <div className="cloud-bump" style={{ width: '55%', height: '180%', background: bg, top:'-80%', left:'12%' }} />
            <div className="cloud-bump" style={{ width: '38%', height: '160%', background: bg, top:'-65%', left:'48%' }} />
        </div>
    );
};

/* ── Rain with splash ── */
const RainScene = ({ heavy = false }) => {
    const drops = useMemo(() => Array.from({ length: heavy ? 34 : 18 }, (_, i) => ({
        id: i, x: Math.random() * 102, h: Math.random() * 22 + 12,
        delay: Math.random() * 2.5, dur: Math.random() * 0.35 + 0.45, w: Math.random() * 0.8 + 0.8,
    })), [heavy]);
    const splashes = useMemo(() => Array.from({ length: heavy ? 8 : 4 }, (_, i) => ({
        id: i, x: Math.random() * 95, delay: Math.random() * 2, dur: Math.random() * 0.4 + 0.5,
    })), [heavy]);
    return (
        <div className="rain-container">
            {drops.map(d => (
                <div key={d.id} className="raindrop" style={{ left:`${d.x}%`, height:d.h, width:d.w, animationDuration:`${d.dur}s`, animationDelay:`${d.delay}s` }} />
            ))}
            {splashes.map(s => (
                <div key={s.id} className="splash" style={{ left:`${s.x}%`, animationDuration:`${s.dur}s`, animationDelay:`${s.delay}s` }} />
            ))}
        </div>
    );
};

/* ── Snow ── */
const SnowScene = () => {
    const flakes = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
        id: i, x: Math.random() * 100, size: Math.random() * 10 + 8,
        delay: Math.random() * 5, dur: Math.random() * 2.5 + 3.5,
    })), []);
    return (
        <div className="rain-container">
            {flakes.map(f => (
                <div key={f.id} className="snowflake" style={{ left:`${f.x}%`, fontSize:f.size, animationDuration:`${f.dur}s`, animationDelay:`${f.delay}s` }}>❄</div>
            ))}
        </div>
    );
};

/* ── Fog — multi-layer ── */
const FogScene = () => (
    <>
        {[{ top:'15%', h:30, dur:4, delay:0 }, { top:'35%', h:24, dur:5.5, delay:0.8 },
          { top:'55%', h:20, dur:3.5, delay:1.5 }, { top:'72%', h:28, dur:6, delay:0.3 }].map((f, i) => (
            <div key={i} className="fog-layer" style={{ top:f.top, height:f.h, animationDuration:`${f.dur}s`, animationDelay:`${f.delay}s` }} />
        ))}
    </>
);

/* ── Main component ── */
const WeatherScene = ({ conditionId, iconCode, tempC }) => {
    const isDay = iconCode ? iconCode.endsWith('d') : true;
    const scene = getSceneConfig(conditionId, isDay, tempC);

    const day1  = 'rgba(255,255,255,0.92)';
    const dark1 = 'rgba(100,116,139,0.88)';
    const dark2 = 'rgba(71,85,105,0.9)';
    const storm1 = 'rgba(51,65,85,0.95)';

    const renderScene = () => {
        switch (scene.type) {
            case 'clear-day':
                return (
                    <>
                        <SunScene isHot={false} />
                        <CloudShape style={{ bottom: 60, left: 16, width: 110, height: 34, animationDuration: '20s', opacity: 0.55 }} shade={day1} />
                    </>
                );
            case 'hot-day':
                return (
                    <>
                        <SunScene isHot={true} />
                        {/* Heat shimmer waves */}
                        <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(transparent 0px,transparent 18px,rgba(255,120,0,0.04) 18px,rgba(255,120,0,0.04) 20px)', animation:'sun-float 3s ease-in-out infinite', borderRadius:'inherit' }} />
                    </>
                );
            case 'clear-night':
                return <MoonScene />;
            case 'cloudy-day':
                return (
                    <>
                        {/* Muted sun peeking through */}
                        <div style={{ position:'absolute', width:40, height:40, borderRadius:'50%', background:'rgba(255,220,100,0.55)', top:22, right:30, filter:'blur(8px)' }} />
                        <CloudShape style={{ top:10, left:8, width:130, height:40, animationDuration:'16s' }} shade={day1} />
                        <CloudShape style={{ top:32, left:60, width:100, height:30, animationDuration:'22s', animationDelay:'4s', opacity:0.8 }} shade={day1} />
                        <CloudShape style={{ top:52, left:-10, width:90, height:26, animationDuration:'28s', animationDelay:'8s', opacity:0.6 }} shade={day1} />
                    </>
                );
            case 'cloudy-night':
                return (
                    <>
                        <StarField count={10} />
                        <div className="moon" style={{ width:34, height:34, top:14, right:28, opacity:0.5 }} />
                        <CloudShape style={{ top:8, left:4, width:130, height:40, animationDuration:'18s', opacity:0.85 }} shade={dark1} blur="1px" />
                        <CloudShape style={{ top:34, left:58, width:100, height:30, animationDuration:'24s', animationDelay:'5s', opacity:0.7 }} shade={dark2} blur="1px" />
                    </>
                );
            case 'drizzle':
                return (
                    <>
                        <CloudShape style={{ top:6, left:2, width:130, height:42, animationDuration:'18s' }} shade={dark1} blur="1px" />
                        <CloudShape style={{ top:28, left:60, width:110, height:32, animationDuration:'24s', animationDelay:'6s', opacity:0.8 }} shade={dark2} blur="1px" />
                        <RainScene heavy={false} />
                    </>
                );
            case 'rain':
                return (
                    <>
                        <CloudShape style={{ top:2, left:0, width:150, height:46, animationDuration:'13s' }} shade={dark2} blur="1.5px" />
                        <CloudShape style={{ top:22, left:68, width:120, height:36, animationDuration:'20s', animationDelay:'2s', opacity:0.9 }} shade={dark2} blur="1px" />
                        <RainScene heavy={true} />
                        {/* Rain vignette */}
                        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 30%, rgba(15,23,42,0.3) 100%)', borderRadius:'inherit', pointerEvents:'none' }} />
                    </>
                );
            case 'snow':
                return (
                    <>
                        <CloudShape style={{ top:4, left:4, width:130, height:40, animationDuration:'20s' }} shade="rgba(248,250,252,0.9)" blur="1px" />
                        <CloudShape style={{ top:26, left:60, width:110, height:30, animationDuration:'26s', animationDelay:'5s', opacity:0.85 }} shade="rgba(226,232,240,0.85)" blur="0.8px" />
                        <SnowScene />
                        {/* Frost glow at bottom */}
                        <div className="sky-glow" style={{ height:50, background:'linear-gradient(to top, rgba(186,230,253,0.35), transparent)' }} />
                    </>
                );
            case 'fog':
                return (
                    <>
                        <FogScene />
                        {/* Dense central fog */}
                        <div style={{ position:'absolute', inset: '25% 0', background:'rgba(203,213,225,0.25)', filter:'blur(20px)', pointerEvents:'none' }} />
                    </>
                );
            case 'storm':
                return (
                    <>
                        {/* Sky flash on lightning */}
                        <div className="sky-flash" />
                        <CloudShape style={{ top:0, left:0, width:180, height:58, animationDuration:'11s' }} shade={storm1} blur="2px" />
                        <CloudShape style={{ top:22, left:72, width:140, height:42, animationDuration:'15s', animationDelay:'1.5s', opacity:0.97 }} shade="rgba(30,41,59,0.96)" blur="1.5px" />
                        {/* Lightning bolts */}
                        <div className="lightning" style={{ width:18, height:72, left:'28%', top:46, background:'linear-gradient(to bottom, #fef9c3, #facc15, transparent)', animationDuration:'4.5s', animationDelay:'0.4s' }} />
                        <div className="lightning" style={{ width:14, height:58, left:'63%', top:40, background:'linear-gradient(to bottom, #fef9c3, #fde047, transparent)', animationDuration:'6s', animationDelay:'2.3s' }} />
                        <RainScene heavy={true} />
                    </>
                );
            default:
                return <SunScene isHot={false} />;
        }
    };

    return (
        <div
            className={`absolute inset-0 rounded-2xl overflow-hidden ${scene.sky}`}
            style={{ zIndex: 0, transition: 'background 2s ease' }}
            aria-hidden="true"
        >
            {renderScene()}
        </div>
    );
};

export default WeatherScene;
