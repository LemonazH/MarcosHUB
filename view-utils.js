(function attachViewUtils(global) {
  function ageDays(s) {
    return (Date.now() - new Date(s)) / 86400000;
  }

  function isOver(s) {
    return ageDays(s) > 90;
  }

  function isWarn(s) {
    const d = ageDays(s);
    return d > 60 && d <= 90;
  }

  function sortData(data, sortKey, sortDir) {
    const parseDate = (v) => {
      const s = String(v || "").trim();
      const itMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (itMatch) return new Date(itMatch[3], itMatch[2] - 1, itMatch[1]);
      const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (isoMatch) return new Date(isoMatch[1], isoMatch[2] - 1, isoMatch[3]);
      return null;
    };

    if (!sortKey) return [...data];

    return [...data].sort((a, b) => {
      const av = a[sortKey] || "";
      const bv = b[sortKey] || "";
      const ad = parseDate(av);
      const bd = parseDate(bv);
      let cmp;
      if (ad && bd) cmp = ad - bd;
      else {
        const an = parseFloat(String(av).replace(/\./g, "").replace(",", "."));
        const bn = parseFloat(String(bv).replace(/\./g, "").replace(",", "."));
        if (!isNaN(an) && !isNaN(bn)) cmp = an - bn;
        else cmp = String(av).localeCompare(String(bv), "it");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

  global.CFViewUtils = {
    ageDays,
    isOver,
    isWarn,
    sortData,
  };
})(window);
