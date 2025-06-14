function playSound(type) {
  const audio = new Audio();
  switch (type) {
    case "add":
      audio.src = "sounds/add.mp3";
      break;
    case "save":
      audio.src = "sounds/save.mp3";
      break;
    case "delete":
      audio.src = "sounds/delete.mp3";
      break;
    case "error":
      audio.src = "sounds/error.mp3";
      break;
    default:
      return;
  }
  audio.play().catch(e => console.warn("Audio error:", e));
}
