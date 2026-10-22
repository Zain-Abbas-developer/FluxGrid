import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 250 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 500 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const payload = JSON.stringify({
    type: 'email',
    message: `Heavy load test ${__VU}-${__ITER}`,
  });

  const res = http.post(
    'http://localhost:8080/api/v1/jobs',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(res, {
    'status is 202': (r) => r.status === 202,
    'job queued successfully': (r) => r.json('success') === true,
  });

  sleep(0.1);
}