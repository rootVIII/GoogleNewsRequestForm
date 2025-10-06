function displayError(msg, fieldName) {
    g_form.addErrorMessage(msg);
    if (fieldName !== null)
        g_form.showFieldMsg(fieldName, msg, 'error', false);
}

function onSubmit() {
    try {
        if (g_form.getValue('gnrfReason').toString().length < 24) {
            displayError('Provide an in depth reason for the request', 'gnrfReason');
			return false;
        }
        var selectedSections = {
            World: g_form.getValue('gnrfWorld').toString(),
            US: g_form.getValue('gnrfUS').toString(),
            Business: g_form.getValue('gnrfBusiness').toString(),
            Entertainment: g_form.getValue('gnrfEntertainment').toString(),
            Technology: g_form.getValue('gnrfTechnology').toString(),
            Sports: g_form.getValue('gnrfSports').toString(),
            Science: g_form.getValue('gnrfScience').toString(),
            Health: g_form.getValue('gnrfHealth').toString(),
        };
        var ga = new GlideAjax('OkSurfRequestNewsSections');
        ga.addParam('sysparm_name', 'getStatus');
        // note: can pass parameters to script include if needed in request:
        // ga.addParam('keyname', someVariable);

        // getXMLWait won't work in ServicePortal, async version is needed for that
		ga.getXMLWait();
        var result = JSON.parse(ga.getAnswer());

        // Ensure at least one section selected and that it is a valid section still:
        // TODO:

        alert(result.join(', '));
        return true;
    } catch (err) {
        g_form.addErrorMessage(err);
        return false;
    }
}
