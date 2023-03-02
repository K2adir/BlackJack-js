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
  window.addEventListener("keydown", function (e) {
    if (!betSetted && e.key === 38) {
      increaseBet();
      refreshBetHUD();
    }
  });

  document
    .querySelector("#button_less_bet")
    .addEventListener("click", function () {
      if (!betSetted) {
        decreaseBet();
        refreshBetHUD();
      }
    });

  window.addEventListener("keydown", function (e) {
    if (!betSetted && e.key === 40) {
      decreaseBet();
      refreshBetHUD();
    }
  });

  document
    .querySelector("#button_set_bet")
    .addEventListener("click", function () {
      if (!betSetted) {
        document.querySelector("#bet_wrapper").classList.add("hidden");
        document.querySelector("#bet_buttons").classList.add("hidden");
        dealFirstCards();
        betSetted = true;
      }
    });

  window.addEventListener("keyup", function (e) {
    if (!betSetted && e.key === 13) {
      document.getElementById("bet_wrapper").classList.add("hidden");
      document.getElementById("bet_buttons").classList.add("hidden");
      dealFirstCards();
      betSetted = true;
    }
  });
}
