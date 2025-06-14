function playSound(type) {
  const audio = new Audio();
  if (type === "error") {
    audio.src = "sounds/error.mp3";
  } else if (type === "success") {
    audio.src = "sounds/success.mp3";
  } else {
    return;
  }
  audio.play();
}
