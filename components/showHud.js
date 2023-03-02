function showHUD() {
  const selectors = [
    "#stand",
    "#hit",
    "#player_score",
    "#dealer_score",
    "#bank",
    "#bet",
    "#double_down",
  ];
  selectors.forEach((selector) => {
    document.querySelector(selector).classList.remove("hidden");
  });
  document.querySelector("#player_score span").textContent =
    totalValue(playerCards);
  document.querySelector("#dealer_score span").textContent =
    dealerCards[0].value;
}
