// Catalog Item Client Script

function displayError(msg, fieldName) {
    g_form.addErrorMessage(msg);
    if (fieldName !== null)
        g_form.showFieldMsg(fieldName, msg, 'error');
}

function getNewsSections(result) {
	if (result) {
		alert(JSON.parse(result));
	} else {
		alert('Nothing in answer');
	}
}

function onSubmit() {
    var selectedSections = [
        g_form.getValue('gnrfWorld'),
        g_form.getValue('gnrfUS'),
        g_form.getValue('gnrfBusiness'),
        g_form.getValue('gnrfEntertainment'),
        g_form.getValue('gnrfTechnology'),
        g_form.getValue('gnrfSports'),
        g_form.getValue('gnrfScience'),
        g_form.getValue('gnrfHealth'),
    ];
    alert(selectedSections.join(','));
	try {
		var ga = new GlideAjax('OkSurfRequestNewsSections');
		ga.addParam('sysparm_name', 'getStatus');
		// note: can pass parameters to script include if needed in request:
		// ga.addParam('keyname', someVariable);
		ga.getXMLAnswer(getNewsSections);
	} catch(err) {
		g_form.addErrorMessage(err);
	}
}
