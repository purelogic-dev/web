<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arActivityDescription = array(
	"NAME" => GetMessage("BPSFA_DESCR_NAME"),
	"DESCRIPTION" => GetMessage("BPSFA_DESCR_DESCR"),
	"TYPE" => "activity",
	"CLASS" => "SetFieldActivity",
	"JSCLASS" => "BizProcActivity",
	"CATEGORY" => array(
		"ID" => "document",
	),
);
?>
