export const ContextName = {
  isInit: 'isInit',
  isVolumeOn: 'isVolumeOn',
  volume: 'volume',
  isTimeOn: 'isTimeOn',
  time: 'time',
  arrayOfQuestion: 'arrayOfQuestion',
  arrayOfPlayedCategories: 'arrayOfPlayedCategories', 
}

export const ContextDefaultValue = {
  isInit: 1,
  isVolumeOn: 1,
  volume: 0,
  isTimeOn: -1,
  time: 5,
  arrayOfQuestion: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                    -1],
  arrayOfPlayedCategories: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                            -1,-1,-1,-1], 
}

export function setLocalStorage(value, item) {
  localStorage.setItem(value, item);
}

export function getLocalStorage(value) {
  return localStorage.getItem(value);
}