export const isFollower = (obj) =>
  Object.entries(obj)
    .filter(([, value]) => value === true)
    .map(([key]) => key);
