var interface = {
    updateNav : function(id) {
        $(".collection-item").removeClass('active');
        $("#nav-option-" + id).addClass('active');
    }
}
