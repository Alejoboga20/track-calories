# Changelog

The journey of this project will be documented in this file.

## 2025-05-31

### Added

- Initial project setup with NestJS. I've decided to implement an API
  that will serve as a backend for a future frontend application.
- Config file for environment variables using `@nestjs/config` and add schema validation for environment variables.
- Implement Image Upload functionality using Multer.
- Basic structure for the application with modules, controllers, and services.
- Basic error handling and logging setup.
- Connect with OpenAI API for image recognition.

### Trade offs

- Decided to focus on building an API instead of a full-stack application to iterate quickly on the MVP.
- Decided to use OpenAI for image recognition instead of using more specific or custom models, to save time and leverage existing technology as OpenAI provides robust image recognition capabilities and it's easy to integrate with NestJS.
