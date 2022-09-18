var IDX = 256,
  HEX: string[] = [],
  SIZE = 256,
  BUFFER: string;
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

export function uid(len?: number): string {
  var i = 0,
    tmp = len || 11;
  if (!BUFFER || IDX + tmp > SIZE * 2) {
    for (BUFFER = "", IDX = 0; i < SIZE; i++) {
      BUFFER += HEX[(Math.random() * 256) | 0];
    }
  }

  return BUFFER.substring(IDX, IDX++ + tmp);
}
