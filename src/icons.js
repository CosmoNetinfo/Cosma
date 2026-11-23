const gear = Array.from({length:32},(_,i)=>{const r=[8,10,10,8][i%4],a=(i*11.25-90)*Math.PI/180;return `${i?'L':'M'}${(12+r*Math.cos(a)).toFixed(2)} ${(12+r*Math.sin(a)).toFixed(2)}`;}).join(' ')+'Z';
const paths = {
  home: '<path d="m3 11 9-8 9 8v10h-6v-7H9v7H3z"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="4"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h.01M12 15h.01m4 0h.01"/>',
  diary:
    '<rect x="5" y="3" width="15" height="18" rx="3"/><path d="M3 7h4m-4 5h4m-4 5h4m4-10h5m-5 5h5"/>',
  health:
    '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/><path d="M8 12h8m-4-4v8"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  arrow: '<path d="m9 5 7 7-7 7"/>',
  back: '<path d="m15 5-7 7 7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  star: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
  moon: '<path d="M20 14A8 8 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z"/>',
  chart: '<path d="M4 4v16h17M8 15l4-5 4 2 5-7"/>',
  pill: '<path d="m9 20 11-11a5 5 0 0 0-7-7L2 13a5 5 0 0 0 7 7Zm-2-12 9 9"/>',
  shield:
    '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  settings:
    `<path d="${gear}"/><circle cx="12" cy="12" r="3"/>`,
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  bell: '<path d="M5 17h14l-2-4V8A5 5 0 0 0 7 8v5Zm5 3h4"/>',
};
export const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.star}</svg>`;
