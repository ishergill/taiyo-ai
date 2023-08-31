import { useState } from "react";
import { IEmployee } from "./Employee.Type";

import React from "react";

type Props = {
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (data: IEmployee) => void;
};

const AddEmployee = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isActive, setIsActive] = useState<boolean>(false);
  const { onBackBtnClickHnd, onSubmitClickHnd } = props;

  const onFirstNameChangeHnd = (e: any) => {
    setFirstName(e.target.value);
  };

  const onLastNameChangeHnd = (e: any) => {
    setLastName(e.target.value);
  };

  const toggleActive = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const onSubmitBtnClickHnd = (e: any) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      alert("Fill in the input fields");
      return;
    }

    const data: IEmployee = {
      id: new Date().toJSON().toString(),
      firstName: firstName,
      lastName: lastName,
      isActive: isActive,
    };
    onSubmitClickHnd(data);
    onBackBtnClickHnd();
  };

  return (
    <div className="form-container flex justify-center ">
      <form>
        <div className="mb-10 mt-10">
          <h3 className="text-blue-500 font-bold text-lg cursor-pointer flex justify-center ">
            Add Employee Details
          </h3>
        </div>
        <div className="mt-6">
          <label className="text-blue-500 font-semibold cursor-pointer">
            First Name :{" "}
          </label>
          <input
            className="appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={firstName}
            onChange={onFirstNameChangeHnd}
          />
        </div>
        <div className="mt-6">
          <label className="text-blue-500 font-semibold cursor-pointer">
            Last Name :{" "}
          </label>
          <input
            className="appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={lastName}
            onChange={onLastNameChangeHnd}
          />
        </div>
        <div className="mt-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600 h-4 w-4"
              checked={isActive}
              onChange={toggleActive}
            />
            <span className="text-green-400 font-semibold cursor-pointer ml-2">
              Active
            </span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio text-gray-400 h-4 w-4"
              checked={!isActive}
              onChange={toggleActive}
            />
            <span className="text-red-400 font-semibold cursor-pointer ml-2">
              Inactive
            </span>
          </label>
        </div>
        <div className="mt-10">
          <button
            className="bg-blue-400 h-10 w-32 rounded-lg cursor-pointer text-white font-bold"
            onClick={onBackBtnClickHnd}
          >
            Back
          </button>
          <button
            className="bg-blue-400 h-10 w-32 rounded-lg cursor-pointer ml-6 text-white font-bold"
            onClick={onSubmitBtnClickHnd}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
