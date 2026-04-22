CREATE TABLE punteggi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_partita DATE NOT NULL,
    score1 INT NOT NULL,   -- rifiuti raccolti (fase 1)
    score2 INT NOT NULL,   -- rifiuti separati correttamente (fase 2)
    scoreT INT NOT NULL,   -- punteggio finale normalizzato 0-10000
    nome VARCHAR(100) NOT NULL
);

-- score1: 0-180 (rifiuti raccolti in 1 minuto)
-- score2: 0-score1 (rifiuti separati correttamente)
-- scoreT: 0-10000 (punteggio finale normalizzato)

-- velocita = score1 / 60
-- precisione = score2 / score1
-- punteggio finale = 10000 * ( (score1 / MAX_SCORE) + (score2 / MAX_SCORE) ) / 2
-- MAX_SCORE = 180 (numero massimo possibile di rifiuti raccolti in 1 minuto)


-- DATI DI TEST
INSERT INTO punteggi (data_partita, score1, score2, scoreT, nome) VALUES
('2024-06-01', 150, 120, 7500, 'Simone'),
('2024-06-02', 180, 160, 9444, 'Luca'),
('2024-06-03', 120, 100, 6111, 'Giulia'),
('2024-06-04', 90, 70, 4444, 'Marco'),
('2024-06-05', 60, 50, 3055, 'Sara');