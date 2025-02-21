// NO date to store right now
const Store = {
  data: null,
};

const proxiedStore = new Proxy(Store, {
  set(target, key, value) {
    target[key] = value;
    // Example reactive update
    if (key === "cart") {
      window.dispatchEvent(new Event("cart-update"));
    }
    return true;
  },
});

export default proxiedStore;
