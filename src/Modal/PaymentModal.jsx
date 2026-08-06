import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { QRCodeCanvas } from "qrcode.react";

export const BitcoinPaymentModal = ({
  modalVisible,
  updateVisibility,
  btcAddress,
  amount,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(true);

  if (!modalVisible) return null;

  const copyToClipboard = () => {
    const value =
      btcAddress.name === "Bank"
        ? btcAddress.accountNumber
        : btcAddress.address;

    navigator.clipboard.writeText(value || "");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.modalBackground}>
      {btcAddress.name === "Bank" ? (
        <div className={styles.modalView}>
          <span
            className="material-icons"
            style={{
              width: "100%",
              textAlign: "start",
              cursor: "pointer",
            }}
            onClick={updateVisibility}
          >
            close
          </span>

          <p className={styles.modalState}>
            Please transfer <strong>${amount}</strong> to the bank account
            below.
          </p>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "18px",
              marginTop: "15px",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <strong>Bank Name</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#4F46E5",
                }}
              >
                {btcAddress.nameOfBank}
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>Account Name</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#4F46E5",
                }}
              >
                {btcAddress.nameOfAccount}
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <strong>Account Number</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#16a34a",
                  fontWeight: "bold",
                  fontSize: "18px",
                  letterSpacing: "1px",
                }}
              >
                {btcAddress.accountNumber}
              </div>
            </div>

            <div>
              <strong>Branch Code</strong>
              <div
                style={{
                  marginTop: "5px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "6px",
                  color: "#4F46E5",
                }}
              >
                {btcAddress.branchCode}
              </div>
            </div>
          </div>

          <div
            className={styles.modalButtonContainer}
            style={{ marginTop: "20px" }}
          >
            <button
              className={styles.acceptBtn}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy Account Number"}
            </button>
          </div>

          <p
            style={{
              marginTop: "18px",
              color: "#dc2626",
              fontWeight: "600",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            After completing your transfer, return to your deposit history and
            wait for the administrator to verify your payment.
          </p>
        </div>
      ) : (
        <div className={styles.modalView}>
          <span
            className="material-icons"
            style={{
              width: "100%",
              textAlign: "start",
              cursor: "pointer",
            }}
            onClick={updateVisibility}
          >
            close
          </span>

          <p className={styles.modalState}>
            Please send <strong>{amount}</strong> worth of{" "}
            <strong>{btcAddress.name}</strong> to the address below:
          </p>

          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              wordBreak: "break-all",
              marginBottom: "10px",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "green",
              background: "#f4f4f4",
            }}
          >
            {btcAddress.address}
          </div>

          <div className={styles.modalButtonContainer}>
            <button
              className={styles.acceptBtn}
              style={{ marginBottom: "10px" }}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy Address"}
            </button>

            <button
              className={styles.acceptBtn}
              style={{ marginBottom: "10px" }}
              onClick={() => setShowQR((prev) => !prev)}
            >
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </button>
          </div>

          {showQR && (
            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <QRCodeCanvas
                value={btcAddress.address}
                size={200}
              />

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                }}
              >
                Scan with your wallet app
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};