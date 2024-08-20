// import React from "react";
// import { Link } from "react-router-dom";

// function Update() {
//   return (
//     <div className="flex flex-col justify-center items-center gap-8 my-8 ">
//       <div className="w-full max-w-[400px]">
//         <Link to={"/Menu"}>
//           <button className="bg-orange-500 text-white h-16 w-full text-left pl-8 font-semibold">
//             Back to main menu
//           </button>
//         </Link>
//       </div>
//       <form className="flex flex-col gap-8 min-w-[400px]">
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="name">Full Name</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="text"
//               name="name"
//               id="name"
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email">Email</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="email"
//               name="email"
//               id="email"
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="pass">Password</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="password"
//               name="pass"
//               id="pass"
//             />
//           </div>
//           <button className="border outline-none h-12 bg-orange-500 text-white font-bold">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Update;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// function Update() {
//   const [data, setData] = useState([
//     {
//       fullname: "",
//       email: "",
//     },
//   ]);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//     onSubmit: inputs,
//     validationSchema: Yup.object().shape({
//       name: Yup.string()
//         .min(1, "Minimum 1 characters")
//         .max(50, "Must be 50 characters or less")
//         .required("Required!"),
//       email: Yup.string().email("Invalid email address").required("Required!"),
//       password: Yup.string()
//         .min(8, "Minimum 8 characters")
//         .required("Required!"),
//     }),
//   });
//   async function datas() {
//     const dataHome = await fetch("http://localhost:8080/users" + "/" + id, {});
//     const listData = await dataHome.json();
//     setData(listData.result);
//   }
//   function inputs(values) {
//     const formData = new URLSearchParams();
//     formData.append("fullname", values.fullname);
//     formData.append("email", values.email);
//     formData.append("password", values.password);
//     fetch("http://localhost:8080/users" + "/" + id, {
//       method: "PATCH",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success === true) {
//           navigate("/");
//         }
//       });
//   }

//   useEffect(() => {
//     datas();
//   }, []);
//   return (
//     <div className="flex flex-col justify-center items-center gap-8 my-8">
//       <div className="w-full max-w-[400px]">
//         <button className="bg-orange-600 text-white h-16 w-full text-left pl-8 font-semibold rounded-2xl">
//           <Link to={"/"}>Back to main menu</Link>
//         </button>
//       </div>
//       <form
//         className="flex flex-col gap-8 min-w-[400px]"
//         onSubmit={formik.handleSubmit}
//       >
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="name">Full Name</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="text"
//               name="fullname"
//               id="name"
//               defaultValue={data[0].fullname}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email">Email</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="email"
//               name="email"
//               id="email"
//               defaultValue={data[0].email}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="pass">Password</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="password"
//               name="password"
//               id="pass"
//               defaultValue={data[0].password}
//             />
//           </div>
//           <button className="border outline-none h-12 bg-orange-600 text-white font-bold rounded-2xl">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Update;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Update() {
  const [data, setData] = useState({
    username: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:8080/users/" + id);
      const result = await response.json();
      setData(result.results);
    }
    getData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      username: data.username,
      email: data.email,
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(1, "Minimum 1 karakter")
        .max(50, "Maksimal 50 karakter")
        .required("Dibutuhkan!"),
      email: Yup.string().email("Email tidak valid").required("Dibutuhkan!"),
      password: Yup.string()
        .min(8, "Minimum 8 karakter")
        .required("Dibutuhkan!"),
    }),
    onSubmit: async (values) => {
      const formData = new URLSearchParams();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      try {
        const response = await fetch("http://localhost:8080/users/" + id, {
          method: "PATCH",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          navigate("/");
        } else {
          window.alert("Gagal memperbarui data");
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-8">
      <div className="w-full max-w-[400px]">
        <button className="bg-orange-600 text-white h-16 w-full text-left pl-8 font-semibold rounded-2xl">
          <Link to={"/"}>Kembali ke menu utama</Link>
        </button>
      </div>
      <form
        className="flex flex-col gap-8 min-w-[400px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="text"
              id="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-600">{formik.errors.username}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Kata Sandi</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600">{formik.errors.password}</div>
            )}
          </div>
          <button
            className="border outline-none h-12 bg-orange-600 text-white font-bold rounded-2xl"
            type="submit"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
