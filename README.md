## Conceitos e práticas explorados

O Planej.ai foi desenvolvido como uma aplicação prática para explorar diferentes conceitos do desenvolvimento Front-End moderno, desde a construção da interface até a integração com inteligência artificial.

### Desenvolvimento Front-End

Construção de uma aplicação web responsiva e interativa, utilizando uma estrutura organizada de páginas, serviços e tipos. O projeto trabalha a criação de interfaces, navegação entre telas, formulários e diferentes estados da aplicação.

### React e TypeScript

Utilização do React para construção da interface baseada em componentes e gerenciamento da interação com o usuário.

O TypeScript é utilizado para adicionar tipagem ao projeto, principalmente na definição dos dados da simulação e das respostas geradas pelo diagnóstico, proporcionando maior segurança durante o desenvolvimento.

### Componentização

Organização da aplicação pensando em elementos reutilizáveis e na separação de responsabilidades.

As páginas concentram o fluxo de cada etapa da aplicação, enquanto estruturas compartilhadas podem ser transformadas em componentes conforme o projeto evolui.

Essa abordagem facilita a manutenção, reutilização de código e expansão da aplicação.

### Gerenciamento de estado

Utilização dos recursos de estado do React para controlar as informações preenchidas durante a simulação.

O estado armazena dados como:

- Renda mensal
- Gastos mensais
- Dívidas
- Reserva financeira
- Objetivo financeiro
- Prazo

Também são controlados estados relacionados à navegação entre perguntas, carregamento da análise e mensagens de erro.

### React Router

Utilização do React Router para organizar a navegação entre as principais telas da aplicação.

O fluxo é dividido em páginas como:

- Home
- Simulação
- Resumo
- Diagnóstico

As informações da simulação são encaminhadas entre as etapas para que o diagnóstico possa ser gerado a partir dos dados preenchidos pelo usuário.

### Integração com APIs de inteligência artificial

Integração com a API do Google Gemini para geração do diagnóstico financeiro.

A aplicação envia os dados coletados durante a simulação para o serviço de inteligência artificial e solicita uma análise estruturada.

A resposta é retornada em formato JSON, contendo:

- Diagnóstico
- Pontos positivos
- Pontos de atenção
- Recomendações
- Próximos passos

A estrutura da resposta permite que as informações sejam apresentadas de forma organizada na interface.

### Validação de formulários

Implementação de validações durante as etapas da simulação para evitar o envio de informações inconsistentes.

Entre as validações realizadas estão:

- Valores financeiros maiores que zero quando necessário;
- Gastos não superiores à renda informada;
- Validação da existência de dívidas;
- Validação do valor das dívidas;
- Validação do objetivo financeiro;
- Validação do prazo.

As validações acontecem antes que o usuário avance para a próxima etapa.

### Acessibilidade

Aplicação de práticas básicas de acessibilidade para tornar a experiência mais inclusiva.

Entre os recursos utilizados estão:

- Labels associados aos campos;
- Navegação por teclado;
- Estados de foco visíveis;
- Mensagens de erro acessíveis;
- Uso de `aria-label`, `aria-describedby` e `aria-live` quando necessário;
- Identificação semântica da barra de progresso;
- Botões com estados de interação claramente definidos.

### Design responsivo

Desenvolvimento da interface pensando em diferentes tamanhos de tela.

A aplicação utiliza classes responsivas do Tailwind CSS para adaptar:

- Tipografia;
- Espaçamentos;
- Largura dos elementos;
- Organização dos conteúdos;
- Botões;
- Cards;
- Formulários.

O projeto é testado em diferentes resoluções, incluindo dispositivos móveis, tablets e desktops.

O objetivo é manter a experiência consistente e confortável independentemente do dispositivo utilizado.
