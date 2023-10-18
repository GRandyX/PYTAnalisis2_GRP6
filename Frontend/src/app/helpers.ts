import { environment as env } from 'src/environments/environment';

export const vars = {
	url_apirest: env.api_rest.protocol + "://" + env.api_rest.host + ":" + env.api_rest.port + "/api"
}
