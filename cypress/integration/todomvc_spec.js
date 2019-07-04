/// <reference types="Cypress" />

describe('Intial check', () => {
  before(() => {
    // cy.clearCookies()
  })
  beforeEach(() => {
    cy.visit('/')
    cy.createNewTasks(5)
  })

  it('Check the URL, title and header', () => {
    cy.url().should('include', 'localhost:3000')
    cy.title().should('eq', 'Redux TodoMVC Example')
    cy.get('[data-cy=title]').contains('todos').should('be.visible')
    cy.get('[data-cy=new-todo-input]').as('newToDoInput')
    cy.get('@newToDoInput').should('have.attr', 'placeholder', 'What needs to be done?')
    cy.get('@newToDoInput').should('have.value', '')
  
  });


  it('Create new TO-DO list', () => { 

    cy.verifyNewTasks(5)

  })

  it('Change task name', () => { 
    
    cy.get('[data-cy="todo-item-label"]').as('toDoInput')
    cy.get('@toDoInput').eq(0).dblclick()
    cy.get('.edit').clear().type('TaskA {enter}')
    cy.get('[data-cy="todo-list"]').eq(0).should('contain', 'TaskA').and('not.contain', 'Task1')

  })

  
  it('Filter Completed tasks', () => {
    
    cy.get('[data-cy="toggle"]').first().click()
    cy.get('[data-cy="toggle"]').last().click()

    cy.get('[data-cy="filter"]').should('contain', 'Active').eq(2).click()
  
    cy.get('li').find('label').should('contain', 'Task1').and('be.visible')
      .get('li').find('label').should('contain', 'Task5').and('be.visible')
      .get('li').find('label').should('not.contain', 'Task2')
      .get('li').find('label').should('not.contain', 'Task3')
      .get('li').find('label').should('not.contain', 'Task4')
     
    cy.get('[data-cy="todo-count"]').should('contain', '3 items left')
 
  })


  it('Filter Active tasks', () => {
    
    cy.get('[data-cy="toggle"]').first().click()
    cy.get('[data-cy="toggle"]').last().click()
    cy.get('[data-cy="filter"]').should('contain', 'Active').eq(1).click()

    cy.get('li').find('label').should('contain', 'Task2').and('be.visible')
      .get('li').find('label').should('contain', 'Task3').and('be.visible')
      .get('li').find('label').should('contain', 'Task4').and('be.visible')
      .get('li').find('label').should('not.contain', 'Task1')
      .get('li').find('label').should('not.contain', 'Task5')

    cy.get('[data-cy="todo-count"]').should('contain', '3 items left')
    
  })


  it('Show All tasks', () => {

    cy.get('[data-cy="filter"]').eq(0).click()
      .get('li').find('label').should('contain', 'Task1').and('be.visible')
      .get('li').find('label').should('contain', 'Task2').and('be.visible')
      .get('li').find('label').should('contain', 'Task3').and('be.visible')
      .get('li').find('label').should('contain', 'Task4').and('be.visible')
      .get('li').find('label').should('contain', 'Task5').and('be.visible')
 
    cy.get('[data-cy="todo-count"]').should('contain', '5 items left')
    
  })


  it('Remove task', () => {
    
    cy.get('[data-cy="todo-item-label"]').as('toDoInput')
    cy.get('[data-cy="todo-item-remove"]').should('be.hidden')
    cy.get('[data-cy="todo-item-remove"]').eq(0).invoke('show').click({force:true})
    cy.get('[data-cy="todo-list"]').eq(0).should('not.contain', 'Task1').and('contain', 'Task2')
    
  })


  it('Toggle all tasks and clear', () => {
            
    cy.get('ul li').should('have.class', '')
    cy.get('[data-cy="toggle"]').click({multiple:true})
    cy.get('ul li').should('have.class', 'completed')

    cy.get('[data-cy="todo-list"]').should('be.visible')
    cy.get('.clear-completed').contains('Clear completed').click()
    cy.get('[data-cy="todo-list"]').should('not.be.visible')

    })


  it('Untoggle all tasks', () => {
    cy.get('[data-cy="toggle"]').click({multiple:true})
    cy.get('ul li').should('have.class', 'completed')

    cy.get('[data-cy="toggle"]').uncheck({multiple:true})
    cy.get('ul li').should('not.have.class', 'completed')
    
  })
  
})
