import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SimulationData } from "../types/simulation";

function Simulation() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [simulation, setSimulation] = useState<SimulationData>({
    income: "",
    expenses: "",
    hasDebts: null,
    debts: "",
    savings: "",
    goal: "",
    deadline: "",
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  function updateField(field: keyof SimulationData, value: string) {
    setSimulation((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  function isCurrentStepValid() {
    switch (step) {
      case 1:
        return simulation.income !== "" && Number(simulation.income) > 0;

      case 2:
        return (
          simulation.expenses !== "" &&
          Number(simulation.expenses) > 0 &&
          Number(simulation.expenses) <= Number(simulation.income)
        );

      case 3:
        if (simulation.hasDebts === null) {
          return false;
        }

        if (simulation.hasDebts === false) {
          return true;
        }

        return simulation.debts !== "" && Number(simulation.debts) > 0;

      case 4:
        return simulation.savings !== "" && Number(simulation.savings) >= 0;

      case 5:
        return simulation.goal.trim().length >= 5;

      case 6:
        return simulation.deadline.trim().length >= 2;

      default:
        return false;
    }
  }

  function getValidationMessage() {
    switch (step) {
      case 1:
        return "Informe uma renda mensal maior que zero.";

      case 2:
        if (simulation.expenses === "") {
          return "Informe seus gastos mensais.";
        }

        if (Number(simulation.expenses) <= 0) {
          return "Os gastos precisam ser maiores que zero.";
        }

        if (Number(simulation.expenses) > Number(simulation.income)) {
          return "Seus gastos não podem ser maiores que sua renda.";
        }

        return "";

      case 3:
        if (simulation.hasDebts === null) {
          return "Selecione uma das opções para continuar.";
        }

        if (
          simulation.hasDebts === true &&
          (simulation.debts === "" || Number(simulation.debts) <= 0)
        ) {
          return "Informe um valor de dívida maior que zero.";
        }

        return "";

      case 4:
        if (simulation.savings === "") {
          return "Informe quanto você já possui guardado.";
        }

        if (Number(simulation.savings) < 0) {
          return "O valor guardado não pode ser negativo.";
        }

        return "";

      case 5:
        if (simulation.goal.trim() === "") {
          return "Informe seu objetivo financeiro.";
        }

        if (simulation.goal.trim().length < 5) {
          return "Descreva seu objetivo com um pouco mais de detalhes.";
        }

        return "";

      case 6:
        if (simulation.deadline.trim() === "") {
          return "Informe um prazo para alcançar seu objetivo.";
        }

        if (simulation.deadline.trim().length < 2) {
          return "Informe um prazo válido.";
        }

        return "";

      default:
        return "";
    }
  }

  function handleNext() {
    const validationMessage = getValidationMessage();

    if (!isCurrentStepValid()) {
      setError(validationMessage);
      return;
    }

    setError("");

    if (step < totalSteps) {
      setStep((current) => current + 1);
      return;
    }

    navigate("/resumo", {
      state: simulation,
    });
  }

  function handleBack() {
    setError("");

    if (step > 1) {
      setStep((current) => current - 1);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d12] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        {/* Cabeçalho */}
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight text-white">
              planej<span className="text-violet-400">.ai</span>
            </span>

            <span className="text-sm font-medium text-zinc-400">
              {String(step).padStart(2, "0")} de{" "}
              {String(totalSteps).padStart(2, "0")}
            </span>
          </div>

          {/* Progresso */}
          <div
            className="h-2 overflow-hidden rounded-full bg-zinc-800"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Etapa ${step} de ${totalSteps}`}
          >
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10 lg:p-14">
          {/* Etapa 1 */}
          {step === 1 && (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Renda mensal
                </span>

                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Quanto você recebe por mês?
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Informe sua renda mensal aproximada para começarmos sua
                  análise financeira.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <label
                  htmlFor="income"
                  className="mb-3 block text-sm font-semibold text-slate-700"
                >
                  Renda mensal
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                  <span
                    className="text-base font-medium text-slate-400"
                    aria-hidden="true"
                  >
                    R$
                  </span>

                  <input
                    id="income"
                    type="number"
                    min="0"
                    value={simulation.income}
                    onChange={(event) =>
                      updateField("income", event.target.value)
                    }
                    placeholder="4.000,00"
                    aria-describedby="income-help"
                    className="w-full bg-transparent px-3 py-5 text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <p id="income-help" className="mt-2 text-xs text-slate-400">
                  Informe o valor aproximado que você recebe por mês.
                </p>
              </div>
            </>
          )}

          {/* Etapa 2 */}
          {step === 2 && (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Gastos mensais
                </span>

                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Quanto você gasta por mês?
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Informe uma estimativa dos seus gastos mensais, incluindo
                  contas, alimentação e outros custos.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <label
                  htmlFor="expenses"
                  className="mb-3 block text-sm font-semibold text-slate-700"
                >
                  Gastos mensais
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                  <span
                    className="text-base font-medium text-slate-400"
                    aria-hidden="true"
                  >
                    R$
                  </span>

                  <input
                    id="expenses"
                    type="number"
                    min="0"
                    value={simulation.expenses}
                    onChange={(event) =>
                      updateField("expenses", event.target.value)
                    }
                    placeholder="2.500,00"
                    aria-describedby="expenses-help"
                    className="w-full bg-transparent px-3 py-5 text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <p id="expenses-help" className="mt-2 text-xs text-slate-400">
                  Considere seus principais gastos mensais.
                </p>

                {simulation.income &&
                  simulation.expenses &&
                  Number(simulation.expenses) > Number(simulation.income) && (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      Seus gastos não podem ser maiores que sua renda.
                    </p>
                  )}
              </div>
            </>
          )}

          {/* Etapa 3 */}
          {step === 3 && (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Dívidas
                </span>

                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Você possui dívidas ou parcelas?
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Essa informação nos ajuda a entender melhor sua situação
                  financeira atual.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <div
                  className="grid gap-4 sm:grid-cols-2"
                  role="group"
                  aria-label="Você possui dívidas?"
                >
                  <button
                    type="button"
                    aria-pressed={simulation.hasDebts === true}
                    onClick={() => {
                      setSimulation((current) => ({
                        ...current,
                        hasDebts: true,
                        debts: "",
                      }));
                      setError("");
                    }}
                    className={`rounded-2xl border p-5 text-left transition focus:outline-none focus:ring-4 focus:ring-violet-100 ${
                      simulation.hasDebts === true
                        ? "border-violet-500 bg-violet-50 ring-4 ring-violet-100"
                        : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50"
                    }`}
                  >
                    <span className="block text-base font-semibold text-slate-900">
                      Sim, tenho dívidas
                    </span>

                    <span className="mt-1 block text-sm text-slate-500">
                      Possuo parcelas, empréstimos ou outras dívidas.
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={simulation.hasDebts === false}
                    onClick={() => {
                      setSimulation((current) => ({
                        ...current,
                        hasDebts: false,
                        debts: "0",
                      }));
                      setError("");
                    }}
                    className={`rounded-2xl border p-5 text-left transition focus:outline-none focus:ring-4 focus:ring-violet-100 ${
                      simulation.hasDebts === false
                        ? "border-violet-500 bg-violet-50 ring-4 ring-violet-100"
                        : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50"
                    }`}
                  >
                    <span className="block text-base font-semibold text-slate-900">
                      Não tenho dívidas
                    </span>

                    <span className="mt-1 block text-sm text-slate-500">
                      Atualmente não tenho parcelas ou dívidas.
                    </span>
                  </button>
                </div>

                {simulation.hasDebts === true && (
                  <div className="mt-8">
                    <label
                      htmlFor="debts"
                      className="mb-3 block text-sm font-semibold text-slate-700"
                    >
                      Quanto você paga por mês?
                    </label>

                    <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                      <span
                        className="text-base font-medium text-slate-400"
                        aria-hidden="true"
                      >
                        R$
                      </span>

                      <input
                        id="debts"
                        type="number"
                        min="0"
                        value={simulation.debts}
                        onChange={(event) =>
                          updateField("debts", event.target.value)
                        }
                        placeholder="500,00"
                        aria-describedby="debts-help"
                        className="w-full bg-transparent px-3 py-5 text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <p id="debts-help" className="mt-2 text-xs text-slate-400">
                      Informe aproximadamente quanto suas dívidas comprometem da
                      sua renda todos os meses.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Etapa 4 */}
          {step === 4 && (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Reserva financeira
                </span>

                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Quanto você já tem guardado?
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Considere sua reserva financeira, investimentos ou outros
                  valores disponíveis.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <label
                  htmlFor="savings"
                  className="mb-3 block text-sm font-semibold text-slate-700"
                >
                  Valor guardado
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-5 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                  <span
                    className="text-base font-medium text-slate-400"
                    aria-hidden="true"
                  >
                    R$
                  </span>

                  <input
                    id="savings"
                    type="number"
                    min="0"
                    value={simulation.savings}
                    onChange={(event) =>
                      updateField("savings", event.target.value)
                    }
                    placeholder="5.000,00"
                    aria-describedby="savings-help"
                    className="w-full bg-transparent px-3 py-5 text-lg font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <p id="savings-help" className="mt-2 text-xs text-slate-400">
                  Se ainda não possui uma reserva, informe 0.
                </p>
              </div>
            </>
          )}

          {/* Etapa 5 */}
          {step === 5 && (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Objetivo financeiro
                </span>

                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Qual é o seu principal objetivo financeiro?
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Conte qual objetivo você deseja alcançar.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <label
                  htmlFor="goal"
                  className="mb-3 block text-sm font-semibold text-slate-700"
                >
                  Seu objetivo
                </label>

                <textarea
                  id="goal"
                  value={simulation.goal}
                  onChange={(event) => updateField("goal", event.target.value)}
                  placeholder="Ex.: Quero juntar dinheiro para comprar minha casa."
                  rows={5}
                  aria-describedby="goal-help"
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />

                <p id="goal-help" className="mt-2 text-xs text-slate-400">
                  Descreva seu objetivo de forma simples e objetiva.
                </p>

                {simulation.goal.trim().length > 0 &&
                  simulation.goal.trim().length < 5 && (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      Descreva seu objetivo com um pouco mais de detalhes.
                    </p>
                  )}
              </div>
            </>
          )}

          {/* Etapa 6 */}
          {step === 6 && (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                  Meta e prazo
                </span>

                <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Em quanto tempo você quer alcançar seu objetivo?
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Informe o prazo que você considera ideal para alcançar sua
                  meta.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-2xl">
                <label
                  htmlFor="deadline"
                  className="mb-3 block text-sm font-semibold text-slate-700"
                >
                  Prazo
                </label>

                <input
                  id="deadline"
                  type="text"
                  value={simulation.deadline}
                  onChange={(event) =>
                    updateField("deadline", event.target.value)
                  }
                  placeholder="Ex.: 2 anos"
                  aria-describedby="deadline-help"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 text-lg text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />

                <p id="deadline-help" className="mt-2 text-xs text-slate-400">
                  Exemplo: 6 meses, 2 anos ou 5 anos.
                </p>
              </div>
            </>
          )}

          {/* Erro geral */}
          {error && (
            <div
              className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {/* Navegação */}
          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-xl px-5 py-3 font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:invisible"
            >
              <span className="mr-2" aria-hidden="true">
                ◂
              </span>
              Voltar
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className="rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {step === totalSteps ? "Ver meu diagnóstico" : "Continuar"}

              <span className="ml-2" aria-hidden="true">
                ▸
              </span>
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

export default Simulation;
