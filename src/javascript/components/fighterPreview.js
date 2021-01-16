import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // showed fighter info (image, name, health, etc.)
  if (fighter) {
    const fighterImage = createFighterImage(fighter);
    const fighterData = createElement({
      tagName: 'div',
      className: 'fighter-data-preview___block'
    });
    const fighterName = makeDataRow('Name:', fighter.name);
    const fighterAtack = makeDataRow('Attack:', fighter.attack);
    const fighterDefence = makeDataRow('Defense:', fighter.defense);
    const fighterHealth = makeDataRow('Health:', fighter.health);
  
    fighterData.append(fighterName, fighterAtack, fighterDefence, fighterHealth);
    fighterElement.append(fighterImage, fighterData);
    } 
    return fighterElement;
  }
  
  function makeDataRow(prop, value  ) {
    const elementProp = createElement({
      tagName: 'span',
      className: 'fighter-property___line'
    });
    elementProp.innerText = prop;
    const elementValue = createElement({
      tagName: 'span',
      className: 'fighter-property___line'
    });
    elementValue.innerText = value;
    const element = createElement({
      tagName: 'div',
      className: 'fighter-property___container'
    });
    element.append(elementProp, elementValue);
    return element;
  }

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
