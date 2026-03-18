(function attachStateRules(global) {
  const DOC_STATUS_TRANSITIONS = {
    APERTO: ["APERTO", "PARZIALE", "DA INCASSARE", "DA RICONCILIARE", "CHIUSO", "PAGATO", "STORNATO"],
    PARZIALE: ["PARZIALE", "APERTO", "DA INCASSARE", "DA RICONCILIARE", "CHIUSO", "PAGATO", "STORNATO"],
    "DA INCASSARE": ["DA INCASSARE", "PARZIALE", "CHIUSO", "APERTO"],
    "DA RICONCILIARE": ["DA RICONCILIARE", "CHIUSO", "APERTO"],
    CHIUSO: ["CHIUSO", "APERTO", "DA RICONCILIARE"],
    PAGATO: ["PAGATO", "APERTO", "CHIUSO"],
    STORNATO: ["STORNATO", "APERTO"],
  };

  const ASS_STATUS_TRANSITIONS = {
    "IN ARCHIVIO": ["IN ARCHIVIO", "CONSEGNATO A PINO", "INCASSATO"],
    "CONSEGNATO A PINO": ["CONSEGNATO A PINO", "IN ARCHIVIO", "INCASSATO"],
    INCASSATO: ["INCASSATO", "CONSEGNATO A PINO"],
  };

  function canTransition(rules, fromState, toState) {
    const from = String(fromState || "").toUpperCase();
    const to = String(toState || "").toUpperCase();
    if (!from || !to || from === to) return true;
    const allowed = rules[from];
    if (!Array.isArray(allowed)) return true;
    return allowed.includes(to);
  }

  function allowedTransitions(rules, fromState) {
    const from = String(fromState || "").toUpperCase();
    const allowed = rules[from];
    return Array.isArray(allowed) ? allowed : [];
  }

  global.CFStateRules = {
    DOC_STATUS_TRANSITIONS,
    ASS_STATUS_TRANSITIONS,
    canTransition,
    allowedTransitions,
  };
})(window);
