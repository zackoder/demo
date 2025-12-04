describe("Full E2E Flow", () => {
  const user = {
    nickname: "Zack3",
    firstName: "zakaria",
    lastName: "bess",
    email: "zakaria2" + "_" + "bess" + "@gmail.com",
    password: "Password123!",
    confirmPassword: "Password123!",
  };

  it("Registers a new user", () => {
    cy.visit("/signup");

    cy.get("input[name=nickname]").type(user.nickname);
    cy.get("input[name=firstName]").type(user.password);
    cy.get("input[name=lastName]").type(user.password);
    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);
    cy.get("input[name=confirmPassword]").type(user.confirmPassword);

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/login");
  });

  it("Logs in", () => {
    cy.visit("/login");

    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/");

    cy.window().then((win) => {
      const token = win.localStorage.getItem("jwtToken");
      expect(token).to.exist;
    });
  });

  // let postId = null;

  // it("Creates a post", () => {
  //   cy.visit("/");

  //   cy.get("textarea[name=content]").type("This is a test post 🚀");
  //   cy.get("button#createPost").click();

  //   cy.get(".post").first().as("newPost");
  //   cy.get("@newPost").should("contain.text", "This is a test post");

  //   cy.get("@newPost")
  //     .invoke("attr", "data-id")
  //     .then((id) => (postId = Number(id)));
  // });

  // it("Likes the post", () => {
  //   cy.get(`.post[data-id="${postId}"] .like-btn`).click();

  //   cy.get(`.post[data-id="${postId}"]`).should("contain.text", "1 like");
  // });

  // it("Adds a comment", () => {
  //   cy.get(`.post[data-id="${postId}"] .comments-btn`).click();

  //   cy.get("textarea[name=comment]").type("Nice post!");
  //   cy.get("button#sendComment").click();

  //   cy.get(".comment").should("contain.text", "Nice post!");
  // });

  // it("Deletes the post", () => {
  //   cy.get(`.post[data-id="${postId}"] .delete-btn`).click();
  //   cy.get(".confirmDelete").click();

  //   cy.get(`.post[data-id="${postId}"]`).should("not.exist");
  // });
});
