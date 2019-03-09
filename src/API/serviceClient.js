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

export const postNewMessage = async (content, thread_id) => {
  let token = localStorage.getItem("auth");
  let bodyData = { content, thread_id };
  try {
    var myHeaders = new Headers();
    if (token) {
      myHeaders.append("Authorization", token);
    }
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    let res = await fetch("/api/messages", {
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: JSON.stringify(bodyData)
    });
    let jsonRes = await res.json();
    return jsonRes.success;
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
    if (!response.ok) {
      throw new Error('User login unsuccessful');
    }
    const token = response.headers.get("Authorization");
    localStorage.setItem("auth", token);
    let jsonRes = await response.json();
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
    if (!response.ok) {
      throw new Error("User registration unsuccessful");
    }
    let jsonRes = await response.json();
    return jsonRes;
  } catch (error) {
    throw error;
  }
};
