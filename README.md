# Telegram Subscriber API

![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![dotenv](https://img.shields.io/badge/dotenv-10.0.0-yellowgreen)
![body-parser](https://img.shields.io/badge/body--parser-1.19.0-orange)

## Description

`telegram-subscriber-api` is a Node.js application built with Express that provides a RESTful API for managing Telegram subscribers. The API facilitates interactions with Telegram channels or groups, enabling effective management of subscriber data.

## Features

- **RESTful API** for managing Telegram subscribers.
- JSON request parsing with `body-parser`.
- Environment configuration using `dotenv`.
- Modular route handling with `express.Router()`.

## Requirements

- Node.js 16.x or higher
- NPM 7.x or higher

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/telegram-subscriber-api.git
    cd telegram-subscriber-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    PORT=3000
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

## Project Structure

The project is organized as follows:

