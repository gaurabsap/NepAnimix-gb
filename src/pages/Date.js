export const Date = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};


const episodes = {
  ep: {
    [
      {
        id: 1,
        "name": "hawa"
      }
    ],
    [
      {
        id: 1,
        "name": "hawa"
      }
    ]
  }
  
}