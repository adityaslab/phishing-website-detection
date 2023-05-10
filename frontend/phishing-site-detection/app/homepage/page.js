"use client";
import urlservice from "@/services/urlservice";
import mlmodelservice from "@/services/mlmodelservice";
import { redirect } from "next/navigation";
import Image from "next/image";
import bg from "@/assets/bg.png";
import fish from "@/assets/fish.jpg";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

export default function page() {
  const [url, changeUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [lout, setLogout] = useState(false);
  const [token, setToken] = useState({});
  const [param, setParam] = useState({});
  const [prediction, setPredict] = useState("");

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("loggedSolidarityUser"));
    if (item) {
      setToken(item);
    }
  }, []);

  useEffect(() => {
    if (lout === true) {
      localStorage.clear();
      redirect("/");
    }
  }, [lout]);

  const fetchData = async () => {
    try {
      const res = await urlservice.getResult({
        url: url,
      });
      setResult(res.result);

      const params = await urlservice.getParameters({
        url: url,
      });
      setParam(params);
      console.log(params);
      if (res.result === "Not in the database") {
        const predict = await mlmodelservice.getPrediction(param);
        console.log("predict value ", predict);
        if (predict.charAt(1) === "1") {
          setPredict("Phishing not detected");
        } else {
          setPredict("Phishing detected");
        }
        //call the ML Model API here
        console.log("GOOOOOD");
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleOpen = (event) => {
    event.preventDefault();
    fetchData();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Image
        className="object-center object-cover pointer-events-none"
        src={bg}
        fill
        alt={""}
      />

      <div className="relative h-32 h-32">
        <Navbar
          className="absolute inset-x-0 top-0"
          setLogout={setLogout}
          name={token.name}
        />
      </div>
      <div className="relative z-1 grid h-screen place-items-center">
        <h1 className="font-extrabold text-4xl">Phishing Website Detection</h1>
        <form>
          <div>
            <label>url</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => changeUrl(target.value)}
            />
          </div>

          <div className="grid place-items-center pt-4">
            <button className="btn" onClick={handleOpen} type="submit">
              Submit
            </button>
          </div>
        </form>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="bg-sky-500" style={style}>
            <h2 className="text-white grid font-extrabold text-3xl place-items-center">
              Result
            </h2>
            <Image src={fish} alt="" />
            <br />
            {/* <pre className="grid place-items-center">
              {JSON.stringify(param, null, 2)}
            </pre> */}
            <p className="text-white grid text-xl place-items-center">
              {result}
            </p>
            <p>
              {prediction.length !== 0 ? (
                <div>
                  <p className="text-green-700 grid text-xl place-items-center">
                    result with the accuracy of 94.7% :
                  </p>
                  <p className="text-green-900 grid text-xl place-items-center">
                    {prediction}
                  </p>
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
        </Modal>
      </div>
    </>
  );
}
