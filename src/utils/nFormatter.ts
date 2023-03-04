export default function nFormatter(num: number, fixed: number) {
	if (num >= 1e6) {
		return (num / 1e6).toFixed(fixed).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1e3) {
		return (num / 1e3).toFixed(fixed).replace(/\.0$/, '') + 'K';
	}
	return num.toFixed(fixed).replace(/\.0$/, '');
}
