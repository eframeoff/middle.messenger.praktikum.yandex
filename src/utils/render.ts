export function render(elem: string, block: any) {
  const root: HTMLElement | null = document.querySelector(elem);
  if (!root) {
    throw new Error("Не найден вход");
  }
  root.innerHTML = "";
  root.appendChild(block.getContent());
  return root;
}
