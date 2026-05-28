# Containerized Selenium Load Testing POC

A scalable, distributed browser automation framework built with Node.js and Selenium WebDriver. This project demonstrates how to orchestrate a local, multi-node Selenium Grid using Docker to execute concurrent, headless browser operations for performance and backend load testing.

## System Architecture

1. **Selenium Grid Hub:** Acts as the central traffic manager running inside a Docker container.
2. **Firefox Nodes:** Scalable worker containers running headless Firefox instances that execute the browser actions.
3. **Concurrency Engine:** A Node.js script using `Promise.all()` to trigger independent test threads simultaneously against the Grid.

## Project Structure

```text
selenium-demo/
├── docker-compose.yml       # Provisions Grid Hub and Firefox worker nodes
├── package.json             # Node dependencies (selenium-webdriver)
├── .gitignore             
└── src/
    ├── config/
    │   └── gridDriver.js    # Decoupled WebDriver configuration & capabilities
    └── tests/
        ├── scaleTest.js     # Sequential single-user functional baseline
        └── loadTest.js      # Multi-user parallel load test engine
```

## Prerequisites

- Node.js (v18+ recommended)
- Docker & Docker Compose

## Setup & Installation

1. Clone the repository and navigate to the root directory:

```bash
cd selenium-demo
```

2. Install Node dependencies:

```bash
npm install
```

3. Spin up the local Selenium Grid infrastructure:

```bash
docker-compose up -d
```

4. Scale the Grid infrastructure to support concurrent loads (e.g., 5 nodes):

```bash
docker-compose up -d --scale firefox-node=5
```

You can verify the active infrastructure by visiting the Selenium Grid Dashboard at `http://localhost:4444`.

## Running the Tests

### 1. Functional Baseline

To run a single, sequential user flow: 

```bash
node src/tests/scaleTest.js
```

### 2. Parallel Load Test

To trigger the concurrency engine and fire 5 automated headless browsers at the exact same time:
```bash
node src/tests/loadTest.js
```

## Infrastructure Teardown

To stop the browser containers and free up system memory when testing is complete:

```bash
docker-compose down
```