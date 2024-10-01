export function formatDuration(seconds: number) {
	return `${Math.trunc(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
}