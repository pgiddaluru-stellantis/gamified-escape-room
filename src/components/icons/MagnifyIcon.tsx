export function MagnifyIcon({ className = "" }: Readonly<{ className?: string }>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`w-5 h-5 ${className}`} aria-hidden="true">
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}
