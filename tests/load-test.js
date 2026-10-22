import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const payload = JSON.stringify({
    type: 'email',
    message: `Load test ${__VU}-${__ITER}`,
  });

  const res = http.post('http://localhost:8080/api/v1/jobs', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  check(res, {
    'status is 202': (r) => r.status === 202,
    'job queued successfully': (r) => r.json('success') === true,
  });

  sleep(0.1);
}
