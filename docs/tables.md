# Users
- id
- username
- name
- email
- description
- passwordHash
- permissions
- createdAt
- lastLogin
- updatedAt
- updatedBy

# Surveys
- id
- surveyName
- description
- creatorId
- createdAt
- updatedAt
- updatedBy

# Questions
- id
- surveyId
- question
- type
- creatorId
- createdAt
- updatedAt
- updatedBy

# Answers
- id
- questionId
- answers
- creatorId
- createdAt
- updatedAt
- updatedBy

# Responses
- id
- surveyId
- questionId
- answerId
- createdAt