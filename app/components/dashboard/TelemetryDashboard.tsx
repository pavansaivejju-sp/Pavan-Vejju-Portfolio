'use client';

import React, { useState, useEffect, useId } from 'react';
import styles from './TelemetryDashboard.module.css';

type DashboardView = 'fc26' | 'ugl-telemetry' | 'architecture';

export default function TelemetryDashboard() {
  const [activeView, setActiveView] = useState<DashboardView>('fc26');
  const [isStreaming, setIsStreaming] = useState(true);
  const [exportNotice, setExportNotice] = useState(false);
  const gradientId = useId();

  // Simulated live telemetry stream for UGL CMS
  const [telemetryPoints, setTelemetryPoints] = useState<number[]>([
    42, 45, 48, 46, 52, 49, 53, 58, 55, 52, 56, 61, 59, 63, 60, 64,
  ]);
  const [currentTemp, setCurrentTemp] = useState(64);
  const [vibration, setVibration] = useState(2.4);
  const [packetCount, setPacketCount] = useState(14820);

  // Live streaming effect for SignalR simulation
  useEffect(() => {
    if (!isStreaming || activeView !== 'ugl-telemetry') return;

    const interval = setInterval(() => {
      setTelemetryPoints((prev) => {
        const last = prev[prev.length - 1];
        // Random fluctuation between -2 and +3, bounded between 35 and 75
        const delta = Math.floor(Math.random() * 6) - 2.5;
        const next = Math.min(75, Math.max(38, Math.round(last + delta)));
        setCurrentTemp(next);
        setVibration(Number((2.1 + (next - 40) * 0.04 + Math.random() * 0.2).toFixed(2)));
        setPacketCount((c) => c + 1);
        return [...prev.slice(1), next];
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [isStreaming, activeView]);

  // FC26 interactive data
  const [fc26Metric, setFc26Metric] = useState<'winRate' | 'stamina' | 'goals'>('winRate');
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; value: number } | null>(null);

  const fc26Data = {
    winRate: [68, 71, 70, 74, 72, 76, 75, 78, 81],
    stamina: [84, 82, 85, 83, 80, 82, 86, 84, 85],
    goals: [2.1, 2.4, 2.6, 2.3, 2.8, 3.1, 2.9, 3.2, 3.4],
  };

  const handleExportSimulation = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <section className={styles.container}>
      <div className={styles.dashboardCard}>
        {/* Top Console Bar */}
        <div className={styles.consoleHeader}>
          <div className={styles.consoleTitleGroup}>
            <div className={styles.statusDotRow}>
              <span className={styles.liveIndicatorDot} />
              <span className={styles.consoleTag}>ENGINEERING INTERACTION CONSOLE</span>
            </div>
            <h3 className={styles.consoleTitle}>Interactive Production Dashboards</h3>
            <p className={styles.consoleSubtitle}>
              Live interactive previews demonstrating frontend data visualization, real-time telemetry streaming, and state architecture from Pavan&apos;s enterprise projects.
            </p>
          </div>

          <div className={styles.viewTabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeView === 'fc26' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveView('fc26')}
            >
              ⚽ EA FC26 Stats
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeView === 'ugl-telemetry' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveView('ugl-telemetry')}
            >
              📡 UGL Live Telemetry
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeView === 'architecture' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveView('architecture')}
            >
              🧩 Architecture Matrix
            </button>
          </div>
        </div>

        {/* View 1: EA FC26 Match Stats Platform */}
        {activeView === 'fc26' && (
          <div className={styles.viewBody}>
            <div className={styles.kpiRow}>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>FC26 WIN RATE</span>
                <span className={styles.kpiValue}>78.2%</span>
                <span className={styles.kpiBadge}>+4.6% vs Avg</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>MATCH SAMPLES</span>
                <span className={styles.kpiValue}>1,420</span>
                <span className={styles.kpiSub}>Cross-functional tests</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>AVG FPS / LATENCY</span>
                <span className={styles.kpiValue}>16.4ms</span>
                <span className={styles.kpiGood}>60 FPS locked</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>TEST MUTATION SCORE</span>
                <span className={styles.kpiValue}>86%</span>
                <span className={styles.kpiSub}>Stryker Test Suite</span>
              </div>
            </div>

            {/* Interactive Chart Area */}
            <div className={styles.chartPanel}>
              <div className={styles.chartControls}>
                <div className={styles.metricToggles}>
                  <span className={styles.chartLabel}>Metric:</span>
                  <button
                    type="button"
                    className={`${styles.metricBtn} ${fc26Metric === 'winRate' ? styles.activeMetric : ''}`}
                    onClick={() => setFc26Metric('winRate')}
                  >
                    Win Percentage (%)
                  </button>
                  <button
                    type="button"
                    className={`${styles.metricBtn} ${fc26Metric === 'stamina' ? styles.activeMetric : ''}`}
                    onClick={() => setFc26Metric('stamina')}
                  >
                    Squad Stamina
                  </button>
                  <button
                    type="button"
                    className={`${styles.metricBtn} ${fc26Metric === 'goals' ? styles.activeMetric : ''}`}
                    onClick={() => setFc26Metric('goals')}
                  >
                    Goals / Match
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleExportSimulation}
                  className={styles.exportBtn}
                >
                  📥 Export PNG Report Preview
                </button>
              </div>

              {exportNotice && (
                <div className={styles.exportBanner}>
                  ✓ PNG canvas export pipeline triggered (Simulating Recharts/HTML2Canvas export module).
                </div>
              )}

              {/* Native Responsive SVG Chart */}
              <div className={styles.svgWrapper}>
                <svg viewBox="0 0 700 200" className={styles.chartSvg}>
                  <defs>
                    <linearGradient id={`${gradientId}-fc26`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#BA8F55" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#BA8F55" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="30" x2="680" y2="30" stroke="rgba(186,143,85,0.12)" strokeDasharray="4 4" />
                  <line x1="40" y1="80" x2="680" y2="80" stroke="rgba(186,143,85,0.12)" strokeDasharray="4 4" />
                  <line x1="40" y1="130" x2="680" y2="130" stroke="rgba(186,143,85,0.12)" strokeDasharray="4 4" />
                  <line x1="40" y1="170" x2="680" y2="170" stroke="rgba(186,143,85,0.18)" />

                  {/* Area fill */}
                  {(() => {
                    const data = fc26Data[fc26Metric];
                    const min = Math.min(...data) * 0.9;
                    const max = Math.max(...data) * 1.05;
                    const stepX = (640) / (data.length - 1);

                    const points = data.map((val, idx) => {
                      const x = 50 + idx * stepX;
                      const y = 160 - ((val - min) / (max - min)) * 120;
                      return { x, y, val };
                    });

                    const pathD = `M ${points[0].x} ${points[0].y} ` +
                      points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ') +
                      ` L ${points[points.length - 1].x} 170 L ${points[0].x} 170 Z`;

                    const lineD = `M ${points[0].x} ${points[0].y} ` +
                      points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ');

                    return (
                      <>
                        <path d={pathD} fill={`url(#${gradientId}-fc26)`} />
                        <path d={lineD} fill="none" stroke="#BA8F55" strokeWidth="3" strokeLinecap="round" />
                        {points.map((p, idx) => (
                          <g key={idx} onMouseEnter={() => setHoveredPoint({ index: idx, value: p.val })} onMouseLeave={() => setHoveredPoint(null)}>
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={hoveredPoint?.index === idx ? 6 : 4}
                              fill="#FFFFFF"
                              stroke="#BA8F55"
                              strokeWidth={hoveredPoint?.index === idx ? 3 : 2}
                              className={styles.chartCircle}
                            />
                            {hoveredPoint?.index === idx && (
                              <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#211A15" fontSize="12" fontWeight="800">
                                {p.val}
                              </text>
                            )}
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className={styles.chartFooter}>
                <span>Weekly Analytics Trend (Simulating EA Sports FC26 Dashboard Pipeline)</span>
                <span>Component: Recharts / Reusable SVG Engine</span>
              </div>
            </div>
          </div>
        )}

        {/* View 2: UGL Live Telemetry (SignalR Simulation) */}
        {activeView === 'ugl-telemetry' && (
          <div className={styles.viewBody}>
            <div className={styles.kpiRow}>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>TRAIN TELEMETRY STATUS</span>
                <span className={styles.kpiValueLive}>
                  <span className={styles.livePulse} /> LIVE
                </span>
                <span className={styles.kpiGood}>SignalR Hub Connected</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>BEARING TEMP</span>
                <span className={styles.kpiValue}>{currentTemp}°C</span>
                <span className={currentTemp > 68 ? styles.kpiWarn : styles.kpiGood}>
                  {currentTemp > 68 ? '⚠️ High Threshold' : '✓ Normal Operating Range'}
                </span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>AXLE VIBRATION</span>
                <span className={styles.kpiValue}>{vibration} mm/s</span>
                <span className={styles.kpiSub}>FFT Harmonic analysis</span>
              </div>
              <div className={styles.kpiCard}>
                <span className={styles.kpiMeta}>MESSAGES STREAMED</span>
                <span className={styles.kpiValue}>{packetCount.toLocaleString()}</span>
                <span className={styles.kpiGood}>120 msg/sec</span>
              </div>
            </div>

            <div className={styles.chartPanel}>
              <div className={styles.chartControls}>
                <div className={styles.telemetryStatusGroup}>
                  <span className={styles.socketBadge}>📡 ws://signalr.ugl.transport/hub/train-telemetry</span>
                  <span className={styles.assetTag}>Asset: Pacific National 93 Class Locomotives</span>
                </div>

                <div className={styles.streamActions}>
                  <button
                    type="button"
                    className={`${styles.streamControlBtn} ${isStreaming ? styles.pauseBtn : styles.playBtn}`}
                    onClick={() => setIsStreaming(!isStreaming)}
                  >
                    {isStreaming ? '⏸ Pause Stream' : '▶ Resume Live Stream'}
                  </button>
                </div>
              </div>

              {/* Streaming Area Chart */}
              <div className={styles.svgWrapper}>
                <svg viewBox="0 0 700 180" className={styles.chartSvg}>
                  <defs>
                    <linearGradient id={`${gradientId}-ugl`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <line x1="40" y1="30" x2="680" y2="30" stroke="rgba(186,143,85,0.12)" strokeDasharray="4 4" />
                  <line x1="40" y1="80" x2="680" y2="80" stroke="rgba(186,143,85,0.12)" strokeDasharray="4 4" />
                  <line x1="40" y1="130" x2="680" y2="130" stroke="rgba(186,143,85,0.12)" strokeDasharray="4 4" />
                  <line x1="40" y1="160" x2="680" y2="160" stroke="rgba(186,143,85,0.18)" />

                  {(() => {
                    const stepX = 640 / (telemetryPoints.length - 1);
                    const min = 30;
                    const max = 80;

                    const points = telemetryPoints.map((val, idx) => {
                      const x = 45 + idx * stepX;
                      const y = 150 - ((val - min) / (max - min)) * 120;
                      return { x, y, val };
                    });

                    const pathD = `M ${points[0].x} ${points[0].y} ` +
                      points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ') +
                      ` L ${points[points.length - 1].x} 160 L ${points[0].x} 160 Z`;

                    const lineD = `M ${points[0].x} ${points[0].y} ` +
                      points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ');

                    return (
                      <>
                        <path d={pathD} fill={`url(#${gradientId}-ugl)`} />
                        <path d={lineD} fill="none" stroke="#10b981" strokeWidth="2.5" />
                        {points.map((p, idx) => (
                          <circle
                            key={idx}
                            cx={p.x}
                            cy={p.y}
                            r={idx === points.length - 1 ? 5 : 3}
                            fill={idx === points.length - 1 ? '#10b981' : '#FFFFFF'}
                            stroke="#10b981"
                            strokeWidth="2"
                          />
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className={styles.chartFooter}>
                <span>Live Telemetry Loop (Demonstrating Microsoft SignalR + Highcharts Architecture)</span>
                <span>Buffer: 16 telemetry points • 60 FPS Canvas/SVG rendering</span>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Frontend Architecture Stack Matrix */}
        {activeView === 'architecture' && (
          <div className={styles.viewBody}>
            <div className={styles.architectureGrid}>
              <div className={styles.archCard}>
                <div className={styles.archCardHeader}>
                  <span className={styles.archBadge}>LAYER 01</span>
                  <h4>Component &amp; UI Architecture</h4>
                </div>
                <p>Atomic Design methodology, Micro Frontends with Module Federation, React 19 hooks, Fluent UI, Tailwind CSS, TypeScript strict typing.</p>
                <div className={styles.proficiencyBar}>
                  <div className={styles.proficiencyFill} style={{ width: '96%' }} />
                </div>
                <span className={styles.profScore}>96% Mastery • 5.5+ Yrs</span>
              </div>

              <div className={styles.archCard}>
                <div className={styles.archCardHeader}>
                  <span className={styles.archBadge}>LAYER 02</span>
                  <h4>State Orchestration &amp; Streams</h4>
                </div>
                <p>Redux Toolkit, Redux-Saga side-effect sagas, TanStack Form validation, Microsoft SignalR live WebSocket duplex channels.</p>
                <div className={styles.proficiencyBar}>
                  <div className={styles.proficiencyFill} style={{ width: '94%' }} />
                </div>
                <span className={styles.profScore}>94% Mastery • Enterprise Grade</span>
              </div>

              <div className={styles.archCard}>
                <div className={styles.archCardHeader}>
                  <span className={styles.archBadge}>LAYER 03</span>
                  <h4>Testing &amp; Code Resilience</h4>
                </div>
                <p>Jest unit testing, React Testing Library DOM behavior assertions, Stryker Mutation Testing to verify test quality and catch false positives.</p>
                <div className={styles.proficiencyBar}>
                  <div className={styles.proficiencyFill} style={{ width: '90%' }} />
                </div>
                <span className={styles.profScore}>90% Mastery • High Mutation Scores</span>
              </div>

              <div className={styles.archCard}>
                <div className={styles.archCardHeader}>
                  <span className={styles.archBadge}>LAYER 04</span>
                  <h4>Data Visualization &amp; Reporting</h4>
                </div>
                <p>Highcharts live spline &amp; heatmaps, Recharts analytics dashboards, PDF / CSV / PNG client-side report generator pipelines.</p>
                <div className={styles.proficiencyBar}>
                  <div className={styles.proficiencyFill} style={{ width: '95%' }} />
                </div>
                <span className={styles.profScore}>95% Mastery • High-Scale Workloads</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
