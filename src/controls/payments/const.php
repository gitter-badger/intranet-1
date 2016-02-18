<?php
/** @var $this Intra\Core\Control */

use Intra\Service\Payment\UserPayment;
use Intra\Service\User\UserSession;

$request = $this->getRequest();
$key = $request->get('key');

$payment_service = new UserPayment(UserSession::getSupereditUserDto());
return $payment_service->getConstValueByKey($key);
