jQuery(document).ready(function() {
	var $popup_content = $("#popup_content");

	$popup_content.find(".more").click(function() {
		$popup_content.find(".more").hide();
		$popup_content.find(".full").show();
		$popup_content.find(".sample").hide();
	});

	$(".card").click(function() {
		var $this = $(this);
		var sample = $this.find(".sample");
		var full = $this.find(".full");
		if (full.text()=="") {
			$popup_content.find(".more").hide();
		}
		else { 
			$popup_content.find(".more").show();
		}
		$popup_content.find(".sample").html(sample.html());
		$popup_content.find(".full").html(sample.html() + full.html());
		$popup_content.find(".sample").show();
		$popup_content.find(".full").hide();
	});
});