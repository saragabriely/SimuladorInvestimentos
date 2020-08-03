jQuery(document).ready(function ($) {
    let compoundInterest = {}
  
    let SELIC = 0.065
  
    compoundInterest.setDefaultValues = function () {
      $('#profitability').val((SELIC * 100).toFixed(2).replace('.', ','));
    } 
  
    compoundInterest.calculate = function (initial, monthly, profitability, period, interestIsMonthly = true) {
      profitability = monthlyInterest(profitability / 100, interestIsMonthly)
      initial = parseFloat(initial)
      monthly = parseFloat(monthly)
      let total = totalInvestment(initial, monthly, period)
      let accrued = accruedEarnings(initial, monthly, profitability, period)
   
      return {
        totalInvestment: total,
        totalEarning: totalEarning(total, accrued),
        accruedEarnings: accrued
      }
    }
  
    const totalInvestment = function (initial, monthly, period) {
      return (initial + (monthly * period)).toFixed(2)
    }
  
    const totalEarning = function (total, accrued) {
      return (accrued - total).toFixed(2)
    }
  
    const accruedEarnings = function (initial, monthly, profitability, period) {
      let total = initial * Math.pow(1 + profitability, period)
      for (let i = period - 1; i >= 0; i--) {
        total += monthly * Math.pow(1 + profitability, i)
      }
      return total.toFixed(2)
    }
  
    const monthlyInterest = function (interest, interestIsMonthly) {
      let value = interestIsMonthly ? interest : Math.pow(1 + parseFloat(interest), 1 / 12) - 1
      return +(value).toFixed(4)
    }
  
    compoundInterest.start = function () {
      let initial = parseFloat(jQuery('#initial').val().replace(/\./g, '').replace(',', '.'), 10)
      let monthly = parseFloat(jQuery('#monthly').val().replace(/\./g, '').replace(',', '.'), 10)
      let profitability = parseFloat($('#profitability').val().replace('.', '').replace(',', '.'), 10)
      let period = $('#period').val()
      let interestIsMonthly = $('#interestIsMonthly').val() === '2'
  
      let results = compoundInterest.calculate(initial, monthly, profitability, period, interestIsMonthly)
      
  
      console.log('inicial2 => ', initial, 'monthly => ', monthly, 'profitability => ', profitability);
      console.log('results => ', results);
  
      this.render(results)
    }
  
    compoundInterest.render = function (results) {
      $('#totalInvestment').text('R$ ' + Number(results.totalInvestment).formatMoney(2, ',', '.'))
      $('#totalEarning').text('R$ ' + Number(results.totalEarning).formatMoney(2, ',', '.'))
      $('#accruedEarnings').text('R$ ' + Number(results.accruedEarnings).formatMoney(2, ',', '.'))
  
      $('.c-form-simulador__resultado__wrap').fadeIn(1500);
    }
  
    $('.simulador-calcular').click(function(e) {
      e.preventDefault();
  
      let simuladorValidaded = formSimuladorValidator();
  
      if (simuladorValidaded) {
        compoundInterest.start();
  
        $('html, body').animate({
          scrollTop: $('.c-form-simulador__simulador').height() + 300}, 750);
      }
    });
  
    compoundInterest.setDefaultValues();
  });