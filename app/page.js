'use client';

import TableComponent from "./components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                console.log(process.env.BASE_URL);
                const response = await axios.get(`http://localhost:8082/Coffee`);
                if (response.data) {
                    setData(response.data);
                    // console.log(response.data);
                }
            } catch (err) {

                console.error("Error fetching data:", err);
            }
        }
        fetchOrders();
    }, []);


    return (
        <div>
            {data ? <TableComponent Data={data} /> : <NotFound />}
        </div>
    );
}
