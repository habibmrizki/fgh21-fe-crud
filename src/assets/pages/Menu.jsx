import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [table, setTable] = React.useState([]);

  async function getData() {
    const response = await fetch("http://localhost:8080/users/");
    const data = await response.json();
    const newData = data.results;
    setTable(newData);
  }

  useEffect(() => {
    getData();
  }, []);

  function removeData(id) {
    fetch("http://localhost:8080/users/" + id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("removed");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full h-full justify-center items-center flex text-[#010101] mt-[80px]">
      <div className="bg-white-600 w-full px-[20px] justify-center items-center flex flex-col">
        <div className="bg-orange-500 w-[30%] flex justify-center h-[55px]">
          <Link to={"/Create"}>
            <button>+ Create User</button>
          </Link>
        </div>
        <table className="w-[30%] border">
          <thead className="border">
            <tr>
              <th className="border">ID</th>
              <th className="border">Username</th>
              <th className="border">Email</th>
              <th className="border">Options</th>
            </tr>
          </thead>
          <tbody>
            {table.map((e) => (
              <tr key={e.id}>
                <td className="border">{e.id}</td>
                <td className="border">{e.username}</td>
                <td className="border">{e.email}</td>
                <td className="border flex justify-center gap-[20px]">
                  <Link to={"/update/" + e.id}>
                    <button className="bg-orange-500">edit</button>
                  </Link>
                  <button
                    className="bg-orange-500"
                    onClick={() => removeData(e.id)}
                  >
                    hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menu;

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// // import { useEffect } from "react";

// function Menu() {
//   // component
//   const [table, setTable] = React.useState([]);

//   async function getData() {
//     const response = await fetch("http://localhost:8080/users");
//     const data = await response.json();
//     const newData = data.result;
//     setTable(newData);
//     // console.log(newData);
//   }
//   useEffect(() => {
//     getData();
//   }, []);
//   function removeData(id) {
//     fetch("http://localhost:8080/users" + "/" + id, {
//       method: "DELETE",
//     })
//       .then(() => {
//         console.log("removed");
//         getData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   return (
//     <div className="w-full h-full justify-center items-center flex text-[#010101] mt-[80px]">
//       <div className="bg-white-600 w-full px-[20px] justify-center items-center flex flex-col">
//         <div className="bg-orange-500 w-[30%] flex justify-center h-[55px]">
//           <Link to={"/Create"}>
//             <button>+ Create User</button>
//           </Link>
//         </div>
//         <table className="w-[30%] border">
//           <thead className="border">
//             <tr>
//               <th className="border">ID</th>
//               <th className="border">Name</th>
//               <th className="border">Email</th>
//               <th className="border">Options</th>
//             </tr>
//           </thead>
//           {table.map((e) => {
//             // console.log(e);
//             return (
//               <tbody>
//                 <tr key={e.id}>
//                   <td className="border">{e.id}</td>
//                   <td className="border">{e.fullname}</td>

//                   <td className="border">{e.email}</td>
//                   <td className="border flex justify-center gap-[20px]">
//                     <Link to={"/update/" + e.id}>
//                       <button className="bg-orange-500">edit</button>
//                     </Link>
//                     <button
//                       className="bg-orange-500"
//                       onClick={() => removeData(e.id)}
//                     >
//                       hapus
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             );
//           })}
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Menu;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// function MainMenu() {
//   const [reveal, setReveal] = useState([]);
//   const nav = useNavigate();
//   async function getData() {
//     const endpoint = "http://localhost:8080/users";
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     const dataUser = data.results;
//     setReveal(dataUser);
//   }
//   useEffect(() => {
//     getData();
//   }, []);

//   async function btnDelete(id) {
//     const response = await fetch("http://localhost:8080/users${id}", {
//       method: "DELETE",
//     });
//     getData();
//   }

//   function toEdit(id) {
//     nav("/update/" + id);
//   }

//   return (
//     <div className="flex flex-col justify-center items-center gap-8 my-8 min-w-[500px]">
//       <div className="w-[490px]">
//         <Link to={"/Create"}>
//           <button className="bg-gray-300 text-white w-full h-16 font-bold">
//             Create New Data
//           </button>
//         </Link>
//       </div>
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th className="border-gray-500 border py-1 px-4">ID</th>
//               <th className="border-gray-500 border py-1 px-4">Name</th>
//               <th className="border-gray-500 border py-1 px-4">Email</th>
//               <th className="border-gray-500 border py-1 px-4">Options</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reveal.map((item) => {
//               return (
//                 <tr key={item.id}>
//                   <td className="border-gray-500 border py-1 px-4">
//                     {item.id}
//                   </td>
//                   <td className="border-gray-500 border py-1 px-4 text-left">
//                     {item.name}
//                   </td>
//                   <td className="border-gray-500 border py-1 px-4 text-left">
//                     {item.email}
//                   </td>
//                   <td className="border-gray-500 border py-1 px-4 flex gap-2">
//                     <button
//                       onClick={() => toEdit(item.id)}
//                       className="bg-gray-300 text-white p-1 min-w-16 rounded-[8px]"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => btnDelete(item.id)}
//                       className="bg-gray-300 text-white p-1 min-w-16 rounded-[8px]"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default MainMenu;
