export const getAllThreads = async () => {
  try {
    let res = await fetch("/api/thread");
    let jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    throw error;
  }
};

export const getMessagesWithThreadId = async id => {
  try {
    let res = await fetch("/api/messages/thread/" + id);
    let jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    throw error;
  }
};

export const postNewThread = async bodyData => {
  let h = new Headers();
  h.append("Authorization", localStorage.getItem("auth"));
  h.append("Content-Type", "application/json");
  try {
    let res = await fetch("/api/thread", {
      method: "POST",
      mode: "cors",
      headers: h,
      body: JSON.stringify(bodyData)
    });
    let jsonRes = await res.json();
    if (!jsonRes.success) {
      throw new Error(jsonRes.message);
    }
    return jsonRes;
  } catch (error) {
    throw error;
  }
};

export const postNewMessage = async bodyData => {
  try {
    let h = new Headers();
    h.append("Authorization", localStorage.getItem("auth") || '');
    h.append("Content-Type", "application/json");
    h.append("Accept", "application/json");
    let res = await fetch("/api/messages", {
      method: "POST",
      mode: "cors",
      headers: h,
      body: JSON.stringify(bodyData)
    });
    let jsonRes = await res.json();
    if (!jsonRes.success) {
      throw new Error(jsonRes.message);
    }
    return jsonRes;
  } catch (error) {
    throw error;
  }
};

export const login = async userInput => {
  try {
    let response = await fetch("/api/users/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(userInput)
    });
    let jsonRes = await response.json();
    if (!jsonRes.success) {
      throw new Error(jsonRes.message);
    }
    localStorage.setItem("auth", response.headers.get("Authorization"));
    localStorage.setItem("name", jsonRes.user);
    return jsonRes;
  } catch (error) {
    throw error;
  }
};

export const register = async userInput => {
  try {
    let response = await fetch("/api/users/register", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(userInput)
    });
    let jsonRes = await response.json();
    if (!jsonRes.success) {
      throw new Error(jsonRes.message);
    }
    return jsonRes;
  } catch (error) {
    throw error;
  }
};
