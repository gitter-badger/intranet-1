<?php
/** @var $this Intra\Core\Control */

use Intra\Service\Payment\UserPayment;
use Intra\Service\User\UserSession;

$request = $this->getRequest();
$paymentid = $request->get('paymentid');
$key = $request->get('key');
$value = $request->get('value');

$payment_service = new UserPayment(UserSession::getSupereditUserDto());
return $payment_service->edit($paymentid, $key, $value);
