// \r\n か \n をすべて \r\n に置き換える
export function lfToCrlf(lfString: string): string {
    return lfString.replace(/\r?\n/g, "\r\n");
}

// \r\n をすべて \n に置き換える
export function crlfToLf(crlfString: string): string {
    return crlfString.replace(/\r\n/g, "\n");
}