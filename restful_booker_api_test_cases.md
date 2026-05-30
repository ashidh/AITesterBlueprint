# RESTful Booker API Test Cases Suite

This document provides the complete enterprise-grade API Test Suite for the **Restful Booker API** ([restful-booker.herokuapp.com](https://restful-booker.herokuapp.com/apidoc/index.html)).

* **Format Version:** 1.0.0
* **Total Test Cases:** 42
* **Target System:** REST API Service (Hotel Booking Management)
* **Structure Match:** Aligned directly to the Excel template columns.
* **CSV Location:** [restful_booker_api_test_cases.csv](file:///c:/Automation/AITesterBlueprint/restful_booker_api_test_cases.csv) (fully configured for import into Excel/Google Sheets).

---

## Module: Authentication

| ID | Scenario | Method & Endpoint | Expected Status | Priority | Type | Auto? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TS_AUTH_001** | Verify token generation with valid credentials | `POST /auth` | `200 OK` | Critical | Functional | Yes |
| **TS_AUTH_002** | Verify token generation fails with invalid username | `POST /auth` | `200 OK` | High | Negative | Yes |
| **TS_AUTH_003** | Verify token generation fails with invalid password | `POST /auth` | `200 OK` | High | Negative | Yes |
| **TS_AUTH_004** | Verify authentication with missing mandatory field (username) | `POST /auth` | `200 OK` | High | Negative | Yes |
| **TS_AUTH_005** | Verify authentication with empty request payload | `POST /auth` | `200 OK` | High | Negative | Yes |
| **TS_AUTH_006** | Verify security with SQL Injection payload in username | `POST /auth` | `200 OK` | Critical | Security | Yes |
| **TS_AUTH_007** | Verify header validation - Unsupported Content-Type | `POST /auth` | `415 Unsupported Media Type or 400 Bad Request` | Medium | Negative | Yes |

### Test Case: TS_AUTH_001 - Verify token generation with valid credentials

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Functional | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Include header 'Content-Type: application/json'
3. Provide payload: {"username": "admin", "password": "password123"}
```

#### Request Payload (JSON/XML)
```json
{"username": "admin", "password": "password123"}
```

#### Expected Response
```text
{"token": "<token_string>"}
```

> **QA Remarks:** Verifies the core entry token generation required for PUT/PATCH/DELETE.

---

### Test Case: TS_AUTH_002 - Verify token generation fails with invalid username

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Provide header 'Content-Type: application/json'
3. Provide payload: {"username": "invalid_user", "password": "password123"}
```

#### Request Payload (JSON/XML)
```json
{"username": "invalid_user", "password": "password123"}
```

#### Expected Response
```text
{"reason": "Bad credentials"}
```

> **QA Remarks:** Restful Booker API historically returns 200 OK with 'Bad credentials' in the body instead of 401.

---

### Test Case: TS_AUTH_003 - Verify token generation fails with invalid password

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Provide header 'Content-Type: application/json'
3. Provide payload: {"username": "admin", "password": "wrong_password"}
```

#### Request Payload (JSON/XML)
```json
{"username": "admin", "password": "wrong_password"}
```

#### Expected Response
```text
{"reason": "Bad credentials"}
```

> **QA Remarks:** Validates incorrect password security lock.

---

### Test Case: TS_AUTH_004 - Verify authentication with missing mandatory field (username)

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Provide header 'Content-Type: application/json'
3. Provide payload: {"password": "password123"}
```

#### Request Payload (JSON/XML)
```json
{"password": "password123"}
```

#### Expected Response
```text
{"reason": "Bad credentials"}
```

> **QA Remarks:** Validates schema omission handling.

---

### Test Case: TS_AUTH_005 - Verify authentication with empty request payload

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Provide header 'Content-Type: application/json'
3. Provide empty JSON payload: {}
```

#### Request Payload (JSON/XML)
```json
{}
```

#### Expected Response
```text
{"reason": "Bad credentials"}
```

> **QA Remarks:** Ensures empty bodies do not cause server crashes.

---

### Test Case: TS_AUTH_006 - Verify security with SQL Injection payload in username

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Security | **Priority:** Critical | **Severity:** Critical
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Provide payload: {"username": "admin' OR '1'='1", "password": "password123"}
```

#### Request Payload (JSON/XML)
```json
{"username": "admin' OR '1'='1", "password": "password123"}
```

#### Expected Response
```text
{"reason": "Bad credentials"}
```

> **QA Remarks:** Verifies protection against SQLi on login parameters.

---

### Test Case: TS_AUTH_007 - Verify header validation - Unsupported Content-Type

* **API Name:** CreateToken
* **Endpoint:** `POST /auth`
* **Test Type:** Negative | **Priority:** Medium | **Severity:** Minor
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /auth
2. Set header 'Content-Type: text/plain'
3. Provide valid payload in plain text format
```

#### Request Payload (JSON/XML)
```json
username=admin&password=password123
```

#### Expected Response
```text
Any error block or rejection string
```

> **QA Remarks:** Verifies the API rejects requests not formatted in application/json.

---

## Module: Ping

| ID | Scenario | Method & Endpoint | Expected Status | Priority | Type | Auto? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TS_PING_001** | Verify server is up and responsive | `GET /ping` | `201 Created` | High | Smoke | Yes |
| **TS_PING_002** | Verify health check rejects unsupported POST method | `POST /ping` | `405 Method Not Allowed` | Medium | Negative | Yes |

### Test Case: TS_PING_001 - Verify server is up and responsive

* **API Name:** HealthCheck
* **Endpoint:** `GET /ping`
* **Test Type:** Smoke | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /ping
2. Check response status and body
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Created
```

> **QA Remarks:** Used as a health diagnostic check before test runs.

---

### Test Case: TS_PING_002 - Verify health check rejects unsupported POST method

* **API Name:** HealthCheck
* **Endpoint:** `POST /ping`
* **Test Type:** Negative | **Priority:** Medium | **Severity:** Minor
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /ping
2. Verify the server response status
```

#### Request Payload (JSON/XML)
```json
{}
```

#### Expected Response
```text
Method Not Allowed / Error string
```

> **QA Remarks:** Verifies HTTP method routing rules.

---

## Module: Booking

| ID | Scenario | Method & Endpoint | Expected Status | Priority | Type | Auto? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TS_BOOK_001** | Verify successful booking creation with valid JSON payload | `POST /booking` | `200 OK` | Critical | Functional | Yes |
| **TS_BOOK_002** | Verify successful booking creation with valid XML payload | `POST /booking` | `200 OK` | High | Functional | Yes |
| **TS_BOOK_003** | Verify validation - Missing mandatory fields (firstname) | `POST /booking` | `500 Internal Server Error / 400 Bad Request` | High | Negative | Yes |
| **TS_BOOK_004** | Verify data type validation - totalprice as string | `POST /booking` | `400 Bad Request / 500 Internal Server Error` | High | Negative | Yes |
| **TS_BOOK_005** | Verify data validation - checkout date before checkin date | `POST /booking` | `400 Bad Request` | High | Negative | Yes |
| **TS_BOOK_006** | Verify boundary limit - totalprice set to 0 | `POST /booking` | `200 OK` | Medium | Boundary | Yes |
| **TS_BOOK_007** | Verify boundary limit - totalprice set to negative value (-1) | `POST /booking` | `400 Bad Request` | High | Negative | Yes |
| **TS_BOOK_008** | Verify edge case - Special characters and Unicode in guest name | `POST /booking` | `200 OK` | Medium | Edge Case | Yes |
| **TS_BOOK_009** | Verify security case - XSS payload in additionalneeds | `POST /booking` | `200 OK` | High | Security | Yes |
| **TS_GETIDS_001** | Verify retrieving all booking IDs successfully | `GET /booking` | `200 OK` | High | Smoke | Yes |
| **TS_GETIDS_002** | Verify filtering booking IDs by firstname | `GET /booking` | `200 OK` | High | Functional | Yes |
| **TS_GETIDS_003** | Verify filtering booking IDs by lastname | `GET /booking` | `200 OK` | High | Functional | Yes |
| **TS_GETIDS_004** | Verify filtering by both firstname and lastname | `GET /booking` | `200 OK` | High | Functional | Yes |
| **TS_GETIDS_005** | Verify filtering booking IDs by checkin date | `GET /booking` | `200 OK` | Medium | Functional | Yes |
| **TS_GETIDS_006** | Verify filter returns empty array when no bookings match criteria | `GET /booking` | `200 OK` | Medium | Boundary | Yes |
| **TS_GETIDS_007** | Verify negative query parameter format - Invalid checkin date type | `GET /booking` | `400 Bad Request / 200 OK (empty list)` | Medium | Negative | Yes |
| **TS_GET_001** | Verify retrieval of a single booking by valid ID | `GET /booking/:id` | `200 OK` | Critical | Functional | Yes |
| **TS_GET_002** | Verify fetching non-existent booking ID yields 404 | `GET /booking/:id` | `404 Not Found` | High | Negative | Yes |
| **TS_GET_003** | Verify fetching booking with alphanumeric ID parameter | `GET /booking/:id` | `404 Not Found` | Medium | Negative | Yes |
| **TS_PUT_001** | Verify updating booking with valid Cookie auth and JSON payload | `PUT /booking/:id` | `200 OK` | Critical | Functional | Yes |
| **TS_PUT_002** | Verify updating booking with Basic Auth | `PUT /booking/:id` | `200 OK` | High | Functional | Yes |
| **TS_PUT_003** | Verify update fails when authorization token is missing | `PUT /booking/:id` | `403 Forbidden` | Critical | Security | Yes |
| **TS_PUT_004** | Verify update fails with invalid token | `PUT /booking/:id` | `403 Forbidden` | Critical | Security | Yes |
| **TS_PUT_005** | Verify update fails with partial body payload (PUT constraint) | `PUT /booking/:id` | `400 Bad Request` | High | Negative | Yes |
| **TS_PATCH_001** | Verify partial update of firstname only with valid cookie auth | `PATCH /booking/:id` | `200 OK` | Critical | Functional | Yes |
| **TS_PATCH_002** | Verify partial update of dates only | `PATCH /booking/:id` | `200 OK` | High | Functional | Yes |
| **TS_PATCH_003** | Verify partial update fails without authentication | `PATCH /booking/:id` | `403 Forbidden` | High | Security | Yes |
| **TS_PATCH_004** | Verify partial update with empty JSON body | `PATCH /booking/:id` | `200 OK` | Medium | Boundary | Yes |
| **TS_DEL_001** | Verify successful booking deletion with valid Cookie auth | `DELETE /booking/:id` | `201 Created` | Critical | Functional | Yes |
| **TS_DEL_002** | Verify delete fails without authentication | `DELETE /booking/:id` | `403 Forbidden` | Critical | Security | Yes |
| **TS_DEL_003** | Verify delete returns 405/404 for non-existent booking ID | `DELETE /booking/:id` | `405 Method Not Allowed / 404 Not Found` | High | Negative | Yes |

### Test Case: TS_BOOK_001 - Verify successful booking creation with valid JSON payload

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Functional | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Include header 'Content-Type: application/json' and 'Accept: application/json'
3. Provide valid booking JSON
```

#### Request Payload (JSON/XML)
```json
{"firstname": "Jim", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Breakfast"}
```

#### Expected Response
```text
{"bookingid": <number>, "booking": {"firstname": "Jim", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Breakfast"}}
```

> **QA Remarks:** Core positive scenario for creating hotel bookings.

---

### Test Case: TS_BOOK_002 - Verify successful booking creation with valid XML payload

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Functional | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Include header 'Content-Type: text/xml' and 'Accept: application/xml'
3. Provide valid booking XML
```

#### Request Payload (JSON/XML)
```json
<booking><firstname>Jim</firstname><lastname>Brown</lastname><totalprice>111</totalprice><depositpaid>true</depositpaid><bookingdates><checkin>2026-06-01</checkin><checkout>2026-06-10</checkout></bookingdates><additionalneeds>Breakfast</additionalneeds></booking>
```

#### Expected Response
```text
XML representation of created booking containing <bookingid> and fields matching request.
```

> **QA Remarks:** Verifies the API supports multi-format serialization/deserialization (XML).

---

### Test Case: TS_BOOK_003 - Verify validation - Missing mandatory fields (firstname)

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload missing the 'firstname' key
3. Verify error response
```

#### Request Payload (JSON/XML)
```json
{"lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Breakfast"}
```

#### Expected Response
```text
Server error or Bad Request text
```

> **QA Remarks:** Restful Booker historically returns 500 on missing fields due to internal serialization exceptions.

---

### Test Case: TS_BOOK_004 - Verify data type validation - totalprice as string

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload with 'totalprice' set as string: "111"
3. Verify response status
```

#### Request Payload (JSON/XML)
```json
{"firstname": "Jim", "lastname": "Brown", "totalprice": "111", "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Breakfast"}
```

#### Expected Response
```text
Error details
```

> **QA Remarks:** Validates strict numerical validation.

---

### Test Case: TS_BOOK_005 - Verify data validation - checkout date before checkin date

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload with checkin = 2026-06-10 and checkout = 2026-06-01
3. Verify validation rejection
```

#### Request Payload (JSON/XML)
```json
{"firstname": "Jim", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-10", "checkout": "2026-06-01"}, "additionalneeds": "Breakfast"}
```

#### Expected Response
```text
Error details
```

> **QA Remarks:** Business logic validation: checkout must not precede checkin.

---

### Test Case: TS_BOOK_006 - Verify boundary limit - totalprice set to 0

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Boundary | **Priority:** Medium | **Severity:** Moderate
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload with 'totalprice' set to 0
3. Verify booking is allowed with zero price
```

#### Request Payload (JSON/XML)
```json
{"firstname": "Jim", "lastname": "Brown", "totalprice": 0, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Free Trial"}
```

#### Expected Response
```text
Successful creation containing totalprice: 0
```

> **QA Remarks:** Validates minimum boundary value of price.

---

### Test Case: TS_BOOK_007 - Verify boundary limit - totalprice set to negative value (-1)

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload with 'totalprice' set to -1
3. Verify server rejects negative price
```

#### Request Payload (JSON/XML)
```json
{"firstname": "Jim", "lastname": "Brown", "totalprice": -1, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Discount"}
```

#### Expected Response
```text
Error message
```

> **QA Remarks:** Prevents booking with negative costs.

---

### Test Case: TS_BOOK_008 - Verify edge case - Special characters and Unicode in guest name

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Edge Case | **Priority:** Medium | **Severity:** Moderate
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload with firstname: "Jöĥñ-Smïth #123" and lastname: "O'Conner"
3. Verify correct storage and encoding
```

#### Request Payload (JSON/XML)
```json
{"firstname": "Jöĥñ-Smïth #123", "lastname": "O'Conner", "totalprice": 150, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "None"}
```

#### Expected Response
```text
Booking returned with unicode values preserved.
```

> **QA Remarks:** Verifies character encoding standards (UTF-8) are supported.

---

### Test Case: TS_BOOK_009 - Verify security case - XSS payload in additionalneeds

* **API Name:** CreateBooking
* **Endpoint:** `POST /booking`
* **Test Type:** Security | **Priority:** High | **Severity:** Critical
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send POST request to /booking
2. Provide payload with additionalneeds set to XSS script: "<script>alert('xss')</script>"
3. Verify that server sanitizes or escapes script tags
```

#### Request Payload (JSON/XML)
```json
{"firstname": "John", "lastname": "Doe", "totalprice": 200, "depositpaid": false, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "<script>alert('xss')</script>"}
```

#### Expected Response
```text
Response matches name inputs. If retrieved via GET, characters should be escaped.
```

> **QA Remarks:** XSS prevention verification.

---

### Test Case: TS_GETIDS_001 - Verify retrieving all booking IDs successfully

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Smoke | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active and bookings exist
```

#### Test Steps
```text
1. Send GET request to /booking
2. Assert response status and array content
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
[{"bookingid": 1}, {"bookingid": 2}, ...]
```

> **QA Remarks:** Smoke test to ensure the database can list records.

---

### Test Case: TS_GETIDS_002 - Verify filtering booking IDs by firstname

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Functional | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active; booking exists with firstname 'Sally'
```

#### Test Steps
```text
1. Send GET request to /booking?firstname=Sally
2. Assert that returned list only includes IDs matching that filter
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Array of bookingids matching the name filter.
```

> **QA Remarks:** Validates query string parameters for search.

---

### Test Case: TS_GETIDS_003 - Verify filtering booking IDs by lastname

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Functional | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active; booking exists with lastname 'Brown'
```

#### Test Steps
```text
1. Send GET request to /booking?lastname=Brown
2. Assert returned list is filtered
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Array of bookingids matching the lastname filter.
```

> **QA Remarks:** Validates search capabilities by guest surname.

---

### Test Case: TS_GETIDS_004 - Verify filtering by both firstname and lastname

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Functional | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /booking?firstname=Sally&lastname=Brown
2. Verify response list matches both parameters
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Array of bookingids filtered by both first and last name.
```

> **QA Remarks:** Tests compound filter search logic.

---

### Test Case: TS_GETIDS_005 - Verify filtering booking IDs by checkin date

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Functional | **Priority:** Medium | **Severity:** Moderate
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /booking?checkin=2026-01-01
2. Verify returned list returns booking IDs with checkin date greater than or equal to 2026-01-01
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Array of bookingids matching date filters.
```

> **QA Remarks:** Validates booking date filtering constraints.

---

### Test Case: TS_GETIDS_006 - Verify filter returns empty array when no bookings match criteria

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Boundary | **Priority:** Medium | **Severity:** Moderate
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /booking?firstname=NonExistentGuestName123
2. Verify the response is an empty JSON array
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
[]
```

> **QA Remarks:** Asserts boundary handling of empty search results.

---

### Test Case: TS_GETIDS_007 - Verify negative query parameter format - Invalid checkin date type

* **API Name:** GetBookingIds
* **Endpoint:** `GET /booking`
* **Test Type:** Negative | **Priority:** Medium | **Severity:** Minor
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /booking?checkin=not-a-date
2. Verify API rejects invalid parameters
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Rejection string or empty array depending on error tolerance
```

> **QA Remarks:** Verifies type checking on date query string params.

---

### Test Case: TS_GET_001 - Verify retrieval of a single booking by valid ID

* **API Name:** GetBooking
* **Endpoint:** `GET /booking/:id`
* **Test Type:** Functional | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists with a known ID
```

#### Test Steps
```text
1. Send GET request to /booking/<valid_id>
2. Verify the JSON keys: firstname, lastname, totalprice, depositpaid, bookingdates (checkin, checkout), additionalneeds
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
{"firstname": "Jim", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2018-01-01", "checkout": "2019-01-01"}, "additionalneeds": "Breakfast"}
```

> **QA Remarks:** Verifies detailed view retrieve operation.

---

### Test Case: TS_GET_002 - Verify fetching non-existent booking ID yields 404

* **API Name:** GetBooking
* **Endpoint:** `GET /booking/:id`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /booking/9999999 (or an ID known to not exist)
2. Assert status code is 404
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Not Found
```

> **QA Remarks:** Verifies robust resource validation for invalid entities.

---

### Test Case: TS_GET_003 - Verify fetching booking with alphanumeric ID parameter

* **API Name:** GetBooking
* **Endpoint:** `GET /booking/:id`
* **Test Type:** Negative | **Priority:** Medium | **Severity:** Minor
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send GET request to /booking/abc
2. Verify response status is 404 Not Found
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Not Found / Bad request error text
```

> **QA Remarks:** Verifies alphanumeric URL parameters are parsed correctly without crashing.

---

### Test Case: TS_PUT_001 - Verify updating booking with valid Cookie auth and JSON payload

* **API Name:** UpdateBooking
* **Endpoint:** `PUT /booking/:id`
* **Test Type:** Functional | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists; valid auth token generated from /auth
```

#### Test Steps
```text
1. Send PUT request to /booking/<id>
2. Add header 'Content-Type: application/json' and 'Accept: application/json'
3. Add header 'Cookie: token=<valid_token>'
4. Provide updated full payload
```

#### Request Payload (JSON/XML)
```json
{"firstname": "James", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Lunch"}
```

#### Expected Response
```text
{"firstname": "James", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Lunch"}
```

> **QA Remarks:** Validates the full update path using token cookie auth.

---

### Test Case: TS_PUT_002 - Verify updating booking with Basic Auth

* **API Name:** UpdateBooking
* **Endpoint:** `PUT /booking/:id`
* **Test Type:** Functional | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists
```

#### Test Steps
```text
1. Send PUT request to /booking/<id>
2. Set header 'Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM='
3. Provide complete body details
```

#### Request Payload (JSON/XML)
```json
{"firstname": "James", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Lunch"}
```

#### Expected Response
```text
Updated object matching payload
```

> **QA Remarks:** Tests alternative HTTP Basic Authentication path.

---

### Test Case: TS_PUT_003 - Verify update fails when authorization token is missing

* **API Name:** UpdateBooking
* **Endpoint:** `PUT /booking/:id`
* **Test Type:** Security | **Priority:** Critical | **Severity:** Critical
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists
```

#### Test Steps
```text
1. Send PUT request to /booking/<id>
2. Omit both 'Cookie' and 'Authorization' headers
3. Provide complete body details
```

#### Request Payload (JSON/XML)
```json
{"firstname": "James", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Lunch"}
```

#### Expected Response
```text
Forbidden
```

> **QA Remarks:** Critical authorization check: reject updates without tokens.

---

### Test Case: TS_PUT_004 - Verify update fails with invalid token

* **API Name:** UpdateBooking
* **Endpoint:** `PUT /booking/:id`
* **Test Type:** Security | **Priority:** Critical | **Severity:** Critical
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists
```

#### Test Steps
```text
1. Send PUT request to /booking/<id>
2. Provide header 'Cookie: token=invalidtoken123'
3. Provide complete payload details
```

#### Request Payload (JSON/XML)
```json
{"firstname": "James", "lastname": "Brown", "totalprice": 111, "depositpaid": true, "bookingdates": {"checkin": "2026-06-01", "checkout": "2026-06-10"}, "additionalneeds": "Lunch"}
```

#### Expected Response
```text
Forbidden
```

> **QA Remarks:** Validates security rejection of malformed/fake tokens.

---

### Test Case: TS_PUT_005 - Verify update fails with partial body payload (PUT constraint)

* **API Name:** UpdateBooking
* **Endpoint:** `PUT /booking/:id`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists; valid auth present
```

#### Test Steps
```text
1. Send PUT request to /booking/<id> with valid Cookie
2. Provide partial payload: {"firstname": "James"}
3. Verify server rejects request since PUT requires full representation replacement
```

#### Request Payload (JSON/XML)
```json
{"firstname": "James"}
```

#### Expected Response
```text
Bad Request error text
```

> **QA Remarks:** Asserts PUT standard protocol: incomplete payloads are rejected.

---

### Test Case: TS_PATCH_001 - Verify partial update of firstname only with valid cookie auth

* **API Name:** PartialUpdateBooking
* **Endpoint:** `PATCH /booking/:id`
* **Test Type:** Functional | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists; valid token available
```

#### Test Steps
```text
1. Send PATCH request to /booking/<id>
2. Include header 'Cookie: token=<valid_token>'
3. Provide body containing only 'firstname'
```

#### Request Payload (JSON/XML)
```json
{"firstname": "James"}
```

#### Expected Response
```text
JSON containing the entire updated booking details with firstname updated to "James" and other fields unchanged.
```

> **QA Remarks:** Validates PATCH capability: modifying subset of fields.

---

### Test Case: TS_PATCH_002 - Verify partial update of dates only

* **API Name:** PartialUpdateBooking
* **Endpoint:** `PATCH /booking/:id`
* **Test Type:** Functional | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists; valid token available
```

#### Test Steps
```text
1. Send PATCH request to /booking/<id>
2. Provide body: {"bookingdates": {"checkin": "2026-07-01", "checkout": "2026-07-15"}}
```

#### Request Payload (JSON/XML)
```json
{"bookingdates": {"checkin": "2026-07-01", "checkout": "2026-07-15"}}
```

#### Expected Response
```text
Entire booking returned with updated booking dates.
```

> **QA Remarks:** Ensures sub-object merging behaves correctly in PATCH.

---

### Test Case: TS_PATCH_003 - Verify partial update fails without authentication

* **API Name:** PartialUpdateBooking
* **Endpoint:** `PATCH /booking/:id`
* **Test Type:** Security | **Priority:** High | **Severity:** Critical
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists
```

#### Test Steps
```text
1. Send PATCH request to /booking/<id>
2. Omit auth headers
3. Provide payload: {"additionalneeds": "Breakfast"}
```

#### Request Payload (JSON/XML)
```json
{"additionalneeds": "Breakfast"}
```

#### Expected Response
```text
Forbidden
```

> **QA Remarks:** Confirms PATCH requires proper auth gates.

---

### Test Case: TS_PATCH_004 - Verify partial update with empty JSON body

* **API Name:** PartialUpdateBooking
* **Endpoint:** `PATCH /booking/:id`
* **Test Type:** Boundary | **Priority:** Medium | **Severity:** Moderate
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists; valid auth present
```

#### Test Steps
```text
1. Send PATCH request to /booking/<id> with auth
2. Provide empty body: {}
3. Verify booking details remain unchanged
```

#### Request Payload (JSON/XML)
```json
{}
```

#### Expected Response
```text
No fields modified; returns current state
```

> **QA Remarks:** Asserts fallback handling when zero properties are modified.

---

### Test Case: TS_DEL_001 - Verify successful booking deletion with valid Cookie auth

* **API Name:** DeleteBooking
* **Endpoint:** `DELETE /booking/:id`
* **Test Type:** Functional | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists; valid token available
```

#### Test Steps
```text
1. Send DELETE request to /booking/<id>
2. Include header 'Cookie: token=<valid_token>'
3. Verify response status
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Created
```

> **QA Remarks:** Core delete validation. Restful Booker API returns 201 Created on DELETE success.

---

### Test Case: TS_DEL_002 - Verify delete fails without authentication

* **API Name:** DeleteBooking
* **Endpoint:** `DELETE /booking/:id`
* **Test Type:** Security | **Priority:** Critical | **Severity:** Critical
* **Automation Candidate:** Yes

#### Preconditions
```text
A booking exists
```

#### Test Steps
```text
1. Send DELETE request to /booking/<id>
2. Omit all authorization headers
3. Verify failure code
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Forbidden
```

> **QA Remarks:** Confirms that booking destruction requires authenticated headers.

---

### Test Case: TS_DEL_003 - Verify delete returns 405/404 for non-existent booking ID

* **API Name:** DeleteBooking
* **Endpoint:** `DELETE /booking/:id`
* **Test Type:** Negative | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
API service is active
```

#### Test Steps
```text
1. Send DELETE request to /booking/9999999 (with valid token)
2. Assert status code
```

#### Request Payload
* N/A (Empty)

#### Expected Response
```text
Method Not Allowed / Not Found text
```

> **QA Remarks:** Restful Booker returns 405 Method Not Allowed for deletes of non-existent entity IDs.

---

## Module: Workflows

| ID | Scenario | Method & Endpoint | Expected Status | Priority | Type | Auto? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TS_WORK_001** | Verify complete CRUD lifecycle of a booking | `Multiple /booking` | `200, 200, 200, 200, 200, 201, 404` | Critical | Integration | Yes |
| **TS_WORK_002** | Verify created booking is discoverable via queries | `Multiple /booking` | `200, 200` | High | Integration | Yes |

### Test Case: TS_WORK_001 - Verify complete CRUD lifecycle of a booking

* **API Name:** E2E CRUD Chain
* **Endpoint:** `Multiple /booking`
* **Test Type:** Integration | **Priority:** Critical | **Severity:** Blocker
* **Automation Candidate:** Yes

#### Preconditions
```text
Auth token available
```

#### Test Steps
```text
1. Create Booking (POST /booking) -> save generated ID
2. Retrieve Booking (GET /booking/:id) -> Verify name matches
3. Update Booking (PUT /booking/:id) -> Modify totalprice
4. Partial Update (PATCH /booking/:id) -> Modify additionalneeds
5. Retrieve Booking again -> Assert both updates are correct
6. Delete Booking (DELETE /booking/:id)
7. Retrieve Booking -> Verify 404 is returned
```

#### Request Payload
* Multiple requests chained

#### Expected Response
```text
Lifecycle assertions match schema specs
```

> **QA Remarks:** Enterprise E2E workflow validating database write, read, update, delete pipeline integrity.

---

### Test Case: TS_WORK_002 - Verify created booking is discoverable via queries

* **API Name:** E2E Search Chain
* **Endpoint:** `Multiple /booking`
* **Test Type:** Integration | **Priority:** High | **Severity:** Major
* **Automation Candidate:** Yes

#### Preconditions
```text
Unique name generated
```

#### Test Steps
```text
1. Create booking with firstname: 'UniqueFirstnameXYZ' and lastname: 'Doe'
2. Send query request (GET /booking?firstname=UniqueFirstnameXYZ&lastname=Doe)
3. Verify the generated bookingid appears in list
```

#### Request Payload
* Create payload + Query parameters

#### Expected Response
```text
Returned array contains booking ID
```

> **QA Remarks:** Validates indexing integration between create and search layers.

---

