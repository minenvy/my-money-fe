export function getLoginState() {
  return localStorage.getItem('loginState') === 'true'
}

export function setLoginState() {
  localStorage.setItem('loginState', 'true')
}

export function removeLoginState() {
  localStorage.removeItem('loginState')
}
