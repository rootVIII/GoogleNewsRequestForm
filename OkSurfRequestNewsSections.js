var OkSurfRequestNewsSections = Class.create();
OkSurfRequestNewsSections.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getStatus: function() {
		// Created REST Message GET for https://ok.surf/api/v1/news-section-names
		var request = new sn_ws.RESTMessageV2('OkSurfGetNewsSections', 'GetNewsSections');
		var resp = request.execute();
		// var data = JSON.parse(resp.getBody());
		gs.info('gnrf\n' + resp.getBody());
		return resp.getBody();
	},
    type: 'OkSurfRequestNewsSections'
});
