const API = {
  dataURL: "/Data/thirdPage.json",
  fetchThirdPage: async () => {
    let json = null;
    try {
      const result = await fetch(API.dataURL);
      json = await result.json();
    } catch (error) {
      console.error("Error while getting the third page: ", error);
    }

    // Wait 2 seconds for stimulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return json;
  },
};

export default API;