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

//   async function getData() {
//     const user = await axios.get("http://localhost:8080/users/" + id);
//     console.log(user);
//     setData(user.data.result);
//   }

//   useEffect(() => {
//     getData();
//   }, []);
//   console.log(data);
//   async function createData(e) {
//     e.preventDefault();
//     const fullName = e.target.fullname.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     await axios
//       .patch("http://localhost:8080/users/" + id, {
//         fullname: fullName,
//         email: email,
//         password: password,
//       })
//       .then((response) => console.log(response.data))
//       .catch((error) => console.error(error));
//     window.alert("Data has been changed");
//     navigate("/");
//   }

//   return (
//     <div className="flex flex-col justify-center items-center gap-8 my-8">
//       <div className="w-full max-w-[400px]">
//         <button className="bg-orange-600 text-white h-16 w-full text-left pl-8 font-semibold rounded-2xl">
//           <Link to={"/"}>Back to main menu</Link>
//         </button>
//       </div>
//       <form className="flex flex-col gap-8 min-w-[400px]" onSubmit={createData}>
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
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Update() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const user = await axios.get("http://localhost:8080/users/" + id);
      setData(user.data.result);
    }
    getData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      fullname: data.fullname,
      email: data.email,
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.patch("http://localhost:8080/users/" + id, values);
        window.alert("Data has been changed");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-8">
      <div className="w-full max-w-[400px]">
        <button className="bg-orange-600 text-white h-16 w-full text-left pl-8 font-semibold rounded-2xl">
          <Link to={"/"}>Back to main menu</Link>
        </button>
      </div>
      <form
        className="flex flex-col gap-8 min-w-[400px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname">Full Name</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="text"
              id="fullname"
              {...formik.getFieldProps("fullname")}
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <div className="text-red-600">{formik.errors.fullname}</div>
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
            <label htmlFor="password">Password</label>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
