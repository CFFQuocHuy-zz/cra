export const STORAGE = {
  JWT: 'KEY',
  PLAYING_ID: 'playingId',
  ROOM_ID: 'roomId',
}

export function get(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return ''
  }
}

export function set(key, value) {
  try {
    return localStorage.setItem(key, value)
  } catch {
    return ''
  }
}
