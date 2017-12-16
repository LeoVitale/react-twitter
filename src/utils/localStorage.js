export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}


export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state).trim();
    localStorage.setItem('state', serializedState);
  } catch (err) {
    //Ignore write errors
  }
}

export const setClientNavigation = () => {
  try {
    localStorage.setItem('client', true);
  } catch (err) {
    //Ignore write errors
  }
}

export const getClientNavigation = () => {
  try {
    const serializedState = localStorage.getItem('client');
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
}


