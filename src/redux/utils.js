export default function makeAction(type, payload) {
  return {
    type: type,
    payload: payload,
  };
}
