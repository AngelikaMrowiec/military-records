import { Token } from "./TokenType";

export async function getAuthToken() {

  const didTokenExpire = isTokenExpired();

  if (didTokenExpire ){
    await tokenRefresher();
  }

  let token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  let data : Token = JSON.parse(token)

  return data.accessToken;
}

export async function tokenRefresher() {

  let token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  let tokenData : Token = JSON.parse(token)


  const data = {
    refreshToken: tokenData.refreshToken,
  };

const response = await fetch("http://192.168.1.31:8001/auth/refresh", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

if (response.status === 401) {
  return;
}

const responseData: Token = await response.json();

setToken(responseData);
}

export function setToken(responseData: Token) {
  localStorage.setItem("token", JSON.stringify(responseData));

  var timeTokenExpiresAt = Date.now() + (responseData.expiresIn * 1000);

  localStorage.setItem("tokenExpiresAt", timeTokenExpiresAt.toString());
}

function isTokenExpired() : boolean {
  const expiryTime = Number(localStorage.getItem("tokenExpiresAt"));
  const currentTime = Date.now();
  if (expiryTime <= currentTime) {
    return true;
  } else {
    return false;
  }
}