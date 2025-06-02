# Changelog

The journey of this project will be documented in this file.

### Trade offs

- Decided to focus on building an API instead of a full-stack application to iterate quickly on the MVP. The API-first approach allows for easier integration with future frontend applications and mobile apps.
- Decided to use OpenAI for image recognition instead of using more specific or custom models, to save time and leverage existing technology as OpenAI provides robust image recognition capabilities and it's easy to integrate with NestJS.
- Calculate calories and macros with basic formulas instead of using a more complex model or service, to keep the initial implementation simple and focus on core functionality.
- Create hardcoded nutrition tips instead of using a more complex system or database, to keep the initial implementation simple and focus on core functionality.

## 2025-05-31

### Added

- Initial project setup with NestJS. I've decided to implement an API
  that will serve as a backend for a future frontend application.
- Config file for environment variables using `@nestjs/config` and add schema validation for environment variables.
- Implement Image Upload functionality using Multer.
- Basic structure for the application with modules, controllers, and services.
- Basic error handling and logging setup.
- Connect with OpenAI API for image recognition.
- Implemented basic image recognition functionality using OpenAI API.

## 2025-06-01

### Added

- Add MongoDB connection using Mongoose.
- Implement basic user registration using an api key for authentication.
- Implemented basic user authentication using an API key.
- Added basic user management functionality.
- Calculate calories and macros based on user input and save to the database.

## 2025-06-02

### Added

- Implemented basic nutrition tips when tracking a meal.
