import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { FaSpinner } from 'react-icons/fa'; 

const UpdateFormComponent = ({ FormData, id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(0);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    if (FormData) {
      setTitle(FormData.title);
      setDescription(FormData.description);
      setPriority(FormData.priority);
      setAmount(FormData.amount);
      setStatus(FormData.status);
    }
  }, [FormData]); // Add FormData as a dependency to reload when it changes

  const UpdateHandler = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      title,
      description,
      priority,
      amount,
      status,
    };
    SetLoading(true);
    try {
      let UpdateResponse = await axios.put(`http://localhost:8082/Coffee/id/${FormData.id}`, updatedOrder);
      if (UpdateResponse.status === 200) {
        toast.success("Order updated successfully!");
      } else {
        toast.error("Failed to update order.");
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error("Error updating the order.");
    } finally {
      SetLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        className={`max-w-sm mx-auto mt-36 ${Loading ? 'opacity-50 pointer-events-none' : ''}`} // Disable form interaction when loading
      >
        <h1 className="font-bold mb-12 text-center text-2xl">Update Order</h1>
        
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter title"
            required
            disabled={Loading} // Disable input during loading
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter description"
            required
            disabled={Loading} // Disable input during loading
          />
        </div>

        <div className="mb-5">
          <label htmlFor="priority" className="block mb-2 text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            disabled={Loading} // Disable input during loading
          >
            <option value={-1}>Low</option>
            <option value={0}>Medium</option>
            <option value={1}>High</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="amount" className="block mb-2 text-sm font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter amount"
            required
            disabled={Loading} // Disable input during loading
          />
        </div>

        <div className="mb-5">
          <label htmlFor="status" className="block mb-2 text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            disabled={Loading} // Disable input during loading
          >
            <option value={0}>Pending</option>
            <option value={1}>Completed</option>
            <option value={2}>Cancelled</option>
            <option value={3}>Rejected</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={UpdateHandler}
          className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          disabled={Loading} // Disable button during loading
        >
          {Loading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Updating...
            </div>
          ) : (
            "Update Order"
          )}
        </button>
      </form>
    </>
  );
};

export default UpdateFormComponent;
