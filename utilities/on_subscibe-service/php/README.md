# ONDC Subscribe Service Setup Guide (PHP)

ONDC Subscription is a PHP project that provides functionalities for handling ONDC onboarding process.

## Installation

```sh
composer install
```

## Requirements
- PHP 7.4 or later
- Composer

## Project Structure
```
.
├── src/                # Source code
├── vendor/             # Composer dependencies (ignored in git)
├── composer.json       # Project dependencies
├── README.md           # Project documentation
```

## Running the Project
To start the project, use the following command:

```sh
php -S 127.0.0.1:3000 src/index.php
```

This will start a local PHP server on `http://127.0.0.1:3000/`.

## Dependencies
This project uses the following libraries:
- [sop/crypto-types]
- [phpseclib/phpseclib]

## Contributing
Feel free to fork and submit pull requests.

## License
This project is licensed under the MIT License.

