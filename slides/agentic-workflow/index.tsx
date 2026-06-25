import React from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Steps, Step } from '@open-slide/core';
import coverBgImg from './assets/cover-bg.png';
import thankYouImg from './assets/thank-you.png';
import magicImg from './assets/magic-imagination.png';

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
  "「無法想像的事物，就無法實現」—— 你的想像力，才是真正的天花板。",
  undefined,
  undefined,
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
    }}>先搞懂：AI Agent 跟 LLM 差在哪？</h2>
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
        <Step><BulletRow n={3} body="例：SOP 寫「請款後送主管簽核」。人會自己判斷——200 元小金額直接跑完；超過 5,000 元先知會主管。" delay={0.2} /></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 32 }}>
          <BottomNote>對 AI 來說這只是非結構化文字——你沒講明，它不會知道 200 跟 5,000 的差別。</BottomNote>
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
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>用 Markdown 把 Parameters / Steps / Error Handling 分區塊。人看得懂，也方便接上工具。</div>
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
            <div style={{ fontSize: 36, fontWeight: 700 }}>用 artifact 串接</div>
            <div style={{ fontSize: 28, lineHeight: 1.65, color: p.textSoft }}>上一棒的 output，就是下一棒的 input（通常是一份 JSON）。</div>
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
    }}>漂亮的 SOP 接不到真實資料，就只是一份不會動的文件</h2>
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
    }}>他會自己判別要用哪一個工作流</p>

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
    }}>把「結案報告」<br />變成一條 AI 工作流</h2>

    <p className="aw-up" style={{
      animationDelay: '0.18s',
      fontSize: 32, color: p.textSoft, margin: '0 0 40px',
    }}>每個案子跑完，你都要做這些：</p>

    <div style={{ display: 'flex', gap: 24 }}>
      <Steps>
        <Step><div style={{ flex: 1, background: `${p.mint}18`, border: `1px solid ${p.mint}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.mint, textAlign: 'center' as const }}>撈整期數據</div></Step>
        <Step><div style={{ flex: 1, background: `${p.accentSoft}18`, border: `1px solid ${p.accentSoft}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.accentSoft, textAlign: 'center' as const }}>算 KPI 達成率</div></Step>
        <Step><div style={{ flex: 1, background: `${p.amber}18`, border: `1px solid ${p.amber}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.amber, textAlign: 'center' as const }}>寫亮點與檢討</div></Step>
        <Step><div style={{ flex: 1, background: `${p.rose}18`, border: `1px solid ${p.rose}40`, borderRadius: 'var(--osd-radius)', padding: '24px 28px', fontSize: 30, fontWeight: 700, color: p.rose, textAlign: 'center' as const }}>套客戶簡報模板</div></Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div style={{ marginTop: 40, fontSize: 26, color: p.muted }}>不複雜，但很煩、很重複，而且每個案子都要做一次 → 最適合交給 AI。</div>
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
    }}>結案報告：四步走一遍</h2>

    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24, minHeight: 0 }}>
      <Steps>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.mint}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.mint, letterSpacing: '0.08em' }}>01 標準化</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>寫一份 SOP。MUST 撈齊全期數據、算達成率；SHOULD 標出亮點；MUST 套模板。</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.accentSoft}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.accentSoft, letterSpacing: '0.08em' }}>02 拆解</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>拆成兩個 skill：① 數據彙整（撈數據→算 KPI→輸出 JSON）② 報告草稿（吃 JSON→寫初稿）。靠 JSON 串接。</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.amber}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.amber, letterSpacing: '0.08em' }}>03 雙向開發</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>跑第一版發現它把「曝光」當「觸及」。回頭補規則、再跑，三五輪就穩。</div>
          </div>
        </Step>
        <Step>
          <div style={{
            background: p.surface, border: `1px solid ${p.rose}40`,
            borderRadius: 'var(--osd-radius)', padding: '32px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, height: '100%', boxSizing: 'border-box' as const,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: p.rose, letterSpacing: '0.08em' }}>04 整合</div>
            <div style={{ fontSize: 27, lineHeight: 1.6, color: p.textSoft }}>接數據源自動產初稿；故事線設成 human-in-the-loop，由你潤飾、拍板。</div>
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
          <FlowBox label="撈數據" color={p.mint} />
          <Arrow />
          <FlowBox label="算 KPI" color={p.accentSoft} />
          <Arrow />
          <FlowBox label="寫初稿" color={p.accent} />
          <Arrow />
          <FlowBox label="套模板" color={p.amber} />
          <Arrow />
          <div style={{
            flex: 1, background: `${p.rose}18`,
            border: `2px solid ${p.rose}80`,
            borderRadius: 'var(--osd-radius)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '28px 16px',
            fontSize: 30, fontWeight: 800, color: p.rose, textAlign: 'center' as const,
          }}>你潤飾<br />拍板 ✓</div>
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
            <div style={{ fontSize: 30, color: p.muted }}>原本大半天</div>
            <div style={{ fontSize: 72, fontWeight: 900, color: p.mint, lineHeight: 1 }}>30 分鐘</div>
            <div style={{ fontSize: 28, color: p.textSoft }}>AI 跑完初稿，你只要潤飾。</div>
          </div>
          <div style={{
            flex: 1, background: p.surface,
            border: `1px solid ${p.accentSoft}40`,
            borderRadius: 'var(--osd-radius)', padding: '36px 44px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16,
          }}>
            <div style={{ fontSize: 30, color: p.muted }}>出錯也好修</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: p.accentSoft, lineHeight: 1.3 }}>定位到哪一段<br />壞了</div>
            <div style={{ fontSize: 28, color: p.textSoft }}>不用整份重來。</div>
          </div>
        </div>
      </Step>
      <Step>
        <div style={{ marginTop: 28 }}>
          <BottomNote>分工明確，每個節點各司其職，也各自可以優化。</BottomNote>
        </div>
      </Step>
    </Steps>
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
        <EyebrowTag>換個角度想</EyebrowTag>
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
  Part2Chapter,
  Step1,
  Step2,
  Step3,
  Step4,
  MyWorkflows,
  CaseStudyChapter,
  CaseStudyFourSteps,
  CaseStudyFlow,
  FutureValue,
  MagicQuote,
  Closing,
  CallToAction,
] satisfies Page[];
