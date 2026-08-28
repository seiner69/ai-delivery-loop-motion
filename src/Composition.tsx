import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";

type Scene = {
  id: string;
  start: number;
  duration: number;
  title: string;
  accent: string;
  caption: string;
};

const scenes: Scene[] = [
  {
    id: "illusion",
    start: 0,
    duration: 180,
    title: "别只会提问",
    accent: "会问不等于会创造",
    caption: "AI时代最危险的幻觉，是以为会提问就等于会创造。",
  },
  {
    id: "deliverable",
    start: 180,
    duration: 180,
    title: "模糊需求",
    accent: "必须变成可交付",
    caption: "真正的价值，在你能不能把模糊需求拆成可交付结果。",
  },
  {
    id: "output",
    start: 360,
    duration: 180,
    title: "客户要的",
    accent: "是确定输出",
    caption: "客户要的从来不是过程，而是一个能解决问题的确定输出。",
  },
  {
    id: "chain",
    start: 540,
    duration: 180,
    title: "别炫技",
    accent: "练闭环",
    caption: "你要练的是需求澄清、任务拆解、结果验收。",
  },
  {
    id: "loop",
    start: 720,
    duration: 180,
    title: "机会",
    accent: "属于闭环稳定的人",
    caption: "谁能把这个闭环跑得更稳，谁就能在AI时代拿走真正的机会。",
  },
];

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const palette = {
  bg: "#080c0e",
  paper: "#f2ecda",
  muted: "#7d8794",
  cyan: "#39e2d2",
  amber: "#dfb45b",
  red: "#e14f49",
  line: "#2a3034",
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const useSceneProgress = (scene: Scene) => {
  const frame = useCurrentFrame();
  const local = frame - scene.start;
  const visible = local >= 0 && local < scene.duration;
  const progress = interpolate(local, [0, scene.duration], [0, 1], clamp);
  const enter = interpolate(local, [0, 28], [0, 1], {...clamp, easing: ease});
  const exit = interpolate(local, [scene.duration - 24, scene.duration], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  return {frame, local, visible, progress, enter, exit, opacity: enter * exit};
};

const Background = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 900], [0, -90], clamp);
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg, overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 8px)",
          transform: `translateY(${drift}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(57,226,210,0.08), transparent 38%), radial-gradient(circle at 70% 72%, rgba(223,180,91,0.07), transparent 36%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 64,
          border: "1px solid rgba(242,236,218,0.12)",
        }}
      />
    </AbsoluteFill>
  );
};

const Header = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const y = interpolate(local, [0, 24], [-24, 0], {...clamp, easing: ease});
  return (
    <div
      style={{
        position: "absolute",
        top: 92,
        left: 72,
        right: 72,
        display: "flex",
        justifyContent: "space-between",
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: "Microsoft YaHei, sans-serif",
        fontSize: 28,
        letterSpacing: 0,
      }}
    >
      <div style={{color: palette.cyan, fontWeight: 700}}>AI / SYSTEM</div>
      <div style={{color: palette.muted}}>Remotion POC</div>
    </div>
  );
};

const TitleBlock = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const y = interpolate(local, [6, 34], [55, 0], {...clamp, easing: ease});
  return (
    <div
      style={{
        position: "absolute",
        top: 220,
        left: 72,
        right: 72,
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: "Microsoft YaHei, sans-serif",
      }}
    >
      <div style={{fontSize: 78, color: palette.paper, fontWeight: 900}}>
        {scene.title}
      </div>
      <div style={{fontSize: 54, color: palette.amber, fontWeight: 900, marginTop: 14}}>
        {scene.accent}
      </div>
      <div
        style={{
          height: 8,
          width: interpolate(local, [20, 54], [0, 460], {...clamp, easing: ease}),
          backgroundColor: palette.cyan,
          marginTop: 28,
        }}
      />
    </div>
  );
};

const Caption = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const y = interpolate(local, [20, 48], [26, 0], {...clamp, easing: ease});
  return (
    <div
      style={{
        position: "absolute",
        left: 92,
        right: 92,
        bottom: 220,
        color: palette.paper,
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: "Microsoft YaHei, sans-serif",
        fontSize: 54,
        fontWeight: 800,
        lineHeight: 1.28,
        textAlign: "center",
        textShadow: "0 4px 18px rgba(0,0,0,0.95)",
        WebkitTextStroke: "2px rgba(0,0,0,0.65)",
      }}
    >
      {scene.caption}
    </div>
  );
};

const IllusionGraphic = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const cardGlow = interpolate(local, [40, 150], [1, 0.25], clamp);
  const table = interpolate(local, [45, 150], [0.15, 1], clamp);
  const person = spring({frame: Math.max(0, local - 18), fps: 30, config: {damping: 18}});
  return (
    <div style={{position: "absolute", inset: 0, opacity}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g transform={`translate(${interpolate(person, [0, 1], [-30, 0])}, 0)`}>
          <circle cx="360" cy="1030" r="62" fill="none" stroke={palette.paper} strokeWidth="10" />
          <path d="M360 1095 L360 1300 M360 1168 L270 1260 M360 1168 L465 1240 M360 1300 L292 1450 M360 1300 L460 1440" fill="none" stroke={palette.paper} strokeWidth="10" strokeLinecap="round" />
        </g>
        <g opacity={cardGlow}>
          <rect x="585" y="825" width="230" height="310" rx="20" fill="rgba(57,226,210,0.15)" stroke={palette.cyan} strokeWidth="9" />
          <path d="M625 920 H775 M625 980 H745 M625 1040 H765" stroke={palette.cyan} strokeWidth="8" opacity="0.25" />
        </g>
        <g opacity={table}>
          <path d="M560 1215 H920 M610 1215 L560 1395 M860 1215 L935 1395" stroke={palette.amber} strokeWidth="8" opacity="0.75" />
          <path d="M650 1270 H745 M780 1270 H905" stroke={palette.paper} strokeWidth="5" opacity="0.55" />
        </g>
      </svg>
    </div>
  );
};

const DeliverableGraphic = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const shrink = interpolate(local, [20, 150], [1.15, 0.38], {...clamp, easing: ease});
  const y = interpolate(local, [20, 150], [0, 185], {...clamp, easing: ease});
  const boxPulse = interpolate(local, [70, 150], [0.2, 1], clamp);
  return (
    <div style={{position: "absolute", inset: 0, opacity}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g transform={`translate(540 ${760 + y}) scale(${shrink})`}>
          {Array.from({length: 42}).map((_, i) => {
            const angle = (i / 42) * Math.PI * 2;
            const rx = 280 + (i % 5) * 18;
            const ry = 130 + (i % 7) * 10;
            const x = Math.cos(angle) * rx;
            const y2 = Math.sin(angle) * ry;
            return (
              <rect
                key={i}
                x={x}
                y={y2}
                width={42}
                height={26}
                transform={`rotate(${i * 17} ${x} ${y2})`}
                fill={i % 3 === 0 ? palette.amber : palette.paper}
                opacity={0.55}
              />
            );
          })}
        </g>
        <g transform="translate(0 35)">
          <path d="M365 1195 L540 1110 L715 1195 L540 1290 Z" fill="rgba(57,226,210,0.09)" stroke={palette.cyan} strokeWidth="8" />
          <path d="M365 1195 L365 1375 L540 1475 L540 1290 Z" fill="rgba(242,236,218,0.08)" stroke={palette.paper} strokeWidth="7" />
          <path d="M715 1195 L715 1375 L540 1475 L540 1290 Z" fill="rgba(223,180,91,0.12)" stroke={palette.amber} strokeWidth="7" />
          <circle cx="540" cy="1178" r={28 + boxPulse * 16} fill="none" stroke={palette.cyan} strokeWidth="6" opacity={0.75 - boxPulse * 0.35} />
        </g>
      </svg>
    </div>
  );
};

const OutputGraphic = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const bridge = interpolate(local, [40, 135], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: "absolute", inset: 0, opacity}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <path d="M190 1330 L352 1010" stroke={palette.paper} strokeWidth="10" opacity="0.55" />
        <path d="M815 935 L940 670" stroke={palette.paper} strokeWidth="10" opacity="0.55" />
        <path d="M250 1050 L830 780" stroke={palette.amber} strokeWidth="34" strokeLinecap="round" strokeDasharray="650" strokeDashoffset={650 * (1 - bridge)} />
        <path d="M290 1085 L795 850" stroke={palette.paper} strokeWidth="5" strokeDasharray="18 18" opacity="0.75" />
        <circle cx="872" cy="760" r="22" fill={palette.red} />
        <circle cx="270" cy="1320" r="54" fill="none" stroke={palette.paper} strokeWidth="9" />
        <path d="M270 1375 L270 1510 M270 1420 L180 1490 M270 1420 L382 1490" stroke={palette.paper} strokeWidth="9" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const ChainGraphic = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const pulse = interpolate(local, [25, 155], [0, 1], clamp);
  const xs = [230, 435, 640, 845];
  return (
    <div style={{position: "absolute", inset: 0, opacity}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <path d={`M${xs[0]} 1040 H${xs[3]}`} stroke={palette.line} strokeWidth="10" />
        <path d={`M${xs[0]} 1040 H${xs[0] + (xs[3] - xs[0]) * pulse}`} stroke={palette.cyan} strokeWidth="10" strokeLinecap="round" />
        {xs.map((x, i) => (
          <g key={x} transform={`translate(${x} 1040)`}>
            <rect x="-58" y="-58" width="116" height="116" rx="16" fill="rgba(242,236,218,0.06)" stroke={i / 3 <= pulse ? palette.cyan : palette.paper} strokeWidth="7" />
            {i === 0 && <circle cx="0" cy="0" r="28" fill="none" stroke={palette.paper} strokeWidth="7" />}
            {i === 1 && <path d="M-30 -22 H30 M-30 0 H30 M-30 22 H30" stroke={palette.paper} strokeWidth="7" />}
            {i === 2 && <path d="M-30 25 L0 -30 L30 25 Z" fill="none" stroke={palette.paper} strokeWidth="7" />}
            {i === 3 && <circle cx="0" cy="0" r="32" fill="none" stroke={palette.amber} strokeWidth="7" />}
          </g>
        ))}
      </svg>
    </div>
  );
};

const LoopGraphic = ({scene}: {scene: Scene}) => {
  const {opacity, local} = useSceneProgress(scene);
  const rot = interpolate(local, [20, 160], [-18, 42], clamp);
  const path = interpolate(local, [60, 155], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: "absolute", inset: 0, opacity}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <g transform={`translate(540 1020) rotate(${rot})`}>
          <circle cx="0" cy="0" r="210" fill="none" stroke={palette.amber} strokeWidth="38" strokeDasharray="980 260" strokeLinecap="round" />
          <circle cx="0" cy="0" r="128" fill="none" stroke={palette.paper} strokeWidth="8" opacity="0.7" />
        </g>
        <path d="M550 1160 C650 1040, 760 930, 895 800" fill="none" stroke={palette.cyan} strokeWidth="22" strokeLinecap="round" strokeDasharray="520" strokeDashoffset={520 * (1 - path)} />
        <circle cx="330" cy="1278" r="44" fill="none" stroke={palette.paper} strokeWidth="9" />
        <path d="M330 1323 L330 1450 M330 1375 L250 1450 M330 1375 L430 1435" stroke={palette.paper} strokeWidth="9" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const SceneGraphic = ({scene}: {scene: Scene}) => {
  if (scene.id === "illusion") return <IllusionGraphic scene={scene} />;
  if (scene.id === "deliverable") return <DeliverableGraphic scene={scene} />;
  if (scene.id === "output") return <OutputGraphic scene={scene} />;
  if (scene.id === "chain") return <ChainGraphic scene={scene} />;
  return <LoopGraphic scene={scene} />;
};

export const MyComposition = () => {
  return (
    <AbsoluteFill>
      <Background />
      {scenes.map((scene) => (
        <div key={scene.id}>
          <SceneGraphic scene={scene} />
          <Header scene={scene} />
          <TitleBlock scene={scene} />
          <Caption scene={scene} />
        </div>
      ))}
    </AbsoluteFill>
  );
};
