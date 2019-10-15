export const truncateString = (length: number, separator: string = "...") => (
  string: string
) =>
  length < string.length
    ? (string.slice(0, length) as any).trimEnd() + separator
    : string;
