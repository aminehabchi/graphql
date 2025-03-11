# GraphQL School Profile Visualization

## Overview
This project fetches my school data using GraphQL to create a personalized dashboard with interactive SVG visualizations of my academic progress.

## Features

### Authentication
- Secure login using JWT authentication with username/password or email/password
- API calls protected with Bearer authentication tokens

### Data Visualization
The profile page features several SVG-based data visualizations:

#### Pass Ratio Graphs
- **Piscine Go** - Visual representation of pass/fail statistics
- **Piscine JS** - Success rate across JavaScript exercises
- **Module Checkpoint** - Progress tracking for key curriculum checkpoints

#### XP Timeline
- Interactive timeline showing XP accumulation over time
- Hover for detailed information on specific time periods

#### Skills Distribution
- Circular skills chart showing proficiency across different technologies
- Visual representation of skill development throughout the curriculum

## Technical Implementation
- Built using modern JavaScript with a responsive design
- GraphQL queries to fetch personalized student data
- SVG-based data visualization for performance metrics
- Hosted on Vercel for reliable access

## How to Use
Visit [https://graphql-sooty.vercel.app/](https://graphql-sooty.vercel.app/) to see the live dashboard.

1. Log in with your school credentials
2. View your personalized academic statistics
3. Interact with the SVG graphs to explore your data in detail

## Data Sources
All visualizations are powered by data from the school's GraphQL API endpoint, including:
- User information
- Transaction history (XP)
- Progress records
- Result statistics
- Object metadata
