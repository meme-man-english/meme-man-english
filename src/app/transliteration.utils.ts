const shuffle = array => {
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
};

const randNum = (max = Number.MAX_SAFE_INTEGER, min = 0): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const casing = (str: string): 'LOWER' | 'UPPER' | 'TITLE' | null => {
  if (typeof str !== 'string' || str.length < 1) {
    return null;
  }
  const strLen = str.length;

  const isTitleCase = str.match(/^[A-Z]/);
  if (strLen === 1 && isTitleCase) {
    return 'UPPER';
  }

  const upperCaseCount = str.match(/[A-Z]/g)?.length;
  if (strLen === upperCaseCount) {
    return 'UPPER';
  }

  const allCharCount = str.match(/[a-z]/gi)?.length;
  if (allCharCount === upperCaseCount) {
    return 'UPPER';
  }

  if (isTitleCase) {
    return 'TITLE';
  }

  return 'LOWER';
};

const transliterationsMap = {
  A: ['', 'E', 'O'],
  BT: ['T'],
  C: ['K'],
  CH: ['T', 'K', 'J', 'HC'],
  CK: ['C', 'K', 'KC'],
  CT: ['J'],
  E: ['', 'I', 'EE'],
  EI: ['', 'E', 'I', 'IE'],
  EU: ['U', 'YU'],
  F: ['P', 'PH', 'FU'],
  G: ['J', 'Z', 'GE'],
  GH: ['', 'J', 'Z'],
  I: ['', 'E', 'U', 'Y'],
  IE: ['', 'E', 'I', 'Y', 'EI'],
  J: ['', 'G', 'Z'],
  K: ['C'],
  KA: ['KH'],
  KN: ['N'],
  LL: ['L', 'LH'],
  ME: ['MU'],
  O: ['', 'A', 'U'],
  OO: ['U'],
  OU: ['O', 'U'],
  P: ['PH', 'PP', 'PU'],
  PH: ['F', 'P'],
  SH: ['', 'S'],
  T: ['', 'TH'],
  TION: ['CI', 'SI'],
  TT: ['T', 'TH'],
  TH: ['T'],
  UGH: ['F'],
  V: ['W'],
  W: ['V'],
  WO: ['WHA'],
  Y: ['E', 'I'],
  Z: ['G', 'J'],
};

const transliterationsKeys = Object.keys(transliterationsMap);
const vowels = ['A', 'E', 'I', 'O', 'U'];

// tslint:disable-next-line:variable-name
const _transliterateWord = (str: string): string => {
  if (typeof str !== 'string' || str.length < 2) {
    return str;
  }
  const origStr = str;
  const origLen = str.length;
  const isShort = origLen <= 3;

  str = str.toUpperCase();
  let count = randNum(str.length, str.length / 4);
  let lastTerm;

  while (str.length > 0.75 * origLen && str.length < 1.25 * origLen && count > 0) {
    shuffle(transliterationsKeys);
    const term = transliterationsKeys.find(k => str.includes(k));
    let replacements = transliterationsMap[term];

    if (lastTerm !== term && replacements) {
      lastTerm = term;
      let termReplacement;

      if (isShort && vowels.includes(term)) {
        replacements = replacements.filter(v => v);
      }

      termReplacement = replacements[randNum(replacements.length)] ?? term;
      str = str.replace(term, termReplacement);
    }
    --count;
  }

  str = str
    .replace(/(?![aeoucklmrst])([a-z])\1+/i, '$1')
    .replace(/([a-z])\1{2,}/i, '$1$1')
    .toLowerCase();

  switch (casing(origStr)) {
    case 'UPPER':
      str = str.toUpperCase();
      break;
    case 'LOWER':
      str = str.toLowerCase();
      break;
    case 'TITLE':
      str = str[0].toUpperCase() + str.slice(1);
      break;
  }

  return str;
};

export const transliterateWord = (str: string): string => {
  const tStr = _transliterateWord(str);
  if (str === tStr) {
    return _transliterateWord(str);
  }
  return tStr;
};

export const transliterateSentence = (text: string): string => {
  return text
    .split('\n')
    .map(str => str.split(' ').map(transliterateWord).join(' '))
    .join('\n');
};
