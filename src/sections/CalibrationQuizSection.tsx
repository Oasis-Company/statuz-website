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
    question: 'Which failure mode keeps you up at night?',
    choices: [
      { id: 'a', label: 'Silent misalignment with human intent.', weights: { linear: 2, compact: 1, mono: 1 } },
      { id: 'b', label: 'Calibration drift compounding over episodes.', weights: { linear: 0, compact: 2, mono: 1 } },
      { id: 'c', label: 'Tool bleed across envelope boundaries.', weights: { linear: 0, compact: 1, mono: 2 } },
    ],
  },
  {
    id: 'q3',
    question: 'Pick a contract surface.',
    choices: [
      { id: 'a', label: 'Editorial lines + white space.', weights: { linear: 2, compact: 0, mono: 0 } },
      { id: 'b', label: 'Signal-dense tables, minimal chrome.', weights: { linear: 0, compact: 2, mono: 0 } },
      { id: 'c', label: 'Monospace, protocol-first.', weights: { linear: 0, compact: 0, mono: 2 } },
    ],
  },
];

const THEMES: Record<string, { label: string; summary: string }> = {
  linear: { label: 'Linear Continuity', summary: 'Editorial lines, generous whitespace, and a clear reading cadence.' },
  compact: { label: 'Compact Signal', summary: 'High information density, tables first, minimal chrome.' },
  mono: { label: 'Mono Protocol', summary: 'Monospace terminal first. Every line is auditable text.' },
};

export default function CalibrationQuizSection() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (qid: string, cid: string) => {
    setAnswers(prev => ({ ...prev, [qid]: cid }));
  };

  const result = () => {
    const scores = { linear: 0, compact: 0, mono: 0 };
    for (const q of QUESTIONS) {
      const cid = answers[q.id];
      const c = q.choices.find(cc => cc.id === cid);
      if (!c) continue;
      for (const k of Object.keys(c.weights)) {
        scores[k as keyof typeof scores] += c.weights[k];
      }
    }
    const entries = Object.entries(scores) as [keyof typeof scores, number][];
    entries.sort((a, b) => b[1] - a[1]);
    return entries;
  };

  const leaderboard = result();
  const winner = leaderboard[0]?.[0] ?? 'linear';
  const progress = Object.keys(answers).length / QUESTIONS.length;

  return (
    <section className="py-16 border-b border-zinc-200">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            Calibration Quiz
          </div>
          <h2 className="font-display text-3xl text-zinc-950 mt-4 leading-tight">
            Answer three questions — we issue your visual contract.
          </h2>
          <p className="mt-4 text-zinc-600 text-sm max-w-prose">
            The quiz is lightweight and deterministic: your answers weight three candidate themes,
            and the top theme becomes your default. Change your mind, re-submit, the history stays.
          </p>

          <div className="mt-6 border border-zinc-200 rounded-sm p-4 bg-white">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              <span>progress</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 space-y-4">
          {QUESTIONS.map((q, qi) => (
            <div key={q.id} className="border border-zinc-200 rounded-sm bg-white overflow-hidden">
              <div className="px-5 py-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  question {qi + 1} / {QUESTIONS.length}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">{q.id}</span>
              </div>
              <div className="px-5 py-4">
                <div className="font-display text-lg text-zinc-900">{q.question}</div>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  {q.choices.map(c => {
                    const active = answers[q.id] === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => set(q.id, c.id)}
                        className={`text-left rounded-xs border px-4 py-3 transition-colors ${
                          active
                            ? 'border-zinc-900 bg-zinc-50'
                            : 'border-zinc-200 hover:border-zinc-400 bg-white'
                        }`}
                      >
                        <span className="font-mono text-xs text-zinc-500 mr-3">{c.id}.</span>
                        <span className="text-sm text-zinc-800">{c.label}</span>
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
              className="text-xs font-mono text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-400 rounded-xs px-3 py-2"
            >
              clear
            </button>
            <button
              disabled={Object.keys(answers).length < QUESTIONS.length}
              onClick={() => setSubmitted(true)}
              className="text-xs font-mono text-white bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-300 rounded-xs px-4 py-2"
            >
              {submitted ? 're-issue contract' : 'issue visual contract'}
            </button>
          </div>

          {submitted && Object.keys(answers).length === QUESTIONS.length && (
            <div className="mt-4 border border-zinc-900 rounded-sm bg-white p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                issued contract
              </div>
              <div className="font-display text-2xl text-zinc-950 mt-2">
                {THEMES[winner].label}
              </div>
              <p className="text-sm text-zinc-600 mt-2">{THEMES[winner].summary}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-mono">
                {leaderboard.map(([key, score]) => (
                  <div
                    key={key}
                    className={`px-3 py-2 rounded-xs border ${
                      key === winner ? 'border-zinc-900 bg-zinc-50 text-zinc-900' : 'border-zinc-200 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{key}</span>
                      <span>{score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
