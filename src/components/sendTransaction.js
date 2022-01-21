import { ethers } from "ethers";
import Swal from "sweetalert2";

export async function sendTransaction(
  contractInstance,
  methodName,
  arg,
  successMessage
) {
  if (window.wallet) {
    const A = await contractInstance
      .connect(window.wallet)
      .populateTransaction[methodName](...arg);

    console.log("call : ", A);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to undo this action!",
      html: `<p>You will not be able to undo this action!</p>
                    <h1 style={{fontStyle:"bold"}}> Value : ${
                      A.value ? ethers.utils.formatEther(A?.value) : "0"
                    } </h1>
                    <small> To : ${A.to} </small><br/><small> From : ${
        A.from
      } ES </small>
                    <p> gasFee : ${A?.gasPrice || "0"} </p>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
      confirmButtonText: "Yes, do it!",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return contractInstance
          .connect(window.wallet)
          [methodName](...arg)
          .then(async (res) => {
            await res.wait();

            Swal.fire({
              title: "Good job!",
              icon: "success",
              html: `<p>${successMessage}</p><br/>Transaction Hash<a href="https://eraswap.info/txn/${
                res.hash
              }">${"  "}${res.hash}</a> `,
            });
          })
          .catch(async (error) => {
            console.log(error);
            const add = window.wallet.address
              ? window.wallet.address
              : await window.wallet.getAddress();
            const x = new ethers.VoidSigner(add, window.providerESN);
            try {
              await contractInstance.connect(x).estimateGas[methodName](...arg);
            } catch (e) {
              console.log("Error is : ", ethers.utils.toUtf8String(Object.values(e.body)));
              Swal.fire("Oops...!", `${e.message || e}`, "error");
            }
          });
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Please Connect to wallet ...",
    });
  }
}
