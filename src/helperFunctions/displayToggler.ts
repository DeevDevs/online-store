export default function toggleElementDisplay(elementClass: string) {
  const element: Element | null = document.querySelector(elementClass);
  if (!element) return;
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
    setTimeout(() => {
      element.classList.remove('dissolved');
    }, 20);
  } else {
    element.classList.add('dissolved');
    setTimeout(() => {
      element.classList.add('hidden');
    }, 200);
  }
}
