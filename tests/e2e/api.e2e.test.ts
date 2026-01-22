import app from '../../src/app';

let server: any;
let baseUrl = '';

describe('API E2E', () => {
  beforeAll(async () => {
    server = app.listen(0);
    await new Promise<void>((resolve) => server.on('listening', resolve));

    const addr = server.address();
    const port = typeof addr === 'string' ? 3000 : addr.port;
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('GET /health should return 200', async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.status).toBe('OK');
  });
});
