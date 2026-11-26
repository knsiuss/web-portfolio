import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kanisius Bagaskara, Machine Learning Engineer and Data Scientist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#282c20',
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
                {/* Top label */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '36px',
                    }}
                >
                    <div style={{ width: 32, height: 2, background: '#d2ff00' }} />
                    <span style={{ color: '#d2ff00', fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                        Portfolio
                    </span>
                </div>

                {/* Name */}
                <div
                    style={{
                        fontSize: 76,
                        fontWeight: 900,
                        color: '#f4f4ed',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                    }}
                >
                    KANISIUS
                </div>
                <div
                    style={{
                        fontSize: 76,
                        fontWeight: 900,
                        color: '#d2ff00',
                        lineHeight: 0.95,
                        marginBottom: '36px',
                        letterSpacing: '-0.02em',
                    }}
                >
                    BAGASKARA
                </div>

                {/* Role */}
                <div
                    style={{
                        fontSize: 22,
                        color: 'rgba(244,244,237,0.72)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '56px',
                    }}
                >
                    ML Engineer · Data Scientist
                </div>

                {/* Facts taken from the site itself, not invented metrics. */}
                <div style={{ display: 'flex', gap: '48px' }}>
                    {[
                        { text: 'F1 Pit Strategy', label: 'Live Streamlit app' },
                        { text: 'Stanford ML', label: 'Specialization' },
                        { text: 'Jakarta', label: 'Indonesia' },
                    ].map((s) => (
                        <div key={s.text} style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 28, fontWeight: 700, color: '#f4f4ed' }}>{s.text}</span>
                            <span style={{ fontSize: 13, color: 'rgba(244,244,237,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 10,
                        background: '#d2ff00',
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
