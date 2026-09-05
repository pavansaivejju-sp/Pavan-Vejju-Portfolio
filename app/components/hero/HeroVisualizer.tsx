'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import fc26ImageOne from '../../assets/ea-sports-fc-26.jpg';
import uglImageTwo from '../../assets/UGL-2.jpg';
import styles from './HeroVisualizer.module.css';

type ConsoleMode = 'ea-fc26' | 'ugl-telemetry' | 'amphora-trade';

export default function HeroVisualizer() {
  const [mode, setMode] = useState<ConsoleMode>('ea-fc26');

  // --- EA FC26 Interactive Radar State ---
  const [radarStats, setRadarStats] = useState({
    pac: 93,
    sho: 89,
    pas: 88,
    dri: 92,
    def: 76,
    phy: 84,
  });
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const calculateOVR = () => {
    const { pac, sho, pas, dri, def, phy } = radarStats;
    return Math.round((pac * 0.2 + sho * 0.25 + pas * 0.2 + dri * 0.2 + def * 0.05 + phy * 0.1));
  };

  const boostStat = (key: keyof typeof radarStats) => {
    setRadarStats((prev) => ({
      ...prev,
      [key]: Math.min(99, prev[key] + 2),
    }));
    setSelectedStat(key);
  };

  const resetStats = () => {
    setRadarStats({ pac: 93, sho: 89, pas: 88, dri: 92, def: 76, phy: 84 });
    setSelectedStat(null);
  };

  // Convert radarStats (0-100) to 6-point SVG polygon coordinates (center: 110, 110, maxRadius: 85)
  const getRadarPoints = () => {
    const cx = 110;
    const cy = 110;
    const maxR = 85;
    const statsArray = [
      radarStats.pac,
      radarStats.sho,
      radarStats.pas,
      radarStats.dri,
      radarStats.def,
      radarStats.phy,
    ];
    return statsArray
      .map((val, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const r = (val / 100) * maxR;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // --- UGL Live Telemetry Oscilloscope State ---
  const [telemetrySpeed, setTelemetrySpeed] = useState(114.6);
  const [bearingTemp, setBearingTemp] = useState(58.4);
  const [vibrationG, setVibrationG] = useState(2.14);
  const [latency, setLatency] = useState(16);
  const [packetsStreamed, setPacketsStreamed] = useState(24819);
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [wavePoints, setWavePoints] = useState<number[]>([
    25, 28, 24, 30, 26, 32, 29, 35, 30, 28, 33, 27, 31, 26, 34, 28, 32, 29, 36, 30,
  ]);

  // Live telemetry pulse
  useEffect(() => {
    if (mode !== 'ugl-telemetry') return;

    const timer = setInterval(() => {
      setPacketsStreamed((c) => c + 3);
      setLatency(14 + Math.floor(Math.random() * 5));

      if (!isAnomalyActive) {
        setTelemetrySpeed((s) => Number((112 + Math.random() * 4).toFixed(1)));
        setBearingTemp((t) => Number((57.8 + Math.random() * 1.2).toFixed(1)));
        const newG = Number((2.05 + Math.random() * 0.25).toFixed(2));
        setVibrationG(newG);

        setWavePoints((prev) => {
          const nextVal = Math.round(26 + (newG - 2.0) * 40 + (Math.random() * 10 - 5));
          return [...prev.slice(1), Math.max(10, Math.min(50, nextVal))];
        });
      }
    }, 500);

    return () => clearInterval(timer);
  }, [mode, isAnomalyActive]);

  const triggerAnomaly = () => {
    setIsAnomalyActive(true);
    setBearingTemp(79.6);
    setVibrationG(4.88);
    setWavePoints([48, 12, 56, 8, 52, 10, 58, 6, 54, 14, 50, 12, 55, 9, 52, 15, 48, 12, 50, 18]);

    setTimeout(() => {
      setIsAnomalyActive(false);
    }, 4500);
  };

  // --- Amphora Symphony Trade Deal Capture State ---
  const [commodity, setCommodity] = useState('Brent Crude (ICE)');
  const [volumeBBL, setVolumeBBL] = useState(125000);
  const [pricePerBBL, setPricePerBBL] = useState(78.45);
  const [tradeStatus, setTradeStatus] = useState<'draft' | 'validated' | 'executed'>('validated');
  const [executedTicket, setExecutedTicket] = useState<string | null>(null);

  const handleCommodityChange = (val: string) => {
    setCommodity(val);
    if (val.includes('Brent')) setPricePerBBL(78.45);
    else if (val.includes('WTI')) setPricePerBBL(74.2);
    else setPricePerBBL(3.18);
    setTradeStatus('validated');
    setExecutedTicket(null);
  };

  const handleExecuteTrade = () => {
    setTradeStatus('executed');
    setExecutedTicket(`TRD-${Math.floor(100000 + Math.random() * 900000)}-ETRM`);
  };

  return (
    <div className={styles.visualizerCard}>
      {/* Visualizer Top Command Bar */}
      <div className={styles.consoleHeader}>
        <div className={styles.headerTitleGroup}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            <span className={styles.liveLabel}>LIVE REACT 19 CONSOLE</span>
          </div>
          <span className={styles.architectureTag}>Interactive Production Proof</span>
        </div>

        {/* Mode Switcher Tabs */}
        <div className={styles.modeTabs}>
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === 'ea-fc26' ? styles.activeModeBtn : ''}`}
            onClick={() => setMode('ea-fc26')}
          >
            <span>⚽ EA Sports FC26</span>
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === 'ugl-telemetry' ? styles.activeModeBtn : ''}`}
            onClick={() => setMode('ugl-telemetry')}
          >
            <span>📡 UGL Locomotive</span>
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${mode === 'amphora-trade' ? styles.activeModeBtn : ''}`}
            onClick={() => setMode('amphora-trade')}
          >
            <span>⚡ Amphora ETRM</span>
          </button>
        </div>
      </div>

      {/* Mode 1: EA FC26 Player Radar & Stats Analytics */}
      {mode === 'ea-fc26' && (
        <div className={styles.panelBody}>
          <div className={styles.panelBackdrop}>
            <Image
              src={fc26ImageOne}
              alt="EA Sports FC26 Analytics Preview"
              fill
              className={styles.backdropImage}
              sizes="(max-width: 768px) 100vw, 550px"
              priority
            />
            <div className={styles.backdropShade} />
          </div>

          <div className={styles.panelContent}>
            <div className={styles.fc26Header}>
              <div>
                <span className={styles.subMetaTag}>ELECTRONIC ARTS • FC26 ENGINE</span>
                <h4 className={styles.panelTitle}>Player Performance Radar Matrix</h4>
              </div>
              <div className={styles.ovrBadge}>
                <span className={styles.ovrLabel}>OVR</span>
                <span className={styles.ovrValue}>{calculateOVR()}</span>
              </div>
            </div>

            <div className={styles.radarLayout}>
              {/* 6-Axis SVG Radar Polygon */}
              <div className={styles.radarSvgWrapper}>
                <svg className={styles.radarSvg} viewBox="0 0 220 220">
                  {/* Concentric Background Polygons */}
                  {[0.25, 0.5, 0.75, 1].map((scale) => (
                    <polygon
                      key={scale}
                      className={styles.radarGridPoly}
                      points={[0, 1, 2, 3, 4, 5]
                        .map((i) => {
                          const angle = (Math.PI / 3) * i - Math.PI / 2;
                          const r = 85 * scale;
                          return `${(110 + r * Math.cos(angle)).toFixed(1)},${(110 + r * Math.sin(angle)).toFixed(1)}`;
                        })
                        .join(' ')}
                    />
                  ))}

                  {/* 6 Axis Radial Spoke Lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const angle = (Math.PI / 3) * i - Math.PI / 2;
                    return (
                      <line
                        key={i}
                        x1="110"
                        y1="110"
                        x2={(110 + 85 * Math.cos(angle)).toFixed(1)}
                        y2={(110 + 85 * Math.sin(angle)).toFixed(1)}
                        className={styles.radarSpoke}
                      />
                    );
                  })}

                  {/* Dynamic Glowing Value Polygon */}
                  <polygon className={styles.radarValuePoly} points={getRadarPoints()} />

                  {/* Axis Vertex Indicator Points */}
                  {[
                    radarStats.pac,
                    radarStats.sho,
                    radarStats.pas,
                    radarStats.dri,
                    radarStats.def,
                    radarStats.phy,
                  ].map((val, i) => {
                    const angle = (Math.PI / 3) * i - Math.PI / 2;
                    const r = (val / 100) * 85;
                    const x = (110 + r * Math.cos(angle)).toFixed(1);
                    const y = (110 + r * Math.sin(angle)).toFixed(1);
                    return <circle key={i} cx={x} cy={y} r="4" className={styles.vertexDot} />;
                  })}
                </svg>

                {/* SVG Axis Labels */}
                <span className={`${styles.axisLabel} ${styles.axisPac}`}>PAC {radarStats.pac}</span>
                <span className={`${styles.axisLabel} ${styles.axisSho}`}>SHO {radarStats.sho}</span>
                <span className={`${styles.axisLabel} ${styles.axisPas}`}>PAS {radarStats.pas}</span>
                <span className={`${styles.axisLabel} ${styles.axisDri}`}>DRI {radarStats.dri}</span>
                <span className={`${styles.axisLabel} ${styles.axisDef}`}>DEF {radarStats.def}</span>
                <span className={`${styles.axisLabel} ${styles.axisPhy}`}>PHY {radarStats.phy}</span>
              </div>

              {/* Interactive Controls & Match Insights */}
              <div className={styles.radarControls}>
                <div className={styles.controlsHeader}>
                  <span className={styles.miniLabel}>INTERACTIVE ATTRIBUTE TUNER</span>
                  <button type="button" className={styles.resetBtn} onClick={resetStats}>
                    Reset
                  </button>
                </div>

                <div className={styles.statButtons}>
                  <button type="button" className={styles.tunerBtn} onClick={() => boostStat('pac')}>
                    ⚡ Pace +2
                  </button>
                  <button type="button" className={styles.tunerBtn} onClick={() => boostStat('sho')}>
                    🎯 Shoot +2
                  </button>
                  <button type="button" className={styles.tunerBtn} onClick={() => boostStat('dri')}>
                    💫 Dribble +2
                  </button>
                  <button type="button" className={styles.tunerBtn} onClick={() => boostStat('pas')}>
                    📐 Pass +2
                  </button>
                </div>

                <div className={styles.matchStatsBox}>
                  <div className={styles.statMetric}>
                    <span className={styles.metricKey}>Match Pace</span>
                    <span className={styles.metricVal}>60 FPS Recharts</span>
                  </div>
                  <div className={styles.statMetric}>
                    <span className={styles.metricKey}>Test Mutation</span>
                    <span className={styles.metricValHighlight}>86% Stryker</span>
                  </div>
                  <div className={styles.statMetric}>
                    <span className={styles.metricKey}>Architecture</span>
                    <span className={styles.metricVal}>Micro-Frontend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: UGL Locomotive Real-Time SignalR Telemetry */}
      {mode === 'ugl-telemetry' && (
        <div className={styles.panelBody}>
          <div className={styles.panelBackdrop}>
            <Image
              src={uglImageTwo}
              alt="UGL Rail CMS Locomotive Telemetry Preview"
              fill
              className={styles.backdropImage}
              sizes="(max-width: 768px) 100vw, 550px"
            />
            <div className={styles.backdropShade} />
          </div>

          <div className={styles.panelContent}>
            <div className={styles.uglHeader}>
              <div>
                <span className={styles.subMetaTag}>UGL RAIL &amp; PACIFIC NATIONAL • NSW LOCOMOTIVE FLEET</span>
                <h4 className={styles.panelTitle}>SignalR Live Vibration &amp; Health Stream</h4>
              </div>

              <div className={styles.pingBadge}>
                <span className={styles.greenPulse} />
                <span>{latency}ms SignalR Ping</span>
              </div>
            </div>

            {/* Alert Banner for Injected Anomaly */}
            {isAnomalyActive && (
              <div className={styles.anomalyBanner}>
                <span>🚨 HIGH VIBRATION SPIKE DETECTED (Axle-4 Bearing: 79.6°C / 4.88G)</span>
              </div>
            )}

            {/* Real-time Oscilloscope Waveform */}
            <div className={styles.oscilloscopeContainer}>
              <div className={styles.oscilloscopeHeader}>
                <span className={styles.scopeLabel}>OSCILLOSCOPE VIBRATION MONITOR (60 FPS STREAM)</span>
                <span className={styles.packetCount}>Packets: {packetsStreamed.toLocaleString()}</span>
              </div>

              <svg className={styles.oscilloscopeSvg} viewBox="0 0 400 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#BA8F55" stopOpacity="0.4" />
                    <stop offset="70%" stopColor="#BA8F55" stopOpacity="0.9" />
                    <stop offset="100%" stopColor={isAnomalyActive ? '#EF4444' : '#10B981'} stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Background Grid Lines */}
                <line x1="0" y1="15" x2="400" y2="15" stroke="rgba(239, 231, 220, 0.15)" strokeDasharray="3 3" />
                <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(239, 231, 220, 0.25)" strokeDasharray="3 3" />
                <line x1="0" y1="45" x2="400" y2="45" stroke="rgba(239, 231, 220, 0.15)" strokeDasharray="3 3" />

                {/* Wave Path */}
                <polyline
                  className={styles.wavePolyline}
                  stroke="url(#waveGrad)"
                  points={wavePoints
                    .map((val, idx) => `${(idx * (400 / (wavePoints.length - 1))).toFixed(1)},${val}`)
                    .join(' ')}
                />
              </svg>
            </div>

            {/* Telemetry Sensor Readouts */}
            <div className={styles.telemetryGrid}>
              <div className={styles.telemetrySensor}>
                <span className={styles.sensorName}>TRAIN SPEED</span>
                <span className={styles.sensorValue}>{telemetrySpeed} <small>km/h</small></span>
              </div>
              <div className={`${styles.telemetrySensor} ${isAnomalyActive ? styles.sensorWarning : ''}`}>
                <span className={styles.sensorName}>BEARING TEMP</span>
                <span className={styles.sensorValue}>{bearingTemp} <small>°C</small></span>
              </div>
              <div className={`${styles.telemetrySensor} ${isAnomalyActive ? styles.sensorWarning : ''}`}>
                <span className={styles.sensorName}>VIBRATION ACCEL</span>
                <span className={styles.sensorValue}>{vibrationG} <small>G</small></span>
              </div>
              <div className={styles.telemetrySensor}>
                <span className={styles.sensorName}>HEALTH STATUS</span>
                <span className={isAnomalyActive ? styles.statusAlert : styles.statusNominal}>
                  {isAnomalyActive ? 'CRITICAL' : 'NOMINAL'}
                </span>
              </div>
            </div>

            {/* Anomaly Trigger Button */}
            <div className={styles.uglActions}>
              <button
                type="button"
                className={styles.anomalyBtn}
                onClick={triggerAnomaly}
                disabled={isAnomalyActive}
              >
                {isAnomalyActive ? '⚠️ Simulating Bearing Anomaly...' : '⚡ Inject Anomaly Spike (Test Stream)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Amphora Symphony Energy Trade Deal Capture */}
      {mode === 'amphora-trade' && (
        <div className={styles.panelBody}>
          <div className={styles.panelContentNoBackdrop}>
            <div className={styles.amphoraHeader}>
              <div>
                <span className={styles.subMetaTag}>AMPHORA SOFTWARE • SYMPHONY ETRM PLATFORM</span>
                <h4 className={styles.panelTitle}>Dynamic Trade Capture &amp; Form State Engine</h4>
              </div>
              <div className={styles.validationBadge}>
                <span className={styles.checkIcon}>✓</span>
                <span>TanStack Form Validated</span>
              </div>
            </div>

            {/* Trade Booking Ticket Form */}
            <div className={styles.tradeTicket}>
              <div className={styles.tradeInputRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>COMMODITY ASSET</label>
                  <select
                    className={styles.tradeSelect}
                    value={commodity}
                    onChange={(e) => handleCommodityChange(e.target.value)}
                  >
                    <option value="Brent Crude (ICE)">Brent Crude Oil (ICE)</option>
                    <option value="WTI Crude (NYMEX)">WTI Light Sweet Crude (NYMEX)</option>
                    <option value="Natural Gas (Henry Hub)">Natural Gas (Henry Hub)</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>TRADE VOLUME ({commodity.includes('Gas') ? 'MMBtu' : 'BBL'})</label>
                  <div className={styles.sliderRow}>
                    <input
                      type="range"
                      min="25000"
                      max="500000"
                      step="25000"
                      value={volumeBBL}
                      onChange={(e) => {
                        setVolumeBBL(Number(e.target.value));
                        setExecutedTicket(null);
                      }}
                      className={styles.volumeSlider}
                    />
                    <span className={styles.volumeDisplay}>{volumeBBL.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Real-time Pricing Calculation Strip */}
              <div className={styles.pricingSummary}>
                <div className={styles.priceCol}>
                  <span className={styles.priceSub}>INDEX PRICE</span>
                  <span className={styles.priceVal}>${pricePerBBL.toFixed(2)}</span>
                </div>
                <div className={styles.priceCol}>
                  <span className={styles.priceSub}>NOTIONAL CONTRACT VALUE</span>
                  <span className={styles.notionalVal}>
                    ${((volumeBBL * pricePerBBL)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>
                <div className={styles.priceCol}>
                  <span className={styles.priceSub}>PIPELINE</span>
                  <span className={styles.priceVal}>GraphQL + Saga</span>
                </div>
              </div>

              {/* Execution Status & CTA */}
              <div className={styles.tradeFooter}>
                {executedTicket ? (
                  <div className={styles.ticketSuccess}>
                    <span>🎉 Deal Booked Successfully: <strong>{executedTicket}</strong></span>
                  </div>
                ) : (
                  <button type="button" className={styles.executeBtn} onClick={handleExecuteTrade}>
                    Confirm &amp; Book Energy Trade Deal ⟶
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
