# Users
- id, auto-incrementing primary key
- username, unique identifier for the user
- name, full name of the user
- email, unique email address for the user
- description, a brief description or bio of the user
- passwordHash, a hashed version of the user's password for secure storage
- permissions, a set of permissions or roles assigned to the user (e.g., admin, user)
- createdAt, timestamp when the user was created
- lastLogin, timestamp of the user's last login
- updatedAt, timestamp when the user was last updated

# Surveys
- id, auto-incrementing primary key
- code, unique code for the survey
- surveyName, name of the survey
- description, description of the survey
- creatorId, identifier of the user who created the survey
- createdAt, timestamp when the survey was created
- updatedAt, timestamp when the survey was last updated

# Questions
- id, auto-incrementing primary key
- surveyId, identifier of the survey this question belongs to
- question, text of the question
- type, type of the question (e.g., multiple choice, text)
- creatorId, identifier of the user who created the question
- createdAt, timestamp when the question was created
- updatedAt, timestamp when the question was last updated
- updatedBy, identifier of the user who last updated the question

# Answers
- id, auto-incrementing primary key
- questionId, identifier of the question this answer belongs to
- answer, the answer provided by the respondent
- respondentId, identifier of the user who provided the answer
- createdAt, timestamp when the answer was created
- updatedAt, timestamp when the answer was last updated
- updatedBy, identifier of the user who last updated the answer

# Responses
- id, auto-incrementing primary key
- surveyId, identifier of the survey this response belongs to
- questionId, identifier of the question this response belongs to
- respondentId, identifier of the user who provided the response
- answer, the answer provided by the respondent
- createdAt, timestamp when the response was created