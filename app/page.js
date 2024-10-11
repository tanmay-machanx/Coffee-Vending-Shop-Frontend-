'use client';

import TableComponent from "./components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import getJwtTokenFromCookies from "./components/getTokenFromCookie";

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('http://localhost:8082/Coffee', {
                    headers: {
                        Authorization: `Bearer ${getJwtTokenFromCookies()}`,
                        'Content-Type': 'application/json' // Define the content type
                    }
                });
                setData(response.data);
                console.log(response);
            } catch (err) {

                console.error("Error fetching data:", err);
            }
        }
        fetchOrders();
    }, []);


    return (
        <ProtectedRoute>
            <div>
                {data ? <TableComponent Data={data} /> : <NotFound />}
            </div>
        </ProtectedRoute>
    );
}
