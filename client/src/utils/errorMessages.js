/**
 * Weather-Themed Error Catalog
 * All messages are funny, weather-related, and expose ZERO sensitive data.
 * No emoji characters — Lucide icons are used in ErrorDisplay.jsx instead.
 */

/* ── City Not Found ── */
export const NOT_FOUND_LINES = [
    {
        title: "Your city ghosted us",
        subtitle: "Even our radar couldn't spot it. Did you mean Atlantis?",
        tip: "Double-check the spelling — clouds have feelings too.",
    },
    {
        title: "Plot twist: that city doesn't exist",
        subtitle: "We searched every storm cell and high-pressure zone. Nada.",
        tip: "Try a real city name, not your ex's nickname.",
    },
    {
        title: "Forecast for this city: 100% invisible",
        subtitle: "Our satellites did a full lap around Earth and found nothing.",
        tip: "Maybe it's hiding behind a fog bank?",
    },
    {
        title: "Not found — even our thermometer is confused",
        subtitle: "We looked under every cumulus cloud. Nothing.",
        tip: "Check the spelling — autocorrect is the real villain here.",
    },
];

/* ── Network / Connection Error ── */
export const NETWORK_LINES = [
    {
        title: "Your internet took a beach day",
        subtitle: "Your connection went on vacation without telling us.",
        tip: "Check your Wi-Fi — it might be napping in the sun.",
    },
    {
        title: "A dramatic thundercloud ate your packets",
        subtitle: "The internet storm is real. Our data got caught in it.",
        tip: "Reconnect and try again when the digital storm clears.",
    },
    {
        title: "Our weather pigeons can't find you",
        subtitle: "The carrier pigeons we use for data delivery are lost in a fog bank.",
        tip: "Check your connection and we'll resend the flock.",
    },
    {
        title: "The Wi-Fi is in the eye of a hurricane",
        subtitle: "Calm on the outside, chaos on the inside — just like your router.",
        tip: "Restart your router and come back when the storm passes.",
    },
];

/* ── Rate Limit / Too Many Requests ── */
export const RATE_LIMIT_LINES = [
    {
        title: "Slow down, Weather Nerd",
        subtitle: "You're requesting more forecasts than a tropical cyclone has spin.",
        tip: "Even meteorologists take coffee breaks. Try again in a moment!",
    },
    {
        title: "Our forecast hamster needs a breather",
        subtitle: "You searched so fast the hamster running our servers fainted.",
        tip: "Give it 60 seconds to recover. Check the window for real weather.",
    },
    {
        title: "Too hot to handle right now",
        subtitle: "You turned up the heat on our servers harder than a summer heat dome.",
        tip: "Cool down for a minute and try again.",
    },
    {
        title: "The weather gods request a moment",
        subtitle: "You've out-queried Zeus himself. His lightning bolt printer is jammed.",
        tip: "Take a breath of fresh air, then come back.",
    },
    {
        title: "Forecast queue: longer than a monsoon season",
        subtitle: "Our data elves are processing at maximum elf capacity.",
        tip: "We'll be right with you. Please stop clicking so fast!",
    },
];

/* ── Geolocation Denied ── */
export const GEO_DENIED_LINES = [
    {
        title: "You're hiding from us",
        subtitle: "Your browser said 'location denied' — very mysterious of you.",
        tip: "Allow location access in your browser settings, or search a city by name.",
    },
    {
        title: "Our GPS balloon deflated",
        subtitle: "Location permission denied. Our weather balloon couldn't find you.",
        tip: "Enable location in settings, or type your city manually.",
    },
    {
        title: "You're off the radar — literally",
        subtitle: "No location access means our radar sees only static.",
        tip: "Search a city by name, or grant location permission to try again.",
    },
];

/* ── Geolocation Not Supported ── */
export const GEO_UNSUPPORTED_LINES = [
    {
        title: "Your browser lives in 1995",
        subtitle: "No geolocation support detected. Even our weather vane has smarter tech.",
        tip: "Upgrade your browser, or just type a city name — old-fashioned works too.",
    },
];

/* ── Auth / API Key Error ── */
export const AUTH_LINES = [
    {
        title: "Our weather pass got revoked",
        subtitle: "The API key is like an umbrella — important, and we may have lost ours.",
        tip: "Our team is on it. Please check back shortly.",
    },
    {
        title: "The forecast requires a backstage pass",
        subtitle: "Authentication hiccupped. The bouncer at the weather data club is strict.",
        tip: "This usually resolves in a few minutes — no action needed on your end.",
    },
];

/* ── Generic / Unknown Error ── */
export const GENERIC_LINES = [
    {
        title: "A rogue cloud ate our data",
        subtitle: "Something unexpected happened on our end. The servers are blaming El Nino.",
        tip: "Try again — errors, like storms, usually pass quickly.",
    },
    {
        title: "Mercury is in retrograde again",
        subtitle: "Totally unscientific, but it's our best explanation right now.",
        tip: "Hit retry and blame the planets.",
    },
    {
        title: "Even the forecast didn't see this coming",
        subtitle: "Our meteorologists are as surprised as you are.",
        tip: "Refresh and try again — things clear up fast.",
    },
    {
        title: "The data is still raining down",
        subtitle: "Something broke between the cloud (AWS, not cumulus) and us.",
        tip: "Give it a moment and try again.",
    },
];

/**
 * Returns a random entry from an array.
 */
export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Maps a raw internal error code to a funny, safe message object.
 * Never exposes raw server responses, stack traces, or API details.
 */
export const classifyError = (rawMessage = '') => {
    const msg = (rawMessage || '').toLowerCase();

    if (msg.includes('429') || msg.includes('too many') || msg.includes('rate limit')) {
        return { type: 'rate_limit',  ...pickRandom(RATE_LIMIT_LINES) };
    }
    if (msg.includes('401') || msg.includes('403') || msg.includes('api key') || msg.includes('unauthorized')) {
        return { type: 'auth',        ...pickRandom(AUTH_LINES) };
    }
    if (msg.includes('404') || msg.includes('not found') || msg.includes('city not found')) {
        return { type: 'not_found',   ...pickRandom(NOT_FOUND_LINES) };
    }
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('econnrefused') || msg.includes('timeout') || msg.includes('503')) {
        return { type: 'network',     ...pickRandom(NETWORK_LINES) };
    }
    if (msg.includes('location access denied') || msg.includes('permission denied')) {
        return { type: 'geo_denied',  ...pickRandom(GEO_DENIED_LINES) };
    }
    if (msg.includes('geolocation') && msg.includes('not supported')) {
        return { type: 'geo_unsup',   ...pickRandom(GEO_UNSUPPORTED_LINES) };
    }

    return { type: 'generic', ...pickRandom(GENERIC_LINES) };
};
