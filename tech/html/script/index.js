$(function() {
	// GRID
	$('.html__row').each(function(i,e){
		$(e).height($(e).height())
	})

	// TABS
// 	tabs__anchor
// tabs__content
$('.tabs__anchor').on('click',function(e) {
	var id = $(this).data('id');
	var _this = $(this)
	_this.addClass('tabs__anchor_active')
		.siblings().removeClass('tabs__anchor_active');
	_this.closest('.tabs').find('.tabs__content[data-id="'+id+'"]')
		.addClass('tabs__content_active')
		.siblings().removeClass('tabs__content_active');
})
});
