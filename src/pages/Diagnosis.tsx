import { useLocation, useNavigate } from "react-router-dom";

import type { Diagnosis } from "../types/diagnosis";

function DiagnosisPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const diagnosis = location.state?.diagnosis as Diagnosis | undefined;

  if (!diagnosis) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d12] px-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-semibold">
            Nenhum diagnóstico encontrado.
          </h1>

          <button
            type="button"
            onClick={() => navigate("/simulacao")}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Começar uma simulação
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d12] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        {/* Cabeçalho */}
        <div className="mb-10 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-white">
            planej<span className="text-violet-400">.ai</span>
          </span>

          <span className="text-sm text-zinc-400">Seu diagnóstico</span>
        </div>

        {/* Conteúdo principal */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10 lg:p-14">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Análise concluída
            </span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Seu diagnóstico financeiro
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Uma análise personalizada com base nas informações da sua
              simulação.
            </p>
          </div>

          {/* Diagnóstico */}
          <section className="mt-10 rounded-2xl border border-violet-100 bg-violet-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-violet-700">Diagnóstico</h2>

            <p className="mt-4 text-base leading-8 text-slate-700">
              {diagnosis.diagnostico}
            </p>
          </section>

          {/* Pontos positivos */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">
              Pontos positivos
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {diagnosis.pontosPositivos.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pontos de atenção */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Pontos de atenção
            </h2>

            <div className="mt-4 space-y-3">
              {diagnosis.pontosAtencao.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-violet-600">◆</span>

                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recomendações */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">Recomendações</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {diagnosis.recomendacoes.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-4">
                    <span className="text-lg font-bold text-violet-600">
                      0{index + 1}
                    </span>

                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Próximos passos */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">
              Próximos passos
            </h2>

            <div className="mt-4 space-y-4">
              {diagnosis.proximosPassos.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Nova simulação */}
          <div className="mt-12 flex justify-center border-t border-slate-200 pt-8">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-700"
            >
              Fazer uma nova simulação
              <span className="ml-2">▸</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-zinc-500">
          Este diagnóstico possui caráter educativo e informativo e não
          substitui orientação financeira profissional.
        </p>
      </section>
    </main>
  );
}

export default DiagnosisPage;
