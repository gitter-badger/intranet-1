<?php
/** @var $this Intra\Core\Control */

use Intra\Lib\Response\CsvResponse;
use Intra\Service\Holiday\UserHoliday;
use Intra\Service\Holiday\UserHolidayPolicy;
use Intra\Service\User\UserService;
use Intra\Service\User\UserSession;

$request = $this->getRequest();
$self = UserSession::getSelfDto();

if (!$self->is_admin) {
	exit;
}

$users = UserService::getAllUserDtos();

$year = $request->get('year');
if (!intval($year)) {
	$year = date('Y');
}

$rows = [
	['연도', '이름', '입사일자', '퇴사일자', '연차부여', '사용일수', '잔여일수']
];

foreach ($users as $user) {
	$user_holiday = new UserHoliday($user);
	$user_holiday_policy = new UserHolidayPolicy($user);

	$joinYear = $user_holiday->getYearByYearly(1);
	$yearly = $year - $joinYear + 1;

	$fullCost = $user_holiday_policy->getAvailableCost($yearly);
	$usedCost = $user_holiday_policy->getUsedCost($yearly);
	$remainCost = $fullCost - $usedCost;

	$rows[] = [
		$year,
		$user->name,
		$user->on_date,
		$user->off_date,
		$fullCost,
		$usedCost,
		$remainCost
	];
}

$response = new CsvResponse($rows);
$response->send();
exit;
