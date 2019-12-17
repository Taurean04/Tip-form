const form = document.getElementById('tip-form');
const bill = document.getElementById('input-bill');
const users = document.getElementById('input-users');
const serviceIn = document.getElementById('input-service');
const feedback = document.querySelector('.feedback');
const load =  document.querySelector('.loader');
const result = document.querySelector('.results');
const tipDOM = document.getElementById('tip-amount');
const totalDOM = document.getElementById('total-amount');
const personDOM = document.getElementById('person-amount');

const services = [{
    value: 1,
    title: "great - 20%"
  },{
    value: 2,
    title: "good - 10%"
  },{
    value: 3,
    title: "bad - 2%"
  }]

const valInput = (amount, numUser, selService) => {
    let isFeedback = false;
    feedback.innerHTML = '';
    if(amount === '' || amount <= '0'){
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += `<p>Bill amount cannot be blank</p>`;
        isFeedback = true;
    }

    if(numUser <= '0'){
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += `<p>Users must be more zero</p>`;
        isFeedback = true;
    }

    if(selService === '0'){
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += `<p>You must select a Service</p>`;
        isFeedback = true;
    }

    setTimeout(() => {
        feedback.classList.remove('showItem', 'alert-danger');
    }, 10000);

    return isFeedback;
}

const calTip = (amount, numUser, selService) => {
    let perTip = '';
    if(selService === '1'){
        perTip = 0.2;
    }else if(selService === '2'){
        perTip = 0.1;
    }else{
        perTip = 0.02;
    }

    const tipAmount = Number(amount) * perTip;
    const total = Number(amount) + Number(tipAmount);
    const person = Number(total) / Number(numUser);

    return [tipAmount, total, person];
}
services.forEach(service => {
    const option = document.createElement('option');
    option.textContent = service.title;
    option.value = service.value;
    serviceIn.appendChild(option);
});
form.addEventListener('submit', e => {
    e.preventDefault();
    let amount = bill.value;
    let numUser = users.value;
    let selService = serviceIn.value;

    const isFeedback = valInput(amount, numUser, selService);

    if(!isFeedback){
        const results = calTip(amount, numUser, selService);
        load.classList.add('showItem');
        setTimeout(() => {
            load.classList.remove('showItem');
            tipDOM.textContent = `${results[0].toFixed(2)}`;
            totalDOM.textContent = `${results[1].toFixed(2)}`;
            personDOM.textContent = `${results[2].toFixed(2)}`;
            result.classList.add('showItem');
        }, 2000);

        setTimeout(() => {
            bill.value = '';
            users.value = '';
            serviceIn.value = 0;
            result.classList.remove('showItem');
        }, 10000)
    }
});