<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Title");
?>
<section class="service">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h2>Услуги по токарной обработке материалов</h2>
			</div>
			<div class="col-md-6">
				<p>Компания "Purelogic R&D" предлагает услуги по токарной обработке.</p>
				<h5>Возможны следующие виды работ: </h5>
				<ul>
					<li>• Пооперационные токарные работы на заказ (точение, <br/>нарезание резьбы, и т.д.)</li>
					<li>• Изготовление токарных изделий (втулки, фланцы, оси и др.)</li>
					<li>• Изготовление токарных изделий (втулки, фланцы, оси и др.)</li>
					
				</ul>
				<h5>Параметры обрабатываемых изделий: </h5>
				<ul>
					<li>• Стали низко и высокоуглеродистые, легированные</li>
					<li>• Стали с поверхностной и глубокой закалкой (с предварительным отпуском и последующей закалкой в индукционной печи)</li>
					<li>• Алюминий и его сплавы</li>
					<li>• Полиамид</li>
					<li>• Капролон и другие синтетические материалы. </li>
					<li>• Материал может быть предоставлен, как Вами, так и нашей компанией.</li>
					
				</ul>
			</div>
			<div class="col-md-6 ser_ul_2">
				<h5>Производится обработка следующих материалов: </h5>
				<ul>
					<li>• Диаметр обработки — от 3 до 500 мм.</li>
					<li>• Наибольший диаметр обрабатываемого прутка — 50 мм</li>
					<li>• Наибольшая длина обтачивания — 645 мм.</li>
					<li>• Масса заготовки — не более 30 кг.</li>
					<li> Материал может быть предоставлен, как Вами, так и нашей компанией.</li>
					
				</ul>
				<h5>Стоимость токарных работ:</h5>
				<ul>
					<li>от 300 р. за 1 нормо-час. </li>
					<li>Точная стоимость определяется исходя из объема партии заказа, технологического времени обработки, типа станка.</li>
				</ul>
			</div>
		</div>	
		<div class="row">
			<div class="col-md-4">
				<div class="ser_img_wr">
					<img src="/img/ser_1.jpg" alt="">
				</div>
			</div>
			<div class="col-md-4">
				<div class="ser_img_wr">
					<img src="/img/ser_2.jpg" alt="">
				</div>
			</div>
			<div class="col-md-4">
				<div class="ser_img_wr">
					<img src="/img/ser_3.jpg" alt="">
				</div>
			</div>
			<div class="col-md-12">
				<p>Токарная обработка провоизводится по чертежам, трехмерной модели, эскизу или образцу. Если у Вас нет готового чертежа, то возможно изготовление его по Вашему эскизу. Более подробно об этом Вы можете узнать у наших менеджеров.</p>
				<p>Токарные работы проводятся, как в плановом, так и в срочном порядке. Готовы рассмотреть и принять заказы не только на крупные, но и на 
				мелкосерийные партии и даже штучные изделия. Сроки исполнения зависят от технологической сложности изделия, объема партии и наличия материалов. 
				Предлагаемые услуги являются оптимальными по соотношению цены и качества. Наличие материалов и сроки исполнения заказа - уточняйте у наших 
				менеджеров.
				</p>
				<h5>Требования к чертежно-конструкторской документации:</h5>
				<p>Чертежи или эскизы деталей должны содержать все размеры деталей и допуски на них, материал для изготовления, технические требования, 
				шероховатости поверхностей. Необходимое количество изделий указать в спецификации или непосредственно в чертеже. Чертежи и 3D модели 
				принимаются в форматах: КОМПАС-3D V13, AutoCAD и JPEG.
				</p>

				
			</div>
			<div class="primer_service">
				<div class="col-md-12">
					<h2>Примеры токарной обработки:</h2>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<img src="/img/Layer-73.jpg" alt="">
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<img src="/img/ser_1.jpg" alt="">
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<img src="/img/Layer-73.jpg" alt="">
				</div>

				<div class="col-md-3 col-sm-6 col-xs-12">
					<img src="/img/ser_1.jpg" alt="">
				</div>
				
					
			</div>
			<div class="col-md-6">
				<h2>Заказ обработки:</h2>
				<p>Заполните все поля формы, оставив контактные данные, и наши специалисты оперативно свяжутся с Вами</p>
			</div>
			<div class="col-md-6">
				<?$APPLICATION->IncludeComponent(
	"bitrix:form.result.new", 
	".default", 
	array(
		"AJAX_MODE" => "Y",
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"CHAIN_ITEM_LINK" => "",
		"CHAIN_ITEM_TEXT" => "",
		"COMPONENT_TEMPLATE" => ".default",
		"EDIT_URL" => "",
		"IGNORE_CUSTOM_TEMPLATE" => "N",
		"LIST_URL" => "",
		"SEF_MODE" => "N",
		"SUCCESS_URL" => "",
		"USE_EXTENDED_ERRORS" => "N",
		"WEB_FORM_ID" => "4",
		"VARIABLE_ALIASES" => array(
			"WEB_FORM_ID" => "WEB_FORM_ID",
			"RESULT_ID" => "RESULT_ID",
		)
	),
	false
);?>
			</div>

		</div>
	</div>
</section>	

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>