function displayError(msg, fieldName) {
    g_form.addErrorMessage(msg);
    if (fieldName !== null)
        g_form.showFieldMsg(fieldName, msg, 'error');
}

function onSubmit() {
    try {
        if (g_form.getValue('gnrfReason').length < 24) {
            displayError('Provide an in depth reason for the request', 'gnrfReason');
            return false;
        }
        var selectedSections = {
            World: g_form.getValue('gnrfWorld') === 'true',
            US: g_form.getValue('gnrfUS') === 'true',
            Business: g_form.getValue('gnrfBusiness') === 'true',
            Entertainment: g_form.getValue('gnrfEntertainment') === 'true',
            Technology: g_form.getValue('gnrfTechnology') === 'true',
            Sports: g_form.getValue('gnrfSports') === 'true',
            Science: g_form.getValue('gnrfScience') === 'true',
            Health: g_form.getValue('gnrfHealth') === 'true',
        };
        var ga = new GlideAjax('OkSurfRequestNewsSections');
        ga.addParam('sysparm_name', 'getStatus');
        // note: can pass parameters to script include if needed in request:
        // ga.addParam('keyname', someVariable);
        ga.getXMLWait();

        var result = JSON.parse(ga.getAnswer());
        // Ensure at least one section selected and that it is still a valid news section
        var isValid = false;
        for (var key in selectedSections) {
            if (!(result.includes(key))) {
                displayError('Selected news section is no longer valid: ' + key, 'gnrfTextLabel1');
                return false;
            }
            if (selectedSections[key]) {
                isValid = true;
            }
        }
        if (!(isValid)) {
            displayError('Please select at least one news section');
            return false;
        }
        return true;
    } catch (err) {
        g_form.addErrorMessage(err);
        return false;
    }
}
