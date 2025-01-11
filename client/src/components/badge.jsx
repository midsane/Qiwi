import { cn } from "../lib/util.js";

export function GameBadge({
    variant = 'bronze',
    size = 'md',
    hasWings = false,
    className
}) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-20 h-20',
    };
    console.log(variant)
    
    const gradients = {
        bronze: { from: '#CD7F32', to: '#8B4513', wing: '#FFA500' },
        silver: { from: '#C0C0C0', to: '#808080', wing: '#E8E8E8' },
        gold: { from: '#FFD700', to: '#DAA520', wing: '#FFF8DC' },
        purple: { from: '#FF1493', to: '#800080', wing: '#87CEEB' },
        magenta: { from: '#FF69B4', to: '#C71585', wing: '#FFC0CB' },
        blue: { from: '#1E90FF', to: '#0000CD', wing: '#F0F8FF' },
        orange: { from: '#FFA500', to: '#FF4500', wing: '#FFD700' },
        'silver-wings': { from: '#E8E8E8', to: '#A9A9A9', wing: '#FFFFFF' },
    };

    const { from, to, wing } = gradients[variant];

    return (
        <div className={cn("relative", sizeClasses[size], className)}>
            
            {hasWings && (
                <>
                    <svg
                        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                        width="50%"
                        height="80%"
                        viewBox="0 0 24 32"
                    >
                        <path
                            d="M24 16C24 16 12 8 0 16C12 24 24 16 24 16Z"
                            fill={wing}
                            className="drop-shadow-lg"
                        />
                    </svg>
                    <svg
                        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 transform"
                        width="50%"
                        height="80%"
                        viewBox="0 0 24 32"
                    >
                        <path
                            d="M0 16C0 16 12 8 24 16C12 24 0 16 0 16Z"
                            fill={wing}
                            className="drop-shadow-lg"
                        />
                    </svg>
                </>
            )}
            <svg
                viewBox="0 0 100 100"
                className="relative w-full h-full drop-shadow-xl"
            >
                <defs>
                    <linearGradient id={`gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={from} />
                        <stop offset="100%" stopColor={to} />
                    </linearGradient>
                    <filter id="inner-shadow">
                        <feOffset dx="0" dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite operator="out" in="SourceGraphic" />
                        <feBlend mode="multiply" in2="SourceGraphic" />
                    </filter>
                </defs>
                <path
                    d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                    fill={`url(#gradient-${variant})`}
                    className="filter drop-shadow-lg"
                />
                <path
                    d="M50 5 L88.3 27.5 V72.5 L50 95 L11.7 72.5 V27.5 Z"
                    fill={`url(#gradient-${variant})`}
                    filter="url(#inner-shadow)"
                    opacity="0.7"
                />
            </svg>
        </div>
    );
}

export default GameBadge;
