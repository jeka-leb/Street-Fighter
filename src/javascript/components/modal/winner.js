import { createFighterImage } from '../fighterPreview';
import { showModal } from './modal';
import { createElement } from '../../helpers/domHelper';
import App from '../../app';


export function showWinnerModal(fighter) {
  const bodyElement = createElement({
    tagName: 'div',
    className: 'arena___winner',
  });
  const fighterImage = createFighterImage(fighter);
  const title = `${fighter.name} WON!`;
  bodyElement.append(fighterImage);
  
  showModal({
    title,
    bodyElement,
    onClose() {
      document.querySelector('.arena___root').remove();
      new App();
    }
  });

}

  