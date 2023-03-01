import { clearDatabase, connect, disconnect } from './mongodb.server';

beforeAll(() => connect());
afterEach(() => clearDatabase());
afterAll(() => disconnect());