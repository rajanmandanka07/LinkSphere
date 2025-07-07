# LinkSphere

![LinkSphere Logo](https://via.placeholder.com/150) <!-- Replace with actual logo URL if available -->

Welcome to **LinkSphere**, a web application designed to save and manage bookmarks from various video platforms, including those requiring VPN or age verification. This project includes a React-based frontend, a Node.js/Express backend, and a separate Chrome extension for extracting page data. This README provides detailed instructions for setting up, running, and contributing to the project.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Chrome Extension Setup](#chrome-extension-setup)
- [Usage](#usage)
  - [Frontend Usage](#frontend-usage)
  - [Extension Usage](#extension-usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
LinkSphere is a bookmarking tool that allows users to save URLs from video platforms and manage them efficiently. The frontend provides a user interface to add and delete bookmarks, while the backend handles data persistence using MongoDB. The Chrome extension (optional) enables users to extract and save page data directly from their browser, especially for VPN-protected sites.

## Features
- Add bookmarks manually via URL input.
- Delete existing bookmarks.
- Responsive design using Tailwind CSS.
- Toast notifications for user feedback.
- Backend API for bookmark CRUD operations.
- Chrome extension to extract URL and HTML from the current page (VPN-compatible).
- WSL-compatible setup for development.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v14.x or later)
- **npm** (comes with Node.js)
- **MongoDB** (for backend data storage)
- **WSL 2** (Windows Subsystem for Linux, optional but recommended for development)
- **Chrome Browser** (for extension testing)
- **Git** (for cloning the repository)
- **VPN Client** (optional, for testing VPN sites)