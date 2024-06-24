export const getThumbnail = (video: string): string => {
  if (video.includes("youtu.be")) {
    video = video.split("youtu.be/")[1];
    return `https://img.youtube.com/vi/${video}/hqdefault.jpg`;
  } else if (video.includes("facebook") || video.includes("fb") || !video) {
    return "facebook";
  }
  // extract video id from url
  video = video.split("v=")[1];

  // remove any additional params
  const ampersandPosition = video?.indexOf("&");
  if (video && ampersandPosition && ampersandPosition !== -1) {
    video = video.substring(0, ampersandPosition);
  }

  return `https://img.youtube.com/vi/${video}/hqdefault.jpg`;
};

export const getYoutubeId = (video: string): string => {
  if (video.includes("youtu.be")) {
    return video.split("youtu.be/")[1];
  }
  return video.split("v=")[1];
};
