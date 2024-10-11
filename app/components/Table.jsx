'use client';
import { useState, useEffect } from "react";
import NotFound from "./NotFound";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import getJwtTokenFromCookies from "./getTokenFromCookie";
export default function TableComponent({ Data }) {
  const [Loading, isLoading] = useState(false);
  const [isDataPresent, setIsDataPresent] = useState(true);

  const [FilteredData, SetFilteredData] = useState([]);
  const [AllTimeSelling, SetAllTimeSelling] = useState(0);
  const [CompletedOrders, SetCompletedOrders] = useState(0);
  const [PendingOrders, SetPendingOrders] = useState(0);
  const [TodaysSelling, SetTodaysSelling] = useState(0);

  async function deleteHandler(id) {
    try {
      isLoading(true)
      // console.log("Delete HandlerCalled");
      let DeleteResponse = await axios.delete(`http://localhost:8082/Coffee/id/${id}`, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`
        }
      });
      console.log(id);
      toast.success(`Item with ${id} Deleted Successfully`);
    } catch (e) {
      console.log(e);
    } finally {
      isLoading(false)
    }

  }


  useEffect(() => {
    if (!Data || Data.length === 0) {
      setIsDataPresent(false);
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    let totalCompletedOrders = 0;
    let totalPendingOrders = 0;
    let totalAllTimeSelling = 0;
    let totalTodaysSelling = 0;

    Data.forEach((data) => {
      if (data.status === 1) totalCompletedOrders += 1;
      if (data.status === 0) totalPendingOrders += 1;
      totalAllTimeSelling += data.amount;
      if (formattedDate === data.createDate) totalTodaysSelling += data.amount;
    });

    // Set all the calculated values once
    SetCompletedOrders(totalCompletedOrders);
    SetPendingOrders(totalPendingOrders);
    SetAllTimeSelling(totalAllTimeSelling);
    SetTodaysSelling(totalTodaysSelling);

  }, [Data, Loading]);

  return (
    <div className="relative overflow-x-auto w-11/12 mx-auto my-12">
      <div className="flex justify-around mb-4">
        <button
          onClick={() => HandleFilter(1)}
          className="block w-3/12 py-6 border-2 mx-auto flex justify-center flex-col mt-4 "
        >
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-black mx-auto">
            Today's Selling
          </h5>
          <p className="opacity-80 mx-auto">Rs.{TodaysSelling}</p>
        </button>
        <button
          onClick={() => HandleFilter(2)}

          className="block w-3/12 py-6 border-2 mx-auto flex justify-center flex-col mt-4 "
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black mx-auto">
            All Time Selling
          </h5>
          <p className="opacity-80 mx-auto">Rs.{AllTimeSelling}</p>
        </button>
        <button
          onClick={() => HandleFilter(3)}

          className="block w-3/12 py-6 border-2 mx-auto flex justify-center flex-col mt-4 "
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black mx-auto">
            Completed Orders
          </h5>
          <p className="opacity-80 mx-auto">{CompletedOrders}+</p>

        </button>
        <button
          onClick={() => HandleFilter(4)}

          className="block w-3/12 py-6 border-2 mx-auto flex justify-center flex-col mt-4 "
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black mx-auto">
            Pending Orders
          </h5>
          <p className="opacity-80 mx-auto">{PendingOrders}+</p>

        </button>

      </div>
      <div className='flex flex-col mb-12 gap-y-2'>
        <h1 className="font-bold  text-center text-2xl">List of All Orders</h1>
        <Link href={"/create-order"} className="underline text-red-500  text-center text-sm">Create New Order</Link>
      </div>


      <ToastContainer />
      <table className="w-full text-sm text-left bg-white shadow-md rounded-lg">
        <thead className="text-xs uppercase bg-black bg-opacity-80 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">Serial No.</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Time</th>
            <th scope="col" className="px-6 py-3">Priority</th>
            <th scope="col" className="px-6 py-3">Price</th>

            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {isDataPresent ? (
            Data.map((item, index) => (
              <tr key={index} className={`${Loading ? "opacity-30" : null} bg-white border-b hover:bg-gray-100 transition-colors duration-200`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{item.title ? item.title : "No Data"}</td>
                <td className="px-6 py-4">{item.description ? item.description : "No Data"}</td>
                <td className="px-6 py-4">{item.createDate ? item.createDate : "No Data"}</td>
                <td className="px-6 py-4">{item.createTime ? item.createTime : "No Data"}</td>
                <td className="px-6 py-4">{item.priority === 0 ? "Low" : item.priority == 1 ? "Medium" : "High"}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">Rs.{item.amount}</td>
                <td className="px-6 py-4">{item.status == 0 ? "Pending" : item.status == 1 ? "Completed" : item.status == 2 ? "Cancelled" : "Rejected"}</td>
                <td className="px-6 py-4 flex gap-x-1">
                  <Link href={`Orders/${item.id}`} className="text-blue-500 underline text-gray-900 flex ">
                    <div><HiOutlinePencilSquare /></div></Link>

                  <div onClick={() => deleteHandler(item.id)}><MdDelete /></div></td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <NotFound />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}