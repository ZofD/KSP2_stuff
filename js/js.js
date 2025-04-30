const calculator = new Calculator('select.engine');
console.log(calculator);

$(function() {

    let celestialBodySelect = $('select.celestial-body');
    let engineSelect = $('select.engine');
    let boosterSelect = $('select.booster');
    let boosterSwitch = $('#booster-switch');
    let newButton = $('#new-rocket');
    let addButton = $('#add-rocket');
    let modifyButton = $('#modify-rocket');

    // making celestial body select
    celestialBodySelect.html(calculator.printCelestialBodiesSelect());
    celestialBodySelect.select2({
        templateResult: function(option) {
            if (!option.id) return option.text;
            return $('<span><img src="' + $(option.element).data('image') + '" style="width:30px; height:30px; margin-right:5px;">' + option.text + '</span>');
        },
        width: 'resolve',
        placeholder: 'Wybierz ciało niebieskie',
    });
    // celestial body change listener
    celestialBodySelect.on('change', function(){
        if (celestialBodySelect.val() !== "") {
            // printing celestial body desc
            $('.accordion-item.celestial-body .accordion-body').html(calculator.printCelestialBodyDesc(celestialBodySelect.val()));
            $('.accordion-item.celestial-body .accordion-button.collapsed').click();
            $('.accordion-item.engine .accordion-button:not(.collapsed)').click();
            // making environment radiobox for celestial body
            $('#environment').html(calculator.printEnvironmentBox(celestialBodySelect.val()));
        } else {
            $('#environment').html('');
        }
    });
    // making engine select
    engineSelect.html(calculator.printEnginesSelect(EngineStore.ONLY_ENGINES));
    engineSelect.select2({
        templateResult: function(option) {
            if (!option.id) return option.text;
            return $('<span><img src="' + $(option.element).data('image') + '" style="width:30px; height:30px; margin-right:5px;">' + option.text + '</span>');
        },
        width: 'resolve',
        placeholder: 'Wybierz silnik',
    });
    // engine change listener
    engineSelect.on('change', function(){
        if (engineSelect.val() !== "") {
            // printing engine desc

            $('.accordion-item.engine .accordion-body').html(doFetch(engineSelect.val()));

            // $('.accordion-item.engine .accordion-body').html(calculator.printEngineDesc(engineSelect.val()));
            $('.accordion-item.engine .accordion-button.collapsed').click();
            $('.accordion-item.celestial-body .accordion-button:not(.collapsed)').click();
        }
    });
    // making booster select
    boosterSelect.html(calculator.printEnginesSelect(EngineStore.ONLY_BOOSTERS));
    boosterSelect.select2({
        templateResult: function(option) {
            if (!option.id) return option.text;
            return $('<span><img src="' + $(option.element).data('image') + '" style="width:30px; height:30px; margin-right:5px;">' + option.text + '</span>');
        },
        width: 'resolve',
        placeholder: 'Wybierz booster',
        disabled: true,
    });
    // switch booster change listener
    boosterSwitch.on('change', function(){
        if (boosterSwitch.prop('checked')) {
            boosterSelect.prop("disabled", false);
        } else {
            boosterSelect.prop("disabled", true);
            boosterSelect.val(null).trigger('change');
        }
    });
    // button actions
    addButton.click(function(){
        let rocketName = $('#rocketName').val();
        let requiredDelta = +$('#requiredDelta').val();
        let loadMass = +$('#loadMass').val();
        let twr = +$('#twr').val();
        let engine = engineSelect.val();
        let booster = boosterSelect.val();
        let celestialBody = celestialBodySelect.val();
        let environment = $('.environment').find('input[type=radio]:checked').attr('id');
        // console.log({
        //     "rocketName": [rocketName, typeof rocketName],
        //     "celestialBody": [celestialBody, typeof celestialBody],
        //     "environment": [environment, typeof environment],
        //     "booster": [booster, typeof booster],
        //     "engine": [engine, typeof engine],
        //     "requiredDelta": [requiredDelta, typeof requiredDelta],
        //     "loadMass": [loadMass, typeof loadMass],
        //     "twr": [twr, typeof twr]
        // });
        $('table.results > tbody').html(
            calculator.doMatch(
                celestialBody,
                environment,
                engine,
                booster,
                requiredDelta,
                loadMass,
                twr,
                rocketName
            )
        );
    });
    newButton.click(function(){
        // reseting form inputs
        modifyButton.addClass('disabled');
        addButton.removeClass('disabled');
        boosterSwitch.prop("disabled", false);
        engineSelect.val(null).trigger('change');
        boosterSelect.val(null).trigger('change');
        celestialBodySelect.val(null).trigger('change');
        $('form input:not([type=button])').val('');
    });
});

async function doFetch(page) {
    let url = 'https://kerbal-space-program-2.fandom.com/w/rest.php/v1/page/'+page+'/html';
    let headers = {'Api-User-Agent': 'MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)'}

    const rsp = await fetch(url, headers);
    const data = await rsp.json();
    return data;
}