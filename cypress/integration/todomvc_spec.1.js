// cy.check() - pouzij na radio buttons a check boxy
// select is for dropdowns 


/// <reference types="Cypress" />

describe('Intial check', () => {
  before(() => {
    cy.clearCookies();
  });
  beforeEach(() => {
    cy.visit('/');
    cy.createNewTasks(5);
  });

  it('Check the URL, title and header - DONE', () => {
    cy.url().should('include', 'localhost:3000');
    cy.title().should('eq', 'Redux TodoMVC Example');
    cy.get('[data-cy=title]').contains('todos').should('be.visible');
    cy.get('[data-cy=new-todo-input]').as('newToDoInput');
    cy.get('@newToDoInput').should('have.attr', 'placeholder', 'What needs to be done?');
    cy.get('@newToDoInput').should('have.value', '');
  

  });

  it('Create new TO DO list - DONE', () => { 

    cy.verifyNewTasks(5);

  })

  it('Change task name - DONE', () => { 
    
    // cy.get('ul').find('label').contains('Task1').dblclick()
    cy.get('[data-cy="todo-item-label"]').contains('Task1').dblclick()
    cy.get('.edit').clear().type('TaskA {enter}')
    cy.get('[data-cy="todo-list"]').eq(0).should('contain', 'TaskA')
    
  })

  

  it('Filter complete tasks', () => {
    
    // complete
    cy.get('[data-cy="toggle"]').first().click()
    cy.get('[data-cy="toggle"]').last().click()

    cy.get('[data-cy="filter"]').eq(2).click()

    cy.get('[data-cy="todo-item-label"]').eq(0,1).should('be.visible')
    cy.get('[data-cy="todo-item-label"]').eq(2,3,4).should('not.be.visible')
   
    cy.get('[data-cy="todo-count"]').should('contain', '3 items left')
 
  })

  it('Filter Active tasks', () => {
    cy.get('[data-cy="filter"]').eq(1).click()
    cy.get('[data-cy="todo-item-label"]').eq(0,1,2).should('be.visible')
 
    cy.get('[data-cy="todo-count"]').should('contain', '3 items left')
  })

  it('Show All tasks', () => {

    cy.get('[data-cy="filter"]').eq(0).click()
    cy.get('[data-cy="todo-item-label"]').eq(0,1,2,3,4).should('be.visible')
    cy.get('[data-cy="todo-count"]').should('contain', '3 items left')
    
  })



  it('Remove task - DONE', () => {
    before(() => {
      cy.createNewTasks(5);
    });
    
    cy.get('[data-cy="todo-item-label"]').as('toDoInput');
    cy.get('[data-cy="todo-item-remove"]').eq(0).invoke('show').click({force:true})
    cy.get('[data-cy="todo-list"]').eq(0).should('not.contain', 'Task1').should('contain', 'Task2')
    
  })

  it('Toggle all tasks and clear - DONE', () => {
            
      cy.get('ul li').should('have.class', '')
    cy.get('[data-cy="toggle"]').click({multiple:true})
    cy.get('ul li').should('have.class', 'completed')

    cy.get('[data-cy="todo-list"]').should('be.visible')
    cy.get('.clear-completed').contains('Clear completed').click()
    cy.get('[data-cy="todo-list"]').should('not.be.visible')

    })

  it('Untoggle all tasks - DONE', () => {
    cy.get('[data-cy="toggle"]').click({multiple:true})
    cy.get('ul li').should('have.class', 'completed')

    cy.get('[data-cy="toggle"]').uncheck({multiple:true})
    cy.get('ul li').should('not.have.class', 'completed')
  })
})