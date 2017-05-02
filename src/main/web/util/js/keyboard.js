export const onEnter = (event, toExecute) => {
  if (event.key === 'Enter' && event.shiftKey === false) {
    event.preventDefault();
    toExecute();
  }
};