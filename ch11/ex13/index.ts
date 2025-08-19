export function stringifyJSON(json: any): string | undefined {
  // 配列: undefined -> "null", 配列の各要素を再帰的に処理
  if (Array.isArray(json)) {
    const jsonStr = json.map((v) => {
      if (v === undefined) {
        return "null";
      }
      return stringifyJSON(v);
    }).join(",");

    return "[" + jsonStr + "]";
  }

  // values
  if (typeof json === "boolean") {
    // boolean -> 文字列
    return json ? "true" : "false";
  }
  if (json === null) {
    // null -> "null"
    return "null";
  }

  // number
  if (typeof json === "number") {
    // Infinity, NaN -> "null"
    return isFinite(json) ? String(json) : "null";
  }

  // string
  if (typeof json === "string") {
    // 特殊文字、制御文字のエスケープ処理
    const escaped = json.replace(/[\\"\u0000-\u001F]/g, (c) => {
      switch (c) {
        case '"': return '\\"';
        case '\\': return '\\\\';
        case '\b': return '\\b';
        case '\f': return '\\f';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '\t': return '\\t';
        default:
          // その他の制御文字は \uXXXX に変換
          return '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0');
      }
    });
    return `"${escaped}"`;
  }

  // object
  // undefined, function, symbol -> undefined
  // その他 -> "key":value
  if (typeof json === "object") {
    const entries = Object.entries(json)
      .map(([k, v]) => {
        if (v === undefined || typeof v === "function" || typeof v === "symbol") {
          return null;
        }
        return stringifyJSON(k) + ":" + stringifyJSON(v);
      })
      .filter((x) => x !== null);

    return "{" + entries.join(",") + "}";
  }

  return undefined; // undefined, function, symbol
}
