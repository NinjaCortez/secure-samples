<?php
#Get Post Values
$pass_form_id = isset( $_POST['form_type'] ) ? $_POST['form_type'] : false;
$promoCode_from_ajax_input = isset( $_POST['promoCode'] ) ? strtolower((string) $_POST['promoCode'] ) : false;
#Set Default
$return_promo_value = array(
  'promocode_value' => 0,
  'promocode_type'  => 'not_found',
);
#Check Post Values
if( $pass_form_id && $promoCode_from_ajax_input ){
  #Require Config
  require_once 'funnel-config.php';
  #Check Form Config is set
  $this_form_config = isset( $forms[$pass_form_id] ) ? $forms[$pass_form_id] : false;
  if( $this_form_config ){
    $promo_array = array(
      'promo_code_mutusystem_percentage_amount' => 'mutusystem_percentage_promo',
      'promo_code_mutusystem_fixed_amount'      => 'mutusystem_fixed_promo',
      'promo_code_kitbag_fixed_amount'          => 'kitbag_fixed_promo',
      'promo_code_kitbag_percentage_amount'     => 'kitbag_percentage_promo',
    );
    foreach ($promo_array as $key => $type) {
      if (array_key_exists($promoCode_from_ajax_input, $this_form_config[$key])){
        $return_promo_value['promocode_value'] = $this_form_config[$key][$promoCode_from_ajax_input];
        $return_promo_value['promocode_type'] = $type;
        break;
      }
    }
  }
}
die(json_encode($return_promo_value));
?>
