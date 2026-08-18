import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { SimulationData } from "../types/simulation";
import { generateDiagnosis } from "../services/gemini";

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const simulation = location.state as SimulationData | null;

  if (!simulation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d12] px-6">
        <div className="text-center text-white">
          <h1 className="text-2xl font-semibold">
            Nenhuma simulação encontrada.
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

  const currentSimulation: SimulationData = simulation;

  async function handleGenerateDiagnosis() {
    if (isGenerating) return;

    setError("");
    setIsGenerating(true);

    try {
      const diagnosis = await generateDiagnosis(currentSimulation);

      navigate("/diagnostico", {
        state: {
          simulation: currentSimulation,
          diagnosis,
        },
      });
    } catch (error) {
      console.error("Erro ao gerar diagnóstico:", error);

      setError(
        "Não conseguimos gerar seu diagnóstico agora. O serviço de análise pode estar temporariamente indisponível. Tente novamente em alguns instantes.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d12] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-white">
            planej<span className="text-violet-400">.ai</span>
          </span>

          <span className="text-sm text-zinc-400">Resumo da simulação</span>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10 lg:p-14">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Tudo pronto
            </span>

            <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Confira sua simulação
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Revise as informações antes de gerar seu diagnóstico financeiro
              personalizado.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
              <span className="text-sm text-slate-500">Renda mensal</span>

              <span className="font-semibold text-slate-900">
                R$ {currentSimulation.income}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
              <span className="text-sm text-slate-500">Gastos mensais</span>

              <span className="font-semibold text-slate-900">
                R$ {currentSimulation.expenses}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
              <span className="text-sm text-slate-500">Dívidas mensais</span>

              <span className="font-semibold text-slate-900">
                {currentSimulation.hasDebts
                  ? `R$ ${currentSimulation.debts}`
                  : "Nenhuma"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
              <span className="text-sm text-slate-500">Reserva financeira</span>

              <span className="font-semibold text-slate-900">
                R$ {currentSimulation.savings}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <span className="text-sm text-slate-500">
                Objetivo financeiro
              </span>

              <p className="mt-2 font-semibold text-slate-900">
                {currentSimulation.goal}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
              <span className="text-sm text-slate-500">Prazo</span>

              <span className="font-semibold text-slate-900">
                {currentSimulation.deadline}
              </span>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-700"
            >
              <p className="font-semibold">
                Não foi possível gerar o diagnóstico.
              </p>

              <p className="mt-1">{error}</p>
            </div>
          )}

          {isGenerating && (
            <div
              className="mx-auto mt-8 flex max-w-2xl flex-col items-center rounded-2xl bg-violet-50 p-6 text-center"
              aria-live="polite"
            >
              <span
                className="h-8 w-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600"
                aria-hidden="true"
              />

              <p className="mt-4 font-semibold text-violet-800">
                Analisando sua situação...
              </p>

              <p className="mt-1 text-sm leading-6 text-violet-600">
                Estamos preparando seu diagnóstico personalizado. Isso pode
                levar alguns segundos.
              </p>
            </div>
          )}

          <div className="mx-auto mt-10 flex max-w-2xl flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => navigate("/simulacao")}
              disabled={isGenerating}
              className="rounded-xl px-6 py-3.5 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="mr-2">◂</span>
              Alterar respostas
            </button>

            <button
              type="button"
              onClick={handleGenerateDiagnosis}
              disabled={isGenerating}
              className="flex items-center justify-center rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
            >
              {isGenerating ? (
                <>
                  <span
                    className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                    aria-hidden="true"
                  />
                  Analisando...
                </>
              ) : (
                <>
                  Gerar meu diagnóstico
                  <span className="ml-2">▸</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Seus dados serão utilizados para gerar uma análise personalizada.
        </p>
      </section>
    </main>
  );
}

export default Summary;
