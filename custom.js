(function( $ ) {
	'use strict';

  /**
   * Localize PHP Variables
  */
  var form_type = data.form_type,
    promo_URL = data.promo_url,
    form_config = data.form_config,
    symbol_code = (form_type == 'basic_uk'|| form_type == 'premium_uk' ) ? '£' : '$';

  /**
    * Common Elements
  */
  var $body = $('body'),
    $promo_code_input = $("#textPromoCode", $body),
    promoCode;

  /**
    * On Ready
  */
  $(document).ready(function() {
    /**
      * Check for pre-exisitng promo code
    */
    promoCode = $("#textPromoCode", $body).val();
    if( promoCode != ''){
      promoCodeVerify();
    }
  });

  /**
    * Verify Code On Click
  */
  $(document).on("click", "#promoCodeVerify", function(e) {
    e.preventDefault();
    promoCodeVerify();
  });

  /**
    * Promo Code Verification
  */
  function promoCodeVerify(){
    var price_of_system = price_format(form_config.plan_a_totalpayment),
      price_of_kitbag = price_format(form_config.bump_plan_a_totalpayment),
      price_of_basic_kitbag = price_format(bump_plan_a_basic_payment);

    var promo_ajax = $.ajax({
      url     : promo_URL,
      method  : "POST",
      cache   : false,
      data    : {
        promoCode : $promo_code_input.val(),
        form_type : form_type
      },
      dataType: "json"
    });
    promo_ajax.done(function( response ) {
    if( response ){
      var promo_type = response.promocode_type,
        promo_value = response.promocode_value,
        //Values
        system_discount = price_format(promo_value),
        system_afterDisc = 0,
        kitBaag_discount = 0,
        kitBaag_afterDisc = 0,
        //Elements
        $sideMutuPrice = $(".sideMutuPrice", $body),
        $mutuKitBag = $("div#mutuKitBag_cc p.price_right_side", $body),
        $totalWithOutkit = $("div#totalWithOutkit", $body),
        $totalWithKit = $("div#totalWithKit", $body),
        $totalAfterDiscount = $(".mutuSystemCont strong", $body),
        $kitDescription = $(".clearfix.kitbag_description .kitBagCC", $body),
        //Message
        resultMessage = '';

      switch (promo_type) {
        //Not Found
        case 'not_found':
          //Set Values
          system_afterDisc = price_format( price_of_system - ( price_of_system*system_discount/100 ) );
          kitBaag_afterDisc = price_format( price_of_kitbag - ( price_of_kitbag*kitBaag_discount/100 ) );
          //Update HTML
          $sideMutuPrice.html('<span class="price_co_c"> <span class="doted-price" >'+symbol_code+''price_of_system+'</span> </span>');
          $mutuKitBag.html('<span class="price_co_c"><span class="doted-price">'+symbol_code+''+price_of_basic_kitbag+'</span> <span class="doted-price">'+symbol_code+''+price_of_kitbag+'</span></span>');
          $totalWithOutkit.html('<span class="order-total">'+symbol_code+''+(system_afterDisc)+'</span>');
          $totalWithKit.html('<span class="order-total">'+symbol_code+( price_format( system_afterDisc + kitBaag_afterDisc ) )+'</span>');
          $totalAfterDiscount.html(symbol_code+''+(system_afterDisc)+'');
          $kitDescription.html(symbol_code+''+(kitBaag_afterDisc)+'');
          resultMessage = "<p class='ValidCCC'>Not Valid Code</p>";
          break;
        case 'mutusystem_fixed_promo':
          //Etc etc
          break;
        case 'kitbag_percentage_promo':
          //Etc etc
          break;
        case 'kitbag_fixed_promo':
          //Etc etc
          break;
        default:
         //Etc etc
      }
      //Update Fileds
      $(".promoCodeInput", $body).val( price_format(promo_value) );
      $("#promoCodeType", $body).val(promo_type);
      //Remove Notices
      $(".ValidCCC", $body).remove();
      $(".notValidCCC", $body).remove();
      //Add Message
      $(".promoCodeInput").append(resultMessage);
    }
  });

  /**
    * Format Price Function
  */
  function price_format(amount){
    return parseFloat(amount).toFixed(2);
  }


})( jQuery );
