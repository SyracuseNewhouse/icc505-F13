jQuery(document).ready(function() {
	var $popup_content = $("#popup_content");

	$popup_content.find(".more").click(function() {
		$popup_content.find(".more").hide();
		$popup_content.find(".full").show();
	});

	$(".card").click(function() {
		var $this = $(this);
		var sample = $this.find(".sample");
		var full = $this.find(".full");
		$popup_content.find(".more").show();
		$popup_content.find(".sample").html(sample.html());
		$popup_content.find(".full").html(full.html());
		$popup_content.find(".sample").show();
		$popup_content.find(".full").hide();
	});
});