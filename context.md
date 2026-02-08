disregard all previous information

I want to make a website to run on GitHub.io but I do not want references to the domain name. 

The landing page will have 4 tabs: React, Angular, Vue, jQuery, and it will start on the React tab.  The website will use the current versions of React, Angular, Vue, JQuery and Bootstrap.  jQuery will only be used on the jQuery tab. The code will be idomatic and use best practices for each language with no method exceeding 50 lines of code. It will be compiled for angular and static for React, Vue and JQuery.

When a tab is clicked it will load rows into a table component from an in-memory store that is shared by all 4 tabs.

The table component will list the rows and have a button to add a new item. 

Each row in the table will have an action column on the right with edit, delete, and change status links as buttons. 

The edit and add pages will be the same component where the edit page has an id and the add page will create a new id for the item when the save button is clicked.  The delete action will display a modal and ask for a confirmation, "Are you sure you want to remove item?".

The item will be a simplified problem ticket with the following fields: Summary, description, created, updated, assignee, status. 

Summary is required and will be 50 chars max. It will allow all chars. 

Description is required and will be 500 chars max. It will allow all chars and be rich text capable with md and html. 

status will be Open initially, and the other statuses are In-Progress, Resolved, Re-opened, Tested, Deployed, Closed. It can be edited.

assignee will be a dropdown with these names: Robert, 5 others of your choice. It can be edited.

created is assigned when saved, updated is assigned when edited.

always put braces on a statement e.g. if, while, etc.. even if it only has one statement in the body





