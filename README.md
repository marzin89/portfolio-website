## Description
This is my portfolio website. It showcases me as a web developer.
It consists of a public and a hidden part.
The public website consists of the following pages:
- Start (home page, featured websites)
- Portfolio (a selection of websites)
- CV (education and jobs)
- Om mig (about me)
- Subpage for websites
The hidden website consists of the following pages:
- Logga in (sign in)
- Registrera dig (sign up)
- Admin (admin page)
### Public website
The public website should be pretty self explanatory (if you know Swedish).
In order to see a specific website, please click on its image.
Please note that the search bar and the contact form lack functionality
and error handling at the moment.
### Hidden website
#### Logga in
Simply add your username and password and click the damn button.
It doesn't get any easier. Error messages will be displayed for empty fields
or incorrect credentials.
#### Registrera dig
If you don't have an account, you can create one here.
The following information is required:
- First name
- Last name
- Email address
- Username
- Password (at least 10 characters)

Error messages will be displayed for empty fields, invalid email address,
taken username/password or if the password is too short.
#### Admin
This is the backbone of the website. This is where the majority of its contents are managed.
Here you can add, edit and delete educations, jobs and websites.
First, you need to choose a category from the select box.
The following categories are available:
- Utbildning (educations, default)
- Jobb (jobs)
- Webbplats (websites)

All existing items within the selected category are displayed below the form along with 
edit and delete links. Please note that you cannot delete the first three items. 
This is a security measure. Selecting a category toggles the form and the output section.
After you added, edited or deleted an item, the page will be refreshed and the updated
output section will be displayed.
Confirmation messages will be displayed upon successful POST, PUT and DELETE.
Error messages will be displayed for empty mandatory fields.
Error messages will also be displayed upon unsuccessful POST, PUT and DELETE,
or if the database connection failed.
##### Adding content
All mandatory fields are marked with an asterisk (*).
###### Educations
Adding educations requires the following information:
- Education/course name
- School
- Start date
###### Jobs
Adding jobs requires the following information:
- Job title
- Employer/company
- Start date
###### Websites
Adding websites requires the following information:
- Name
- Description
- URL

Please note that it is not possible to upload images. When adding a website, a standard
image will be displayed. When editing a website, the image will remain the same.
##### Editing content
Simply click the edit link (Redigera) below the item you would like to edit.
The admin form will be prefilled with the current information.
Add the new content according to the section **Adding content**.
##### Deleting content
Click the delete link (Radera) below the item you would like to delete.
### Programs and techniques
The website uses the following programs/techniques:
- HTML
- SASS/CSS
- JavaScript
- PHP
- MySQL/SQL

The public website was created with Gulp automation.
Please refer to the gulpfile for details.
The website uses a [PHP REST API](https://github.com/marzin89/portfolio-rest-api).

