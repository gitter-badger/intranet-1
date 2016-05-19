<?php
/** @var $this Intra\Core\Control */

use Intra\Lib\Response\CsvResponse;
use Intra\Service\Holiday\UserHolidayStat;
use Intra\Service\User\UserPolicy;
use Intra\Service\User\UserSession;

$request = $this->getRequest();

if (!UserPolicy::isHolidayEditable(UserSession::getSelfDto())) {
	exit;
}

//input
$year = $request->get('year');
if (!intval($year)) {
	$year = date('Y');
}

$user_holiday = new UserHolidayStat(UserSession::getSelfDto());
$holidays = $user_holiday->getHolidaysAllUsers($year);

$csvs = [
	'신청날짜' => 'request_date',
	'신청자' => 'uid_name',
	'결재자' => 'manager_uid_name',
	'종류' => 'type',
	'사용날짜' => 'date',
	'소모연차' => 'cost',
	'업무인수인계자' => 'keeper_uid_name',
	'비상시연락처' => 'phone_emergency',
	'비고' => 'memo',
];
$rows = [];
$rows[] = array_keys($csvs);
foreach ($holidays as $holiday) {
	$row = [];
	foreach ($csvs as $key) {
		$row[] = $holiday->$key;
	}
	$rows[] = $row;
}

$response = new CsvResponse($rows);
$response->send();
exit;
