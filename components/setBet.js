function setBet() {
  let betSetted = false;
  const betWrapper = document.querySelector("#bet_wrapper");
  const betButtons = document.querySelector("#bet_buttons");
  const buttonMoreBet = document.querySelector("#button_more_bet");
  const buttonLessBet = document.querySelector("#button_less_bet");
  const buttonSetBet = document.querySelector("#button_set_bet");

  // Show the bet wrapper and buttons
  betWrapper.classList.remove("hidden");
  betButtons.classList.remove("hidden");

  refreshBetHUD();

  // Increase bet when
  buttonMoreBet.addEventListener("click", () => {
    if (!betSetted) {
      increaseBet();
      refreshBetHUD();
    }
  });
  window.addEventListener("keydown", (e) => {
    if (!betSetted && e.key === "ArrowUp") {
      increaseBet();
      refreshBetHUD();
    }
  });

  // Decrease bet when
  buttonLessBet.addEventListener("click", () => {
    if (!betSetted) {
      decreaseBet();
      refreshBetHUD();
    }
  });
  window.addEventListener("keydown", (e) => {
    if (!betSetted && e.key === "ArrowDown") {
      decreaseBet();
      refreshBetHUD();
    }
  });

  // Set the bet when 'Set Bet'
  buttonSetBet.addEventListener("click", () => {
    if (!betSetted) {
      betWrapper.classList.add("hidden");
      betButtons.classList.add("hidden");
      dealFirstCards();
      betSetted = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (!betSetted && e.key === "Enter") {
      betWrapper.classList.add("hidden");
      betButtons.classList.add("hidden");
      dealFirstCards();
      betSetted = true;
    }
  });
}
