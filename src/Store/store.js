const Store = {
  data: null,
  accessToken: null,
};

const proxiedStore = new Proxy(Store, {
  set(target, key, value) {
    target[key] = value;
    console.log("key: " + key);
    window.dispatchEvent(new Event(`${key}-update`));
    return true;
  },
});

export default proxiedStore;
