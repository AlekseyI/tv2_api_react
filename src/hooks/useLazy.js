export const useLazy = (callback, toBottomHeight = 50) => {
  window.onscroll = (e) => {
    if (
      document.documentElement.scrollHeight -
        window.innerHeight -
        document.documentElement.scrollTop <=
      toBottomHeight
    ) {
      callback();
    }
  };

  window.onunload = () => {
    window.onscroll = undefined;
  };
};
