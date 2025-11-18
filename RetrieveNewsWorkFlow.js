function getFormVars() {
    return {
        World: current.variables.gnrfWorld.toString() === 'true',
        US: current.variables.gnrfUS.toString() === 'true',
        Business: current.variables.gnrfBusiness.toString() === 'true',
        Entertainment: current.variables.gnrfEntertainment.toString() === 'true',
        Technology: current.variables.gnrfTechnology.toString() === 'true',
        Sports: current.variables.gnrfSports.toString() === 'true',
        Science: current.variables.gnrfScience.toString() === 'true',
        Health: current.variables.gnrfHealth.toString() === 'true',
    };
}

function getNews(titles) {
    var client = new sn_ws.RESTMessageV2('OkSurfNews', 'PostNewsSections');
    var payload = JSON.stringify({
        "sections": titles
    });
    client.setRequestBody(payload);
    var resp = client.execute();
    // load JSON into object if needed:
    // var response = JSON.pasre(resp.getBody());
    return resp;
}

function writeNewsTableEntry() {
    var gr = new GlideRecord('u_google_news_requests');
    gr.initialize();
    gr.u_ritm = current.number;
    gr.insert();
}

function writeAttachment(response) {
    var attachment = new Attachment();
    attachment.write(
        current.getTableName(),
        current.sys_id,
        current.number + '.json',
        'text/plain',
        response.getBody()
    );
}

function main() {
    var sections = getFormVars();
    var titles = [];
    for (var key in sections)
        if (sections[key])
            titles.push(key);

    gs.info('GoogleNewsRequestForm 0: Selected sections: ' + titles.join(', '));

    try {
        var response = getNews(titles);
        writeAttachment(response);
        writeNewsTableEntry();
        current.work_notes = 'Attached latest news feed to ' + current.number;
        gs.info('GoogleNewsRequestForm 1: attached news feed');
    } catch (err) {
        current.work_notes = 'An error occurred';
        gs.error('GoogleNewsRequestForm Error: ' + err);
    }
}

main();
