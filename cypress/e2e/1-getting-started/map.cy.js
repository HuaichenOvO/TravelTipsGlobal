/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

Cypress.on('uncaught:exception', (err, runnable) => {
    // we expect a 3rd party library error with message 'list not defined'
    // and don't want to fail the test so we return false
    if (err.message.includes('Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported.')) {
        return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})

describe('Test package imported sucessfully', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:5173/')
    })

    it("There is a nav element", () => {
        // cy.get
        const map = cy.get("#root > div > div > div").should("exist");

        map.dblclick("center", { waitForAnimations: true });
    })
})