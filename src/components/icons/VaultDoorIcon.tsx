export function VaultDoorIcon({ color = "#00f5ff" }: { color?: string }) {
    return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" aria-hidden="true">
            <rect x="8" y="8" width="104" height="104" rx="12" fill="#05090d" stroke={color} strokeWidth="2" opacity="0.8" />
            <circle cx="60" cy="60" r="36" fill="#05090d" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <circle cx="60" cy="60" r="24" fill="#081117" stroke={color} strokeWidth="1" opacity="0.5" />
            <circle cx="60" cy="60" r="8" fill={color} opacity="0.7" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                const x1 = 60 + 28 * Math.cos(rad)
                const y1 = 60 + 28 * Math.sin(rad)
                const x2 = 60 + 38 * Math.cos(rad)
                const y2 = 60 + 38 * Math.sin(rad)
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            })}
            <rect x="88" y="44" width="14" height="32" rx="3" fill={color} opacity="0.5" />
            <rect x="91" y="50" width="8" height="8" rx="2" fill={color} opacity="0.9" />
            <rect x="8" y="56" width="52" height="8" rx="2" fill={color} opacity="0.15" />
        </svg>
    )
}
