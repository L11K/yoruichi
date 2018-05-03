const momentFormat = function (date, client) {
	const moment = require('moment');

	return moment(date).format(`MMMM Do YYYY [at] ${client.provider.get('global', 'timeformat', '24') === '24' ? 'HH:mm:ss' : 'hh:mm:ss A'} [UTC]Z`);
};


module.exports = {
	momentFormat
};