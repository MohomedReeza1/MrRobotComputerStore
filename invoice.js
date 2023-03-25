const invoiceDetails = JSON.parse(localStorage.getItem('invoiceObj'));

function setUserDetails(){
  let clientElement = document.getElementById('client');
  clientElement.getElementsByClassName('name')[0].innerText = invoiceDetails.userName;
  clientElement.getElementsByClassName('address')[0].innerText = invoiceDetails.address;
  clientElement.getElementsByClassName('phone')[0].innerText = invoiceDetails.phoneNumber;
  clientElement.getElementsByClassName('email')[0].innerHTML = `<a href=${invoiceDetails.email}>${invoiceDetails.email}</a>`;

}

function setInvoiceTable(){
  let itemRows = ''
  for(let i=0;i < invoiceDetails.items.length; i++){
    if(i+1 < 10){
      itemRows += `<tr>
      <td class="no">0${i+1}</td>
      <td class="desc"><h3>${invoiceDetails.items[i].description}</h3></td>
      <td class="unit">${invoiceDetails.items[i].unitPrice}</td>
      <td class="qty">${invoiceDetails.items[i].quantity}</td>
      <td class="total">${invoiceDetails.items[i].itemTotal}</td>
    </tr>`
    } else {
      itemRows += `<tr>
      <td class="no">${i+1}</td>
      <td class="desc"><h3>${invoiceDetails.items[i].description}</h3></td>
      <td class="unit">${invoiceDetails.items[i].unitPrice}</td>
      <td class="qty">${invoiceDetails.items[i].quantity}</td>
      <td class="total">${invoiceDetails.items[i].itemTotal}</td>
    </tr>`
    }
  }

  document.getElementsByTagName('tbody')[0].innerHTML = itemRows;
  document.getElementById('itemTotal').innerHTML = invoiceDetails.total;
}

setUserDetails();
setInvoiceTable();