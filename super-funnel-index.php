<?php
#Original Code Was Like So

$type_of_form_value = $form_id;
$symbol_code_value  = '';

if($type_of_form_value == 'basic_uk'|| $type_of_form_value == 'premium_uk' ){
    $symbol_code_value  = '£';
}else{
    $symbol_code_value  = '$';
}
if($type_of_form_value == 'basic_uk') echo '<script type="text/javascript" src="https://ph364.infusionsoft.com/app/webTracking/getTrackingCode"></script>';
if($type_of_form_value == 'basic_us') echo '<script type="text/javascript" src="https://pz138.infusionsoft.com/app/webTracking/getTrackingCode"></script>';
if($type_of_form_value == 'premium_uk') echo '<script type="text/javascript" src="https://ph364.infusionsoft.com/app/webTracking/getTrackingCode"></script>';
if($type_of_form_value == 'premium_us') echo '<script type="text/javascript" src="https://pz138.infusionsoft.com/app/webTracking/getTrackingCode"></script>';
?>


<?php
#My Preference Would be
#Determine Form Location UK || US
$is_uk = ($form_id == 'basic_uk' || $form_id == 'premium_uk' ) ? true : false;
$symbol_code_value = ($is_uk) ? '£' : '$';
#Infusion Soft Script Prefix By Location
$IS_prefix = ($is_uk) ? 'ph364' : 'pz138';
?>
<?php #Testing Git Desktop ?>
<!-- Infusionsoft Tracking By Location -->
<script type="text/javascript" src="https://<?php echo $IS_prefix; ?>.infusionsoft.com/app/webTracking/getTrackingCode"></script>
