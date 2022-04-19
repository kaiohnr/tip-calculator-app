class calculatorTip {
  billValueEl = document.getElementById('bill-input');

  percentageValuesEl = document.querySelectorAll('.percetages-items');
  percentageValueNumber = document.querySelectorAll('.percertange-value');
  customPercentageValueEl = document.getElementById('bill-custom-value');

  numberOfPeopleEl = document.getElementById('numper-people-input');

  tipAmountValueEl = document.getElementById('tip-amount');
  tipTotalValueEl = document.getElementById('tip-total');

  resetBtn = document.getElementById('reset-btn');

  emptyValueBillTitle = document.getElementById('empty-value-bill')
  emptyValuePeopleTitle = document.getElementById('empty-value-people')




  constructor() {
    this.selectPercentageValues();

    this.billValueEl.addEventListener('keyup',this.calculateBillValuePerPerson.bind(this));
    this.numberOfPeopleEl.addEventListener('keyup', this.calculateBillValuePerPerson.bind(this));

    this.billValueEl.addEventListener('keyup', this.calculateTipPerPerson.bind(this));
    this.numberOfPeopleEl.addEventListener('keyup',this.calculateTipPerPerson.bind(this));


    this.resetBtn.addEventListener('click', this.resetValues.bind(this));
  }

  billValue() {
    const billValue = this.billValueEl.value;
    return billValue;
  }

  numberOfPeople() {
    const peopleNumber = this.numberOfPeopleEl.value;
    return peopleNumber;
  }

  // Add active class to the selected porcentage value
  selectPercentageValues() {
    this.percentageValuesEl.forEach((li) => {
      li.addEventListener('click', () => {
        this.removeSelectedValues();
        li.classList.add('active');
        this.customPercentageValueEl.value = '';
      });
    });
  }

  // Remove active class to the selected porcentage value
  removeSelectedValues() {
    this.percentageValuesEl.forEach((el) => {
      el.classList.remove('active');
    });
  }

  // Get the selected percetange value
  getPercetageValue() {
    this.percentageValuesEl.forEach((value) => {
      if (value.classList.contains('active')) {
        return +value.children[0].textContent.match(/\d+/g)[0];
      }
    });
  }

  // Get the custom percentage value
  getCustomPercentageValue() {
    let percertangeValue = 0;
    if (+this.customPercentageValueEl.value === 0) {
      this.percentageValuesEl.forEach((li) => {
        if (li.classList.contains('active')) {
          percertangeValue = +li.children[0].textContent.match(/\d+/g)[0];
        }
      });
    }

    if (+this.customPercentageValueEl.value !== 0) {
      percertangeValue = +this.customPercentageValueEl.value;
    }
    return percertangeValue;
  }

  // Tip amount / person
  calculateTipPerPerson() {
    let tipPerPerson = 0;
    if (this.getCustomPercentageValue() === 0) return;
    this.addEmptyClass()
    this.removeEmptyClass()

    if (this.billValueEl.value && this.numberOfPeopleEl.value && this.getCustomPercentageValue() != 0) {
      tipPerPerson = this.billValueEl.value/100 * this.getCustomPercentageValue() / this.numberOfPeopleEl.value
      this.tipAmountValueEl.textContent = tipPerPerson.toFixed(2)
    }
    return tipPerPerson;
  }

  // Tip total / person
  calculateBillValuePerPerson() {
    if (this.getCustomPercentageValue() === 0) return;
    this.addEmptyClass()
    this.removeEmptyClass()

    if (this.billValueEl.value || this.numberOfPeopleEl.value == '') {
      this.tipTotalValueEl.textContent = '0.00';
      this.tipAmountValueEl.textContent = '0.00'
    }
    if (this.billValueEl.value && this.numberOfPeopleEl.value != '') {
      const billValuePerPerson = this.billValueEl.value / this.numberOfPeopleEl.value + +this.calculateTipPerPerson();
      this.tipTotalValueEl.textContent = billValuePerPerson.toFixed(2)
    }
  }

  addEmptyClass() {
    if (this.billValueEl.value != '' && this.getCustomPercentageValue() != 0 && this.numberOfPeopleEl.value == '') {
      this.numberOfPeopleEl.classList.add('value-input-empty')
      this.emptyValuePeopleTitle.style.display= 'block'
    }
    if (this.numberOfPeopleEl.value != '' && this.getCustomPercentageValue() != 0 && this.billValueEl.value == '') {
      this.billValueEl.classList.add('value-input-empty')
      this.emptyValueBillTitle.style.display = 'block'
    }
  }

  removeEmptyClass() {
    if (this.billValueEl.value != '' && this.getCustomPercentageValue() != 0 && this.numberOfPeopleEl.value != '') {
      this.numberOfPeopleEl.classList.remove('value-input-empty')
      this.emptyValuePeopleTitle.style.display= 'none'
    }
    if (this.numberOfPeopleEl.value != '' && this.getCustomPercentageValue() != 0 && this.billValueEl.value != '') {
      this.billValueEl.classList.remove('value-input-empty')
      this.emptyValueBillTitle.style.display = 'none'
    }
  }

  resetValues() {
    this.billValueEl.value = '';
    this.customPercentageValueEl.value = '';
    this.numberOfPeopleEl.value = '';
    this.tipTotalValueEl.textContent = '0.00';
    this.tipAmountValueEl.textContent = '0.00';
    this.removeSelectedValues();
  }
}

new calculatorTip();
