import { GoogleGenAI } from '@google/genai';

import type { SimulationData } from '../types/simulation';
import type { Diagnosis } from '../types/diagnosis';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    'VITE_GEMINI_API_KEY não foi encontrada no arquivo .env.local.',
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

const MODEL = 'gemini-3.1-flash-lite';

const diagnosisSchema = {
  type: 'object',
  properties: {
    diagnostico: {
      type: 'string',
      description:
        'Análise geral da situação financeira da pessoa.',
    },

    pontosPositivos: {
      type: 'array',
      items: {
        type: 'string',
      },
      description:
        'Lista de pontos positivos encontrados na situação financeira.',
    },

    pontosAtencao: {
      type: 'array',
      items: {
        type: 'string',
      },
      description:
        'Lista de pontos que precisam de atenção.',
    },

    recomendacoes: {
      type: 'array',
      items: {
        type: 'string',
      },
      description:
        'Recomendações práticas e realistas.',
    },

    proximosPassos: {
      type: 'array',
      items: {
        type: 'string',
      },
      description:
        'Ações práticas que a pessoa pode começar a realizar.',
    },
  },

  required: [
    'diagnostico',
    'pontosPositivos',
    'pontosAtencao',
    'recomendacoes',
    'proximosPassos',
  ],
};

export async function generateDiagnosis(
  simulation: SimulationData,
): Promise<Diagnosis> {
  const prompt = `
Você é um educador financeiro responsável.

Analise a situação financeira da pessoa com base nos dados fornecidos.

DADOS DA SIMULAÇÃO

Renda mensal: R$ ${simulation.income}

Gastos mensais: R$ ${simulation.expenses}

Possui dívidas: ${simulation.hasDebts ? 'Sim' : 'Não'}

Dívidas mensais: R$ ${simulation.debts || '0'}

Reserva financeira: R$ ${simulation.savings}

Objetivo financeiro: ${simulation.goal}

Prazo para alcançar o objetivo: ${simulation.deadline}

OBJETIVO DA ANÁLISE

Produza um diagnóstico financeiro personalizado considerando:

- relação entre renda e gastos;
- capacidade de poupança;
- existência de dívidas;
- tamanho da reserva;
- objetivo financeiro;
- prazo definido para alcançar o objetivo.

REGRAS

- Use linguagem simples, clara e acolhedora.
- Seja objetivo.
- Não comece com "Olá".
- Não faça saudações.
- Não parabenize a pessoa.
- Não faça uma introdução antes do diagnóstico.
- Não invente informações.
- Baseie a análise exclusivamente nos dados fornecidos.
- Gere de 3 a 5 itens em cada lista.
- As recomendações devem ser práticas e realistas.
- Não faça promessas de ganhos financeiros.
- Não indique investimentos específicos.
- Não recomende produtos financeiros específicos.
- Não trate a resposta como aconselhamento financeiro profissional.
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,

      config: {
        responseMimeType: 'application/json',
        responseSchema: diagnosisSchema,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      throw new Error('O Gemini não retornou nenhum conteúdo.');
    }

    const diagnosis = JSON.parse(text) as Diagnosis;

    return diagnosis;
  } catch (error) {
    console.error('Erro ao gerar diagnóstico:', error);

    throw error;
  }
}