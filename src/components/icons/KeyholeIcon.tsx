export function KeyholeIcon() {
    return (
        <svg
            viewBox="0 0 220 310"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full animate-flicker"
            aria-hidden="true"
        >
            <rect x="2" y="2" width="216" height="278" rx="8" ry="50%" fill="none" stroke="#7c5c2d" strokeWidth="1.5" />
            <rect x="2" y="2" width="216" height="278" rx="8" ry="50%" fill="none" stroke="#00f5ff" strokeWidth="0.5" opacity="0.3" />
            <circle cx="110" cy="100" r="38" fill="#00f5ff" opacity="0.08" stroke="#00f5ff" strokeWidth="1.5" />
            <circle cx="110" cy="100" r="20" fill="#00f5ff" opacity="0.15" stroke="#00f5ff" strokeWidth="1" />
            <circle cx="110" cy="100" r="8" fill="#00f5ff" opacity="0.9" />
            <circle cx="110" cy="100" r="8" fill="#00f5ff" className="animate-pulse-glow" />
            <path d="M96 132 L80 220 L140 220 L124 132" fill="#00f5ff" opacity="0.12" stroke="#00f5ff" strokeWidth="1" />
            <line x1="110" y1="2" x2="110" y2="280" stroke="#1c2e38" strokeWidth="1" opacity="0.6" />
            <rect x="1" y="140" width="218" height="1" fill="#00f5ff" opacity="0.08" />
            <circle cx="110" cy="290" r="12" fill="#7c5c2d" opacity="0.7" />
            <circle cx="110" cy="290" r="7" fill="#e0a842" opacity="0.5" />
        </svg>
    )
}
