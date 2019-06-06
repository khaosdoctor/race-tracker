function getPodiumReport (totalReport) {
  return totalReport.podiumData.map((line, index) => ({
    'Posição': index + 1,
    'Código Piloto': line.id,
    Nome: line.name,
    'Voltas Completas': line.completedLaps,
    'Tempo total de prova': line.totalRacingTime,
    'Melhor volta': `${line.bestLap.lap} - ${line.bestLap.lapTime.format('mm:ss.SSS')}`,
    'Velocidade Média': line.avgSpeed.toFixed(3),
    'Tempo após o vencedor': line.timeFromWinner
  }))
}

function getRaceReport (totalReport) {
  return {
    'Melhor Volta': {
      Volta: totalReport.raceData.bestLap.lap,
      'Código Piloto': totalReport.raceData.bestLap.id,
      Piloto: totalReport.raceData.bestLap.racerName,
      Tempo: totalReport.raceData.bestLap.lapTime
    }
  }
}

module.exports = {
  getPodiumReport,
  getRaceReport
}