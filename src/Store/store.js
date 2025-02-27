const Store = {
  data: null,
};

const proxiedStore = new Proxy(Store, {
  set(target, key, value) {
    target[key] = value;
    if (key === "data") {
      window.dispatchEvent(new Event("data-update"));
    }
    return true;
  },
});

export default proxiedStore;
