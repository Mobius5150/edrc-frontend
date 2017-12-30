import { Client } from 'rest';

const rest = require('rest');
const mime = require('rest/interceptor/mime');
// const pathPrefix = require('rest/interceptor/pathPrefix');
const template = require('rest/interceptor/template');

export class Edrc {
	private static restClient: Client;

	public constructor() {
		if (null == Edrc.restClient) {
			Edrc.restClient = rest
				.wrap(mime)
				// .wrap(pathPrefix, { prefix: 'http://localhost:3000/' })
				.wrap(template);
		}
	}

	public getClient(): Client {
		return Edrc.restClient;
	}
}

export { Client } from 'rest';

export default Edrc;