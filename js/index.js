import {
  x_button,
  o_button,
  button_click_sound,
  cells,
  restart_game,
  winText,
  win_parent,
} from "./html-elements.js";
import { GpuInit, currentPlayer } from "./gpu_game.js";
import isWinner from "./isWinner.js";
export let cellsArray = Array.from(cells);

export let board = [null, null, null, null, null, null, null, null, null];
let clickedIndex = [];
// Tanlangan Button X yoki O active class logikasi
x_button.addEventListener("click", () => {
  if (x_button.classList.contains("buttons_active")) {
    button_click_sound.pause();
  } else {
    button_click_sound.play();
  }
  if (
    o_button.classList.contains("buttons_active") ||
    !o_button.classList.contains("buttons_active")
  ) {
    x_button.classList.add("buttons_active");
    o_button.classList.remove("buttons_active");

    const x_paths = x_button.querySelectorAll("path");
    x_paths.forEach((p) => p.setAttribute("fill", "#1A2A33"));

    const o_paths = o_button.querySelectorAll("path");
    o_paths.forEach((p) => p.setAttribute("fill", "#A8BFC9"));
  }
});

o_button.addEventListener("click", () => {
  if (o_button.classList.contains("buttons_active")) {
    button_click_sound.pause();
  } else {
    button_click_sound.play();
  }
  if (
    x_button.classList.contains("buttons_active") ||
    !x_button.classList.contains("buttons_active")
  ) {
    o_button.classList.add("buttons_active");
    x_button.classList.remove("buttons_active");

    const o_paths = o_button.querySelectorAll("path");
    o_paths.forEach((p) => p.setAttribute("fill", "#1A2A33"));

    const x_paths = x_button.querySelectorAll("path");
    x_paths.forEach((p) => p.setAttribute("fill", "#A8BFC9"));
  }
});
restart_game.addEventListener("click", () => {
  board = [null, null, null, null, null, null, null, null, null];

  clickedIndex = [];

  cellsArray.forEach((cell) => {
    cell.innerHTML = "";
  });

  turn = "user";
  winText.textContent = "";
  winText.classList.remove("bg");
  gpu_game.textContent = "Yangi O'yin (AI bilan)";
});

let turn = "user";

cellsArray.map((cell, index) => {
  cell.addEventListener("click", () => {
    if (turn !== "user") return;

    const index = Number(cell.dataset.index);

    if (!clickedIndex.includes(cell.dataset.index)) {
      clickedIndex.push(cell.dataset.index);

      const userSymbol = currentPlayer.includes("X") ? "X" : "O";
      const aiSymbol = userSymbol === "X" ? "O" : "X";

      if (!board[index]) {
        board[index] = userSymbol;
        cell.innerHTML = `<img src='../images/game_zone/game_zone_${userSymbol.toLowerCase()}_img.svg'/>`;

        if (isWinner(userSymbol)) {
          return (
            (winText.textContent = "Siz yutdingiz!") &&
            winText.classList.add("bg")
          );
        }

        turn = "ai";
        setTimeout(() => {
          const freeCells = board
            .map((v, i) => (v === null ? i : null))
            .filter((i) => i !== null);
          if (freeCells.length === 0) return;

          const aiIndex =
            freeCells[Math.floor(Math.random() * freeCells.length)];
          board[aiIndex] = aiSymbol;
          cellsArray[
            aiIndex
          ].innerHTML = `<img src='../images/game_zone/game_zone_${aiSymbol.toLowerCase()}_img.svg'/>`;

          if (isWinner(aiSymbol)) return (winText.textContent = "AI yutdi!");

          turn = "user";
        }, 500);
      }
    } else {
      console.log("Bu katak band!");
    }
  });
});

GpuInit();
