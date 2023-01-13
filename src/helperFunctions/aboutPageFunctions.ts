export function setBlockVerticalPosition(): void {
  const verticalPosition: number = document.body.getBoundingClientRect().y;
  const imageBlock = document.querySelector('.pp-magnified-img') as HTMLElement;
  const value: number = Math.abs(verticalPosition);
  imageBlock.style.top = `${value}px`;
}

export function displayImg(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
): void {
  if (!(e.target as Element).closest('.pp-img-panel__img')) return;
  const chosenImage = (e.target as Element).closest(
    '.pp-img-panel__img'
  ) as HTMLImageElement;
  const mainImgBlock = document.querySelector(
    '.pp-img-box__img'
  ) as HTMLElement;
  const magnifiedImg = document.querySelector(
    '.pp-magnified-img__img'
  ) as HTMLImageElement;
  mainImgBlock.style.backgroundImage = `url(${chosenImage.src})`;
  magnifiedImg.src = chosenImage.src;
  mainImgBlock.dataset.url = chosenImage.src;
}
