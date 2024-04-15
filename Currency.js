let form = document.querySelector("form");
form.addEventListener("submit", function (submit) {
  // منع إرسال النموذج
  submit.preventDefault();
  // استدعاء القيم
  let amount = document.getElementById("amount").value;
  let inputCurrency = document.getElementById("input-curruncy").value;
  let outputCurrency = document.getElementById("output-curruncy").value;

  convertCurrency(amount, inputCurrency, outputCurrency);
});

function convertCurrency(amount, inputCurrency, outputCurrency) {
  fetch(
    "https://api.currencyfreaks.com/latest?apikey=3cbdc9353a3b473cb47bfd1a68a3b35a"
  )
    .then((result) => {
      //   console.log(result);
      let myData = result.json();
      // console.log(myData);
      return myData;
    })
    .then((data) => {
      // استخراج سعر تحويل العملة بالدولار
      let exchangeRate;
      if (inputCurrency !== outputCurrency) {
        if (inputCurrency === "JOD" && outputCurrency === "USD") {
          exchangeRate = data.rates["JOD"];
        } else if (inputCurrency === "USD" && outputCurrency === "JOD") {
          exchangeRate = 1 / data.rates["JOD"];
        } else {
          console.log("Invalid currency conversion");
        }
      } else {
        console.log("Both currencies are the same.");
        exchangeRate = 1;
      }
      // حساب المبلغ بعدالتحويل
      let convertedAmount = amount * exchangeRate;

      //عرض النتيجة
      document.querySelector(".Converted-amount").textContent =
        " " + `   ${convertedAmount.toFixed(2)} - ${outputCurrency}  `;
    })
    .catch((error) => {
      // طباعة خطأ بأكثر من طريقة

      // window.alert(`Error fetching ${error}`);

      console.log(Error(`Error Fetching Data :${error}`));
      document.querySelector(
        ".Converted-amount"
      ).textContent = ` Error fetching `;
    });
}
