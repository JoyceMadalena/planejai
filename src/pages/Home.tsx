import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0d0d12] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <span className="text-xl font-semibold tracking-tight">
          planej<span className="text-violet-500">.ai</span>
        </span>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
            Educador financeiro com IA
          </span>

          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Entenda seu dinheiro.
            <span className="block text-violet-500">Planeje seu futuro.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Responda algumas perguntas sobre sua vida financeira e receba uma
            análise personalizada com insights para os seus próximos passos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/simulacao")}
              className="rounded-xl bg-violet-600 px-6 py-3.5 font-medium transition hover:bg-violet-500"
            >
              Começar minha simulação
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/10 px-6 py-3.5 font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              Como funciona
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-violet-600/20 blur-3xl" />

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Seu diagnóstico</p>

                <p className="mt-1 text-xl font-semibold">Visão financeira</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                ✦
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-sm text-zinc-500">Renda mensal</p>

                <p className="mt-2 text-2xl font-semibold">R$ 4.000</p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-sm text-zinc-500">Disponível</p>

                <p className="mt-2 text-2xl font-semibold text-violet-400">
                  R$ 1.200
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-400">Saúde financeira</p>

                <span className="text-sm font-medium text-violet-400">72%</span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-violet-500" />
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Você possui uma boa margem para organizar seus objetivos
                financeiros.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
