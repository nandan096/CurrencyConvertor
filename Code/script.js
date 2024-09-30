const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon = document.querySelector("i");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

let apikey = "5240915292d198fe48f979b8";
  const URL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurr.value}`;
  fetch(URL)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      let exchangerate = result.conversion_rates[toCurr.value];
      let totalexg = (amtVal * exchangerate).toFixed(2);
      msg.innerText = `👉${amtVal} ${fromCurr.value} = ${totalexg} ${toCurr.value}`;
    });
});
