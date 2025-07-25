import { render, screen } from "../../../helper/test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import { faker } from "@faker-js/faker";    
import userFixtures from "../../../helper/fixtures/user";
import { expect } from "vitest";


const userData = userFixtures();

test("renders Login fom", async()=>{
    const user = userEvent.setup();
    render(<LoginForm/>)

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();

    const emailField = screen.getByTestId("email-field");
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    const password = faker.lorem.slug(2);
    await user.type(emailField, userData.email);
    await user.type(passwordField, password);

    expect(emailField.value).toBe(userData.email);
    expect(passwordField.value).toBe(password);
})