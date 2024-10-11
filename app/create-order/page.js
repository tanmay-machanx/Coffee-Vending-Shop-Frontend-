'use client';

import ProtectedRoute from "../components/ProtectedRoute";
import FormComponent from "./FormComponent";

export default function Page() {
  return (
    <ProtectedRoute>
      <FormComponent />
    </ProtectedRoute>
  );
}
