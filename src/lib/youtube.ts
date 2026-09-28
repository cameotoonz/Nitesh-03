export function extractYoutubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const watch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (watch) return watch[1];
  const shorts = url.match(/shorts\/([A-Za-z0-9_-]{6,})/);
  if (shorts) return shorts[1];
  const embed = url.match(/embed\/([A-Za-z0-9_-]{6,})/);
  if (embed) return embed[1];
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  if (short) return short[1];
  return null;
}

export function ytThumbnail(id: string | null, high = false): string | null {
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/${high ? 'maxresdefault' : 'hqdefault'}.jpg`;
}
