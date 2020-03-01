document.getElementById("cardNumber").onkeyup =function() {
  this.value =this.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");;
};

let data = {
  mao : [0.65, 20.5, "maotaiPrice", 'maoPop', 3],
  wu : [1, 30, "wuPrice", 'wuPop', 3],
  jian : [0.85, 40, "jianPrice",'jianPop', 5],
  er : [0.6, 50, "erPrice",'erPop', 6]
};

let priceId = {
  'maoEmpty' : "maotaiPrice",
  'wuEmpty' : "wuPrice",
  'jianEmpty' : "jianPrice",
  'erEmpty' : "erPrice"
};

function getSinglePrice(wine) {
  let wineData = data[wine];
  let id = document.getElementById(wine);
  let amount = parseInt(id.options[id.selectedIndex].text);
  let remain = wineData[4] - amount;
  let popId = '#' + wineData[3];
  $(popId).attr('data-content', remain.toString());
  let totalPrice = undefined;
  if (amount === 0) {
    totalPrice = 0;
  } else {
    totalPrice = wineData[0] * wineData[1] * amount;
  }
  document.getElementById(wineData[2]).innerText = "$" + totalPrice.toFixed(2).toString();
  getTotalPrice();
}



function getTotalPrice() {
  let arr = [];
  arr[0] = document.getElementById("maotaiPrice").innerText;
  arr[1] = document.getElementById("wuPrice").innerText;
  arr[2] = document.getElementById("jianPrice").innerText;
  arr[3] = document.getElementById("erPrice").innerText;
  let totalPrice = 0;
  for (let price of arr){
    totalPrice += parseFloat(price.substring(1, price.length));
  }
  totalPrice = totalPrice.toFixed(2);
  let total = 'Total:$' + totalPrice.toString();
  document.getElementById("totalPrice").innerText = total;
}
getTotalPrice();

function emptyItem(emptyId) {
  let total = document.getElementById("totalPrice");
  let totalPrice = total.innerText;
  totalPrice = totalPrice.substring(7, totalPrice.length);
  totalPrice = parseFloat(totalPrice);
  let singlePriceId = priceId[emptyId];
  let raw = document.getElementById(singlePriceId).innerText;
  let singlePrice = parseFloat(raw.substring(1, raw.length));

  totalPrice -= singlePrice;
  totalPrice = totalPrice.toFixed(2).toString();
  totalPrice = 'Total:$' + totalPrice;
  total.innerText = totalPrice;
}

$(function () {
  $('[data-toggle="popover"]').popover()
});

function limit(element,max){
  if (element > max) {
    return max;
  } else {
    return element;
  }
}

(function () {
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())