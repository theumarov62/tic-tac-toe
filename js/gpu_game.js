import {
  gpu_game,
  game_zone,
  hero,
  x_button,
  o_button,
  toast_selectable,
  title,
  alert_error_sound,
} from "./html-elements.js";
import { board, cellsArray } from "./index.js";
import isWinner from "./isWinner.js";
let currentPlayer = [];

export function GpuInit() {
  gpu_game.addEventListener("click", () => {
    if (x_button.classList.contains("buttons_active")) {
      currentPlayer.push("X");
    } else if (o_button.classList.contains("buttons_active")) {
      currentPlayer.push("O");
    }

    const userSymbol = currentPlayer.includes("X") ? "X" : "O";
    const aiSymbol = userSymbol === "X" ? "O" : "X";

    gpu_game.textContent = "O'yin kartasi yaratilmoqda";

    function random() {
      const freeCells = board
        .map((v, i) => (v === null ? i : null))
        .filter((i) => i !== null);
      if (freeCells.length === 0) return;

      const aiIndex = freeCells[Math.floor(Math.random() * freeCells.length)];
      board[aiIndex] = aiSymbol;
      cellsArray[
        aiIndex
      ].innerHTML = `<img src='../images/game_zone/game_zone_${aiSymbol.toLowerCase()}_img.svg'/>`;

      if (isWinner(aiSymbol)) console.log("AI won!");
    }

    if (
      x_button.classList.contains("buttons_active") &&
      !o_button.classList.contains("buttons_active")
    ) {
      setTimeout(() => {
        gpu_game.textContent = "Yangi O'yin (AI bilan)";
        if (game_zone.classList.contains("none_zone")) {
          game_zone.classList.remove("none_zone");
          hero.classList.add("none_zone");
        } else {
          game_zone.classList.add("none_zone");
          hero.classList.remove("none_zone");
        }
        if (aiSymbol === "X") random();
      }, 3000);
    } else if (
      !x_button.classList.contains("buttons_active") &&
      o_button.classList.contains("buttons_active")
    ) {
      setTimeout(() => {
        gpu_game.textContent = "Yangi O'yin (AI bilan)";
        if (game_zone.classList.contains("none_zone")) {
          game_zone.classList.remove("none_zone");
          hero.classList.add("none_zone");
        } else {
          game_zone.classList.add("none_zone");
          hero.classList.remove("none_zone");
        }
        if (aiSymbol === "X") random();
      }, 3000);
    } else if (
      !x_button.classList.contains("buttons_active") &&
      !o_button.classList.contains("buttons_active")
    ) {
      setTimeout(() => {
        toast_selectable.classList.add("toast_view");

        gpu_game.textContent = "Yangi O'yin(AI bilan)";
        title.classList.add("error_text");
        if (toast_selectable.classList.contains("toast_view")) {
          alert_error_sound.play();
          setTimeout(() => {
            toast_selectable.classList.remove("toast_view");
          }, 3000);
        }
      }, 3000);
    }
  });
}

export { currentPlayer };
