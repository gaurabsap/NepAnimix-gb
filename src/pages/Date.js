export default Date = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
