// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// function Create() {
//   const navigate = useNavigate();
//   const formik = useFormik({});
//   console.log(formik);

//   async function createData(event) {
//     event.preventDefault();
//     const fullname = event.target.name.value;
//     const email = event.target.email.value;
//     const password = event.target.pass.value;
//     console.log(fullname);
//     console.log(email);
//     console.log(password);

//     const newData = new URLSearchParams();
//     newData.append("fullname", fullname);
//     newData.append("email", email);
//     newData.append("password", password);

//     const endpoint = "http://localhost:8080/users";
//     const response = await fetch(endpoint, {
//       method: "POST",
//       body: newData,
//     });

//     const json = await response.json();
//     console.log(json);
//     window.alert("Create user success!");
//     navigate("/");
//   }

//   return (
//     <div className="flex flex-col justify-center items-center gap-8 my-8">
//       <div className="w-full max-w-[400px]">
//         <button className="bg-orange-600 text-white h-16 w-full text-left pl-8 font-semibold rounded-2xl">
//           <Link to={"/"}>Back to main menu</Link>
//         </button>
//       </div>
//       <form onSubmit={createData} className="flex flex-col gap-8 min-w-[400px]">
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             <label htmlFor="name">Full Name</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="text"
//               name="fullname"
//               id="name"
//               // onChange={handleForm}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email">Email</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="email"
//               name="email"
//               id="email"
//               // onChange={handleForm}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="pass">Password</label>
//             <input
//               className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
//               type="password"
//               name="password"
//               id="pass"
//               // onChange={handleForm}
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

// export default Create;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Create() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },

    //bagian validation schema
    validationSchema: Yup.object({
      fullname: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),

    //bagian handle submission
    onSubmit: async (values) => {
      const newData = new URLSearchParams();
      newData.append("fullname", values.fullname);
      newData.append("email", values.email);
      newData.append("password", values.password);

      const endpoint = "http://localhost:8080/users";
      const response = await fetch(endpoint, {
        method: "POST",
        body: newData,
      });

      const json = await response.json();
      console.log(json);
      window.alert("Create user success!");
      navigate("/");
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
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-8 min-w-[400px]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname">Full Name</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="text"
              name="fullname"
              id="fullname"
              {...formik.getFieldProps("fullname")}
            />
            {formik.errors.fullname && formik.touched.fullname && (
              <div className="text-red-600">{formik.errors.fullname}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="email"
              name="email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.fullname && (
              <div className="text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border border-gray-800 outline-none h-12 rounded-xl pl-4"
              type="password"
              name="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.fullname && (
              <div className="text-red-600">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="border outline-none h-12 bg-orange-600 text-white font-bold rounded-2xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
