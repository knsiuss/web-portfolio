import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kanisius Bagaskara — ML Engineer & Data Scientist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#080906',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Grid pattern background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(223,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(223,255,0,0.04) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Glow accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(223,255,0,0.12) 0%, transparent 70%)',
                    }}
                />

                {/* Top label */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '32px',
                    }}
                >
                    <div style={{ width: 32, height: 2, background: '#DFFF00' }} />
                    <span style={{ color: '#DFFF00', fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                        kanisius.dev
                    </span>
                </div>

                {/* Name */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: '#FFFFFF',
                        lineHeight: 1,
                        marginBottom: '16px',
                        letterSpacing: '-0.02em',
                    }}
                >
                    KANISIUS
                </div>
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 900,
                        color: '#DFFF00',
                        lineHeight: 1,
                        marginBottom: '32px',
                        letterSpacing: '-0.02em',
                    }}
                >
                    BAGASKARA
                </div>

                {/* Role */}
                <div
                    style={{
                        fontSize: 22,
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '48px',
                    }}
                >
                    ML Engineer · Data Scientist · Google Student Ambassador
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '48px' }}>
                    {[
                        { num: 'Top 200', label: 'Google GSA' },
                        { num: '3+', label: 'ML Pipelines' },
                        { num: '100+', label: 'Students Trained' },
                    ].map((s) => (
                        <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 32, fontWeight: 700, color: '#DFFF00' }}>{s.num}</span>
                            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
