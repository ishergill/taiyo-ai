import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import Charts from "./charts";
import Map from "./Map";
import { IEmployee, PageEnum } from "./Employee.Type";
import EmployeeList from "./EmployeeList";

import React from "react";

const Home = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if (listInString) {
      _setEmployeeList(JSON.parse(listInString));
    }
  }, []);

  const onAddEmployeeClickHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const showChart = () => {
    setShownPage(PageEnum.chart);
  };

  const showMap = () => {
    setShownPage(PageEnum.map);
  };

  const _setEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };

  const addEmployee = (data: IEmployee) => {
    _setEmployeeList([...employeeList, data]);
  };

  const deleteEmployee = (data: IEmployee) => {
    // To Index from array i,e employeeList
    // Splice that
    // Update new record

    const indexToDelete = employeeList.indexOf(data);
    const tempList = [...employeeList];

    tempList.splice(indexToDelete, 1);
    _setEmployeeList(tempList);
  };

  const editEmployeeData = (data: IEmployee) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  };

  const updateData = (data: IEmployee) => {
    const filteredData = employeeList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = employeeList.indexOf(filteredData);
    const tempData = [...employeeList];
    tempData[indexOfRecord] = data;
    _setEmployeeList(tempData);
  };

  return (
    <div className="bg-transparent w-screen ">
      <div className="bg-slate-200 h-screen w-44 absolute rounded-lg  mr-4">
        <button
          onClick={onAddEmployeeClickHnd}
          className="text-blue-900 font-semibold text-lg cursor-pointer ml-4 mt-10 hover:bg-slate-300 rounded-lg p-1 "
        >
          Add Contact
        </button>
        <div className="w-28 h-1 bg-gray-300  ml-4 mt-1"></div>
        <button
          onClick={showChart}
          className="text-blue-900 font-semibold  cursor-pointer ml-4 mt-5 text-lg hover:bg-slate-300 rounded-lg p-1 "
        >
          Charts
        </button>

        <div className="w-28 h-1 bg-gray-300  ml-4 mt-1"></div>
        <button
          onClick={showMap}
          className="text-blue-900 font-semibold  cursor-pointer ml-4 mt-5 text-lg hover:bg-slate-300 rounded-lg p-1 "
        >
          Map
        </button>
        <div className="w-28 h-1 bg-gray-300  ml-4 mt-1"></div>
      </div>

      {shownPage === PageEnum.list && (
        <div className="">
          {!employeeList.length ? (
            <div className="flex justify-center ">
              <div>
                <button
                  onClick={onAddEmployeeClickHnd}
                  className="rounded-lg h-18 w-26 p-2 mb-8  font-semibold cursor-pointer bg-blue-400 text-white mt-10"
                >
                  Create Contact
                </button>
                <div
                  className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p className="font-bold"> No contact found</p>
                  <p>please add contact from create contact button</p>
                </div>
                {/* <p className="text-blue-700 font-bold text-2xl"></p> */}
              </div>
            </div>
          ) : (
            <EmployeeList
              list={employeeList}
              onDeleteClickHnd={deleteEmployee}
              onEdit={editEmployeeData}
            />
          )}
        </div>
      )}

      {shownPage === PageEnum.add && (
        <AddEmployee
          onBackBtnClickHnd={showListPage}
          onSubmitClickHnd={addEmployee}
        />
      )}

      {shownPage === PageEnum.edit && (
        <EditEmployee
          data={dataToEdit}
          onBackBtnClickHnd={showListPage}
          onUpdateClickHnd={updateData}
        />
      )}
      {shownPage === PageEnum.chart && <Charts />}
      {shownPage === PageEnum.map && <Map />}
    </div>
  );
};

export default Home;
