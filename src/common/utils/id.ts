export function newId(): string {
    // простий id для ЛР3 (без uuid libs)
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
