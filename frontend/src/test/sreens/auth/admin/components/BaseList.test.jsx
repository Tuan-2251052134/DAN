// src/test/components/BaseList.test.jsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BaseList from "../../../../../screens/auth/admin/components/BaseList";

// Mock Form component
jest.mock("../../../../../components/form/Form", () => (props) => {
  return (
    <div>
      <button onClick={() => props.afterSubmit({ id: 1, name: "Alice" })}>
        Submit
      </button>
      Form Component
    </div>
  );
});

// Mock Table component
jest.mock("../../../../../components/table/Table", () => (props) => {
  return (
    <div>
      Table Component
      {props.list.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

describe("BaseList Component", () => {
  const endPointKey = "users";
  const formFields = ["name", "email"];
  const tableFields = ["name", "email"];
  const url = "/users";

  it("renders Form and Table components", () => {
    render(
      <BaseList
        endPointKey={endPointKey}
        formFields={formFields}
        tableFields={tableFields}
        url={url}
      />
    );

    expect(screen.getByText("Form Component")).toBeInTheDocument();
    expect(screen.getByText("Table Component")).toBeInTheDocument();
  });

  it("updates table after submitting form", () => {
    render(
      <BaseList
        endPointKey={endPointKey}
        formFields={formFields}
        tableFields={tableFields}
        url={url}
      />
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Table should now show the new data
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("prepopulates table with newData if provided", () => {
    render(
      <BaseList
        endPointKey={endPointKey}
        formFields={formFields}
        tableFields={tableFields}
        url={url}
        newData={{ id: 2, name: "Bob" }}
      />
    );

    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
