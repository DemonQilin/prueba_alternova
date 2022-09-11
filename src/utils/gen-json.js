export const genJson = (contenido, nombre) => {
    const anchor = document.createElement('a');
    const file = new Blob([contenido], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    anchor.href = url;
    anchor.download = nombre || "my-file.json";
    anchor.click();
    URL.revokeObjectURL(url);
}