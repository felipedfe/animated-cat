# Animated Cat WebCam

# Gesture Cat 🐱👋

Um experimento interativo onde um gato animado reage aos gestos da mão capturados pela webcam.

O objetivo é explorar a combinação de:

- React
- Framer Motion
- Visão Computacional
- MediaPipe
- Ilustração Digital
- Interação em Tempo Real

---

# Conceito

O usuário permite acesso à câmera.

A aplicação detecta quantos dedos estão levantados e ativa diferentes animações do gato.

Exemplo:

- 1 dedo → cabeça reage
- 2 dedos → luz na testa acende
- 3 dedos → olhos animam
- 4 dedos → língua aparece
- 5 dedos → todas as animações são ativadas

---

# Objetivo do MVP

Criar uma experiência divertida e intuitiva onde o usuário controla um personagem apenas com gestos da mão.

Sem menus complexos.

Sem instruções longas.

A pessoa entra no site, levanta os dedos e imediatamente entende a interação.

---

# Tecnologias

- React
- TypeScript
- Framer Motion
- MediaPipe Hand Landmarker
- Vite

---

# Etapa 1 — Reaproveitar o Projeto Atual

Situação atual:

- Cabeça já possui animação
- Luz da testa já possui animação
- Olhos já possuem animação
- Língua já possui animação
- Tudo é controlado por botões

Objetivo:

Substituir os botões por gestos detectados pela webcam.

---

# Etapa 2 — Configurar a Webcam

Tarefas:

- Solicitar permissão da câmera
- Exibir a imagem da webcam na tela
- Garantir funcionamento em desktop e mobile

Resultado esperado:

O usuário consegue se ver pela câmera.

---

# Etapa 3 — Detectar a Mão

Instalar MediaPipe.

Tarefas:

- Detectar uma mão
- Mostrar landmarks (pontos da mão)
- Identificar a posição dos dedos

Resultado esperado:

Visualizar os pontos da mão sendo rastreados em tempo real.

---

# Etapa 4 — Contar Dedos

Criar uma função:

countRaisedFingers()

Entrada:

- Landmarks da mão

Saída:

- Número entre 0 e 5

Exemplo:

Polegar levantado

Indicador levantado

Médio levantado

Resultado:

3

---

# Etapa 5 — Criar Estado Global

Criar estado:

fingerCount

Exemplo:

0

1

2

3

4

5

Esse valor será atualizado continuamente conforme a câmera detectar a mão.

---

# Etapa 6 — Conectar Gestos às Animações

Mapeamento inicial:

| Dedos | Ação |
| --- | --- |
| 1 | Animar cabeça |
| 2 | Acender luz |
| 3 | Animar olhos |
| 4 | Mostrar língua |
| 5 | Modo especial |

---

# Etapa 7 — Estabilizar Detecção

A câmera costuma oscilar.

Problema:

3 dedos → 2 dedos → 3 dedos → 4 dedos

Tudo em poucos milissegundos.

Solução:

Aplicar debounce.

Regra:

O gesto precisa permanecer estável por pelo menos 300ms antes de ativar uma animação.

---

# Etapa 8 — Melhorar a Apresentação

Adicionar:

- Fundo animado
- Pequeno movimento idle do gato
- Transições suaves
- Indicador visual do gesto detectado

Exemplo:

"Dedo detectado: 3"

ou

"Olhos ativados"

---

# Etapa 9 — Testes Mobile

Validar:

- Android
- iPhone
- Orientação vertical

Garantir:

- Permissão da câmera
- Performance
- Responsividade

---

# Melhorias Futuras

## Sistema de Emoções

Mão aberta:

Gato feliz

Punho fechado:

Gato bravo

Sinal de paz:

Gato sonolento

---

## Flor Mágica

Inspirado na referência original.

Cada gesto faz crescer uma planta ao redor do gato.

Ao chegar em 5 dedos:

A flor floresce completamente.

---

## Sons

Adicionar:

- Ronronar
- Miado
- Sons mágicos
- Pequenos efeitos sonoros

---

# Descrição para Portfólio

Gesture Cat é um experimento interativo que utiliza visão computacional para controlar animações através da webcam.

Usando MediaPipe para rastreamento de mãos e Framer Motion para animações, o usuário interage com um personagem ilustrado simplesmente alterando a quantidade de dedos mostrados para a câmera.

O projeto explora a combinação entre animação, design de interação e tecnologias modernas da web.