export function addElement(base, nameTag, ...nameClass) {
  const element = document.createElement(nameTag);
  element.classList.add(...nameClass);
  base.append(element);
  return element;
}

export let wrapperGlobal = function(func, ...element) {
  let bindF = func.bind(this, ...element);
  bindF();
}

export const Pages = {
  main: 'main',
  art: 'art',
  pic: 'pic',
  setting: 'setting',
  questionArtists: 'questionArtists',
  questionPictures: 'questionPictures',
  result: 'result',
  score: 'score'
}