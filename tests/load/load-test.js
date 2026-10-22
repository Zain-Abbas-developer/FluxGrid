import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const transportErrors = new Counter("transport_errors");
const status202 = new Counter("status_202");
const status500 = new Counter("status_500");
const status502 = new Counter("status_502");
const status503 = new Counter("status_503");
const status504 = new Counter("status_504");
const statusOther = new Counter("status_other");

export const options = {
  vus: 250,
  duration: "10s",
};

export default function () {
  const payload = JSON.stringify({
    type: "compute",
    payload: {
      number: 10,
    },
  });

  const res = http.post(
    "http://localhost:8080/api/v1/jobs",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: "15s",
    }
  );

  if (res.error) {
  transportErrors.add(1);
} else if (res.status === 202) {
  status202.add(1);
} else if (res.status === 500) {
  status500.add(1);
} else if (res.status === 502) {
  status502.add(1);
} else if (res.status === 503) {
  status503.add(1);
} else if (res.status === 504) {
  status504.add(1);
} else {
  statusOther.add(1);
}

if (res.error || res.status !== 202) {
  console.log(
    `status=${res.status} error=${res.error} error_code=${res.error_code}`
  );
}

  check(res, {
    "status is 202": (r) => r.status === 202,
  });

  sleep(0.1);
}