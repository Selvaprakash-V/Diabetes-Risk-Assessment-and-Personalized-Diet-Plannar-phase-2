import requests
import time

print('Checking frontend at http://127.0.0.1:3000')
try:
    r = requests.get('http://127.0.0.1:3000', timeout=3.0)
    print('FRONTEND_UP', r.status_code)
    print(r.text[:800])
except Exception as e:
    print('FRONTEND_FETCH_FAILED', type(e).__name__, str(e)[:300])

print('\nRunning sample prediction against backend')
payload = {
    "pregnancies": 1,
    "glucose": 120,
    "bloodPressure": 70,
    "skinThickness": 20,
    "insulin": 79,
    "bmi": 28.5,
    "diabetesPedigreeFunction": 0.3,
    "age": 29
}
try:
    pr = requests.post('http://127.0.0.1:5000/api/predict', json=payload, timeout=10.0)
    print('PREDICTION_STATUS', pr.status_code)
    try:
        print(pr.json())
    except Exception:
        print('PREDICTION_RAW', pr.text[:1000])
except Exception as e:
    print('PREDICTION_FAILED', type(e).__name__, str(e)[:300])

print('\nCalling /api/run-tests to save result to backend/latest_test_results.txt')
try:
    rt = requests.get('http://127.0.0.1:5000/api/run-tests', timeout=30.0)
    if rt.status_code == 200:
        with open('backend/latest_test_results.txt','wb') as f:
            f.write(rt.content)
        print('RUN_TESTS_SAVED', 'backend/latest_test_results.txt', len(rt.content))
    else:
        print('RUN_TESTS_FAILED_STATUS', rt.status_code)
except Exception as e:
    print('RUN_TESTS_FAILED', type(e).__name__, str(e)[:300])
