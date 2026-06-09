# Plano de Implementação — Gesture Cat

---

## Etapa 1 — Instalar o MediaPipe

- [ ] Instalar `@mediapipe/tasks-vision`
- [ ] Verificar que o Vite consegue resolver os assets do MediaPipe (wasm)
- [ ] Confirmar que a build não quebra

---

## Etapa 2 — Configurar a Webcam

- [ ] Criar hook `useWebcam` que solicita permissão da câmera
- [ ] Exibir o feed da webcam em um `<video>` na tela
- [ ] Tratar o caso de permissão negada (mensagem de erro amigável)

---

## Etapa 3 — Integrar o Hand Landmarker

- [ ] Criar hook `useHandTracker` que inicializa o `HandLandmarker` do MediaPipe
- [ ] Rodar a detecção frame a frame via `requestAnimationFrame`
- [ ] Visualizar os landmarks da mão na tela (modo debug temporário)

---

## Etapa 4 — Contar Dedos

- [ ] Implementar `countRaisedFingers(landmarks)` que retorna 0–5
- [ ] Lógica: comparar ponta do dedo vs articulação do meio (polegar usa eixo x, demais usam y)
- [ ] Testar os 6 valores possíveis (0, 1, 2, 3, 4, 5) manualmente

---

## Etapa 5 — Criar Estado Global de Gestos

- [ ] Expor `fingerCount` (0–5) a partir do `useHandTracker`
- [ ] Aplicar debounce de 300ms para estabilizar a detecção
- [ ] Exibir o valor na tela para facilitar o debug

---

## Etapa 6 — Conectar Gestos às Animações

- [ ] Substituir os switches por lógica baseada em `fingerCount`
- [ ] Mapeamento:
  - [ ] 0 dedos → nada ativo
  - [ ] 1 dedo → cabeça flutua (`isAnimating`)
  - [ ] 2 dedos → luz acende (`lightOn`)
  - [ ] 3 dedos → olhos se movem (`isMovingPupils`)
  - [ ] 4 dedos → língua aparece (`tongueOut`)
  - [ ] 5 dedos → modo especial (todas as animações)
- [ ] Remover a seção de botões do layout

---

## Etapa 7 — Polir a Apresentação

- [ ] Adicionar indicador visual do gesto detectado ("2 dedos — luz acesa")
- [ ] Ajustar posição e tamanho do feed da webcam na tela
- [ ] Verificar transições suaves entre estados
- [ ] Testar em diferentes condições de iluminação

---

## Etapa 8 — Testes

- [ ] Testar no desktop (Chrome, Safari)
- [ ] Testar no mobile (Android, iPhone)
- [ ] Validar orientação vertical no mobile
- [ ] Verificar performance (sem travamentos visíveis)

---

## Melhorias Futuras (fora do MVP)

- [ ] Sistema de emoções (mão aberta = feliz, punho = bravo)
- [ ] Flor mágica que cresce com os gestos
- [ ] Sons (ronronar, miado, efeitos mágicos)
