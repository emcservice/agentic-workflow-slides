import React from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Steps, Step } from '@open-slide/core';
import coverBgImg from './assets/cover-bg.png';
import thankYouImg from './assets/thank-you.png';
import magicImg from './assets/magic-imagination.png';
import workflowImg from './assets/workflow-n8n.png';
import qrImg from './assets/qr-upload.png';

export const notes: (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "「無法想像的事物，就無法實現」—— 你的想像力，才是真正的天花板。",
];


// ── Webfont ───────────────────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('osd-inter-aw')) {
  const link = document.createElement('link');
  link.id = 'osd-inter-aw';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
  document.head.appendChild(link);
}

// ── Design system ─────────────────────────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#ede6ef',
    text: '#1a1028',
    accent: '#5b3ec8',
  },
  fonts: {
    display: '"Inter", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: {
    hero: 140,
    body: 36,
  },
  radius: 14,
};

// ── Local constants ───────────────────────────────────────────────────────────
const p = {
  bg:         '#ede6ef',
  text:       '#1a1028',
  accent:     '#5b3ec8',
  surface:    '#f5f0f8',
  surfaceHi:  '#fdf9ff',
  textSoft:   '#3d2b5c',
  muted:      '#8b7a9e',
  dim:        '#c0b4cc',
  border:     'rgba(90,50,180,0.10)',
  borderHi:   'rgba(90,50,180,0.22)',
  accentSoft: '#7a5ee0',
  mint:       '#1a8a5a',
  amber:      '#b87000',
  rose:       '#be3030',
};

const font = '"Inter", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif';

const fill: React.CSSProperties = {
  width: '100%', height: '100%',
  background: '#ede6ef',
  color: '#1a1028',
  fontFamily: font,
  overflow: 'hidden',
  position: 'relative',
};

// ── Shared animations ─────────────────────────────────────────────────────────
const styles = `
  @keyframes aw-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes aw-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .aw-up { opacity: 0; animation: aw-up 0.7s cubic-bezier(0,0,0.2,1) forwards; }
  .aw-in { opacity: 0; animation: aw-in 0.9s ease forwards; }
  /* Equal-size columns even though each card sits inside a <Step> wrapper div */
  .aw-cols > * { flex: 1 1 0; min-width: 0; display: flex; }
`;
const Styles = () => <style>{styles}</style>;

// ── Shared components ─────────────────────────────────────────────────────────
const GridBg = () => (
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage:
      'linear-gradient(rgba(90,50,180,0.07) 1px, transparent 1px),' +
      'linear-gradient(90deg, rgba(90,50,180,0.07) 1px, transparent 1px)',
    backgroundSize: '96px 96px',
    maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 72%)',
    WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 72%)',
    pointerEvents: 'none',
  }} />
);

const EyebrowTag = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 12,
    fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: color || p.muted, fontWeight: 500,
  }}>
    <span style={{ width: 28, height: 2, borderRadius: 1, background: color || p.muted, display: 'inline-block' }} />
    {children}
  </div>
);

const CornerBadge = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <div style={{
    position: 'absolute', top: 100, right: 120,
    background: color || `${p.accent}22`,
    border: `1px solid ${color ? color + '66' : p.accent + '55'}`,
    borderRadius: 999, padding: '10px 24px',
    fontSize: 24, fontWeight: 700,
    color: color || p.accentSoft, letterSpacing: '0.06em',
  }}>{children}</div>
);

// Card used on dark slides
const Card = ({ accent, title, body, delay = 0, noAnim }: {
  accent?: string; title: string; body: string; delay?: number; noAnim?: boolean;
}) => (
  <div className={noAnim ? undefined : 'aw-up'} style={{
    animationDelay: noAnim ? undefined : `${delay}s`,
    flex: 1, background: p.surface,
    border: `1px solid ${p.border}`,
    borderRadius: 'var(--osd-radius)',
    padding: '28px 36px',
    display: 'flex', flexDirection: 'column', gap: 0,
  }}>
    <div style={{ width: 36, height: 3, borderRadius: 2, background: accent || p.accent, marginBottom: 20 }} />
    <div style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1.25, color: p.text, marginBottom: 16 }}>{title}</div>
    <div style={{ fontSize: 30, lineHeight: 1.65, color: p.textSoft }}>{body}</div>
  </div>
);

// Numbered bullet row
const BulletRow = ({ n, body, delay = 0 }: { n: number; body: string; delay?: number }) => (
  <div className="aw-up" style={{
    animationDelay: `${delay}s`,
    display: 'flex', gap: 36, alignItems: 'center',
    padding: '22px 36px',
    background: p.surface,
    border: `1px solid ${p.border}`,
    borderRadius: 'var(--osd-radius)',
  }}>
    <div style={{
      flexShrink: 0, width: 48, height: 48, borderRadius: '50%',
      background: `${p.accent}22`, border: `1px solid ${p.accent}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22, fontWeight: 700, color: p.accentSoft,
    }}>{n}</div>
    <div style={{ fontSize: 34, lineHeight: 1.6, color: p.textSoft }}>{body}</div>
  </div>
);

// Bottom key-message bar
const BottomNote = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    padding: '24px 56px',
    background: `${p.accent}12`,
    border: `1px solid ${p.accent}30`,
    borderRadius: 'var(--osd-radius)',
    fontSize: 30, color: p.accentSoft, lineHeight: 1.5,
    fontWeight: 700, fontStyle: 'italic',
  }}>{children}</div>
);

// Flow step box
const FlowBox = ({ label, color, delay = 0 }: { label: string; color: string; delay?: number }) => (
  <div className="aw-up" style={{
    animationDelay: `${delay}s`,
    flex: 1, background: `${color}18`,
    border: `1px solid ${color}55`,
    borderRadius: 'var(--osd-radius)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '28px 16px',
    fontSize: 34, fontWeight: 700, color: color, textAlign: 'center' as const,
    lineHeight: 1.3,
  }}>{label}</div>
);

const Arrow = () => (
  <div style={{
    flexShrink: 0, width: 36, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color: p.dim, fontSize: 28,
  }}>→</div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 1 — Cover
// ────────────────────────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '140px 160px' }}>
    <Styles />
    <img src={coverBgImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
    {/* light overlay so text stays readable */}
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(237,230,239,0.42)', zIndex: 1 }} />
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="aw-up" style={{ marginBottom: 32 }}><EyebrowTag>Agentic Workflow Design</EyebrowTag></div>
      <h1 className="aw-up" style={{
        animationDelay: '0.1s',
        fontFamily: font, fontSize: 112, fontWeight: 800,
        lineHeight: 1.08, letterSpacing: '-0.03em',
        margin: 0,
      }}>
        不是學怎麼「用」AI，
        <br />
        <span style={{ color: p.accent }}>而是學怎麼「設計」</span>
        <br />
        給 AI 用的工作流
      </h1>
      <p className="aw-up" style={{ animationDelay: '0.3s', marginTop: 48, fontSize: 40, color: p.textSoft, letterSpacing: '-0.01em', fontWeight: '700' }}>
        人類掌舵，AI 執行
      </p>
      <div className="aw-up" style={{
        animationDelay: '0.5s',
        marginTop: 32, fontSize: 24, color: p.muted, letterSpacing: '0.06em',
      }}>
        EMC 研討會
      </div>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 1.5 — 科普時間：AI Agent vs. LLM
// ────────────────────────────────────────────────────────────────────────────
const IconCircle = ({ icon, color }: { icon: string; color: string }) => (
  <div style={{
    flexShrink: 0, width: 64, height: 64, borderRadius: '50%',
    background: `${color}22`, border: `1px solid ${color}55`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
  }}>{icon}</div>
);

const PhaseChip = ({ n, icon, label }: { n: string; icon: string; label: string }) => (
  <div style={{
    flex: 1, minWidth: 0, background: p.surfaceHi,
    border: `1px solid ${p.borderHi}`, borderRadius: 'var(--osd-radius)',
    padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
  }}>
    <IconCircle icon={icon} color={p.accent} />
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: p.accentSoft, letterSpacing: '0.08em' }}>STEP {n}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: p.text, lineHeight: 1.2 }}>{label}</div>
    </div>
  </div>
);

const SciencePop: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>科普時間</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 40px',
    }}>先搞懂：LLM 跟 AI Agent 差在哪？</h2>
    <div className="aw-cols" style={{ flex: 1, display: 'flex', gap: 32, minHeight: 0 }}>
      <Steps>
        {/* LEFT — LLM */}
        <Step>
          <div style={{
            flex: 1, background: p.surface, border: `1px solid ${p.border}`,
            borderRadius: 'var(--osd-radius)', padding: '40px 44px',
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <IconCircle icon="🧠" color={p.muted} />
              <div>
                <div style={{ fontSize: 42, fontWeight: 800, color: p.text, lineHeight: 1.1 }}>LLM</div>
                <div style={{ fontSize: 24, color: p.muted, fontWeight: 600 }}>大型語言模型</div>
              </div>
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.6, color: p.textSoft }}>一顆很強的大腦，外掛一座知識庫。</div>
            <div style={{
              background: p.surfaceHi, border: `1px solid ${p.border}`,
              borderRadius: 'var(--osd-radius)', padding: '22px 26px',
              fontSize: 28, lineHeight: 1.5, color: p.text,
            }}>
              <span style={{ fontWeight: 800 }}>被動回答問題</span>
              <br />你問它才答、答完就停，不會自己去查、去動手。
            </div>
            <div style={{ flex: 1 }} />
            <div style={{
              alignSelf: 'flex-start', background: `${p.muted}22`, border: `1px solid ${p.muted}55`,
              borderRadius: 999, padding: '10px 24px', fontSize: 24, fontWeight: 700, color: p.textSoft,
            }}>只用大腦 → 被動知識</div>
          </div>
        </Step>
        {/* RIGHT — AI Agent */}
        <Step>
          <div style={{
            flex: 1, background: p.surface, border: `1px solid ${p.accent}40`,
            borderRadius: 'var(--osd-radius)', padding: '40px 44px',
            display: 'flex', flexDirection: 'column', gap: 22,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <IconCircle icon="🤖" color={p.accent} />
              <div>
                <div style={{ fontSize: 42, fontWeight: 800, color: p.text, lineHeight: 1.1 }}>AI Agent</div>
                <div style={{ fontSize: 24, color: p.accentSoft, fontWeight: 600 }}>代理人、智能體</div>
              </div>
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.6, color: p.textSoft }}>大腦＋五官四肢，會自己感知、決策、動手。</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <PhaseChip n="1" icon="🔍" label="感知環境" />
                <PhaseChip n="2" icon="🧭" label="制定策略" />
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <PhaseChip n="3" icon="🦾" label="執行任務" />
                <PhaseChip n="4" icon="🔄" label="持續迭代" />
              </div>
            </div>
            <div style={{
              alignSelf: 'flex-start', background: `${p.accent}1c`, border: `1px solid ${p.accent}55`,
              borderRadius: 999, padding: '10px 24px', fontSize: 24, fontWeight: 700, color: p.accentSoft,
            }}>主動行動 & 學習 → 不斷循環</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'stretch', borderRadius: 'var(--osd-radius)', overflow: 'hidden', border: `1px solid ${p.border}` }}>
          <div style={{ flex: 1, padding: '20px 40px', background: `${p.muted}18`, fontSize: 28, fontWeight: 700, color: p.textSoft, textAlign: 'right' }}>LLM：被動知識</div>
          <div style={{ flexShrink: 0, width: 76, background: p.text, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, letterSpacing: '0.04em' }}>VS</div>
          <div style={{ flex: 1, padding: '20px 40px', background: `${p.accent}1c`, fontSize: 28, fontWeight: 700, color: p.accent, textAlign: 'left' }}>AI Agent：主動行動與互動</div>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 2 — 痛點開場
// Budget: 1080 - 120×2 = 840px
// Eyebrow 27px + gap 20 = 47; Title 74px + gap 48 = 122; Cards ~580px; Bottom 91px → 840✓
// ────────────────────────────────────────────────────────────────────────────
// Fixed canvas: content width = 1920 - 2×120 = 1680; 3 cards + 2×28 gaps → 541px each.
const PAIN_CARD_W = 541;
const PainCard = ({ accent, q, d }: { accent: string; q: string; d: string }) => (
  <div style={{
    width: PAIN_CARD_W,
    background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)',
    padding: '26px 32px', display: 'flex', flexDirection: 'column',
  }}>
    <div style={{ width: 36, height: 3, borderRadius: 2, background: accent, marginBottom: 16 }} />
    <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3, color: p.text, marginBottom: 12 }}>{q}</div>
    <div style={{ fontSize: 22, lineHeight: 1.6, color: p.textSoft }}>{d}</div>
  </div>
);

const PainPoints: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>你是不是也覺得</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 48px',
    }}>AI 根本不知道我要做什麼？</h2>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexWrap: 'wrap', gap: 28, alignContent: 'center', justifyContent: 'center' }}>
      <Steps>
        <Step><PainCard accent={p.accent} q="「每次產出不一致，要改很多次」" d="花了時間下 prompt，結果還是對不上需求，整個從頭來過。" /></Step>
        <Step><PainCard accent={p.amber} q="「講半天，它還是抓錯重點」" d="交代了五分鐘背景，最後給的東西跟想要的差十萬八千里。" /></Step>
        <Step><PainCard accent={p.rose} q="「改了 A，B 就亂掉了」" d="牽一髮動全身，根本不敢讓它繼續跑下去。" /></Step>
        <Step><PainCard accent={p.mint} q="「每次關掉對話框後就失憶」" d="一開新對話，前面的脈絡全部歸零，又要從頭重講。" /></Step>
        <Step><PainCard accent={p.accentSoft} q="「AI 幻覺：編造事實與文獻」" d="用非常有自信的語氣，生成完全不正確、虛構或誇大的內容。" /></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>問題通常不在模型，而在我們「丟任務的方式」。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 3 — 打掃比喻
// Budget: 47+122+2-col 510px+91 = 770px ✓
// ────────────────────────────────────────────────────────────────────────────
const CleaningMetaphor: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>舉個例子</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 48px',
    }}>你請了幫手打掃，只說「把家裡打掃乾淨」</h2>
    <div className="aw-cols" style={{ flex: 1, display: 'flex', gap: 32, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.mint}40`,
            borderRadius: 'var(--osd-radius)', padding: '44px 48px',
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>
            <div style={{ width: 36, height: 3, borderRadius: 2, background: p.mint }} />
            <div style={{ fontSize: '50px', fontWeight: 700 }}>你心中的「乾淨」</div>
            <div style={{ fontSize: 32, lineHeight: 1.7, color: p.textSoft }}>
              地板不黏腳、桌面清爽
              <br />水槽沒有碗、垃圾都倒掉
              <br />連看不到的角落都要弄
            </div>
          </div>
        </Step>
        <Step>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.rose}40`,
            borderRadius: 'var(--osd-radius)', padding: '44px 48px',
            display: 'flex', flexDirection: 'column', gap: 24,
          }}>
            <div style={{ width: 36, height: 3, borderRadius: 2, background: p.rose }} />
            <div style={{ fontSize: '50px', fontWeight: 700 }}>幫手心中的「乾淨」</div>
            <div style={{ fontSize: 32, lineHeight: 1.7, color: p.textSoft }}>
              東西有歸位就好
              <br />看得順眼就算過關
              <br />角落、櫃子後面不用動
            </div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>Agent 沒有讀心術，你不講清楚，它再聰明也無法完成任務</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 4 — Mega Agent 陷阱
// Budget: 47+122+blackbox 220px+4 rows 68×4+32×3 = 47+122+220+368=757✓
// ────────────────────────────────────────────────────────────────────────────
const MegaAgent: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>最常見的錯誤</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 48px',
    }}>把模糊的任務丟給 AI，讓它從頭跑到尾</h2>

    <div style={{ flex: 1, display: 'flex', gap: 48, minHeight: 0, alignItems: 'stretch' }}>
      {/* Left — black box */}
      <Steps>
        <Step>
          <div style={{ flexShrink: 0, width: 440, background: '#dbdbf5', border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '40px' }}>
            <div style={{ fontSize: 28, color: '#9988bb', textAlign: 'center' as const }}>INPUT</div>
            <div style={{
              background: '#1a1230', border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 10, padding: '20px 28px',
              fontSize: 30, color: '#ddd0f0', textAlign: 'center' as const, lineHeight: 1.5,
            }}>「幫我寫/優化提案」</div>
            <div style={{ fontSize: 48, color: '#4a3880' }}>⋯</div>
            <div style={{ fontSize: 28, color: '#9988bb', textAlign: 'center' as const }}>OUTPUT</div>
            <div style={{
              fontSize: 24, color: '#6654a0', textAlign: 'center' as const, fontStyle: 'italic',
            }}>中間發生什麼，看不見</div>
          </div>
        </Step>
      </Steps>

      {/* Right — checklist */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Steps>
          <Step><BulletRow n={1} body="你不知道哪段推理是對的" /></Step>
          <Step><BulletRow n={2} body="哪段工具被它用錯了" /></Step>
          <Step><BulletRow n={3} body="哪段根本是它幻想出來的" /></Step>
          <Step><BulletRow n={4} body="哪段根本不該讓它自動跑" /></Step>
        </Steps>
      </div>
    </div>

    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>整包丟進去、整包吐出來 → 想檢查也找不到下手點</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 5 — 分而治之
// Budget: 47+122+flow 100+gap 32+desc 160+gap32+note 91 = 584px ✓
// ────────────────────────────────────────────────────────────────────────────
const Decompose: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>正確做法</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 48px',
    }}>分而治之：拆成一串小任務</h2>

    <Steps>
      <Step>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
          <FlowBox label="一大包模糊任務" color={p.rose} />
          <Arrow />
          <FlowBox label="分類" color={p.amber} />
          <Arrow />
          <FlowBox label="查資料" color={p.accentSoft} />
          <Arrow />
          <FlowBox label="執行" color={p.accent} />
          <Arrow />
          <FlowBox label="QC" color={p.mint} />
        </div>
      </Step>
      <Step>
        <div style={{
          background: p.surface,
          border: `1px solid ${p.border}`,
          borderRadius: 'var(--osd-radius)',
          padding: '40px 48px',
          fontSize: 34, lineHeight: 1.7, color: p.textSoft,
          marginBottom: 32,
        }}>
          每個小任務都有明確的<span style={{ color: p.accentSoft }}> 輸入 / 輸出 / 成功標準</span>。
          <br />上一個節點的輸出就是下一個的輸入<br />{''}
          出錯了回去看 log，哪裡壞改哪裡，對症下藥——不用整個重寫。
        </div>
      </Step>
      <Step>
        <BottomNote>你不是在訓練一個超人 AI，而是在設計一條生產線。</BottomNote>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 6 — PART 1 章節頁
// Budget (160px padding): 760px
// Pill 44+gap32=76; Title 110+gap48=158; 3 cards ~430; note 36 → 700✓
// ────────────────────────────────────────────────────────────────────────────
const Part1Chapter: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '140px 160px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${p.accent}22`, border: `1px solid ${p.accent}50`,
      borderRadius: 999, padding: '10px 28px', marginBottom: 36,
      fontSize: 24, fontWeight: 700, letterSpacing: '0.12em',
      color: p.accentSoft, alignSelf: 'flex-start',
    }}>PART 1</div>

    <h2 className="aw-up" style={{
      animationDelay: '0.1s',
      fontSize: 104, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.035em',
      margin: '0 0 52px',
    }}>先認識三個名詞</h2>

    <div className="aw-cols" style={{ flex: 1, display: 'flex', gap: 28, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.border}`,
            borderRadius: 'var(--osd-radius)', padding: '40px 40px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: `${p.mint}22`, border: `1px solid ${p.mint}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800, color: p.mint,
            }}>1</div>
            <div style={{ fontSize: '50px', fontWeight: 700 }}>Human SOP</div>
            <div style={{ fontSize: 30, color: p.textSoft, lineHeight: 1.55 }}>寫給「人」看的流程</div>
          </div>
        </Step>
        <Step>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.border}`,
            borderRadius: 'var(--osd-radius)', padding: '40px 40px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: `${p.accentSoft}22`, border: `1px solid ${p.accentSoft}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800, color: p.accentSoft,
            }}>2</div>
            <div style={{ fontSize: '50px', fontWeight: 700 }}>Skill</div>
            <div style={{ fontSize: 30, color: p.textSoft, lineHeight: 1.55 }}>打包給 AI 的單一任務</div>
          </div>
        </Step>
        <Step>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.border}`,
            borderRadius: 'var(--osd-radius)', padding: '40px 40px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: `${p.amber}22`, border: `1px solid ${p.amber}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800, color: p.amber,
            }}>3</div>
            <div style={{ fontSize: '49px', fontWeight: 700 }}>Agentic Workflow</div>
            <div style={{ fontSize: 30, color: p.textSoft, lineHeight: 1.55 }}>串起來的 AI 生產線</div>
          </div>
        </Step>
      </Steps>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 7 — Human SOP
// Budget: 47+20+122+20+(3 rows × 112+16) × = 47+20+122+20+384=593 ✓
// ────────────────────────────────────────────────────────────────────────────
const HumanSOP: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <CornerBadge>1 / 3</CornerBadge>
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag color={p.mint}>名詞 1 / 3</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 32px',
    }}>Human SOP：寫給「人」看的流程</h2>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Steps>
        <Step><BulletRow n={1} body="就是傳統的流程文件（Word、簡報）：第一步、第二步、例外怎麼處理。" /></Step>
        <Step><BulletRow n={2} body="人看得懂，是因為腦中會自動補上背景判斷。" delay={0.1} /></Step>
        <Step><BulletRow n={3} body="例：SOP 寫「回家要把髒衣服丟洗衣機」。人會自己判斷——深淺色要分開，要放幾匙洗衣精。" delay={0.2} /></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>對 AI 來說這只是非結構化文字——你沒講明，它不會知道差別。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 8 — Skill
// ────────────────────────────────────────────────────────────────────────────
const SkillPage: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <CornerBadge>2 / 3</CornerBadge>
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag color={p.accentSoft}>名詞 2 / 3</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 32px',
    }}>Skill：打包給 AI 的任務單位</h2>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Steps>
        <Step><BulletRow n={1} body="把你的「做事方法 + 判斷標準 + 踩過的坑」打包成一個資料夾，交給 AI。" /></Step>
        <Step><BulletRow n={2} body="通常含三樣：SKILL.md（給 AI 的 SOP＋心法）、references（範例 / 術語表）、scripts（可直接跑的腳本）。" delay={0.1} /></Step>
        <Step><BulletRow n={3} body="一個 skill 對應「單一任務」，不是整條工作流。" delay={0.2} /></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>命名一看就懂：weekly-report-drafting、invoice-categorization。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 9 — Agentic Workflow
// ────────────────────────────────────────────────────────────────────────────
const AgenticWorkflowPage: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <CornerBadge>3 / 3</CornerBadge>
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag color={p.amber}>名詞 3 / 3</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 32px',
    }}>Agentic Workflow：一條 AI 生產線</h2>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Steps>
        <Step><BulletRow n={1} body="由多個 AI、工具、Skill、資料源串成的一整條工作流。" /></Step>
        <Step><BulletRow n={2} body="不是單一個 prompt，更像一條生產線：有人理解問題、有人查資料、有人執行、有人寫報告。" delay={0.1} /></Step>
        <Step><BulletRow n={3} body="中間調用各種工具、API、資料庫，還有你之前寫好的 Skill。" delay={0.2} /></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>像一間工廠，只是裡面全都是 AI 夥伴在幫你做事。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 10 — 三者對照表
// Budget: 47+20+122+20+table(1 header 64 + 3 rows 72×3)=47+20+122+20+64+216=489 → +note 91 = 580✓
// ────────────────────────────────────────────────────────────────────────────
const ComparisonTable: Page = () => {
  const headerStyle: React.CSSProperties = {
    padding: '20px 32px',
    fontSize: 28, fontWeight: 700, color: p.accentSoft,
    background: `${p.accent}18`, letterSpacing: '0.04em',
  };
  const cellStyle: React.CSSProperties = {
    padding: '22px 32px',
    fontSize: 32, color: p.textSoft, lineHeight: 1.4,
  };
  const rowEven: React.CSSProperties = { background: p.surface };
  const rowOdd: React.CSSProperties = { background: p.surfaceHi };

  return (
    <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
      <Styles />
      <GridBg />
      <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>一次看懂</EyebrowTag></div>
      <h2 className="aw-up" style={{
        animationDelay: '0.08s',
        fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
        margin: '0 0 36px',
      }}>三者一次看懂</h2>

      <Steps>
        <Step>
          <div style={{
            flex: 1,
            border: `1px solid ${p.border}`,
            borderRadius: 'var(--osd-radius)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr', borderBottom: `1px solid ${p.border}` }}>
              <div style={headerStyle}>名詞</div>
              <div style={headerStyle}>一句話</div>
              <div style={headerStyle}>給誰用</div>
              <div style={headerStyle}>範圍</div>
            </div>
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr', flex: 1, borderBottom: `1px solid ${p.border}` }}>
              <div style={{ ...cellStyle, ...rowEven, fontWeight: 700, color: p.mint }}>Human SOP</div>
              <div style={{ ...cellStyle, ...rowEven }}>傳統流程文件</div>
              <div style={{ ...cellStyle, ...rowEven }}>給「人」看</div>
              <div style={{ ...cellStyle, ...rowEven }}>一個流程</div>
            </div>
            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr', flex: 1, borderBottom: `1px solid ${p.border}` }}>
              <div style={{ ...cellStyle, ...rowOdd, fontWeight: 700, color: p.accentSoft }}>Skill</div>
              <div style={{ ...cellStyle, ...rowOdd }}>打包好的做事方法</div>
              <div style={{ ...cellStyle, ...rowOdd }}>給 AI 執行</div>
              <div style={{ ...cellStyle, ...rowOdd }}>單一任務</div>
            </div>
            {/* Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr 1fr', flex: 1 }}>
              <div style={{ ...cellStyle, ...rowEven, fontWeight: 700, color: p.amber }}>Agentic Workflow</div>
              <div style={{ ...cellStyle, ...rowEven }}>串起來的生產線</div>
              <div style={{ ...cellStyle, ...rowEven }}>整套系統</div>
              <div style={{ ...cellStyle, ...rowEven }}>一整條流程</div>
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ marginTop: 32 }}>
            <BottomNote>重點：先做多個skills 都沒有問題後，再串成 workflow</BottomNote>
          </div>
        </Step>
      </Steps>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 11.5 — 真實工作流（越串越完整）
// Budget: eyebrow 43 + title 80 + subtitle 56 + image card fills rest
// ────────────────────────────────────────────────────────────────────────────
const WorkflowReality: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '90px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 16 }}><EyebrowTag>真實長相</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 64, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em',
      margin: '0 0 10px',
    }}>工作流，會越串越完整</h2>
    <p className="aw-up" style={{
      animationDelay: '0.14s',
      fontSize: 28, color: p.muted, margin: '0 0 28px',
    }}>有新需求，就接上一條分支——不用重寫，只要加一段。</p>
    <div className="aw-up" style={{
      animationDelay: '0.2s',
      flex: 1, minHeight: 0,
      background: p.surfaceHi, border: `1px solid ${p.border}`,
      borderRadius: 'var(--osd-radius)', padding: 24,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src={workflowImg} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 11 — PART 2 章節頁
// Budget (160px): 760px
// Pill 44+32=76; Title 104+52=156; 4 step boxes 220; gap 32; note 36 → 520✓
// ────────────────────────────────────────────────────────────────────────────
const Part2Chapter: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '140px 160px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${p.amber}22`, border: `1px solid ${p.amber}50`,
      borderRadius: 999, padding: '10px 28px', marginBottom: 36,
      fontSize: 24, fontWeight: 700, letterSpacing: '0.12em',
      color: p.amber, alignSelf: 'flex-start',
    }}>PART 2</div>

    <h2 className="aw-up" style={{
      animationDelay: '0.1s',
      fontSize: 96, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.035em',
      margin: '0 0 52px',
    }}>四步驟：把你的 SOP 變成 AI 工作流</h2>

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: 24, minHeight: 0, alignItems: 'center' }}>
      <Steps>
        <Step>
          <div style={{
            background: `${p.mint}18`, border: `1px solid ${p.mint}55`,
            borderRadius: 'var(--osd-radius)', padding: '36px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            textAlign: 'center' as const,
          }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: p.mint }}>01</div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>格式標準化</div>
          </div>
        </Step>
        <div style={{ color: p.dim, fontSize: 32, flexShrink: 0 }}>→</div>
        <Step>
          <div style={{
            background: `${p.accentSoft}18`, border: `1px solid ${p.accentSoft}55`,
            borderRadius: 'var(--osd-radius)', padding: '36px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            textAlign: 'center' as const,
          }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: p.accentSoft }}>02</div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>任務拆解與連結</div>
          </div>
        </Step>
        <div style={{ color: p.dim, fontSize: 32, flexShrink: 0 }}>→</div>
        <Step>
          <div style={{
            background: `${p.amber}18`, border: `1px solid ${p.amber}55`,
            borderRadius: 'var(--osd-radius)', padding: '36px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            textAlign: 'center' as const,
          }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: p.amber }}>03</div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>雙向開發</div>
          </div>
        </Step>
        <div style={{ color: p.dim, fontSize: 32, flexShrink: 0 }}>→</div>
        <Step>
          <div style={{
            background: `${p.rose}18`, border: `1px solid ${p.rose}55`,
            borderRadius: 'var(--osd-radius)', padding: '36px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            textAlign: 'center' as const,
          }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: p.rose }}>04</div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>整合資料與執行</div>
          </div>
        </Step>
      </Steps>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 12 — Step 1
// Budget: step row 64+gap 32+title 83+gap 36+3 cards ~450+gap 32+note 91 = 788✓
// ────────────────────────────────────────────────────────────────────────────
const Step1: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '100px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
      <div style={{
        background: `${p.mint}22`, border: `1px solid ${p.mint}55`,
        borderRadius: 999, padding: '10px 28px',
        fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: p.mint,
      }}>STEP 01</div>
      <EyebrowTag color={p.mint}>格式標準化</EyebrowTag>
    </div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 68, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 36px',
    }}>把寫給人看的 SOP，改成 AI 讀得懂的版本</h2>
    <div style={{ flex: 1, display: 'flex', gap: 28, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.mint }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>參數化</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>別把規則寫死。用參數讓一份 SOP 變成可重複使用的模板。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.accentSoft }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>MUST / SHOULD / MAY</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>標清楚規則強度。MUST＝一定要；SHOULD＝建議；MAY＝可有可無。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.amber }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>結構化格式</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>用 Markdown 把 步驟、參數、錯誤處理 分區塊。人看得懂，也方便接上工具。</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step><div style={{ marginTop: 28 }}><BottomNote>目標：讓 AI 能像人一樣讀懂規則，而不是靠猜。</BottomNote></div></Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 13 — Step 2
// ────────────────────────────────────────────────────────────────────────────
const Step2: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '100px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
      <div style={{
        background: `${p.accentSoft}22`, border: `1px solid ${p.accentSoft}55`,
        borderRadius: 999, padding: '10px 28px',
        fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: p.accentSoft,
      }}>STEP 02</div>
      <EyebrowTag color={p.accentSoft}>任務拆解與連結</EyebrowTag>
    </div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 68, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 36px',
    }}>每個節點：獨立 input、獨立 output、獨立除錯</h2>
    <div style={{ flex: 1, display: 'flex', gap: 28, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.mint }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>拆成獨立節點</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>每個節點各自有 input / output，可以獨立執行、獨立除錯、獨立替換。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.accentSoft }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>哪裡壞改哪裡</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>分類錯就只修分類那段，不用動到後面的查資料、寫回覆。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.amber }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>資料交接</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>上個節點整理好的資料，就是下個節點的輸入（通常是一份 JSON）。</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step><div style={{ marginTop: 28 }}><BottomNote>靠的不是 AI 之間的心電感應，而是清楚定義的 input、output 格式。</BottomNote></div></Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 14 — Step 3
// ────────────────────────────────────────────────────────────────────────────
const Step3: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '100px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
      <div style={{
        background: `${p.amber}22`, border: `1px solid ${p.amber}55`,
        borderRadius: 999, padding: '10px 28px',
        fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: p.amber,
      }}>STEP 03</div>
      <EyebrowTag color={p.amber}>雙向開發</EyebrowTag>
      <div style={{
        marginLeft: 'auto',
        background: `${p.rose}22`, border: `1px solid ${p.rose}55`,
        borderRadius: 999, padding: '8px 20px',
        fontSize: 22, fontWeight: 600, color: p.rose,
      }}>★ 最重要的一步</div>
    </div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 68, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 36px',
    }}>第一版一定有漏，跟 AI 一起迭代補上去</h2>
    <div style={{ flex: 1, display: 'flex', gap: 28, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.rose }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>第一版一定有漏</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>因為「默會知識」——你腦中有十幾條沒寫進去的判斷，要等 AI 撞牆才會發現。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.amber }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>跟 AI 一起迭代</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>一起跑 → 發現問題 → 補一條規則 → 再跑。三五輪就穩。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.mint }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>小步快跑</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>花兩個月寫「完美 SOP」跑一次就垮 vs. 一週跑 50 次迭代兩週上線。</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step><div style={{ marginTop: 28 }}><BottomNote>速度的關鍵，不是寫得多完美，而是迭代得多快。</BottomNote></div></Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 15 — Step 4
// ────────────────────────────────────────────────────────────────────────────
const Step4: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '100px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
      <div style={{
        background: `${p.rose}22`, border: `1px solid ${p.rose}55`,
        borderRadius: 999, padding: '10px 28px',
        fontSize: 24, fontWeight: 700, letterSpacing: '0.1em', color: p.rose,
      }}>STEP 04</div>
      <EyebrowTag color={p.rose}>整合資料與執行</EyebrowTag>
    </div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 68, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 36px',
    }}>再漂亮的 SOP，沒接上工具，終究只是紙上談兵</h2>
    <div style={{ flex: 1, display: 'flex', gap: 28, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.mint }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>接上真實工具</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>資料庫、API、報表系統，一個都不能少。SOP 要能在真實環境跑得起來。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.accentSoft }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>MCP = AI 的 USB-C</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>一套標準接口。不管 ChatGPT、Claude、Cursor，都能用同樣方式調用工具。</div>
          </div>
        </Step>
        <Step>
          <div style={{ flex: 1, background: p.surface, border: `1px solid ${p.border}`, borderRadius: 'var(--osd-radius)', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 32, height: 3, borderRadius: 2, background: p.amber }} />
            <div style={{ fontSize: 36, fontWeight: 700 }}>Human-in-the-loop</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>高風險、大變更之前，AI 先停下來等人按 OK，整條流程才不是黑箱。</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step><div style={{ marginTop: 28 }}><BottomNote>這就是「人類掌舵，AI 執行」——你還是最後拍板的人。</BottomNote></div></Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 16 — 我的 AI 工作流
// Budget: 47+20+83+20+desc 44+20+2rows(220+20)×2 = 47+20+83+20+44+20+480 = 714 → +note 91 = 805✓
// ────────────────────────────────────────────────────────────────────────────
const MyWorkflows: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>Agent First</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 12px',
    }}>讓 Agent 先學會幫你做重複性高的事</h2>
    <p className="aw-up" style={{
      animationDelay: '0.12s',
      fontSize: 30, color: p.muted, margin: '0 0 28px',
    }}>他會自己判別要用哪一個Skills</p>

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.mint}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: p.mint }}>課前通知</div>
            <div style={{ fontSize: 26, color: p.textSoft, lineHeight: 1.55 }}>抓下一個開課場次 → 撈學員名單 → 組信件內容 → 寄 Gmail → TG 通知我</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.accentSoft}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: p.accentSoft }}>每月自動結帳並通知財務</div>
            <div style={{ fontSize: 26, color: p.textSoft, lineHeight: 1.55 }}>撈取當月訂單→ 計算服務費→ 匯出報表 → 寄 Gmail → TG 通知我</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.amber}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: p.amber }}>發課程證明</div>
            <div style={{ fontSize: 26, color: p.textSoft, lineHeight: 1.55 }}>學員作答完畢→ 判斷分數是否通過→<br />是→ 產生證書→ 寄 Gmail → TG 通知我<br />否→ 查詢剩餘場次→ 寄 Gmail → TG 通知我</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.rose}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: p.rose }}>自動寫客服草稿</div>
            <div style={{ fontSize: 26, color: p.textSoft, lineHeight: 1.55 }}>搜尋客服信件→ 判斷問題→ 到資料庫找尋答案 → 幫我寫 Gmail 回覆草稿 → 我檢查後自己按寄送</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 28 }}>
          <BottomNote>自動化的前提：準備好對應的資料表，越詳細越好</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 17 — 實戰示範章節頁
// Budget (160px): 760px; Tag 44+32=76; Title 96+40=136; 4 labels 200; note 36 → 448✓
// ────────────────────────────────────────────────────────────────────────────
const CaseStudyChapter: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '140px 160px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{
      display: 'inline-flex', alignItems: 'center',
      background: `${p.rose}22`, border: `1px solid ${p.rose}50`,
      borderRadius: 999, padding: '10px 28px', marginBottom: 36,
      fontSize: 24, fontWeight: 700, letterSpacing: '0.12em',
      color: p.rose, alignSelf: 'flex-start',
    }}>實戰示範</div>

    <h2 className="aw-up" style={{
      animationDelay: '0.1s',
      fontSize: 96, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.035em',
      margin: '0 0 48px',
    }}>把「客服回信」<br />變成一條 AI 工作流</h2>

    <p className="aw-up" style={{
      animationDelay: '0.18s',
      fontSize: 32, color: p.textSoft, margin: '0 0 40px',
    }}>每次學員來信，你都要做這些：</p>

    <div style={{ display: 'flex', gap: 24 }}>
      <Steps>
        <Step><div style={{ flex: 1, background: `${p.mint}18`, border: `1px solid ${p.mint}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.mint, textAlign: 'center' as const }}>開信箱看新問題</div></Step>
        <Step><div style={{ flex: 1, background: `${p.accentSoft}18`, border: `1px solid ${p.accentSoft}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.accentSoft, textAlign: 'center' as const }}>看懂學員在問什麼</div></Step>
        <Step><div style={{ flex: 1, background: `${p.amber}18`, border: `1px solid ${p.amber}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.amber, textAlign: 'center' as const }}>翻 FAQ 找答案</div></Step>
        <Step><div style={{ flex: 1, background: `${p.rose}18`, border: `1px solid ${p.rose}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.rose, textAlign: 'center' as const }}>寫一封回覆草稿</div></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 40, fontSize: 26, color: p.muted }}>瑣碎、重複、每天都來 → 最適合交給 AI；但回信前，你要把關。</div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 18 — 實戰：四步走一遍
// Budget: 47+20+83+36+2rows(200+24)×2=47+20+83+36+448=634 → +note91=725✓
// ────────────────────────────────────────────────────────────────────────────
const CaseStudyFourSteps: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>實戰示範</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 36px',
    }}>客服回信：四步走一遍</h2>

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.mint}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.mint, letterSpacing: '0.08em' }}>01 標準化</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>寫一份 SOP「vintex-cs-draft」。<br />MUST 只建草稿、不直接寄；<br />MUST 只依 FAQ 回答、不自行編造。</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.accentSoft}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.accentSoft, letterSpacing: '0.08em' }}>02 拆解</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>拆成節點：<br />① 找信（Gmail 搜轉寄信）<br />② 查答（比對 Notion FAQ）<br />③ 寫草稿。靠信件內容＋FAQ 資料庫串接。</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.amber}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.amber, letterSpacing: '0.08em' }}>03 雙向開發</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>第一版會抓錯問題、找錯 FAQ。<br />補規則（跳過行事曆邀請、已回覆的信）</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.rose}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.rose, letterSpacing: '0.08em' }}>04 整合</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>接 Gmail＋Notion；查不到答案就轉人工。<br />草稿設 human-in-the-loop，AI 只擬稿，你按寄送。</div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 28 }}>
          <BottomNote>每一步都有明確 input/output，出問題可以定位到具體哪一段。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 19 — 串起來長這樣
// Budget: 47+20+83+48+flow 100+32+2cards 220+32+note 91 = 673✓
// ────────────────────────────────────────────────────────────────────────────
const CaseStudyFlow: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>實戰示範</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 40px',
    }}>串起來長這樣</h2>

    <Steps>
      <Step>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
          <FlowBox label="找客服轉寄信" color={p.mint} />
          <Arrow />
          <FlowBox label="讀懂問題" color={p.accentSoft} />
          <Arrow />
          <FlowBox label="查 FAQ" color={p.accent} />
          <Arrow />
          <FlowBox label="寫草稿" color={p.amber} />
          <Arrow />
          <div style={{
            flex: 1, background: `${p.rose}18`,
            border: `2px solid ${p.rose}80`,
            borderRadius: 'var(--osd-radius)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '28px 16px',
            fontSize: 30, fontWeight: 800, color: p.rose, textAlign: 'center' as const,
          }}>你檢查<br />寄送 ✓</div>
        </div>
      </Step>
      <Step>
        <div style={{ flex: 1, display: 'flex', gap: 32, minHeight: 0, marginBottom: 0 }}>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.mint}40`,
            borderRadius: 'var(--osd-radius)', padding: '36px 44px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16,
          }}>
            <div style={{ fontSize: 30, color: p.muted }}>原本每封慢慢想</div>
            <div style={{ fontSize: 72, fontWeight: 900, color: p.mint, lineHeight: 1 }}>草稿就緒</div>
            <div style={{ fontSize: 28, color: p.textSoft }}>AI 依 FAQ 擬好，你看過就送。</div>
          </div>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.accentSoft}40`,
            borderRadius: 'var(--osd-radius)', padding: '36px 44px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16,
          }}>
            <div style={{ fontSize: 30, color: p.muted }}>不會亂回</div>
            <div style={{ fontSize: '72px', fontWeight: 700, color: p.accentSoft, lineHeight: 1.3 }}>查不到 →{''}轉人工</div>
            <div style={{ fontSize: 28, color: p.textSoft }}>只依 FAQ，絕不自行編造。</div>
          </div>
        </div>
      </Step>
      <Step>
        <div style={{ marginTop: 28 }}>
          <BottomNote>只依 FAQ、只建草稿——AI 跑流程，你守住每一封的品質。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 21.a–c — 把 Skill 打開來看（SKILL.md 分段，逐段浮現）
// ────────────────────────────────────────────────────────────────────────────
const skMono = '"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace';

const Dot = ({ c }: { c: string }) => (
  <span style={{ width: 14, height: 14, borderRadius: '50%', background: c, display: 'inline-block' }} />
);

// Dark "editor" panel that frames the file content
const SkillPanel = ({ children }: { children: React.ReactNode }) => (
  <div className="aw-up" style={{
    animationDelay: '0.16s',
    flex: 1, minHeight: 0, background: '#1a1230',
    border: `1px solid ${p.borderHi}`, borderRadius: 'var(--osd-radius)',
    overflow: 'hidden', display: 'flex', flexDirection: 'column',
    boxShadow: '0 24px 60px rgba(90,50,180,0.18)',
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '18px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.03)',
    }}>
      <Dot c="#ff5f57" /><Dot c="#febc2e" /><Dot c="#28c840" />
      <span style={{ marginLeft: 14, fontFamily: skMono, fontSize: 24, color: '#9d8fc0' }}>SKILL.md</span>
    </div>
    <div style={{ flex: 1, minHeight: 0, padding: '36px 48px', display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

const DocBlock = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
);
// `## heading`
const DocH = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: skMono, fontSize: 30, fontWeight: 700, color: '#7ee0a8' }}>
    <span style={{ color: '#5a4a86' }}>## </span>{children}
  </div>
);
// `# comment`
const DocC = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: skMono, fontSize: 26, color: '#6e5fa0' }}>{children}</div>
);
// value / body line
const DocT = ({ children, indent }: { children: React.ReactNode; indent?: boolean }) => (
  <div style={{ fontFamily: skMono, fontSize: 27, color: '#e8e0f8', lineHeight: 1.5, paddingLeft: indent ? 36 : 0 }}>{children}</div>
);
const Key = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#b9a6ff' }}>{children}</span>
);
// field-table row:  key  →  value
const DocKV = ({ k, v, dense }: { k: string; v: React.ReactNode; dense?: boolean }) => (
  <div style={{ display: 'flex', gap: 18, fontFamily: skMono, fontSize: dense ? 23 : 25, lineHeight: 1.4 }}>
    <span style={{ flexShrink: 0, width: dense ? 150 : 168, color: '#b9a6ff' }}>{k}</span>
    <span style={{ color: '#e8e0f8', minWidth: 0, wordBreak: 'break-all' }}>{v}</span>
  </div>
);

const SkillHeader = ({ tag, color, title }: { tag: string; color: string; title: string }) => (
  <>
    <div className="aw-up" style={{ marginBottom: 16 }}><EyebrowTag color={color}>{tag}</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 60, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.025em',
      margin: '0 0 26px',
    }}>{title}</h2>
  </>
);

const skillFill: React.CSSProperties = { ...fill, display: 'flex', flexDirection: 'column', padding: '80px 120px' };

// Page a — frontmatter + 核心原則
const SkillIntro: Page = () => (
  <div style={skillFill}>
    <Styles />
    <GridBg />
    <SkillHeader tag="把 Skill 打開來看" color={p.rose} title="客服回信.SKILL 裡長這樣" />
    <SkillPanel>
      <Steps>
        <Step><DocC># 給 AI 的 SOP ＋ 判斷心法，打包成一個資料夾</DocC></Step>
        <Step><DocBlock>
          <DocT><Key>name:</Key>{' vintex-cs-draft'}</DocT>
          <DocT><Key>description:</Key>{' 運釀平台客服小幫手。先查 Gmail 找'}</DocT>
          <DocT indent>客服轉寄信 → 到 Notion FAQ 搜尋答案 → 有答案建草稿（含課程連結）、沒答案寄通知給負責人</DocT>
          <DocT indent>當使用者說「幫我回客服信」、「有新的客服問題」、「處理 service 信箱的轉寄信」時，或每次排程自動執行時啟動。</DocT>
          <DocT indent>絕不自行發明回答，也不直接送出信件。</DocT>
        </DocBlock></Step>
        <Step><DocH>核心原則</DocH></Step>
        <Step><DocC># 任務＝找信 → 查答案 → 建草稿或通知，三步驟缺一不可</DocC></Step>
        <Step><DocT><span style={{ color: '#7ee0a8' }}>1.</span> 永遠只建立草稿（create_draft），絕不直接發送信件</DocT></Step>
        <Step><DocT><span style={{ color: '#7ee0a8' }}>2.</span> 只以 Notion FAQ 的「回答」欄位為依據，絕不自行編造</DocT></Step>
      </Steps>
    </SkillPanel>
  </div>
);

// Page b — 步驟一：查 Gmail
const SkillStep1: Page = () => (
  <div style={skillFill}>
    <Styles />
    <GridBg />
    <SkillHeader tag="步驟 1 / 4" color={p.mint} title="查 Gmail 有沒有新客服信" />
    <SkillPanel>
      <Steps>
        <Step><DocBlock>
          <DocH>步驟一　查 Gmail 是否有新客服信</DocH>
          <DocC># 工具：gmail_search_messages　搜尋條件</DocC>
          <DocT indent>from:service@emctaipei.com subject:Fwd:</DocT>
          <DocT indent>排程執行加 newer_than:1h；手動觸發則找近期未處理的信</DocT>
        </DocBlock></Step>
        <Step><DocH>判斷哪些需要處理</DocH></Step>
        <Step><DocT indent>有 <Key>DRAFT</Key> 標籤（已有草稿在等）　→ 跳過</DocT></Step>
        <Step><DocT indent>已有 <Key>SENT</Key> 回覆　　　　　　　→ 跳過</DocT></Step>
        <Step><DocT indent>純行事曆邀請（非客戶問題）　　→ 跳過</DocT></Step>
        <Step><DocC># 沒有需要處理的信件 → 直接結束，不做任何動作</DocC></Step>
      </Steps>
    </SkillPanel>
  </div>
);

// Page c — 步驟二 + 步驟三
const SkillStep23: Page = () => (
  <div style={skillFill}>
    <Styles />
    <GridBg />
    <SkillHeader tag="步驟 2 & 3 / 4" color={p.accentSoft} title="讀信、再到 Notion FAQ 查答案" />
    <SkillPanel>
      <Steps>
        <Step><DocBlock>
          <DocH>步驟二　讀信，理解學員的問題</DocH>
          <DocC># 用 gmail_read_thread 取得完整對話串，找出：</DocC>
          <DocT indent>學員的原始問題、email 地址、原始 thread ID、信件主旨</DocT>
        </DocBlock></Step>
        <Step><DocBlock>
          <DocH>步驟三　到 Notion FAQ 查對應答案</DocH>
          <DocT indent><Key>工具：</Key>notion-search　→ 命中後用 notion-fetch 讀頁面</DocT>
          <DocT indent><Key>資料源：</Key>客服 FAQ 資料庫（collection://3117…cf7e）</DocT>
        </DocBlock></Step>
        <Step><DocBlock>
          <DocC># 確認這兩件事才算數：</DocC>
          <DocT indent>「啟用」欄位 = true，且「回答」欄位真能解學員的問題</DocT>
        </DocBlock></Step>
        <Step><DocBlock>
          <DocT><span style={{ color: p.mint }}>✅ 有答案</span>　明確、啟用中、內容直接適用</DocT>
          <DocT><span style={{ color: p.rose }}>❌ 沒答案</span>　找不到、回答為空、或不夠具體</DocT>
        </DocBlock></Step>
      </Steps>
    </SkillPanel>
  </div>
);

// Page d — 步驟四A：有答案 → 建草稿
const SkillStep4A: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '64px 120px' }}>
    <Styles />
    <GridBg />
    <SkillHeader tag="步驟 4A ｜ 有答案" color={p.mint} title="建立 Gmail 草稿（不直接寄）" />
    <SkillPanel>
      <Steps>
        <Step><DocBlock>
          <DocC># gmail_create_draft 的欄位</DocC>
          <DocKV dense k="to" v="學員的 email（從原始轉寄信取得）" />
          <DocKV dense k="subject" v={'Re: {原始信件主旨}'} />
          <DocKV dense k="threadId" v="原始 thread ID" />
          <DocKV dense k="cc" v="eric.fu@emctaipei.com" />
          <DocKV dense k="contentType" v="text/plain" />
        </DocBlock></Step>
        <Step><DocBlock>
          <DocC># 信件內文格式</DocC>
          <DocT>{'{學員名字或「您」} 你好，'}</DocT>
          <DocT>{'{依 FAQ「回答」欄位，用口語繁中整理的回覆}'}</DocT>
          <DocT>常用課程連結：</DocT>
          <DocT indent>・CPT：vintexercise.com/courses/vintexcpt</DocT>
          <DocT indent>・CSCS：vintexercise.com/courses/5</DocT>
          <DocT indent>・癌症訓練教練：vintexercise.com/courses/cancer</DocT>
          <DocT>如有其他問題，歡迎隨時與我們聯繫！　—　運釀團隊</DocT>
        </DocBlock></Step>
        <Step><DocC># 附課程連結是必要的——給學員明確 CTA，也可能促成報名</DocC></Step>
      </Steps>
    </SkillPanel>
  </div>
);

// Page e — 步驟四B：沒答案 → 通知 + 執行完畢後
const SkillStep4B: Page = () => (
  <div style={skillFill}>
    <Styles />
    <GridBg />
    <SkillHeader tag="步驟 4B ｜ 沒答案" color={p.rose} title="沒有標準答案，就轉人工確認" />
    <SkillPanel>
      <Steps>
        <Step><DocBlock>
          <DocC># 用 gmail_create_draft 建一封通知信</DocC>
          <DocKV k="to" v="yvette.ho@emctaipei.com" />
          <DocKV k="subject" v={'⚠️ 客服信件需人工確認｜{原始問題主旨}'} />
        </DocBlock></Step>
        <Step><DocBlock>
          <DocT indent>Hoho 你好，這封信在 FAQ 找不到對應答案，請協助判斷：</DocT>
          <DocT indent>【學員問題】…　【原始寄件人】學員 email</DocT>
          <DocT indent>【Gmail 連結】mail.google.com/…/{'{threadId}'}</DocT>
        </DocBlock></Step>
        <Step><DocH>執行完畢後</DocH></Step>
        <Step><DocBlock>
          <DocC># 每封信只處理一次，不重複建草稿。完成後告知：</DocC>
          <DocT indent>哪些已建草稿、哪些需人工確認、哪些已跳過（都附原因）</DocT>
        </DocBlock></Step>
      </Steps>
    </SkillPanel>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 20.5 — 金句：AI 就像魔法
// ────────────────────────────────────────────────────────────────────────────
const grad = {
  background: `linear-gradient(90deg, ${p.accent}, ${p.accentSoft})`,
  WebkitBackgroundClip: 'text' as const, backgroundClip: 'text' as const, color: 'transparent',
};

const MagicQuote: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', padding: '120px', gap: 88 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ flexShrink: 0 }}>
      <div style={{
        width: 600, height: 600, borderRadius: 'var(--osd-radius)', overflow: 'hidden',
        border: `1px solid ${p.borderHi}`, boxShadow: '0 24px 60px rgba(90,50,180,0.18)',
        background: p.surface,
      }}>
        <img src={magicImg} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="aw-up" style={{ animationDelay: '0.12s', marginBottom: 28 }}>
        <EyebrowTag>{''}</EyebrowTag>
      </div>
      <h2 className="aw-up" style={{
        animationDelay: '0.2s', fontSize: 76, fontWeight: 900,
        lineHeight: 1.4, letterSpacing: '-0.02em', margin: 0,
      }}>
        AI 就像<span style={grad}>魔法</span>，
        <br />你只要<span style={grad}>想像</span>得到，
        <br />他就會幫你完成。
      </h2>
      <p className="aw-up" style={{ animationDelay: '0.4s', marginTop: 44, fontSize: 30, color: p.muted, lineHeight: 1.6 }}>
        「無法想像的事物，就無法實現」—— 你的想像力，才是真正的天花板。
      </p>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 21.5 — 金句（首頁樣式）：設計工作流越來越值錢
// ────────────────────────────────────────────────────────────────────────────
const FutureValue: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '140px 160px' }}>
    <Styles />
    <img src={coverBgImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
    {/* light overlay so text stays readable */}
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(237,230,239,0.42)', zIndex: 1 }} />
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="aw-up" style={{ marginBottom: 32 }}><EyebrowTag>人類掌舵，AI 執行</EyebrowTag></div>
      <h1 className="aw-up" style={{
        animationDelay: '0.1s',
        fontFamily: font, fontSize: 88, fontWeight: 800,
        lineHeight: 1.3, letterSpacing: '-0.03em', margin: 0,
      }}>
        學怎麼用 AI 工具，半年就過時；
        <br />
        學怎麼<span style={{ color: p.accent }}>設計</span>給 AI 用的工作流，
        <br />
        只會越來越<span style={{ color: p.accent }}>有價值</span>。
      </h1>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 20 — 行動呼籲
// Budget: 47+20+83+36+desc 52+16+chips 76+32+card 140+32+note 91 = 625✓
// ────────────────────────────────────────────────────────────────────────────
const CallToAction: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag>換你開始 ｜ 接下來 1 小時實作</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 28px',
    }}>先挑一件最煩的事，跑一遍</h2>
    <p className="aw-up" style={{
      animationDelay: '0.14s',
      fontSize: 34, color: p.textSoft, margin: '0 0 16px',
    }}>別想著一次把所有流程都自動化，那會把自己搞死。</p>

    <Steps>
      <Step>
        <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
          <div style={{
            background: `${p.mint}22`, border: `1px solid ${p.mint}55`,
            flex: 1, minWidth: 0, borderRadius: 'var(--osd-radius)', padding: '114px 18px',
            fontSize: 34, fontWeight: 700, textAlign: 'center' as const, color: p.mint,
          }}>寫 KOL 邀約信</div>
          <div style={{
            background: `${p.accentSoft}22`, border: `1px solid ${p.accentSoft}55`,
            flex: 1, minWidth: 0, borderRadius: 'var(--osd-radius)', padding: '114px 18px',
            fontSize: 34, fontWeight: 700, textAlign: 'center' as const, color: p.accentSoft,
          }}>紀錄報價</div>
          <div style={{
            background: `${p.amber}22`, border: `1px solid ${p.amber}55`,
            flex: 1, minWidth: 0, borderRadius: 'var(--osd-radius)', padding: '114px 18px',
            fontSize: 34, fontWeight: 700, textAlign: 'center' as const, color: p.amber,
          }}>廣告上線文案檢查</div>
          <div style={{
            background: `${p.rose}22`, border: `1px solid ${p.rose}55`,
            flex: 1, minWidth: 0, borderRadius: 'var(--osd-radius)', padding: '114px 18px',
            fontSize: 34, fontWeight: 700, textAlign: 'center' as const, color: p.rose,
          }}>跨平台文案</div>
          <div style={{
            background: `${p.accent}22`, border: `1px solid ${p.accent}55`,
            flex: 1, minWidth: 0, borderRadius: 'var(--osd-radius)', padding: '114px 18px',
            fontSize: 34, fontWeight: 700, textAlign: 'center' as const, color: p.accent,
          }}>整理客戶需求</div>
        </div>
      </Step>
      <div style={{ flex: 1 }} />
      <Step>
        <div>
          <BottomNote>不求完美、不求全自動，先有一個能省 30% 時間的版本，再慢慢迭代。</BottomNote>
        </div>
      </Step>
    </Steps>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 21 — 結尾金句
// Budget (160px): 760px; gap then big quote 3 lines 110×1.1×3=363+50+sub 44+32+tagline 36 = 525✓
// ────────────────────────────────────────────────────────────────────────────
const Closing: Page = () => (
  <div style={{ ...fill, position: 'relative', overflow: 'hidden' }}>
    <Styles />
    {/* Full-bleed background image */}
    <img src={thankYouImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 25 — 發表順序（部門平均分配抽籤結果，每天 15 人）
// ────────────────────────────────────────────────────────────────────────────
const publishSchedule: { date: string; color: string; groups: { dept: string; names: string[] }[] }[] = [
  {
    date: '7 / 8', color: p.mint,
    groups: [
      { dept: '凱曜專案部', names: ['鄭怡姍', '張書華', '林安芝', '周鈴真', '陳紫庭', '廖翊宏', '謝榕', '蘇煒庭'] },
      { dept: '凱曜設計部', names: ['許芷芸', '李光颿'] },
      { dept: '凱曜企劃部', names: ['朱祖翎'] },
      { dept: '凱曜監測部', names: ['周良峰'] },
      { dept: '承揚口碑行銷部', names: ['章振晏', '陳昱銓'] },
      { dept: '承揚口碑專案部', names: ['吳孟熹'] },
    ],
  },
  {
    date: '7 / 15', color: p.accentSoft,
    groups: [
      { dept: '凱曜專案部', names: ['范若儀', '劉伊庭', '邱彣', '孟承憲', '張心瑋', '吳育儒', '陳雅筠', '吳懷柔'] },
      { dept: '凱曜設計部', names: ['鐘宏揚', '陳家蓁'] },
      { dept: '凱曜企劃部', names: ['羅珮云'] },
      { dept: '凱曜監測部', names: ['張亦忻'] },
      { dept: '承揚口碑行銷部', names: ['張宥勝', '黃羿傑'] },
      { dept: '承揚口碑專案部', names: ['陳映彤'] },
    ],
  },
  {
    date: '7 / 22', color: p.amber,
    groups: [
      { dept: '凱曜專案部', names: ['鄭筱舢', '曹又晨', '莊亞馨', '趙士閎', '林書妤', '鍾柏捷', '張凱銘', '余采馨'] },
      { dept: '凱曜設計部', names: ['陳柏政'] },
      { dept: '凱曜企劃部', names: ['李明庭'] },
      { dept: '凱曜監測部', names: ['簡嘉頡'] },
      { dept: '承揚口碑行銷部', names: ['吳咏蓁', '石崇劭'] },
      { dept: '承揚口碑專案部', names: ['蔡昀庭', '曾秀娟'] },
    ],
  },
  {
    date: '7 / 29', color: p.rose,
    groups: [
      { dept: '凱曜專案部', names: ['曾瀚萱', '張晴', '張鈞皓', '黎子瑄', '石昕宜', '廖家緯', '呂敏綺'] },
      { dept: '凱曜設計部', names: ['田倚菁'] },
      { dept: '凱曜企劃部', names: ['廖秦葦', '吳冠賢'] },
      { dept: '凱曜監測部', names: ['曾唯豪'] },
      { dept: '承揚口碑行銷部', names: ['江柏毅', '陳柏維'] },
      { dept: '承揚口碑專案部', names: ['葉哲維', '黃漢元'] },
    ],
  },
];

const PublishCard = ({ item, delay }: { item: typeof publishSchedule[number]; delay: number }) => {
  const total = item.groups.reduce((n, g) => n + g.names.length, 0);
  return (
    <div className="aw-up" style={{
      animationDelay: `${delay}s`,
      background: p.surface, border: `1px solid ${item.color}40`,
      borderTop: `4px solid ${item.color}`,
      borderRadius: 'var(--osd-radius)', padding: '24px 32px',
      display: 'flex', flexDirection: 'column', gap: 12,
      height: '100%', boxSizing: 'border-box' as const, minHeight: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: item.color, letterSpacing: '0.02em' }}>{item.date}</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: p.muted }}>{total} 人</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {item.groups.map((g) => (
          <div key={g.dept} style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
            <div style={{ flexShrink: 0, width: 130, fontSize: 17, fontWeight: 700, color: p.accentSoft }}>{g.dept}</div>
            <div style={{ fontSize: 19, lineHeight: 1.45, color: p.textSoft }}>{g.names.join('、')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PublishOrder: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '100px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 16 }}><EyebrowTag>My Skills</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 32px',
    }}>發表順序</h2>
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24, minHeight: 0 }}>
      {publishSchedule.map((item, i) => (
        <PublishCard key={item.date} item={item} delay={0.16 + i * 0.1} />
      ))}
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// SLIDE 26 — Skill 範本（給大家照著做）
// ────────────────────────────────────────────────────────────────────────────
const mono = 'ui-monospace, "SF Mono", Menlo, "Cascadia Code", monospace';

type CodeLine = { t: string; k?: 'delim' | 'key' | 'head' | 'bullet' };
const lineColor: Record<string, string> = {
  delim: p.dim, key: p.mint, head: p.accentSoft, bullet: p.textSoft,
};
const CodePanel = ({ label, lines, delay }: { label: string; lines: CodeLine[]; delay: number }) => (
  <div className="aw-up" style={{
    animationDelay: `${delay}s`,
    flex: 1, minWidth: 0, background: p.surfaceHi,
    border: `1px solid ${p.borderHi}`, borderRadius: 'var(--osd-radius)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  }}>
    <div style={{
      padding: '14px 28px', fontSize: 19, fontWeight: 700, color: p.accentSoft,
      letterSpacing: '0.04em', borderBottom: `1px solid ${p.border}`, background: `${p.accent}0c`,
    }}>{label}</div>
    <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {lines.map((l, i) => (
        <div key={i} style={{
          fontFamily: mono, fontSize: 23, lineHeight: 1.5, whiteSpace: 'pre-wrap',
          color: l.k ? lineColor[l.k] : p.textSoft,
          fontWeight: l.k === 'head' || l.k === 'key' ? 700 : 400,
        }}>{l.t || ' '}</div>
      ))}
    </div>
  </div>
);

const skillTemplate: CodeLine[] = [
  { t: '---', k: 'delim' },
  { t: 'name: <英文-kebab-命名>', k: 'key' },
  { t: 'description: <一句話：何時該用>', k: 'key' },
  { t: '---', k: 'delim' },
  { t: '' },
  { t: '## 什麼時候用', k: 'head' },
  { t: '## 步驟（SOP）', k: 'head' },
  { t: '## 判斷標準 / 眉角', k: 'head' },
  { t: '## 常見錯誤（踩過的坑）', k: 'head' },
  { t: '## 範例（input → output）', k: 'head' },
];

const geminiPrompt: CodeLine[] = [
  { t: '我要把「<某項工作>」整理成' },
  { t: '一份 SKILL.md 範本。' },
  { t: '' },
  { t: '請你問我問題，幫我補齊：' },
  { t: '· 什麼時候用', k: 'bullet' },
  { t: '· 步驟 SOP', k: 'bullet' },
  { t: '· 判斷標準 / 眉角', k: 'bullet' },
  { t: '· 常見錯誤', k: 'bullet' },
  { t: '· 範例 input → output', k: 'bullet' },
  { t: '' },
  { t: '我先說做法，你邊問邊補，' },
  { t: '最後輸出完整 markdown。' },
];

const SkillTemplate: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '100px 120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 16 }}><EyebrowTag>動手做</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 8px',
    }}>Skill 範本</h2>
    <div className="aw-up" style={{ animationDelay: '0.12s', fontSize: 28, color: p.muted, marginBottom: 32 }}>
      用 Gemini 起草 → 貼進 <span style={{ fontFamily: mono, color: p.accentSoft }}>SKILL.md</span> → 開 PR 提交
    </div>
    <div style={{ flex: 1, display: 'flex', gap: 32, minHeight: 0 }}>
      <CodePanel label="① 貼進 Gemini 的起草指令" lines={geminiPrompt} delay={0.18} />
      <CodePanel label="② 產出的 SKILL.md 結構" lines={skillTemplate} delay={0.28} />
    </div>
  </div>
);

// ── Transitions ───────────────────────────────────────────────────────────────
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN  = 'cubic-bezier(0.4, 0, 1, 1)';

// House transition — quiet RISE
export const transition: SlideTransition = {
  duration: 200,
  exit:  { duration: 140, easing: EASE_IN,
           keyframes: [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-4px)' }] },
  enter: { duration: 200, delay: 80, easing: EASE_OUT,
           keyframes: [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }] },
};

// BREATH on chapter slides
const breath: SlideTransition = {
  duration: 460,
  exit:  { duration: 180, easing: EASE_IN,
           keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 240, delay: 280, easing: EASE_OUT,
           keyframes: [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }] },
};

Cover.transition          = breath;
Part1Chapter.transition   = breath;
Part2Chapter.transition   = breath;
CaseStudyChapter.transition = breath;
Closing.transition        = breath;

// ── Meta & Export ─────────────────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: '人類掌舵，AI 執行',
  createdAt: '2026-06-25T18:48:17.468Z',
};

// ────────────────────────────────────────────────────────────────────────────
// 最後一頁 — 檔案上傳處（QR）
// ────────────────────────────────────────────────────────────────────────────
const UploadHere: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', padding: '120px', gap: 0 }}>
    <Styles />
    <GridBg />
    <div className="aw-up" style={{ marginBottom: 20 }}><EyebrowTag color={p.rose}>動手做做看</EyebrowTag></div>
    <h2 className="aw-up" style={{
      animationDelay: '0.08s',
      fontSize: 72, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em',
      margin: '0 0 48px',
    }}>檔案上傳處</h2>
    <div style={{ flex: 1, display: 'flex', gap: 72, minHeight: 0, alignItems: 'center' }}>
      <div className="aw-up" style={{
        animationDelay: '0.14s', flexShrink: 0,
        background: '#fff', border: `1px solid ${p.border}`,
        borderRadius: 'var(--osd-radius)', padding: 36,
        boxShadow: '0 24px 60px rgba(90,50,180,0.18)',
      }}>
        <img src={qrImg} style={{ width: 420, height: 420, display: 'block', imageRendering: 'pixelated' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Steps>
          <Step><BulletRow n={1} body="下載範例的資料夾" /></Step>
          <Step><BulletRow n={2} body="打開 md 檔，複製裡面的文字" delay={0.05} /></Step>
          <Step><BulletRow n={3} body="開始製作你的 SKILL" delay={0.1} /></Step>
          <Step><BulletRow n={4} body="開一個資料夾，上傳你的 SKILL" delay={0.15} /></Step>
        </Steps>
      </div>
    </div>
  </div>
);

export default [
  Cover,
  SciencePop,
  PainPoints,
  CleaningMetaphor,
  MegaAgent,
  Decompose,
  Part1Chapter,
  HumanSOP,
  SkillPage,
  AgenticWorkflowPage,
  ComparisonTable,
  WorkflowReality,
  Part2Chapter,
  Step1,
  Step2,
  Step3,
  Step4,
  WorkflowReality,
  MyWorkflows,
  CaseStudyChapter,
  CaseStudyFourSteps,
  CaseStudyFlow,
  SkillIntro,
  SkillStep1,
  SkillStep23,
  SkillStep4A,
  SkillStep4B,
  FutureValue,
  MagicQuote,
  Closing,
  CallToAction,
  SkillTemplate,
  PublishOrder,
  UploadHere,
] satisfies Page[];
