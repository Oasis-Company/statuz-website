import { useState } from 'react';

interface Q {
  id: string;
  question: string;
  choices: { id: string; label: string; weights: Record<string, number> }[];
}

const QUESTIONS: Q[] = [
  {
    id: 'q1',
    question: 'How do you prefer to read a decision record?',
    choices: [
      { id: 'a', label: 'As a signed, linear narrative.', weights: { linear: 2, compact: 0, mono: 0 } },
      { id: 'b', label: 'As a dense, scannable matrix.', weights: { linear: 0, compact: 2, mono: 0 } },
      { id: 'c', label: 'As a terminal log with timestamps.', weights: { linear: 0, compact: 0, mono: 2 } },
    ],
  },
  {
    id: 'q2',
    question: 'Which failure mode worries you most today?',
    choices: [
      {
        id: 'a',
        label: 'Silent misalignment with human intent.',
        weights: { linear: 2, compact: 1, mono: 1 },
      },
      {
        id: 'b',
        label: 'Declared calibration drifting away from observed behavior.',
        weights: { linear: 0, compact: 2, mono: 1 },
      },
      {
        id: 'c',
        label: 'Tool bleed across envelope boundaries.',
        weights: { linear: 0, compact: 1, mono: 2 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'Pick a contract surface.',
    choices: [
      { id: 'a', label: 'Editorial lines · generous whitespace.', weights: { linear: 2, compact: 0, mono: 0 } },
      { id: 'b', label: 'Signal-dense tables · minimal chrome.', weights: { linear: 0, compact: 2, mono: 0 } },
      { id: 'c', label: 'Monospace · protocol-first.', weights: { linear: 0, compact: 0, mono: 2 } },
    ],
  },
];

const THEME_LABEL: Record<string, string> = {
  linear: 'Linear Continuity',
  compact: 'Compact Signal',
  mono: 'Mono Protocol',
};

const THEME_SUMMARY: Record<string, string> = {
  linear:
    'Editorial lines, generous whitespace, a clear reading cadence. Optimized for an audience that reads, not scans.',
  compact:
    'Dense matrices, small chrome, rich grids. Optimized for an audience that wants signal density.',
  mono:
    'Terminal-first, monospaced throughout. Every line is text you could paste into a log and still read.',
};

export default function CalibrationQuizSection() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (qid: string, cid: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: cid }));
  };

  const scored = () => {
    const s = { linear: 0, compact: 0, mono: 0 };
    for (const q of QUESTIONS) {
      const c = q.choices.find((cc) => cc.id === answers[q.id]);
      if (!c) continue;
      for (const k of Object.keys(c.weights)) {
        s[k as keyof typeof s] += c.weights[k];
      }
    }
    return Object.entries(s).sort((a, b) => b[1] - a[1]) as [keyof typeof s, number][];
  };

  const leaderboard = scored();
  const winner = leaderboard[0]?.[0] ?? 'linear';
  const progress = Object.keys(answers).length / QUESTIONS.length;

  return (
    <section className="border-b hairline">
      <div className="mx-auto px-4 py-24" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="label">Calibration Quiz</div>
            <h2 className="mt-4 font-display font-medium text-[2rem] sm:text-[2.3rem] leading-tight text-ink">
              Three questions · your visual contract.
            </h2>
            <p className="mt-4 text-ink-60 text-base leading-relaxed">
              The quiz is deterministic: your answers weight three candidate themes, and the top theme
              becomes your default. Change your mind, re-submit — the history stays.
            </p>

            <div className="mt-10 border hairline rounded-sm p-5 bg-white">
              <div className="flex items-baseline justify-between">
                <span className="label">progress</span>
                <span className="label">{Math.round(progress * 100)}%</span>
              </div>
              <div className="mt-3 h-[3px] bg-ink-10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ink transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 space-y-4">
            {QUESTIONS.map((q, qi) => (
              <div key={q.id} className="border hairline rounded-sm bg-white overflow-hidden">
                <div className="px-6 py-3 border-b hairline bg-ink-05 flex items-baseline justify-between">
                  <span className="label">question {String(qi + 1).padStart(2, '0')} / {QUESTIONS.length}</span>
                  <span className="label">{q.id}</span>
                </div>
                <div className="px-6 py-5">
                  <div className="font-display text-xl text-ink leading-snug">{q.question}</div>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {q.choices.map((c) => {
                      const active = answers[q.id] === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => set(q.id, c.id)}
                          className={`text-left rounded-sm border hairline px-5 py-4 transition-colors ${
                            active ? 'border-ink bg-ink text-white' : 'border-ink-20 hover:border-ink bg-white text-ink'
                          }`}
                        >
                          <span className="mono text-[0.78rem] opacity-60 mr-3">{c.id}.</span>
                          <span className="text-[0.98rem]">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="text-[0.75rem] mono text-ink-60 hover:text-ink border hairline rounded-sm px-4 py-2"
              >
                clear
              </button>
              <button
                disabled={Object.keys(answers).length < QUESTIONS.length}
                onClick={() => setSubmitted(true)}
                className="text-[0.75rem] mono text-white bg-ink hover:bg-ink-80 disabled:bg-ink-40 rounded-sm px-5 py-2"
              >
                {submitted ? 're-issue contract' : 'issue visual contract'}
              </button>
            </div>

            {submitted && Object.keys(answers).length === QUESTIONS.length && (
              <div className="mt-4 border hairline border-ink rounded-sm bg-white p-7">
                <div className="label">issued contract</div>
                <div className="mt-4 font-display text-[2.1rem] leading-tight text-ink">
                  {THEME_LABEL[winner]}
                </div>
                <p className="mt-3 text-ink-60 text-[1rem] leading-relaxed max-w-3xl">
                  {THEME_SUMMARY[winner]}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 mono text-[0.78rem]">
                  {leaderboard.map(([k, score]) => (
                    <div
                      key={k}
                      className={`px-4 py-3 border hairline rounded-sm ${
                        k === winner ? 'bg-ink text-white' : 'bg-white text-ink-60'
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <span>{k}</span>
                        <span>{score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
