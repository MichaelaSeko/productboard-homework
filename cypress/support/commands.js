// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("createNewTasks", (task) => {
    cy.get('[data-cy=new-todo-input]').as('newInput');
    for (var i = 1; i <= task; i++) {
    cy.get('@newInput').type('Task'+i+ '{enter}');
}

})

Cypress.Commands.add('verifyNewTasks', (newTask) => {
    for (var i = 1; i <=newTask; i++)
    cy.get('li').find('label').should('contain', 'Task'+i)
    cy.get('li').find('label').should('not.contain', 'Task'+i+1) // refactor so it make sense
})
