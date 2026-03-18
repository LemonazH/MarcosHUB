(function attachParsers(global) {
  function parseDocRefs(value) {
    if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
    const raw = String(value || "").trim();
    if (!raw) return [];

    const base = raw.split(/[;,\n\r|]+/).map(s => s.trim()).filter(Boolean);
    if (base.length > 1) return base;

    if (/^\d+(?:[\s.]+\d+)+$/.test(raw)) {
      return raw.split(/[\s.]+/).map(s => s.trim()).filter(Boolean);
    }

    if (/\s+-\s+/.test(raw)) {
      return raw.split(/\s+-\s+/).map(s => s.trim()).filter(Boolean);
    }

    return [raw];
  }

  function parseNum(s) {
    if (s === null || s === undefined || s === "") return 0;
    const str = String(s).trim();
    if (str.includes(",")) return parseFloat(str.replace(/\./g, "").replace(",", ".")) || 0;
    return parseFloat(str) || 0;
  }

  function toISO(v) {
    if (!v) return "";
    const s = String(v).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    const it = s.match(/^(\d{1,2})[.\/\-](\d{1,2})[.\/\-](\d{4})/);
    if (it) return `${it[3]}-${it[2].padStart(2, "0")}-${it[1].padStart(2, "0")}`;
    if (typeof v === "number" && v > 40000) {
      const d = new Date(Date.UTC(1899, 11, 30) + Math.round(v) * 86400000);
      return isNaN(d) ? "" : d.toISOString().slice(0, 10);
    }
    return s;
  }

  function toIT(v) {
    if (!v) return "—";
    const iso = toISO(v);
    if (!iso) return String(v);
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function eur(n) {
    return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(parseNum(n));
  }

  function fmtDocList(str) {
    if (!str || !String(str).trim()) return "—";
    const parts = parseDocRefs(str);
    if (parts.length <= 1) return String(str).trim() || "—";
    return parts.join(" - ");
  }

  global.CFParsers = {
    parseDocRefs,
    parseNum,
    toISO,
    toIT,
    eur,
    fmtDocList,
  };
})(window);
