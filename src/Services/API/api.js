const API = {
  dataURL: "/Data/thirdPage.json",
  loginDataURL:"/Data/loginInfo.json",
  privateDataURL:"/Data/protectedData.json",
  fetchThirdPage: async () => {
    let json = null;
    try {
      const result = await fetch(API.dataURL);
      json = await result.json();
    } catch (error) {
      console.error("Error while getting the third page: ", error);
    }

    // Wait seconds for stimulation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return json;
  },
  fetchLoginData: async () => {
    let json = null;
    try {
      const result = await fetch(API.loginDataURL);
      json = await result.json();
    } catch (error) {
      console.error("Error while getting the third page: ", error);
    }

    return json;
  },
  fetchPrivateData: async () => {
    let json = null;
    try {
      const result = await fetch(API.privateDataURL);
      json = await result.json();
    } catch (error) {
      console.error("Error while getting the third page: ", error);
    }

    return json;
  },
};

export default API;
