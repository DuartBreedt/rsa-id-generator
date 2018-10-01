$(function () {
    $('.generate-random').on('click', function () {
        $('.random-id-number').val(randomGenerator());
    });

    $('.generate-with-info').on('click', function(){
        let year = $('#year').val();
        let month = $('#month').val();
        let day = $('#day').val();

        let gender = $("input[name='gender']:checked").val();
        let citizenship = $("input[name='citizenship']:checked").val();

        $('.info-id-number').val(generateIdNumber({year: year, month: month, day: day}, gender, citizenship));
    });

});