define(function(require) {

	var Adapt = require('coreJS/adapt');
    
    // Listen for course ready
    Adapt.once('app:dataReady', function() {
        
        // Add completion listener to page objects
        Adapt.contentObjects.on('change:_isComplete', function(model) {
            
            // Check if completed
            if (model.get('_isComplete')) {
            
                //console.log('This contentObject just changed complete status: ' + model.get('title') + ' to ' + model.get('_isComplete'));
            
                // Get spoor configuration
                var spoorConfig = Adapt.config.get('_spoor');

                // Check spoor is available and enabled
                if (spoorConfig && spoorConfig._isEnabled) {
                    // Get scorm object and set lesson to passed
                    try {
                        var scormAPI = require('extensions/adapt-contrib-spoor/js/scorm');
                    } catch (error) {
                        console.log("adapt-spoorPagePass: Could not get SCORMAPI.", error);
                    }
                    scormAPI.setPassed();
                } else {
                    console.log("adapt-spoorPagePass: Spoor not found or enabled!");
                }
            }
        });
    });
});