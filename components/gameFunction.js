function setBet() {
  let betSetted = false;
  const betWrapper = document.querySelector("#bet_wrapper");
  const betButtons = document.querySelector("#bet_buttons");

  betWrapper.classList.remove("hidden");
  betButtons.classList.remove("hidden");
  refreshBetHUD();

  const buttonMoreBet = document.querySelector("#button_more_bet");

  buttonMoreBet.addEventListener("click", function () {
    if (!betSetted) {
      increaseBet();
      refreshBetHUD();
    }
  });
}
