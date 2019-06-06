module.exports.ascendingBy = (criteria) => (prev, next) => prev[criteria] - next[criteria]
module.exports.descendingBy = (criteria) => (prev, next) => next[criteria] - prev[criteria]