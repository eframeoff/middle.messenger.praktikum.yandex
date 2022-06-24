import HTTPTransport from './HTTPTransport';
import {expect} from 'chai';

describe('Проверка HTTPTransport', () => {
	let HTTPTransportInstance: HTTPTransport;
	beforeEach(() => {
		HTTPTransportInstance = new HTTPTransport('https://jsonplaceholder.typicode.com');
	});
	it('get', () => {
		HTTPTransportInstance.get('/posts/1')
			.then((data: XMLHttpRequest) => {
        const result = JSON.parse(data.response).res.id.toString();
				expect(result, '1');
			});
	});
	it('put', () => {
		const data = {
			id: 1,
			title: 'foo',
			body: 'test',
		};
		HTTPTransportInstance.put('/posts/1', {data})
			.then((datas: XMLHttpRequest) => {
				const result = JSON.parse(datas.response);
				expect(result.title, data.title);
			});
	});
	it('post', () => {
		const data = {
			title: 'test',
		};
		HTTPTransportInstance.post('/posts', {data})
			.then((datas: XMLHttpRequest) => {
				const result = JSON.parse(datas.response);
				expect(result.title, data.title);
			});
	});
  it('delete', () => {
		HTTPTransportInstance.delete('/posts/1', {})
			.then((datas: XMLHttpRequest) => {
				const result = datas.status.toString();
				expect(result, '200');
			});
	});
});