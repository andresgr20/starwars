import { useState } from "react";

export default function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
