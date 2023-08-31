import { useState } from "react";
import { IEmployee } from "./Employee.Type";
import React from "react";

type Props = {
  data: IEmployee;
  onBackBtnClickHnd: () => void;
  onUpdateClickHnd: (data: IEmployee) => void;
};

const EditEmployee = (props: Props) => {
  const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [isActive, setIsActive] = useState<boolean>(data.isActive);

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
    const updatedData: IEmployee = {
      id: data.id,
      firstName: firstName,
      lastName: lastName,
      isActive: isActive,
    };
    onUpdateClickHnd(updatedData);
    onBackBtnClickHnd();
  };

  return (
    <div className="form-container flex justify-center ">
      <form onSubmit={onSubmitBtnClickHnd}>
        <div className="mt-10">
          <h3 className="text-blue-500 font-bold text-xl cursor-pointer ">
            Edit Contact Form
          </h3>
        </div>
        <div className="mt-6">
          <label className="font-semibold  text-blue-800">First Name : </label>
          <input
            className="appearance-none border rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={firstName}
            onChange={onFirstNameChangeHnd}
          />
        </div>
        <div className="mt-6">
          <label className="font-semibold  text-blue-800">Last Name : </label>
          <input
            className="appearance-none border rounded w-32 py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <span className="ml-2 text-gray-700 font-semibold ">Active</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio font-semibold  text-green-400 h-4 w-4"
              checked={!isActive}
              onChange={toggleActive}
            />
            <span className="ml-2 font-semibold  text-red-700">Inactive</span>
          </label>
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-400 h-10 w-32 rounded-lg text-white font-semibold cursor-pointer "
            onClick={onBackBtnClickHnd}
          >
            Back
          </button>
          <button
            className="bg-blue-400 h-10 w-32 rounded-lg text-white font-semibold cursor-pointer ml-6"
            onClick={onSubmitBtnClickHnd}
          >
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
